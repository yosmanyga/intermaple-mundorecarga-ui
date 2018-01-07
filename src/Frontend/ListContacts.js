import React from "react";
import PropTypes from "prop-types";
import {Container, Button, Flag, Platform, Tabs, Tab, Text} from "@yosmy/ui";
import Row from "../Common/Row";
import Topup from "./Topup.inc";
import InnerLayoutBlock from "../Common/InnerLayoutBlock";

class ListContacts extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onSelect: PropTypes.func.isRequired, // (contact)
        onNewTopup: PropTypes.func.isRequired, // ()
        onReTopup: PropTypes.func.isRequired, // (topup)
        onBack: PropTypes.func.isRequired, // (contact)
        onError: PropTypes.func.isRequired,
    };

    state = {
        tab: 0,
        progress: 0
    };

    componentWillMount = () => {
        Platform.back.add(this._handleBack);
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

        if (this.state.contacts === null) {
            return <Layout />
        }

        return <Layout>
            <InnerLayoutBlock
                photo={Platform.select({
                    web: require('../Common/city.jpg'),
                    mobile: undefined
                })}
            >
                <Tabs
                    value={this.state.tab}
                    onChange={(value) => {
                        this.setState({
                            tab: value
                        });
                    }}
                >
                    <Tab heading="Contactos" />
                    <Tab heading="Historial" />
                </Tabs>

                <Container
                    margin={{
                        top: 16
                    }}
                >
                    {this.state.tab === 0 && <ListContactsTab
                        layout={({children}) => {
                            return <React.Fragment>
                                {children}
                            </React.Fragment>
                        }}
                        icons={this.props.icons}
                        api={this.props.api}
                        onSelect={this.props.onSelect}
                        onNewTopup={this.props.onNewTopup}
                        onBack={this._handleBack}
                        onProgress={this._handleProgress}
                        onError={this.props.onError}
                    />}
                    {this.state.tab === 1 && <ListHistoryTab
                        width={this.props.width}
                        layout={({children}) => {
                            return <React.Fragment>
                                {children}
                            </React.Fragment>
                        }}
                        icons={this.props.icons}
                        api={this.props.api}
                        onSelect={this.props.onReTopup}
                        onBack={this._handleBack}
                        onProgress={this._handleProgress}
                        onError={this.props.onError}
                    />}
                </Container>
            </InnerLayoutBlock>
        </Layout>;

    }

    _handleProgress = (progress, callback = null) => {
        this.setState((prevState) => {
            return {
                progress: prevState.progress + (progress === true ? 1 : -1)
            }
        }, callback);
    };

    _buildLayout = ({children, ...props}) => {
        let title;
        switch (this.state.tab) {
            case 0:
                title = "Contactos";

                break;
            case 1:
                title = "Historial";

                break;
            default:
                throw this.state.tab
        }

        return <this.props.layout
            {...props}
            title={title}
            right={{
                icon: <this.props.icons.actions.add />,
                onClick: this.props.onNewTopup
            }}
            progress={this.state.progress > 0}
        >
            {children}
        </this.props.layout>
    };
}

class ListContactsTab extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onSelect: PropTypes.func.isRequired, // (contact)
        onNewTopup: PropTypes.func.isRequired, // ()
        onBack: PropTypes.func.isRequired, // (contact)
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        contacts: null,
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.collectContactsAsClient()
                    .then((contacts) => {
                        this.setState({
                            contacts: contacts
                        }, () => {
                            this.props.onProgress(
                                false
                            );
                        })
                    })
                    .catch(this.props.onError)
            }
        );
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            nextState !== this.state
        );
    }

    render() {
        if (this.state.contacts === null) {
            return <this.props.layout />
        }

        if (this.state.contacts.length === 0) {
            return <this.props.layout>
                <Text
                    color="primary"
                    variant="subtitle1"
                    size={Platform.select({
                        mobile: Platform.dimensions.isSmDown(this.props.width) ? 18 : null
                    })}
                    center
                    style={{
                        textAlign: 'center'
                    }}
                >
                    Bienvenido a MundoRecarga
                </Text>
                <Text
                    margin={{
                        top: 16
                    }}
                    center
                    style={{
                        textAlign: 'center'
                    }}
                >
                    No tienes contactos aún.
                </Text>
                <Text
                    margin={{
                        top: 8
                    }}
                    center
                    style={{
                        textAlign: 'center'
                    }}
                >
                    Crea tu primer contacto haciendo una recarga.
                </Text>
                <Button
                    color="primary"
                    onClick={this.props.onNewTopup}
                    margin={{
                        top: 8,
                    }}
                    center
                >
                    <this.props.icons.actions.add />
                    <Text>Nueva recarga</Text>
                </Button>
            </this.props.layout>
        }

        return <this.props.layout>
            {this.state.contacts.map((contact) => {
                const {id, prefix, country, account, type, name} = contact;

                return <Row
                    key={id}
                    left={<Container
                        flow="column"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                        margin={{
                            top: 12,
                        }}
                    >
                        <this.props.icons.objects.contact
                            style={{
                                fontSize: 56,
                                color: "#ccc"
                            }}
                        />
                    </Container>}
                    body={<Container
                        flow="column"
                        margin={{
                            left: 8,
                            top: 16,
                            bottom: 16
                        }}
                    >
                        <Text>
                            {name !== "" ? name : "Sin nombre"}
                        </Text>
                        <Container
                            flow="row"
                            align={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                            margin={{
                                top: 4
                            }}
                        >
                            <Flag
                                iso={country}
                                size="sm"
                                border={0}
                            />
                            <Text
                                variant="caption"
                                margin={{
                                    left: 4
                                }}
                            >
                                {type === "phone"
                                    ? `+${prefix}-${account}`
                                    : account
                                }
                            </Text>
                        </Container>
                    </Container>}
                    onClick={() => {
                        this.props.onSelect(contact);
                    }}
                    padding={{
                        left: 8,
                    }}
                />
            })}
        </this.props.layout>
    }
}

class ListHistoryTab extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired, // (contact)
        onSelect: PropTypes.func.isRequired, // (topup)
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        contacts: null,
        topups: null,
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                Promise.all([
                    this.props.api.collectContactsAsClient(),
                    this.props.api.collectTopupsAsClient(
                        null
                    )
                ])
                    .then((values) => {
                        this.setState({
                            contacts: values[0],
                            topups: values[1]
                        }, () => {
                            this.props.onProgress(
                                false
                            );
                        })
                    })
                    .catch(this.props.onError);
            }
        );
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            nextState !== this.state
        );
    }

    render() {
        if (
            this.state.contacts === null
            || this.state.topups === null
        ) {
            return <this.props.layout />
        }

        if (this.state.topups.length === 0) {
            return <this.props.layout>
                <Text
                    margin={{
                        top: 16
                    }}
                    center
                    style={{
                        textAlign: 'center'
                    }}
                >
                    No tienes recargas aún.
                </Text>
            </this.props.layout>
        }

        return <this.props.layout>
            {this.state.topups.map((topup, i) => {
                const contact = this.state.contacts.find(({id}) => {
                    return id === topup.contact;
                });

                return <Topup
                    key={i}
                    width={this.props.width}
                    icons={this.props.icons}
                    contact={contact}
                    data={topup}
                    onClick={() => {
                        this.props.onSelect(topup);
                    }}
                    padding={{
                        left: 8,
                        right: 8
                    }}
                />
            })}
        </this.props.layout>
    }
}

export default Platform.dimensions.withWidth()(ListContacts);
