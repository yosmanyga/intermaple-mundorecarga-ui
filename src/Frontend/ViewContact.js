import React from "react";
import PropTypes from "prop-types";
import {Button, Container, Flag, Input, Platform, Text, Theme} from "@yosmy/ui";
import Subtitle from "../Common/Subtitle";
import Topup from "./Topup.inc";
import InnerLayoutBlock from "../Common/InnerLayoutBlock";

class ViewContact extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.shape({
            pickContactAsClient: PropTypes.func.isRequired,
            collectTopupsAsClient: PropTypes.func.isRequired,
            updateContact: PropTypes.func.isRequired,
        }).isRequired,
        id: PropTypes.string.isRequired,
        onTopup: PropTypes.func.isRequired, // (contact)
        onUpdate: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        contact: null,
        topups: null,
        edit: false,
        progress: 0
    };

    componentWillMount = () => {
        Platform.back.add(this._handleBack);
    };

    componentDidMount = () => {
        this._handleProgress(
            true,
            () => {
                Promise.all([
                    this.props.api.pickContactAsClient(
                        this.props.id
                    ),
                    this.props.api.collectTopupsAsClient(
                        this.props.id
                    )
                ])
                    .then((values) => {
                        this.setState({
                            contact: values[0],
                            topups: values[1]
                        }, () => {
                            this._handleProgress(
                                false
                            );
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    };

    componentWillUnmount() {
        Platform.back.remove(this._handleBack);
    }

    _handleBack = () => {
        this.props.onBack();

        return true;
    };

    render() {
        const Layout = this._buildLayout;

        if (
            this.state.contact === null
            || this.state.topups === null
        ) {
            return <Layout />
        }

        if (this.state.edit === true) {
            return <Layout
                flex={{
                    alignItems: "center"
                }}
            >
                <InnerLayoutBlock
                    photo={Platform.select({
                        web: require('../Common/city.jpg'),
                        mobile: undefined
                    })}
                >
                    <Subtitle>
                        Cambiar nombre
                    </Subtitle>
                    <Flag
                        iso={this.state.contact.country}
                        size="sm"
                        margin={{
                            top: 8
                        }}
                    />
                    <Text
                        variant="subtitle2"
                        margin={{
                            top: 8
                        }}
                    >
                        {this.state.contact.type === "phone"
                            ? `+${this.state.contact.prefix}-${this.state.contact.account}`
                            : this.state.contact.account
                        }
                    </Text>
                    <Input
                        value={this.state.contact.name}
                        focus
                        capitalize="words"
                        label="Nombre"
                        width={200}
                        margin={{
                            top: 2
                        }}
                        onChange={(value) => {
                            this.setState({
                                contact: {
                                    ...this.state.contact,
                                    name: value
                                }
                            })
                        }}
                        onEnter={this._handleUpdate}
                    />
                    <Container
                        flow="row"
                        margin={{
                            top: 8
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => {
                                this.setState({
                                    edit: false,
                                });
                            }}
                        >
                            <this.props.icons.actions.back />
                            <Text>Cancelar</Text>
                        </Button>
                        <Button
                            color="primary"
                            onClick={this._handleUpdate}
                            margin={{
                                left: 8
                            }}
                        >
                            <this.props.icons.actions.ok />
                            <Text>Actualizar</Text>
                        </Button>
                    </Container>
                </InnerLayoutBlock>
            </Layout>
        }

        return <Layout>
            <InnerLayoutBlock
                photo={Platform.select({
                    web: require('../Common/city.jpg'),
                    mobile: undefined
                })}
            >
                <Container
                    flow="column"
                    align={{
                        alignItems: "center"
                    }}
                    margin={{
                        top: 8
                    }}
                >
                    <Flag
                        iso={this.state.contact.country}
                        size="sm"
                    />
                    <Text
                        variant="subtitle2"
                        margin={{
                            top: 8
                        }}
                    >
                        {this.state.contact.type === "phone"
                            ? `+${this.state.contact.prefix}-${this.state.contact.account}`
                            : this.state.contact.account
                        }
                    </Text>
                    <Container
                        flow="row"
                        align={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text
                            variant="caption"
                            margin={{
                                top: 4
                            }}
                        >
                            {this.state.contact.name || "(Sin nombre)"}
                        </Text>
                        <Button
                            variant="text"
                            tooltip={this.state.contact.name === "" ? "Poner nombre" : "Cambiar nombre"}
                            margin={{
                                left: 4
                            }}
                            padding={0}
                            onClick={() => {
                                this.setState({
                                    edit: true
                                })
                            }}
                        >
                            <this.props.icons.actions.edit
                                style={{
                                    fontSize: 15
                                }}
                            />
                        </Button>
                    </Container>
                    <Button
                        color="primary"
                        onClick={() => {
                            this.props.onTopup(this.state.contact);
                        }}
                        center
                        margin={{
                            top: 8
                        }}
                    >
                        <this.props.icons.actions.add />
                        <Text>Nueva recarga</Text>
                    </Button>
                </Container>
                <Container
                    margin={{
                        top: 8
                    }}
                >
                    {this.state.topups.length > 0 && <React.Fragment>
                        <Subtitle>Recargas enviadas</Subtitle>
                        {this.state.topups.map((topup, i) => {
                            return <Topup
                                key={i}
                                width={this.props.width}
                                icons={this.props.icons}
                                data={topup}
                                onClick={() => {
                                    this.props.onTopup(this.state.contact);
                                }}
                                padding={{
                                    left: 8,
                                    right: 8
                                }}
                            />
                        })}
                    </React.Fragment>}
                </Container>
            </InnerLayoutBlock>
        </Layout>
    }

    _handleUpdate = () => {
        this._handleProgress(
            true,
            () => {
                this.props.api.updateContact(
                    this.props.id,
                    this.state.contact.name
                )
                    .then(() => {
                        this.setState({
                            edit: false
                        }, () => {
                            this._handleProgress(
                                false,
                                this.props.onUpdate
                            );
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    };

    _handleProgress = (progress, callback = null) => {
        this.setState((prevState) => {
            return {
                progress: prevState.progress + (progress === true ? 1 : -1)
            }
        }, callback);
    };

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Contacto"
            left={{
                icon: <this.props.icons.actions.back />,
                onClick: this.props.onBack
            }}
            progress={this.state.progress > 0}
        >
            {children}
        </this.props.layout>
    };
};

export default Platform.dimensions.withWidth()(Theme.withTheme()(ViewContact));