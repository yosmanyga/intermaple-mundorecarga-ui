import React from "react";
import PropTypes from "prop-types";
import {startOfDay, endOfDay} from "@yosmy/dayjs";
import {Button, Container, DatePicker, Input, Tab, Tabs, Text} from "@yosmy/ui";
import ListTopups from "./ListTopups.inc";

class SearchTopups extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onSelectUser: PropTypes.func.isRequired, // (user)
        onError: PropTypes.func.isRequired,
    };

    state = {
        topups: null,
        contacts: null,
        userland: {
            phone: {
                users: null
            }
        },
        countries: null,
        providers: null,
        progress: 0,
    };

    render() {
        const Layout = this._buildLayout;

        return <Layout>
            <SearchBy
                icons={this.props.icons}
                api={this.props.api}
                onBegin={(callback) => {
                    this.setState({
                        topups: null,
                        contacts: null,
                        userland: {
                            phone: {
                                users: null
                            }
                        },
                        countries: null,
                        providers: null,
                    }, callback);
                }}
                onFinish={(topups) => {
                    this.setState({
                        topups: topups
                    });
                }}
                onProgress={this._handleProgress}
                onError={this.props.onError}
            />

            {this.state.topups !== null
                ? this.state.topups.length > 0
                    ? <ListTopups
                        layout={({children}) => {
                            return <Container
                                margin={{
                                    top: 1
                                }}
                            >
                                {children}
                            </Container>
                        }}
                        icons={this.props.icons}
                        api={this.props.api}
                        topups={this.state.topups}
                        client={true}
                        onProcessTopup={(topup) => {
                            this._handleProcessTopup(topup);
                        }}
                        onSelectUser={this.props.onSelectUser}
                        onProgress={this._handleProgress}
                    />
                    : <Text
                        center
                        margin={{
                            top: 1
                        }}
                    >
                        No se encontraron recargas.
                    </Text>
                : null
            }
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

    _handleProcessTopup(targetTopup) {
        const topups = this.state.topups.map((topup) => {
            if (topup.id !== targetTopup.id) {
                return topup;
            }

            return targetTopup;
        });

        this.setState({
            topups: topups
        });
    }

    _handleProgress = (progress, callback = null) => {
        this.setState((prevState) => {
            return {
                progress: prevState.progress + (progress === true ? 1 : -1)
            }
        }, callback);
    };
}

class SearchBy extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onBegin: PropTypes.func.isRequired, // (callback)
        onFinish: PropTypes.func.isRequired, // (topups)
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        tab: 0,
        topups: null,
        progress: 0
    };

    render() {
        return <Container
            flow="column"
            align={{
                justifyContent: "flex-start",
                alignItems: "center",
            }}
        >
            <Tabs
                value={this.state.tab}
                margin={{
                    top: 8
                }}
                onChange={this._handleChangeTab}
            >
                <Tab heading="Buscar por fecha" />
                <Tab heading="Buscar por teléfono" />
                <Tab heading="Buscar por Stripe" />
            </Tabs>
            <Container
                margin={{
                    top: 8
                }}
            >
                {this.state.tab === 0 && <SearchByDate
                    icons={this.props.icons}
                    onBegin={(from, to) => {
                        this._collectTopupsByDate(
                            from,
                            to,
                            (topups) => {
                                this.props.onFinish(topups);
                            }
                        );
                    }}
                    onSet={(from, to) => {
                        this.props.onBegin(
                            () => {
                                this._collectTopupsByDate(
                                    from,
                                    to,
                                    (topups) => {
                                        this.props.onFinish(topups);
                                    }
                                );
                            }
                        );
                    }}
                />}
                {this.state.tab === 1 && <SearchByPhone
                    icons={this.props.icons}
                    onSet={(phone) => {
                        this.props.onBegin(
                            () => {
                                this._collectTopupsByPhone(
                                    phone,
                                    (topups) => {
                                        this.props.onFinish(topups);
                                    }
                                );
                            }
                        );
                    }}
                />}
                {this.state.tab === 2 && <SearchByStripe
                    icons={this.props.icons}
                    onSet={(stripe) => {
                        this.props.onBegin(() => {
                            this._collectTopupsByStripe(
                                stripe,
                                (topups) => {
                                    this.props.onFinish(topups);
                                }
                            );
                        });
                    }}
                />}
            </Container>
        </Container>
    }

    _handleChangeTab = (value) => {
        this.setState({
            tab: value,
        }, () => {
            this.props.onBegin();
        });
    };

    _collectTopupsByDate = (from, to, resolve) => {
        this.setState({
            topups: null
        }, () => {
            this.props.onProgress(
                true,
                () => {
                    this.props.api.collectTopupsByDateAsOperator(
                        from / 1000,
                        to / 1000,
                    )
                        .then((topups) => {
                            this.setState({
                                topups: topups
                            }, () => {
                                this.props.onProgress(
                                    false,
                                    () => {
                                        resolve(this.state.topups);
                                    }
                                );
                            });
                        })
                        .catch(this.props.onError)
                }
            );
        });
    };

    _collectTopupsByPhone = (phone, resolve) => {
        this.setState({
            topups: null
        }, () => {
            this.props.onProgress(
                true,
                () => {
                    this.props.api.collectTopupsByPhoneAsOperator(
                        phone,
                    )
                        .then((topups) => {
                            this.setState({
                                topups: topups
                            }, () => {
                                this.props.onProgress(
                                    false,
                                    () => {
                                        resolve(this.state.topups);
                                    }
                                );
                            });
                        })
                        .catch(this.props.onError)
                }
            );
        });
    };

    _collectTopupsByStripe = (stripe, resolve) => {
        this.setState({
            topups: null
        }, () => {
            this.props.onProgress(
                true,
                () => {
                    this.props.api.collectTopupsByStripeAsOperator(
                        stripe,
                    )
                        .then((topups) => {
                            this.setState({
                                topups: topups
                            }, () => {
                                this.props.onProgress(
                                    false,
                                    () => {
                                        resolve(this.state.topups);
                                    }
                                );
                            });
                        })
                        .catch(this.props.onError)
                }
            );
        });
    };
}

class SearchByDate extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        onBegin: PropTypes.func.isRequired, // (from, to)
        onSet: PropTypes.func.isRequired, // (from, to)
    };

    state = {
        from: null,
        to: null
    };

    componentDidMount() {
        const now = new Date();

        this.setState({
            from: startOfDay(now),
            to: endOfDay(now),
        }, () => {
            this.props.onBegin(this.state.from, this.state.to);
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state !== nextState
        );
    }

    render() {
        return <Container
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
            <Button
                color="primary"
                margin={{
                    left: 4
                }}
                onClick={() => {
                    this.props.onSet(
                        this.state.from,
                        this.state.to
                    );
                }}
            >
                <this.props.icons.actions.search />
                <Text>Buscar</Text>
            </Button>
        </Container>
    }
}

class SearchByPhone extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        onSet: PropTypes.func.isRequired, // (phone)
    };

    state = {
        phone: null,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state !== nextState
        );
    }

    render() {
        return <Container
            flow="row"
        >
            <Input
                label="Teléfono"
                value={this.state.phone}
                focus
                onChange={(value) => {
                    this.setState({
                        phone: value
                    });
                }}
                onEnter={() => {
                    this.props.onSet(
                        this.state.phone
                    );
                }}
            />
            <Button
                color="primary"
                margin={{
                    left: 4
                }}
                onClick={() => {
                    this.props.onSet(
                        this.state.phone
                    );
                }}
            >
                <this.props.icons.actions.search />
                <Text>Buscar</Text>
            </Button>
        </Container>
    }
}

class SearchByStripe extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        onSet: PropTypes.func.isRequired, // (id)
    };

    state = {
        stripe: null,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state !== nextState
        );
    }

    render() {
        return <Container
            flow="row"
        >
            <Input
                label="Id de stripe"
                value={this.state.stripe}
                focus
                onChange={(value) => {
                    this.setState({
                        stripe: value
                    });
                }}
                onEnter={() => {
                    this.props.onSet(
                        this.state.stripe
                    );
                }}
            />
            <Button
                color="primary"
                margin={{
                    left: 4
                }}
                onClick={() => {
                    this.props.onSet(
                        this.state.stripe
                    );
                }}
            >
                <this.props.icons.actions.search />
                <Text>Buscar</Text>
            </Button>
        </Container>
    }
}

export default SearchTopups;