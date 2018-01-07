import React from "react";
import PropTypes from "prop-types";
import {Button, Container, Error, Text} from "@yosmy/ui";
import round from "lodash/round";

export default class ExecuteBock extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.shape({
            sendTopup: PropTypes.func.isRequired,
        }).isRequired,
        country: PropTypes.object,
        account: PropTypes.string,
        type: PropTypes.oneOf(["phone", "email"]),
        product: PropTypes.object,
        combination: PropTypes.object,
        card: PropTypes.string,
        onProgress: PropTypes.func.isRequired, // (progress, callback)
        onPaid: PropTypes.func.isRequired, // (id)
        onError: PropTypes.func.isRequired,
    };

    state = {
        busy: false,
        error: null
    };

    render() {
        const amountWithFee = (this.props.combination.send.amount + 0.30) / (1 - 0.029);
        const fee = amountWithFee - this.props.combination.send.amount;

        return <Container
            center
            margin={{
                top: 8
            }}
        >
            {this.state.error === null
                ? <Button
                    color="primary"
                    disabled={this.state.busy}
                    onClick={() => {
                        this.setState({
                            busy: true
                        }, () => {
                            this.props.onProgress(
                                true,
                                () => {
                                    this.props.api.sendTopup(
                                        this.props.country.iso,
                                        this.props.account,
                                        this.props.type,
                                        this.props.product.id,
                                        this.props.combination.send.amount,
                                        this.props.card
                                    )
                                        .then((id) => {
                                            this.setState({
                                                busy: false
                                            }, () => {
                                                this.props.onProgress(
                                                    false,
                                                    () => {
                                                        this.props.onPaid(id);
                                                    }
                                                );
                                            });
                                        })
                                        .catch((response) => {
                                            const {code, payload} = response;

                                            switch (code) {
                                                case "topup.contact-exception":
                                                    this.props.onProgress(
                                                        false,
                                                        () => {
                                                            this.setState({
                                                                error: payload.message
                                                            });
                                                        }
                                                    );

                                                    break;
                                                case "topup.payment-exception":
                                                    this.props.onProgress(
                                                        false,
                                                        () => {
                                                            this.setState({
                                                                error: payload.message
                                                            });
                                                        }
                                                    );

                                                    break;
                                                case "unexpected-exception":
                                                    this.props.onProgress(
                                                        false,
                                                        () => {
                                                            this.setState({
                                                                error: "Ocurrió un error con la recarga. Intentaremos hacer el envío manualmente. Sino el pago te será devuelto"
                                                            });
                                                        }
                                                    );

                                                    break;
                                                default:
                                                    this.props.onError(response);
                                            }
                                        });
                                }
                            );
                        });
                    }}
                    center
                    margin={{
                        top: 8
                    }}
                >
                    <this.props.icons.actions.topup />
                    <Text>Pagar {round(this.props.combination.send.amount + fee, 2)} {this.props.combination.send.currency}</Text>
                </Button>
                : <Error
                    margin={{
                        top: 8
                    }}
                    padding={4}
                >
                    {this.state.error}
                </Error>
            }
        </Container>
    }
}