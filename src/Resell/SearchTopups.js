import React from "react";
import PropTypes from "prop-types";
import {
    Button, Container, DatePicker, Select, SelectItem, Text,
    Table, TableBody, TableCell, TableHead, TableRow, Flag
} from "@yosmy/ui";
import {startOfDay, endOfDay, format} from "@yosmy/dayjs";

export default class SearchTopups extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        countries: null,
        providers: null,
        agents: null,
        topups: null,
        progress: 0
    };

    componentDidMount() {
        this._handleProgress(
            true,
            () => {
                Promise.all([
                    this.props.api.collectCountries(),
                    this.props.api.collectProviders(
                        null,
                        null
                    ),
                    this.props.api.reseller.collectAgentsAsReseller(),
                ])
                    .then((values) => {
                        this.setState({
                            countries: values[0],
                            providers: values[1],
                            agents: values[2],
                        }, () => {
                            this._handleProgress(false)
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    }

    render() {
        const Layout = this._buildLayout;

        if (
            this.state.countries === null
            || this.state.providers === null
            || this.state.agents === null
        ) {
            return <Layout />;
        }

        return <Layout>
            <Search
                icons={this.props.icons}
                api={this.props.api}
                agents={this.state.agents}
                onProgress={this._handleProgress}
                onBegin={(callback) => {
                    this.setState({
                        topups: null
                    }, callback);
                }}
                onFinish={(topups, callback) => {
                    this.setState({
                        topups: topups
                    }, callback);
                }}
            />
            {this.state.topups !== null && <React.Fragment>
                <Text
                    center
                    margin={{
                        top: 8
                    }}
                >
                    {this.state.topups.length === 0
                        ? `No se encontraron recargas`
                        : `Se encontraron ${this.state.topups.length} recargas`
                    }
                </Text>
                {this.state.topups.length > 0 && <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>País</TableCell>
                            <TableCell>Agente</TableCell>
                            <TableCell>Cuenta</TableCell>
                            <TableCell>Costo</TableCell>
                            <TableCell>Recibe</TableCell>
                            <TableCell>Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.topups.map((topup) => {
                            let {id, agent, account, product, charge, receive, currency, date} = topup;

                            const provider = this.state.providers.find(({id, products}) => {
                                return products.find(({id}) => {
                                    return id === product;
                                });
                            });

                            agent = this.state.agents.find(({id}) => {
                                return id === agent
                            });

                            return <TableRow
                                key={id}
                            >
                                <TableCell>
                                    <Container
                                        flow="row"
                                        align={{
                                            justifyContent: "flex-start",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Flag
                                            iso={provider.country}
                                            size="sm"
                                            border={0}
                                        />
                                        <Text
                                            margin={{
                                                left: 8
                                            }}
                                        >
                                            {this.state.countries.find(({iso}) => {
                                                return iso === provider.country;
                                            }).name}
                                        </Text>
                                    </Container>
                                </TableCell>
                                <TableCell>
                                    <Text>
                                        {account}
                                    </Text>
                                </TableCell>
                                <TableCell>
                                    <Text>
                                        {agent.name}
                                    </Text>
                                </TableCell>
                                <TableCell>
                                    <Text>
                                        {charge} USD
                                    </Text>
                                </TableCell>
                                <TableCell>
                                    <Text>
                                        {receive} {currency}
                                    </Text>
                                </TableCell>
                                <TableCell>
                                    <Text>
                                        {format(date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")}
                                    </Text>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>}
            </React.Fragment>}
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Recargas"
            progress={this.state.progress > 0}
            flex={{}}
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

class Search extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        agents: PropTypes.array,
        onProgress: PropTypes.func.isRequired,
        onBegin: PropTypes.func.isRequired, // (callback)
        onFinish: PropTypes.func.isRequired, // (topups, callback)
    };

    state = {
        from: null,
        to: null,
        agents: null,
    };

    componentWillMount() {
        const now = new Date();

        this.setState({
            from: startOfDay(now),
            to: endOfDay(now),
            agents: []
        }, () => {
            this._collectTopups(
                this.state.from,
                this.state.to,
                this.state.agents,
                this.props.onFinish
            );
        });
    }

    _collectTopups = (from, to, agents, resolve) => {
        this.props.onProgress(
            true,
            () => {
                this.props.api.reseller.collectTopupsAsReseller(
                    from / 1000,
                    to / 1000,
                    agents
                )
                    .then((topups) => {
                        resolve(
                            topups,
                            () => {
                                this.props.onProgress(
                                    false,
                                )
                            }
                        );
                    })
                    .catch(this.props.onError)
            }
        );
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state !== nextState
        );
    }

    render() {
        if (
            this.state.from === null
            || this.state.to === null
            || this.state.agents === null
        ) {
            return <React.Fragment />;
        }

        return <React.Fragment>
            <Container
                flow="row"
            >
                <DatePicker
                    margin={{
                        left: 4
                    }}
                    value={this.state.from}
                    placeholder="Desde"
                    onChange={(date) => {
                        this.setState({
                            from: startOfDay(date)
                        });
                    }}
                />
                <DatePicker
                    margin={{
                        left: 4
                    }}
                    value={this.state.to}
                    placeholder="Hasta"
                    onChange={(date) => {
                        this.setState({
                            to: endOfDay(date)
                        });
                    }}
                />
            </Container>
            <Select
                label="Agentes"
                margin={{
                    top: 8
                }}
                value={this.state.agents}
                multiple
                width={200}
                onChange={(value) => {
                    this.setState({
                        agents: value
                    });
                }}
            >
                {this.props.agents.map((agent) => {
                    const {id, name} = agent;

                    return <SelectItem
                        key={id}
                        value={id}
                    >
                        {name}
                    </SelectItem>
                })}
            </Select>
            <Button
                color="primary"
                margin={{
                    top: 8
                }}
                onClick={() => {
                    this.props.onBegin(
                        () => {
                            this._collectTopups(
                                this.state.from,
                                this.state.to,
                                this.state.agents,
                                this.props.onFinish
                            );
                        }
                    );
                }}
            >
                <this.props.icons.actions.search />
                <Text>Buscar</Text>
            </Button>
        </React.Fragment>
    }
}