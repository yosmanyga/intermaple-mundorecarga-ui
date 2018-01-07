import React from "react";
import PropTypes from "prop-types";
import {format} from "@yosmy/dayjs";
import {Button, Card, Container, Flag, Text, List, ListItem} from "@yosmy/ui";
import ListTopups from "./ListTopups.inc";
import Error from "./Stripe/Card/Error";

export default class ViewUser extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onBack: PropTypes.func.isRequired,
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    render() {
        return <this.props.layout
            align={{
                justifyContent: "flex-start",
                alignItems: "flex-start"
            }}
        >
            <Container
                flow="row wrap"
                align={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                }}
            >
                <Container
                    flow="column"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                    width="50%"
                >
                    <ViewRegistration
                        layout={(props) => {
                            return <Card
                                {...props}
                            />
                        }}
                        api={this.props.api}
                        id={this.props.id}
                        onProgress={this.props.onProgress}
                    />
                    <ViewPhone
                        layout={(props) => {
                            return <Card
                                margin={{
                                    top: 8
                                }}
                                {...props}
                            />
                        }}
                        api={this.props.api}
                        id={this.props.id}
                        onProgress={this.props.onProgress}
                    />
                    <ViewContacts
                        layout={(props) => {
                            return <Card
                                margin={{
                                    top: 8
                                }}
                                {...props}
                            />
                        }}
                        api={this.props.api}
                        id={this.props.id}
                        onProgress={this.props.onProgress}
                    />
                </Container>
                <Container
                    flow="column"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                    width="50%"
                    padding={{
                        left: 8,
                        right: 8
                    }}
                >
                    <ViewBlacklist
                        layout={(props) => {
                            return <Card
                                {...props}
                            />
                        }}
                        icons={this.props.icons}
                        api={this.props.api}
                        id={this.props.id}
                        onProgress={this.props.onProgress}
                    />
                    <ViewStripe
                        layout={(props) => {
                            return <Card
                                margin={{
                                    top: 8
                                }}
                                {...props}
                            />
                        }}
                        api={this.props.api}
                        id={this.props.id}
                        onProgress={this.props.onProgress}
                    />
                    <ViewCards
                        layout={(props) => {
                            return <Card
                                margin={{
                                    top: 8,
                                }}
                                {...props}
                            />
                        }}
                        api={this.props.api}
                        id={this.props.id}
                        onProgress={this.props.onProgress}
                    />
                    <ViewStripeCardErrors
                        layout={(props) => {
                            return <Card
                                margin={{
                                    top: 8,
                                }}
                                {...props}
                            />
                        }}
                        icons={this.props.icons}
                        api={this.props.api}
                        id={this.props.id}
                        onProgress={this.props.onProgress}
                    />
                    <ViewTopups
                        layout={(props) => {
                            return <Card
                                margin={{
                                    top: 8,
                                }}
                                {...props}
                            />
                        }}
                        icons={this.props.icons}
                        api={this.props.api}
                        id={this.props.id}
                        onProgress={this.props.onProgress}
                    />
                </Container>
            </Container>
        </this.props.layout>
    }
}

class ViewRegistration extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        api: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onProgress: PropTypes.func.isRequired,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    state = {
        userland: {
            registration: {
                user: null
            },
        }
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.userland.registration.pickUserAsOperator(
                    this.props.id,
                )
                    .then((user) => {
                        this.setState({
                            userland: {
                                ...this.state.userland,
                                registration: {
                                    user: user
                                }
                            }
                        }, () => {
                            this.props.onProgress(false)
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    }

    render() {
        const Layout = ({content}) => {
            return <this.props.layout
                header={{
                    title: "Registro"
                }}
                content={content}
            />
        };

        if (
            this.state.userland.registration.user === null
        ) {
            return <Layout content={<React.Fragment />} />;
        }

        return <Layout
            content={<React.Fragment>
                <Text>
                    Fecha de registro: {format(this.state.userland.registration.user.date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")}
                </Text>
            </React.Fragment>}
        />
    }
}

class ViewPhone extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        api: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onProgress: PropTypes.func.isRequired,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    state = {
        userland: {
            phone: {
                user: null
            },
            country: {
                user: null
            },
        }
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.userland.phone.pickUserAsOperator(
                    this.props.id,
                )
                    .then((user) => {
                        this.setState({
                            userland: {
                                ...this.state.userland,
                                phone: {
                                    user: user
                                }
                            }
                        }, () => {
                            this.props.api.collectCountries(
                                [this.state.userland.phone.user.country],
                            )
                                .then((countries) => {
                                    this.setState({
                                        userland: {
                                            ...this.state.userland,
                                            country: {
                                                user: {
                                                    name: countries[0].name
                                                }
                                            }
                                        }
                                    }, () => {
                                        this.props.onProgress(false)
                                    });
                                })
                                .catch(this.props.onError)
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    }

    render() {
        const Layout = ({content}) => {
            return <this.props.layout
                header={{
                    title: "Teléfono"
                }}
                content={content}
            />
        };

        if (
            this.state.userland.phone.user === null
            || this.state.userland.country.user === null
        ) {
            return <Layout content={<React.Fragment />} />;
        }

        return <Layout
            content={<Container
                flow="row"
                align={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <Flag
                    iso={this.state.userland.phone.user.country}
                    size="sm"
                    border={0}
                />
                <Text margin={{left: 8}}>
                    {this.state.userland.country.user.name}
                </Text>
                <Text margin={{left: 8}}>
                    +{this.state.userland.phone.user.prefix}-{this.state.userland.phone.user.number}
                </Text>
            </Container>}
        />;
    }
}

class ViewContacts extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        api: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onProgress: PropTypes.func.isRequired,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    state = {
        contacts: null
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.collectContactsAsOperator(
                    null,
                    [this.props.id],
                )
                    .then((contacts) => {
                        this.setState({
                            contacts: contacts
                        }, () => {
                            this.props.onProgress(false)
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    }

    render() {
        const Layout = ({content}) => {
            return <this.props.layout
                header={{
                    title: "Contactos"
                }}
                content={content}
            />
        };

        if (
            this.state.contacts === null
        ) {
            return <Layout content={<React.Fragment />} />;
        }

        return <Layout
            content={<List>
                {this.state.contacts.map((contact) => {
                    const {id, prefix, country, account, type, name} = contact;

                    return <ListItem
                        key={id}
                        icon={<Flag
                            iso={country}
                            size="sm"
                            border={0}
                        />}
                        text={type === "phone" ? `+${prefix}-${account}` : account}
                        note={name !== "" ? name : "(Sin nombre)"}
                    />
                })}
            </List>}
        />
    }
}

class ViewBlacklist extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onProgress: PropTypes.func.isRequired,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    state = {
        userland: {
            blacklist: {
                user: null
            },
        }
    };

    componentDidMount() {
        this._collectData();
    }

    _collectData = () => {
        this.props.onProgress(
            true,
            () => {
                this.props.api.userland.blacklist.pickUserAsOperator(
                    this.props.id,
                )
                    .then((user) => {
                        this.setState({
                            userland: {
                                ...this.state.userland,
                                blacklist: {
                                    user: user
                                }
                            }
                        }, () => {
                            this.props.onProgress(false)
                        });
                    })
                    .catch((response) => {
                        const {code} = response;

                        switch (code) {
                            case "userland.blacklist.nonexistent-user-exception":
                                this.setState({
                                    userland: {
                                        blacklist: {
                                            user: false
                                        }
                                    }
                                }, () => {
                                    this.props.onProgress(false);
                                });

                                break;
                            default:
                                this.props.onError(response);
                        }
                    });
            }
        );
    };

    render() {
        const Layout = ({content}) => {
            return <this.props.layout
                header={{
                    title: "Lista negra",
                }}
                content={content}
                actions={<React.Fragment>
                    {this.state.userland.blacklist.user === false && <Button
                        variant="outlined"
                        tooltip="Bloquear usuario"
                        onClick={() => {
                            this.props.onProgress(
                                true,
                                () => {
                                    this.props.api.userland.blacklist.banUser(
                                        this.props.id
                                    )
                                        .then(() => {
                                            this.props.onProgress(
                                                false,
                                                this._collectData()
                                            )
                                        })
                                        .catch(this.props.onError)
                                }
                            );
                        }}
                    >
                        <this.props.icons.actions.block />
                        <Text>Bloquear usuario</Text>
                    </Button>}
                </React.Fragment>}
            />
        };

        if (
            this.state.userland.blacklist.user === null
        ) {
            return <Layout content={<React.Fragment />} />;
        }

        return <Layout
            content={<Container
                flow="row"
                align={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                {this.state.userland.blacklist.user === false
                    ? "El usuario no está en la lista negra"
                    : "El usuario está en la lista negra"
                }
            </Container>}
        />;
    }
}

class ViewStripe extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        api: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onProgress: PropTypes.func.isRequired,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    state = {
        userland: {
            stripe: {
                user: null
            },
        }
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.userland.stripe.pickUserAsOperator(
                    this.props.id,
                )
                    .then((user) => {
                        this.setState({
                            userland: {
                                ...this.state.userland,
                                stripe: {
                                    user: user
                                }
                            }
                        }, () => {
                            this.props.onProgress(false)
                        });
                    })
                    .catch((response) => {
                        const {code} = response;

                        switch (code) {
                            case "userland.stripe.nonexistent-user-exception":
                                this.props.onProgress(
                                    false,
                                    () => {
                                        this.setState({
                                            userland: {
                                                ...this.state.userland,
                                                stripe: {
                                                    user: false
                                                }
                                            }
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
    }

    render() {
        const Layout = ({content}) => {
            return <this.props.layout
                header={{
                    title: "Stripe"
                }}
                content={content}
            />
        };

        if (
            this.state.userland.stripe.user === null
        ) {
            return <Layout content={<React.Fragment />} />;
        }

        return <Layout
            content={<React.Fragment>
                <Text>
                    {this.state.userland.stripe.user !== false
                        ? `Customer de Stripe: ${this.state.userland.stripe.user.customer}`
                        : "Aún no tiene customer en Stripe"
                    }
                </Text>
            </React.Fragment>}
        />
    }
}

class ViewCards extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        api: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onProgress: PropTypes.func.isRequired,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    state = {
        cards: null
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.userland.stripe.collectCardsAsOperator(
                    this.props.id,
                )
                    .then((cards) => {
                        this.setState({
                            cards: cards
                        }, () => {
                            this.props.onProgress(false)
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    }

    render() {
        const Layout = ({content}) => {
            return <this.props.layout
                header={{
                    title: "Tarjetas actuales"
                }}
                content={content}
            />
        };

        if (
            this.state.cards === null
        ) {
            return <Layout content={<React.Fragment />} />;
        }

        return <Layout
            content={this.state.cards.length > 0 ? <List>
                {this.state.cards.map(({id, number, name}) => {
                    return <ListItem
                        key={id}
                        text={number}
                        note={name}
                    />
                })}
            </List> : <Text>Este usuario no tiene tarjetas actualmente</Text>}
        />
    }
}

class ViewStripeCardErrors extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onProgress: PropTypes.func.isRequired,
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    state = {
        errors: null
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.userland.stripe.card.collectErrors(
                    this.props.id,
                    null,
                    null
                )
                    .then((errors) => {
                        this.setState({
                            errors: errors
                        }, () => {
                            this.props.onProgress(false)
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    }

    render() {
        const Layout = ({children}) => {
            return <this.props.layout
                header={{
                    title: "Errores al entrar tarjetas"
                }}
                content={children}
            />
        };

        if (
            this.state.errors === null
        ) {
            return <Layout />;
        }

        if (this.state.errors.length === 0) {
            return <Layout>
                <Text>
                    No se encontraron errores.
                </Text>
            </Layout>;
        }

        return <Layout>
            <Text>Se encontraron {this.state.errors.length} errores</Text>
            {this.state.errors.map((error) => {
                const {id} = error;

                return <Error
                    key={id}
                    data={error}
                    icons={this.props.icons}
                />
            })}
        </Layout>
    }
}

class ViewTopups extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onProgress: PropTypes.func.isRequired,
    };

    state = {
        topups: null
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.collectContactsAsOperator(
                    null,
                    [this.props.id],
                )
                    .then((contacts) => {
                        const ids = contacts.map(({id}) => {
                            return id;
                        });

                        this.props.api.collectTopupsByContactsAsOperator(
                            ids,
                        )
                            .then((topups) => {
                                this.setState({
                                    topups: topups
                                }, () => {
                                    this.props.onProgress(false);
                                });
                            })
                            .catch(this.props.onError)
                    })
                    .catch(this.props.onError);
            }
        );
    }

    render() {
        const Layout = ({content}) => {
            return <this.props.layout
                header={{
                    title: "Recargas"
                }}
                content={content}
            />
        };

        if (
            this.state.topups === null
        ) {
            return <Layout content={<React.Fragment />} />;
        }

        return <Layout
            content={<ListTopups
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
                client={false}
                onProcessTopup={(topup) => {
                    this._handleProcessTopup(topup);
                }}
                onProgress={this.props.onProgress}
            />}
        />
    }

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
}

