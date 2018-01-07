import React from "react";
import PropTypes from "prop-types";
import {RequestPhone, ConfirmPhone} from "@yosmy/auth-ui";
import {Button, Container, Input, Text} from "@yosmy/ui";
import Subtitle from "./Subtitle";

export default class LoginBlock extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        referral: PropTypes.bool, // Allows to remove referral, like in backend
        api: PropTypes.shape({
            startAuthentication: PropTypes.func.isRequired,
            completeAuthentication: PropTypes.func.isRequired,
        }).isRequired,
        onProgress: PropTypes.func.isRequired,
        onAuthenticated: PropTypes.func.isRequired,
    };

    state = {
        step: "request_phone", // request_phone, confirm_phone
        referral: false,
        registration: {
            referral: null,
            phone: null,
            retry: false,
        }
    };

    componentWillMount() {
        if (this.props.user.referral !== null) {
            this.setState({
                registration: {
                    ...this.state.registration,
                    referral: this.props.user.referral
                }
            });
        }
    }

    render() {
        return <React.Fragment>
            {this.state.step === "request_phone" && <RequestPhone
                layout={this._buildRequestPhoneLayout}
                icons={{
                    forward: this.props.icons.actions.forward,
                }}
                phone={this.state.registration.phone}
                retry={this.state.registration.retry}
                onProgress={this.props.onProgress}
                onExec={(phone, onError) => {
                    this.props.onProgress(
                        true,
                        () => {
                            this.props.api.startAuthentication(
                                phone.country.prefix,
                                phone.number,
                            )
                                .then(() => {
                                    this.props.onProgress(
                                        false,
                                        () => {
                                            this.setState({
                                                registration: {
                                                    ...this.state.registration,
                                                    phone: phone,
                                                    retry: false
                                                },
                                                step: "confirm_phone"
                                            });
                                        }
                                    );
                                })
                                .catch((response) => {
                                    const {code} = response;

                                    switch (code) {
                                        case "userland.authentication.invalid-number-exception":
                                            this.props.onProgress(
                                                false,
                                                () => {
                                                    onError("El número es incorrecto");
                                                }
                                            );

                                            break;
                                        default:
                                            throw response;
                                    }
                                });
                        }
                    );
                }}
            />}

            {this.state.step === "confirm_phone" && <ConfirmPhone
                layout={({children}) => {
                    return <Container
                        flow="column"
                        align={{
                            alignItems: "center"
                        }}
                    >
                        <Subtitle
                            active
                            margin={{
                                top: 8
                            }}
                        >
                            Escribe el código de verificación
                        </Subtitle>
                        {children}
                    </Container>
                }}
                icons={{
                    back: this.props.icons.actions.back,
                    forward: this.props.icons.actions.forward,
                    key: this.props.icons.objects.key,
                }}
                phone={this.state.registration.phone}
                onExec={(code, onError) => {
                    this.props.onProgress(
                        true,
                        () => {
                            this.props.api.completeAuthentication(
                                this.state.registration.referral,
                                this.props.user.session,
                                this.state.registration.phone.country.iso,
                                this.state.registration.phone.country.prefix,
                                this.state.registration.phone.number,
                                code,
                            )
                                .then((authentication) => {
                                    this.props.onProgress(
                                        false,
                                        () => {
                                            this.props.onAuthenticated(authentication);
                                        }
                                    )
                                })
                                .catch((response) => {
                                    const {code} = response;

                                    switch (code) {
                                        case "userland.authentication.invalid-code-exception":
                                            this.props.onProgress(
                                                false,
                                                () => {
                                                    onError("El código es incorrecto");
                                                }
                                            );

                                            break;
                                        case "unexpected-exception":
                                            this.props.onProgress(
                                                false,
                                                () => {
                                                    onError("No es posible hacer la verificación. Por favor intenta más tarde");
                                                }
                                            );

                                            break;
                                        default:
                                            throw response;
                                    }
                                });
                        }
                    );
                }}
                onBack={() => {
                    this.setState({
                        registration: {
                            ...this.state.registration,
                            retry: true
                        },
                        step: "request_phone"
                    })
                }}
            />}
        </React.Fragment>
    }

    _buildRequestPhoneLayout = ({input, buttons}) => {
        return <React.Fragment>
            <Subtitle
                active
                margin={{
                    top: 8,
                    bottom: 8
                }}
            >
                Escribe tu número de teléfono
            </Subtitle>
            {input}
            {
                (
                    // Just if user is new (didn't logout)
                    this.props.user.session === null
                    // Just if referral is wanted (not wanted on backend)
                    && this.props.referral !== false
                    // Just if referral didn't come by properties (entered by url?)
                    && this.props.user.referral === null
                )
                && <Container
                margin={{
                    top: 32,
                    bottom: 32
                }}
            >
                {this.state.referral === false
                    ? <Button
                        variant="text"
                        onClick={() => {
                            this.setState({
                                referral: true
                            });
                        }}
                    >
                        <this.props.icons.actions.add />
                        <Text>Tengo una invitación</Text>
                    </Button>
                    : <Input
                        value={this.state.registration.referral}
                        onChange={(value) => {
                            this.setState({
                                registration: {
                                    ...this.state.registration,
                                    referral: value
                                }
                            })
                        }}
                        placeholder="Código de invitación"
                        help="Dejarlo en blanco si no tienes"
                        onEnter={() => {}}
                        rounded
                        width={200}
                        capitalize="characters"
                    />
                }
            </Container>}
            {buttons}
        </React.Fragment>
    }
}
