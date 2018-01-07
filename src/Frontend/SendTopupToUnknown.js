import React from "react";
import PropTypes from "prop-types";
import {Platform} from "@yosmy/ui";
import LoginBlock from "../Common/LoginBlock";
import SetAccountBlock from "../Common/SendTopup/SetAccountBlock";
import SetProviderBlock from "../Common/SendTopup/SetProviderBlock";
import SetProductBlock from "../Common/SendTopup/SetProductBlock";
import SetPaymentBlock from "../Common/SendTopup/SetPaymentBlock";
import PreRegistrationBock from "../Common/SendTopup/PreRegistrationBock";
import ExecuteBock from "./SendTopup/ExecuteBock";
import FinishBock from "./SendTopup/FinishBock";
import InnerLayoutBlock from "../Common/InnerLayoutBlock";
import LayoutBlock from "../Common/SendTopup/LayoutBlock";

class SendTopupToUnknown extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        country: PropTypes.string.isRequired, // iso
        onAuthenticated: PropTypes.func.isRequired, // (authentication)
        onFinish: PropTypes.func.isRequired, // (contact)
        onBack: PropTypes.func.isRequired, // ()
        onNonexistentCountry: PropTypes.func.isRequired, // ()
        onNavigateToAndroidApp: PropTypes.func.isRequired, // ()
        onNavigateToIosApp: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired,
    };

    state = {
        step: "account", // "account", "provider", "product", "pre-registration", "registration", "payment", "execution", "finish"
        country: null,
        providers: null,
        promotions: null,
        photo: null,
        account: null,
        type: null,
        provider: null,
        product: null,
        combination: null,
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
                this.props.api.pickCountry(
                    this.props.country
                )
                    .then((country) => {
                        this.setState({
                            country: country,
                            step: "account"
                        }, () => {
                            this._handleProgress(
                                false,
                                () => {
                                    this._handleProgress(
                                        true,
                                        () => {
                                            this.props.api.collectProviders(
                                                null,
                                                this.state.country.iso
                                            )
                                                .then((providers) => {
                                                    this.setState({
                                                        providers: providers
                                                    }, () => {
                                                        providers = this.state.providers.map(({id}) => {
                                                            return id;
                                                        });

                                                        this.props.api.collectPromotions(
                                                            providers,
                                                            Date.now() / 1000
                                                        )
                                                            .then((promotions) => {
                                                                this.setState({
                                                                    promotions: promotions
                                                                }, () => {
                                                                    this._handleProgress(false);
                                                                });
                                                            })
                                                            .catch(this.props.onError)
                                                    });
                                                })
                                                .catch(this.props.onError)
                                        }
                                    );

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
                                    );
                                }
                            );
                        })
                    })
                    .catch((response) => {
                        this._handleProgress(
                            false,
                            () => {
                                const {code} = response;

                                switch (code) {
                                    case "nonexistent-country-exception":
                                        this.props.onNonexistentCountry();

                                        break;
                                    default:
                                        this.props.onError(response);
                                }
                            }
                        );
                    });
            }
        );
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (
            // Did the user registered?
            (this.props.user !== nextProps.user) && nextProps.user
            // And it's still on registration?
            && (this.state.step === "registration")
        ) {
            // Change step to payment
            this.setState({
                step: "payment"
            });
        }
    }

    componentWillUnmount() {
        Platform.back.remove(this._handleBack);
    }

    _handleBack = () => {
        if (
            this.state.step === "account"
        ) {
            this.props.onBack();
        } else if (
            this.state.step === "provider"
        ) {
            this.setState({
                progress: 0,
                step: "account",
                provider: null
            });
        } else if (
            this.state.step === "product"
        ) {
            this.setState({
                progress: 0,
                step: "provider",
                product: null
            });
        } else if (
            this.state.step === "pre-registration"
        ) {
            this.setState({
                step: "product"
            });
        } else if (
            this.state.step === "registration"
        ) {
            this.setState({
                step: "product"
            });
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
            this.state.providers === null
            || this.state.promotions === null
            || this.state.photo === null
        ) {
            return <Layout />
        }

        return <Layout>
            <InnerLayoutBlock
                photo={this.state.photo}
            >
                {(
                    this.state.step === "account"
                    || this.state.step === "provider"
                    || this.state.step === "product"
                    || this.state.step === "pre-registration"
                    || this.state.step === "registration"
                    || this.state.step === "payment"
                    || this.state.step === "execution"
                ) && <SetAccountBlock
                    width={this.props.width}
                    icons={this.props.icons}
                    api={this.props.api}
                    providers={this.state.providers}
                    promotions={this.state.promotions}
                    country={this.state.country}
                    account={this.state.account}
                    photo={this.state.photo}
                    edit={this.state.step === "account"}
                    onProgress={this._handleProgress}
                    onSet={(account, type) => {
                        this.setState({
                            account: account,
                            type: type,
                            step: "provider",
                        });
                    }}
                    onEdit={() => {
                        this.setState({
                            provider: null,
                            product: null,
                            step: "account",
                        });
                    }}
                    onBack={this.props.onBack}
                    onError={this.props.onError}
                />}

                {(
                    this.state.step === "provider"
                    || this.state.step === "product"
                    || this.state.step === "pre-registration"
                    || this.state.step === "registration"
                    || this.state.step === "payment"
                    || this.state.step === "execution"
                ) && <SetProviderBlock
                    icons={this.props.icons}
                    api={this.props.api}
                    country={this.state.country}
                    account={this.state.account}
                    type={this.state.type}
                    onSet={(provider) => {
                        this.setState({
                            provider: provider,
                            step: "product"
                        });
                    }}
                    onEdit={() => {
                        this.setState({
                            product: null,
                            step: "provider",
                        });
                    }}
                    onProgress={this._handleProgress}
                    onError={this.props.onError}
                />}

                {(
                    this.state.step === "product"
                    || this.state.step === "pre-registration"
                    || this.state.step === "registration"
                    || this.state.step === "payment"
                    || this.state.step === "execution"
                ) && <SetProductBlock
                    icons={this.props.icons}
                    api={{
                        collectPromotions: this.props.api.collectPromotions,
                        resolveProducts: this.props.api.resolveProducts,
                    }}
                    country={this.state.country}
                    account={this.state.account}
                    provider={this.state.provider}
                    edit={this.state.step === "product"}
                    onProgress={this._handleProgress}
                    onSet={(product, combination) => {
                        this.setState({
                            product: product,
                            combination: combination,
                            step: this.props.user.token === null ? "pre-registration" : "payment"
                        });
                    }}
                    onEdit={() => {
                        this.setState({
                            step: "product"
                        });
                    }}
                    onError={this.props.onError}
                />}

                {this.state.step === "pre-registration" && <PreRegistrationBock
                    icons={this.props.icons}
                    onContinue={() => {
                        this.setState({
                            step: "registration"
                        });
                    }}
                />}

                {this.state.step === "registration" && <LoginBlock
                    icons={this.props.icons}
                    user={this.props.user}
                    api={{
                        startAuthentication: this.props.api.userland.startAuthentication,
                        completeAuthentication: this.props.api.userland.completeAuthentication,
                    }}
                    onProgress={this._handleProgress}
                    onAuthenticated={this.props.onAuthenticated}
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

                {this.state.step === "execution" && <ExecuteBock
                    icons={this.props.icons}
                    api={{
                        sendTopup: this.props.api.sendTopup
                    }}
                    country={this.state.country}
                    account={this.state.account}
                    type={this.state.type}
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
                    errors={this.props.errors}
                />}

                {this.state.step === "finish" && <FinishBock
                    icons={this.props.icons}
                    country={this.state.country}
                    account={this.state.account}
                    type={this.state.type}
                    onFinish={() => {
                        this.props.onFinish(this.state.paid)
                    }}
                    onNavigateToAndroidApp={this.props.onNavigateToAndroidApp}
                    onNavigateToIosApp={this.props.onNavigateToIosApp}
                    onError={this.props.onError}
                />}
            </InnerLayoutBlock>
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
        let keywords;

        if (
            this.state.providers !== null
            && this.state.promotions !== null
        ) {
            const providers = this.state.providers
                .map(({name}) => {
                    return name;
                });

            const promotions = this.state.promotions
                .map(({title, headline, type, validity}) => {
                    return [title, headline, type, validity]
                        .filter(x => x)
                        .join(" , ");
                });

            keywords = providers
                .concat(promotions)
                .filter(x => x)
                .join(" , ");
        }

        return <LayoutBlock
            layout={this.props.layout}
            icons={this.props.icons}
            country={this.state.country}
            keywords={keywords}
            progress={this.state.progress}
            onBack={this._handleBack}
        >
            {children}
        </LayoutBlock>
    };
}

export default Platform.dimensions.withWidth()(SendTopupToUnknown);
