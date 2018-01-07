import React from "react";
import PropTypes from "prop-types";
import {Container, Flag, Platform, Text} from "@yosmy/ui";
import Row from "../Common/Row";
import Subtitle from "../Common/Subtitle";
import SetProviderBlock from "../Common/SendTopup/SetProviderBlock";
import SetProductBlock from "../Common/SendTopup/SetProductBlock";
import SetPaymentBlock from "../Common/SendTopup/SetPaymentBlock";
import ExecuteBock from "./SendTopup/ExecuteBock";
import FinishBock from "./SendTopup/FinishBock";
import InnerLayoutBlock from "../Common/InnerLayoutBlock";
import LayoutBlock from "../Common/SendTopup/LayoutBlock";

class SendTopupToContact extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onFinish: PropTypes.func.isRequired, // (contact)
        onBack: PropTypes.func.isRequired, // (contact)
        onNavigateToAndroidApp: PropTypes.func.isRequired, // ()
        onNavigateToIosApp: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired,
    };

    state = {
        step: "product", // "product",, "payment", "execution", "finish"
        countries: null,
        contact: null,
        country: null,
        photo: null,
        provider: null,
        product: null,
        combination: null,
        promotion: null,
        card: null,
        paid: null,
        progress: 0
    };

    componentWillMount() {
        Platform.back.add(this._handleBack);
    }

    componentDidMount() {
        this._handleProgress(
            true,
            () => {
                this.props.api.pickContactAsClient(
                    this.props.id
                )
                    .then((contact) => {
                        this.setState({
                            contact: contact,
                        }, () => {
                            Promise.all([
                                this.props.api.pickCountry(
                                    contact.country
                                ),
                                this.props.api.pickProvider(
                                    contact.provider,
                                    null
                                )
                            ]).then((values) => {
                                this.setState({
                                    country: values[0],
                                    provider: values[1]
                                }, () => {
                                    this._handleProgress(
                                        false
                                    )
                                })
                            });
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    }

    componentDidUpdate(prevProps, prevState, nextContext) {
        if (prevState.country !== this.state.country) {
            this._handleProgress(
                true,
                () => {
                    this.props.api.country.pickPhoto(
                        this.state.country.iso
                    )
                        .then(({original}) => {
                            this.setState({
                                photo: original
                            }, () => {
                                this._handleProgress(false);
                            });
                        })
                        .catch((response) => {
                            const {code} = response;

                            switch (code) {
                                case "country.nonexistent-photo-exception":
                                    this.setState({
                                        photo: require("../Common/city.jpg")
                                    }, () => {
                                        this._handleProgress(false);
                                    });

                                    break;
                                default:
                                    this.props.onError(response);
                            }
                        });
                }
            )
        }
    }

    componentWillUnmount() {
        Platform.back.remove(this._handleBack);
    }

    _handleBack = () => {
        if (
            this.state.step === "provider"
        ) {
            this.props.onBack(this.props.id);
        } else if (
            this.state.step === "product"
        ) {
            this.props.onBack(this.props.id);
        } else if (
            this.state.step === "payment"
        ) {
            this.setState({
                progress: 0,
                step: "product"
            });
        } else if (
            this.state.step === "execution"
        ) {
            // Is not executing?
            if (this.state.progress === 0) {
                this.setState({
                    step: "payment"
                });
            }
        } else if (
            this.state.step === "finish"
        ) {
            this.props.onFinish(this.props.id);
        }

        return true;
    };

    render() {
        const Layout = this._buildLayout;

        if (
            this.state.contact === null
            || this.state.country === null
            || this.state.provider === null
        ) {
            return <Layout />
        }

        return <Layout>
            {this.state.photo !== null && <InnerLayoutBlock
                photo={this.state.photo}
            >
                {(
                    this.state.step === "provider"
                    || this.state.step === "product"
                    || this.state.step === "payment"
                    || this.state.step === "execution"
                ) && <React.Fragment>
                    <Subtitle>Número de teléfono</Subtitle>
                    <Row
                        margin={{
                            top: 8
                        }}
                        left={<Container>
                            <Flag
                                iso={this.state.country.iso}
                                size="sm"
                            />
                        </Container>}
                        body={<Container
                            flow="column"
                            align={{
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                            }}
                        >
                            <Text>
                                {this.state.contact.type === "phone"
                                    ? `+${this.state.contact.prefix}-${this.state.contact.account}`
                                    : this.state.contact.account
                                }
                            </Text>

                            {this.state.contact.name !== "" && <Text
                                variant="caption"
                            >
                                {this.state.contact.name}
                            </Text>}
                        </Container>}
                    />
                </React.Fragment>}

                {(
                    this.state.step === "provider"
                    || this.state.step === "product"
                    || this.state.step === "payment"
                    || this.state.step === "execution"
                ) && <SetProviderBlock
                    icons={this.props.icons}
                    api={this.props.api}
                    country={this.state.country}
                    account={this.state.contact.account}
                    type={this.state.contact.type}
                    provider={this.state.provider}
                    onSet={(provider) => {
                        this.setState({
                            provider: provider,
                            step: "product"
                        });
                    }}
                    onEdit={() => {
                        this.setState({
                            product: null,
                            step: "provider"
                        });
                    }}
                    onProgress={this._handleProgress}
                    onError={this.props.onError}
                />}

                {(
                    this.state.step === "product"
                    || this.state.step === "payment"
                    || this.state.step === "execution"
                ) &&  <SetProductBlock
                    icons={this.props.icons}
                    api={{
                        collectPromotions: this.props.api.collectPromotions,
                        resolveProducts: this.props.api.resolveProducts,
                    }}
                    country={this.state.country}
                    account={this.state.contact.account}
                    provider={this.state.provider}
                    edit={this.state.step === "product"}
                    onProgress={this._handleProgress}
                    onSet={(product, combination) => {
                        this.setState({
                            product: product,
                            combination: combination,
                            step: "payment"
                        });
                    }}
                    onEdit={() => {
                        this.setState({
                            step: "product"
                        });
                    }}
                    onError={this.props.onError}
                />}

                {(
                    this.state.step === "payment"
                    || this.state.step === "execution"
                ) && <SetPaymentBlock
                    icons={this.props.icons}
                    phone={this.props.user.phone}
                    api={{
                        setupCard: this.props.api.userland.stripe.setupCard,
                        collectCards: this.props.api.userland.stripe.collectCardsAsClient,
                        deleteCard: this.props.api.userland.stripe.deleteCard,
                    }}
                    onSet={(card) => {
                        this.setState({
                            card: card,
                            step: "execution"
                        })
                    }}
                    onEdit={() => {
                        this.setState({
                            step: "payment",
                        });
                    }}
                    onProgress={this._handleProgress}
                />}

                {(
                    this.state.step === "execution"
                ) && <ExecuteBock
                    icons={this.props.icons}
                    api={{
                        sendTopup: this.props.api.sendTopup
                    }}
                    country={this.state.country}
                    account={this.state.contact.account}
                    type={this.state.contact.type}
                    product={this.state.product}
                    combination={this.state.combination}
                    card={this.state.card}
                    onProgress={this._handleProgress}
                    onPaid={(contact) => {
                        this.setState({
                            paid: contact,
                            step: "finish"
                        });
                    }}
                    onError={this.props.onError}
                />}

                {(
                    this.state.step === "finish"
                ) && <FinishBock
                    icons={this.props.icons}
                    country={this.state.country}
                    account={this.state.contact.account}
                    type={this.state.contact.type}
                    name={this.state.contact.name}
                    onFinish={() => {
                        this.props.onFinish(this.state.paid)
                    }}
                    onNavigateToAndroidApp={this.props.onNavigateToAndroidApp}
                    onNavigateToIosApp={this.props.onNavigateToIosApp}
                    onError={this.props.onError}
                />}
            </InnerLayoutBlock>}
        </Layout>
    }

    _handleProgress = (progress, callback = null) => {
        this.setState((prevState) => {
            return {
                progress: prevState.progress + (progress === true ? 1 : -1)
            }
        }, callback);
    };

    _buildLayout = ({children}) => {
        return <LayoutBlock
            layout={this.props.layout}
            icons={this.props.icons}
            country={this.state.country}
            progress={this.state.progress}
            onBack={this._handleBack}
        >
            {children}
        </LayoutBlock>
    };
}

export default Platform.dimensions.withWidth()(SendTopupToContact);
