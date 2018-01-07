import React from "react";
import PropTypes from "prop-types";
import {Container, Image, Platform, Text} from "@yosmy/ui";
import Preview from "../../Common/Preview";
import Row from "../../Common/Row";
import Subtitle from "../../Common/Subtitle";
import gift from "../../Frontend/gift.png"
import ListPromotionsBlock from "../../Common/ListPromotionsBlock";

class SetProductBlock extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.shape({
            collectPromotions: PropTypes.func.isRequired,
            resolveProducts: PropTypes.func.isRequired,
        }).isRequired,
        country: PropTypes.object.isRequired,
        account: PropTypes.string.isRequired,
        provider: PropTypes.object.isRequired,
        edit: PropTypes.bool,
        onProgress: PropTypes.func.isRequired, // (progress, callback)
        onSet: PropTypes.func.isRequired, // (product, combination)
        onEdit: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired,
    };

    state = {
        edit: true,
        promotions: null,
        products: null,
        product: null,
        combination: null
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                Promise
                    .all([
                        this.props.api.collectPromotions(
                            [this.props.provider.id],
                            Date.now() / 1000
                        ),
                        this.props.api.resolveProducts(
                            this.props.provider.id,
                        )
                    ])
                    .then((values) => {
                        this.setState({
                            promotions: values[0],
                            products: values[1]
                        }, () => {
                            this.props.onProgress(
                                false
                            );
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.edit !== nextProps.edit
            || this.state !== nextState
        );
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.edit === true) {
            if (prevProps.edit === this.props.edit) {
                // Avoid recursion
                return;
            }

            this.setState({
                edit: true
            })
        }
    }

    render() {
        if (
            this.state.promotions === null
            || this.state.products === null
        ) {
            return null;
        }

        if (this.state.edit === false) {
            const {
                name,
            } = this.state.product;

            const {
                send,
                receive
            } = this.state.combination;

            // Find products with same send amount
            const repeated = this.state.products.filter(({combinations}) => {
                return combinations.filter(({send}) => {
                    return send.amount === this.state.combination.send.amount;
                });
            });

            return <React.Fragment>
                <Subtitle
                    margin={{
                        top: 8
                    }}
                >
                    Cantidad
                </Subtitle>
                <Preview
                    icons={{
                        close: this.props.icons.actions.close,
                    }}
                    margin={{
                        top: 8,
                        bottom: 8
                    }}
                    left={<Container />}
                    body={<Container
                        flow="column"
                    >
                        <Container
                            flow="row"
                            align={{
                                justifyContent: "flex-start"
                            }}
                            margin={{
                                top: 8,
                                bottom: 4
                            }}
                        >
                            <Text>
                                Recibe {receive.amount} {receive.currency} {repeated.length > 1 && "(" + name + ")"}
                            </Text>
                            {this.state.promotions.length > 0
                            && send.amount >= this.state.promotions[0].minimum
                            && <React.Fragment>
                                <Text
                                    margin={{
                                        left: 4
                                    }}
                                    style={{
                                        color: "#999",
                                    }}
                                >
                                    +
                                </Text>
                                <Image
                                    source={gift}
                                    margin={{
                                        left: 4
                                    }}
                                    style={{
                                        width: 16,
                                        height: 16,
                                    }}
                                />
                                <Text
                                    margin={{
                                        left: 4
                                    }}
                                    style={{
                                        color: "#999",
                                    }}
                                >
                                    Promoción
                                </Text>
                            </React.Fragment>}
                        </Container>
                    </Container>}
                    onUndo={() => {
                        this.setState({
                            product: null,
                            combination: null,
                            edit: true
                        }, this.props.onEdit);
                    }}
                />
            </React.Fragment>
        }

        if (this.state.products.length === 0) {
            return <React.Fragment>
                <Text
                    center
                    style={{
                        textAlign: 'center'
                    }}
                >
                    En estos momentos este proveedor no acepta recargas para ese número.
                </Text>
                <Text
                    center
                    margin={{
                        top: 4
                    }}
                    style={{
                        textAlign: 'center'
                    }}
                >Por favor compruebe el número y el proveedor</Text>
            </React.Fragment>
        }

        return <React.Fragment>
            {this.state.promotions.length > 0 && <React.Fragment>
                <Subtitle
                    margin={{
                        top: 8
                    }}
                >
                    Promoción
                </Subtitle>
                <Container>
                    <Text
                        color="primary"
                        center
                        margin={{
                            top: 2
                        }}
                        padding={{
                            top: 2,
                            bottom: 8
                        }}
                        style={{
                            textAlign: "center"
                        }}
                    >
                        Tu recarga de hoy va a ser beneficiada
                        por {this.state.promotions.length > 1 ? "las siguientes promociones vigentes" : "la siguiente promoción vigente"}
                    </Text>
                    <ListPromotionsBlock
                        promotions={this.state.promotions}
                        padding={8}
                    />
                </Container>
            </React.Fragment>}
            <Subtitle
                active
                margin={{
                    top: 8
                }}
            >
                Selecciona la cantidad
            </Subtitle>
            {this.state.products.map((product) => {
                const {id, name} = product;

                return product.combinations.map((combination) => {
                    const {send, receive} = combination;

                    // Find products with same send amount
                    const repeated = this.state.products.filter(({combinations}) => {
                        return combinations.filter(({send}) => {
                            return send.amount === combination.send.amount;
                        });
                    });

                    return <Row
                        key={id + "-" + send.amount}
                        left={<Container
                            padding={{
                                top: 4,
                            }}
                        >
                            {this.state.product === product && this.state.combination === combination
                                ? <this.props.icons.objects.selected/>
                                : <this.props.icons.objects.unselected/>
                            }
                        </Container>}
                        body={<Container
                            flow="column"
                            padding={{
                                top: 4,
                                bottom: 4
                            }}
                        >
                            <Text
                                style={{
                                    color: "#848484",
                                }}
                            >
                                Recibe {receive.amount} {receive.currency} {repeated.length > 1 && "(" + name + ")"}
                                {this.state.promotions.length > 0
                                && send.amount >= this.state.promotions[0].minimum && " + Promoción"}
                            </Text>
                        </Container>}
                        right={this.state.promotions.length > 0
                        && send.amount >= this.state.promotions[0].minimum
                        && <Image
                            source={gift}
                            margin={{
                                top: 4,
                                right: 8
                            }}
                            width={20}
                            height={20}
                        />
                        }
                        onClick={() => {
                            this._handleSelect(product, combination);
                        }}
                    />;
                });
            })}
        </React.Fragment>
    }

    _handleSelect = (product, combination) => {
        this.setState({
            product: product,
            combination: combination,
            edit: false
        }, () => {
            this.props.onSet(product, combination);
        });
    }
}

export default Platform.dimensions.withWidth()(SetProductBlock);
