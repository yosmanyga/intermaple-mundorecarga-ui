import React from "react";
import PropTypes from "prop-types";
import {Button, Container, Error, Text} from "@yosmy/ui";

export default class ExecuteBock extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.shape({
            reseller: PropTypes.shape({
                sendTopup: PropTypes.func.isRequired,
            })
        }).isRequired,
        agent: PropTypes.object,
        country: PropTypes.object,
        account: PropTypes.string,
        product: PropTypes.object,
        combination: PropTypes.object,
        onProgress: PropTypes.func.isRequired, // (progress, callback)
        onPaid: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired,
    };

    state = {
        error: null,
        busy: false
    };

    render() {
        return <Container
            center
            margin={{
                top: 8
            }}
        >
            {this.state.error === null
                ? <Button
                    disabled={this.state.busy}
                    color="primary"
                    onClick={() => {
                        this.setState({
                            busy: true
                        }, () => {
                            this.props.onProgress(
                                true,
                                () => {
                                    this.props.api.reseller.sendTopup(
                                        this.props.agent.id,
                                        this.props.country.iso,
                                        this.props.account,
                                        this.props.product.id,
                                        this.props.combination.send.amount
                                    )
                                        .then(() => {
                                            this.props.onProgress(
                                                false,
                                                () => {
                                                    this.setState({
                                                        busy: false
                                                    }, () => {
                                                        this.props.onPaid();
                                                    });
                                                }
                                            );
                                        })
                                        .catch((response) => {
                                            const {code} = response;

                                            switch (code) {
                                                case "reseller.topup.payment-exception":
                                                    this.props.onProgress(
                                                        false,
                                                        () => {
                                                            this.setState({
                                                                busy: false,
                                                                error: "No tienes saldo suficiente"
                                                            });
                                                        }
                                                    );

                                                    break;
                                                case "reseller.topup.provider-exception":
                                                    this.props.onProgress(
                                                        false,
                                                        () => {
                                                            this.setState({
                                                                busy: false,
                                                                error: "Ocurrió un error con la recarga"
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
                    <Text>Enviar</Text>
                </Button>
                : <React.Fragment>
                    <Error
                        margin={{
                            top: 8
                        }}
                        padding={4}
                    >
                        {this.state.error}
                    </Error>
                </React.Fragment>
            }
        </Container>
    }
}