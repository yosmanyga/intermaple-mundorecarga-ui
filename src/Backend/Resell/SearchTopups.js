import React from "react";
import PropTypes from "prop-types";
import {startOfDay, endOfDay, format} from "@yosmy/dayjs";
import {
    Button, Container, DatePicker, Text,
    Table, TableBody, TableCell, TableHead, TableRow, SelectItem, Select
} from "@yosmy/ui";

class SearchTopups extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        agents: null,
        users: null,
        topups: null,
        progress: 0
    };

    componentDidMount() {
        this._handleProgress(
            true,
            () => {
                Promise.all([
                    this.props.api.reseller.collectAgentsAsAdmin(),
                    this.props.api.reseller.collectUsers(),
                ])
                    .then((values) => {
                        this.setState({
                            agents: values[0],
                            users: values[1],
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
            this.state.agents === null
            || this.state.users === null
        ) {
            return <Layout />;
        }

        return <Layout>
            <Search
                layout={({children}) => {
                    return <Container
                        flow="column"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                    >
                        {children}
                    </Container>
                }}
                icons={this.props.icons}
                api={this.props.api}
                agents={this.state.agents}
                users={this.state.users}
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
                            <TableCell>Revendedor</TableCell>
                            <TableCell>Cuenta</TableCell>
                            <TableCell>Costo</TableCell>
                            <TableCell>Recibe</TableCell>
                            <TableCell>Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.topups.map((topup) => {
                            let {id, agent, account, charge, receive, currency, date} = topup;

                            agent = this.state.agents.find(({id}) => {
                                return id === agent
                            });

                            const user = this.state.users.find(({id}) => {
                                return id === agent.user
                            });

                            return <TableRow
                                key={id}
                            >
                                <TableCell>
                                    <Text>
                                        {user.name}
                                    </Text>
                                </TableCell>
                                <TableCell>
                                    <Text>
                                        {account}
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
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        agents: PropTypes.array,
        users: PropTypes.array,
        onProgress: PropTypes.func.isRequired,
        onBegin: PropTypes.func.isRequired, // (callback)
        onFinish: PropTypes.func.isRequired, // (topups, callback)
    };

    state = {
        from: null,
        to: null,
        user: null
    };

    componentWillMount() {
        const now = new Date();

        this.setState({
            from: startOfDay(now),
            to: endOfDay(now),
        }, () => {
            this._collectTopups(
                this.state.from,
                this.state.to,
                this.state.user,
                this.props.onFinish
            );
        });
    }

    _collectTopups = (from, to, user, resolve) => {
        this.props.onProgress(
            true,
            () => {
                const agents = this.props.agents.filter((agent) => {
                    return agent.user === user;
                });

                this.props.api.reseller.collectTopupsAsAdmin(
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
        ) {
            return <this.props.layout />;
        }

        return <this.props.layout>
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
                label="Revendedores"
                margin={{
                    top: 8
                }}
                value={this.state.user}
                width={200}
                onChange={(value) => {
                    this.setState({
                        user: value
                    });
                }}
            >
                {this.props.users.map((user) => {
                    const {id, name} = user;

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
                                this.state.users,
                                this.props.onFinish
                            );
                        }
                    );
                }}
            >
                <this.props.icons.actions.search />
                <Text>Buscar</Text>
            </Button>
        </this.props.layout>
    }
}

export default SearchTopups;