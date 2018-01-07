import React from "react";
import PropTypes from "prop-types";
import {Button, Container, CountryPicker, Error, Input, Platform, Text} from '@yosmy/ui';

export default class ShowLogin extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        onAuthenticated: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired,
    };

    state = {
        phone: {
            country: {
                iso: 'CU',
                prefix: '53',
                name: 'Cuba',
            },
            number: ''
        },
        password: null,
        error: null,
        progress: 0
    };

    render() {
        const Layout = this._buildLayout;

        return <Layout>
            {this.state.error && <Error>{this.state.error}</Error>}
            <CountryPicker
                allow={this.props.allow}
                onChange={(iso, prefix, name)=> {
                    this.setState({
                        phone: {
                            ...this.state.phone,
                            country: {
                                iso: iso,
                                prefix: prefix,
                                name: name,
                            }
                        }
                    });
                }}
                country={this.state.phone.country}
                translation='spa'
                margin={{
                    top: 8
                }}
            />
            <Input
                start={"+" + this.state.phone.country.prefix}
                value={this.state.phone.number}
                keyboard='numeric'
                onChange={(value) => {
                    this.setState({
                        phone: {
                            ...this.state.phone,
                            number: value
                        }
                    })
                }}
                onEnter={this._handleExec}
                focus={Platform.select({
                    web: true
                })}
                width={200}
                margin={{
                    top: 8
                }}
            />
            <Input
                value={this.state.password}
                type="password"
                onChange={(value) => {
                    this.setState({
                        password: value
                    })
                }}
                onEnter={() => {}}
                width={200}
                placeholder="Constraseña"
                margin={{
                    top: 8
                }}
            />
            <Container
                flow="row wrap"
                align={{
                    justifyContent: "center",
                    alignItems: "flex-start"
                }}
                margin={{
                    top: 8
                }}
            >
                <Button
                    color="primary"
                    margin={4}
                    center={Platform.select({
                        mobile: true
                    })}
                    onClick={() => {
                        this.setState(
                            {
                                error: null,
                            },
                            () => {
                                this._handleProgress(
                                    true,
                                    () => {
                                        this.props.api.processResellerAuthentication(
                                            this.state.phone.country.iso,
                                            this.state.phone.country.prefix,
                                            this.state.phone.number,
                                            this.state.password
                                        )
                                            .then((authentication) => {
                                                this._handleProgress(
                                                    false,
                                                    () => {
                                                        this.props.onAuthenticated(authentication);
                                                    }
                                                )
                                            })
                                            .catch((response) => {
                                                const {code} = response;

                                                switch (code) {
                                                    case "userland.invalid-authentication-exception":
                                                        this.setState({
                                                            error: "Acceso incorrecto"
                                                        }, () => {
                                                            this._handleProgress(
                                                                false
                                                            );
                                                        });

                                                        break;
                                                    default:
                                                        this.props.onError(response);
                                                }
                                            })
                                    }
                                );
                            }
                        );
                    }}
                >
                    <Text>Continuar</Text>
                    <this.props.icons.actions.forward />
                </Button>
            </Container>
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Acceso a revendedor"
            progress={this.state.progress > 0}
            flex={{
                alignItems: "center"
            }}
        >
            {children}
        </this.props.layout>
    };

    _handleProgress = (progress, callback = null) => {
        this.setState((prevState) => {
            return {
                progress: prevState.progress + (progress === true ? 1 : -1)
            }
        }, callback);
    };
}
