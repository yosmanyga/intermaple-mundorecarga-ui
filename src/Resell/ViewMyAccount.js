import React from "react";
import PropTypes from "prop-types";
import {
    Button, Card, Container, Flag, Image, Input, List, ListItem, Tabs, Tab, Text,
    Table, TableBody, TableCell, TableHead, TableRow,
} from "@yosmy/ui";
import {format} from "@yosmy/dayjs";

export default class ViewMyAccount extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        tab: 0,
        progress: 0
    };

    render() {
        const Layout = this._buildLayout;

        return <Layout>
            <Tabs
                value={this.state.tab}
                onChange={(value) => {
                    this.setState({
                        tab: value
                    });
                }}
            >
                <Tab heading="Principal" />
                <Tab heading="Transacciones" />
                <Tab heading="Proveedores" />
                <Tab heading="Agentes" />
            </Tabs>

            <Container
                margin={{
                    top: 8
                }}
                padding={8}
            >
                {this.state.tab === 0 && <ViewMain
                    api={this.props.api}
                    onProgress={this._handleProgress}
                    onError={this.props.onError}
                />}

                {this.state.tab === 1 && <ListTransactions
                    api={this.props.api}
                    onProgress={this._handleProgress}
                    onError={this.props.onError}
                />}

                {this.state.tab === 2 && <ListProviders
                    api={this.props.api}
                    onProgress={this._handleProgress}
                    onError={this.props.onError}
                />}

                {this.state.tab === 3 && <ListAgents
                    icons={this.props.icons}
                    api={this.props.api}
                    onProgress={this._handleProgress}
                    onError={this.props.onError}
                />}
            </Container>
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Mi cuenta"
            progress={this.state.progress > 0}
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

class ViewMain extends React.Component {
    static propTypes = {
        api: PropTypes.object.isRequired,
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        user: null,
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.reseller.pickUserAsReseller()
                    .then((user) => {
                        this.setState({
                            user: user
                        }, () => {
                            this.props.onProgress(
                                false
                            );
                        });
                    })
                    .catch(this.props.onError);
            }
        );
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    render() {
        if (
            this.state.user === null
        ) {
            return <React.Fragment />;
        }

        return <React.Fragment>
            <Text>Nombre: {this.state.user.name}</Text>
            <Text
                margin={{
                    top: 8
                }}
            >
                Saldo actual: {this.state.user.balance} USD
            </Text>
        </React.Fragment>
    }
}

class ListTransactions extends React.Component {
    static propTypes = {
        api: PropTypes.object.isRequired,
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        transactions: null,
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.reseller.collectTransactionsAsReseller()
                    .then((transactions) => {
                        this.setState({
                            transactions: transactions
                        }, () => {
                            this.props.onProgress(
                                false
                            );
                        });
                    })
                    .catch(this.props.onError);
            }
        );
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    render() {
        if (
            this.state.transactions === null
        ) {
            return <React.Fragment />;
        }

        return <React.Fragment>
            <List>
                {this.state.transactions.map(({id, reference, amount, date}) => {
                    return <ListItem
                        key={id}
                        text={`${amount} USD`}
                        note={format(date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")}
                    />;
                })}
            </List>
        </React.Fragment>
    }
}

class ListProviders extends React.Component {
    static propTypes = {
        api: PropTypes.object.isRequired,
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        reseller: {
            user: null,
            providers: null,
        },
        countries: null,
        providers: null,
        products: null
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                Promise.all([
                    this.props.api.reseller.pickUserAsReseller(),
                    this.props.api.reseller.collectProviders(),
                    this.props.api.collectCountries(),
                    this.props.api.collectProviders(
                        null,
                        null
                    ),
                    this.props.api.collectProducts(
                        null,
                        null
                    )
                ])
                    .then((values) => {
                        this.setState({
                            reseller: {
                                user: values[0],
                                providers: values[1]
                            },
                            countries: values[2],
                            providers: values[3],
                            products: values[4],
                        }, () => {
                            this.props.onProgress(
                                false
                            );
                        });
                    })
                    .catch(this.props.onError);
            }
        );
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    render() {
        if (
            this.state.reseller.user === null
            || this.state.reseller.providers === null
            || this.state.countries === null
            || this.state.providers === null
            || this.state.products === null
        ) {
            return <React.Fragment />;
        }

        let countries = this.state.countries;

        this.state.reseller.providers.forEach(({id, pid, discount}) => {
            const provider = this.state.providers.find(({id}) => {
                return id === pid;
            });

            const products = this.state.products.filter((product) => {
                return product.provider === pid;
            });

            countries = countries.map((country) => {
                let {iso, providers} = country;

                // Different country?
                if (iso !== provider.country) {
                    return country;
                }

                if (!providers) {
                    providers = [];
                }

                providers = providers.concat({
                    id: provider.id,
                    name: provider.name,
                    logo: provider.logo,
                    width: provider.width,
                    height: provider.height,
                    discount: discount,
                    products: products
                });

                return {
                    ...country,
                    providers: providers
                };
            });
        });

        return <React.Fragment>
            {countries
                .map(({iso, name, providers}) => {
                    if (!providers) {
                        return null;
                    }

                    return <Card
                        key={iso}
                        header={{
                            avatar: <Flag
                                iso={iso}
                                size="sm"
                            />,
                            title: name
                        }}
                        content={<React.Fragment>
                            {providers.map(({id, name, logo, width, height, discount, products}) => {
                                // Trick to put the logo inside a box

                                if (width >= 24) {
                                    height = height * 24 / width;
                                    width = 24;
                                } else if (height >= 24) {
                                    width = width * 24 / height;
                                    height = 24;
                                }

                                return <Card
                                    key={id}
                                    header={{
                                        avatar: <Image
                                            source={logo !== null
                                                ? logo
                                                : require("../Common/provider.png")
                                            }
                                            width={logo !== null
                                                ? width
                                                : 24
                                            }
                                            height={logo !== null
                                                ? height
                                                : 24
                                            }
                                        />,
                                        title: name
                                    }}
                                    content={<Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Costo de mi saldo</TableCell>
                                                <TableCell>Recibe</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map((product) => {
                                                const {combinations} = product;

                                                return combinations.map(({send, receive}, i) => {
                                                    const d = send.amount * discount / 100;

                                                    return <TableRow
                                                        key={i}
                                                    >
                                                        <TableCell>{send.amount - d} {send.currency}</TableCell>
                                                        <TableCell>{receive.amount} {receive.currency}</TableCell>
                                                    </TableRow>
                                                });
                                            })}
                                        </TableBody>
                                    </Table>}
                                    margin={{
                                        top: 8
                                    }}
                                />
                            })}
                        </React.Fragment>}
                        margin={{
                            top: 8
                        }}
                    />;
                })
                .filter(x => x)
            }
        </React.Fragment>
    }
}

class ListAgents extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        agents: null,
        agent: null,
        action: null, // "add", "edit"
    };

    componentDidMount() {
        this._collectData();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            nextState !== this.state
        );
    }

    _collectData = () => {
        this.props.onProgress(
            true,
            () => {
                this.props.api.reseller.collectAgentsAsReseller()
                    .then((agents) => {
                        this.props.onProgress(
                            false,
                            () => {
                                this.setState({
                                    agents: agents
                                });
                            }
                        );
                    })
                    .catch(this.props.onError)
            }
        );
    };

    render() {
        if (this.state.agents === null) {
            return <React.Fragment />;
        }

        return <React.Fragment>
            {this.state.action === null && <Button
                variant="outlined"
                onClick={() => {
                    this.setState({
                        action: "add"
                    });
                }}
            >
                <this.props.icons.actions.add />
                <Text>Agregar agente</Text>
            </Button>}
            {this.state.action === "add" && <AddAgent
                icons={this.props.icons}
                api={this.props.api}
                onAdd={() => {
                    this.setState({
                        action: null
                    }, this._collectData);
                }}
                onCancel={() => {
                    this.setState({
                        action: null
                    });
                }}
                onProgress={this.props.onProgress}
                onError={this.props.onError}
            />}
            {this.state.action === "edit" && <EditAgent
                icons={this.props.icons}
                api={this.props.api}
                agent={this.state.agent}
                onEdit={() => {
                    this.setState({
                        action: null
                    }, this._collectData);
                }}
                onCancel={() => {
                    this.setState({
                        action: null,
                    });
                }}
                onProgress={this.props.onProgress}
                onError={this.props.onError}
            />}
            <List>
                {this.state.agents.map((agent) => {
                    const {id, name} = agent;

                    return <ListItem
                        key={id}
                        text={name}
                        action={<Button
                            onClick={() => {
                                this.setState({
                                    action: "edit",
                                    agent: agent
                                });
                            }}
                        >
                            <this.props.icons.actions.edit />
                        </Button>}
                    />;
                })}
            </List>
        </React.Fragment>
    }
}

class AddAgent extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onAdd: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        input: {
            name: null,
        },
    };

    render() {
        return <Container
            flow="column"
            align={{
                justifyContent: "flex-start",
                alignItems: "center"
            }}
        >
            <Input
                label="Nombre"
                help="Nombre del nuevo agente"
                value={this.state.input.name}
                focus
                onChange={(value)  => {
                    this.setState({
                        input: {
                            ...this.state.input,
                            name: value
                        }
                    })
                }}
            />
            <Container
                flow="row"
                margin={{
                    top: 8
                }}
            >
                <Button
                    onClick={this.props.onCancel}
                    margin={{right: 1}}
                >
                    <this.props.icons.actions.back />
                    <Text>Cancelar</Text>
                </Button>
                <Button
                    color="primary"
                    disabled={!this.state.input.name}
                    margin={{
                        left: 8
                    }}
                    onClick={() => {
                        this.props.onProgress(
                            true,
                            () => {
                                this.props.api.reseller.addAgent(
                                    this.state.input.name,
                                )
                                    .then(() => {
                                        this.props.onProgress(
                                            false,
                                            this.props.onAdd
                                        )
                                    })
                            }
                        )
                    }}
                >
                    <Text>Agregar</Text>
                    <this.props.icons.actions.ok />
                </Button>
            </Container>
        </Container>
    }
}

class EditAgent extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        agent: PropTypes.object.isRequired,
        onEdit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        input: {
            name: null,
        },
    };

    componentWillMount() {
        this.setState({
            input: {
                ...this.state.input,
                name: this.props.agent.name
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            nextState !== this.state
        );
    }

    render() {
        return <Container
            flow="column"
            align={{
                justifyContent: "flex-start",
                alignItems: "center"
            }}
        >
            <Input
                label="Nombre"
                help="Nombre del agente"
                value={this.state.input.name}
                focus
                onChange={(value)  => {
                    this.setState({
                        input: {
                            ...this.state.input,
                            name: value
                        }
                    })
                }}
            />
            <Container
                flow="row"
                margin={{
                    top: 8
                }}
            >
                <Button
                    onClick={this.props.onCancel}
                    margin={{right: 1}}
                >
                    <this.props.icons.actions.back />
                    <Text>Cancelar</Text>
                </Button>
                <Button
                    color="primary"
                    disabled={!this.state.input.name}
                    margin={{
                        left: 8
                    }}
                    onClick={() => {
                        this.props.onProgress(
                            true,
                            () => {
                                this.props.api.reseller.updateAgent(
                                    this.props.agent.id,
                                    this.state.input.name,
                                )
                                    .then(() => {
                                        this.props.onProgress(
                                            false,
                                            this.props.onEdit
                                        )
                                    })
                            }
                        )
                    }}
                >
                    <Text>Agregar</Text>
                    <this.props.icons.actions.ok />
                </Button>
            </Container>
        </Container>
    }
}