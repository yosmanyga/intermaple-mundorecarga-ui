import React from "react";
import PropTypes from "prop-types";
import b64toBlob from 'b64-to-blob';
import {format} from "@yosmy/dayjs";
import {Button, Card, Container, Flag, Platform, Text} from "@yosmy/ui";

class ListTopups extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        topups: PropTypes.array,
        client: PropTypes.bool.isRequired,
        onProcessTopup: PropTypes.func, // (topup)
        onSelectUser: PropTypes.func, // (user)
        onProgress: PropTypes.func.isRequired, // ()
    };

    state = {
        contacts: null,
        userland: {
            phone: {
                users: null
            }
        },
        countries: null,
        providers: null,
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                const contacts = this.props.topups.map(({contact}) => {
                    return contact;
                });

                Promise.all([
                    new Promise((resolve) => {
                        this.props.api.collectContactsAsOperator(
                            contacts,
                            null,
                        )
                            .then((contacts) => {
                                this.setState({
                                    contacts: contacts
                                }, () => {
                                    const users = this.state.contacts.map(({user}) => {
                                        return user;
                                    });

                                    this.props.api.userland.phone.collectUsers(
                                        users,
                                    )
                                        .then((users) => {
                                            this.setState({
                                                userland: {
                                                    ...this.state.userland,
                                                    phone: {
                                                        users: users
                                                    }
                                                }
                                            }, resolve);
                                        })
                                        .catch(this.props.onError);
                                });
                            })
                            .catch(this.props.onError)
                    }),
                    new Promise((resolve) => {
                        this.props.api.collectCountries(
                            null,
                        )
                            .then((countries) => {
                                this.setState({
                                    countries: countries
                                }, resolve);
                            })
                            .catch(this.props.onError)
                    }),
                    new Promise((resolve) => {
                        this.props.api.collectProviders(
                            null,
                            null,
                        )
                            .then((providers) => {
                                this.setState({
                                    providers: providers
                                }, resolve);
                            })
                            .catch(this.props.onError)
                    })
                ])
                    .then(() => {
                        this.props.onProgress(false);
                    })
            }
        );
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            nextProps.topups !== this.props.topups
            || nextState !== this.state
        );
    }

    render() {
        if (
            this.state.contacts === null
            || this.state.userland.phone.users === null
            || this.state.countries === null
            || this.state.providers === null
        ) {
            return <this.props.layout />;
        }

        return <this.props.layout>
            {this.props.topups.map((topup) => {
                const {id} = topup;

                return <Topup
                    key={id}
                    width={this.props.width}
                    icons={this.props.icons}
                    api={this.props.api}
                    topup={topup}
                    contacts={this.state.contacts}
                    userland={{
                        phone: {
                            users: this.state.userland.phone.users
                        }
                    }}
                    countries={this.state.countries}
                    providers={this.state.providers}
                    client={this.props.client}
                    onProcessed={this.props.onProcessTopup}
                    onSelectUser={this.props.onSelectUser}
                    onProgress={this.props.onProgress}
                />

            })}
        </this.props.layout>
    }
}

class Topup extends React.Component {
    static propTypes = {
        width: PropTypes.string.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        topup: PropTypes.object.isRequired,
        countries: PropTypes.array,
        providers: PropTypes.array,
        contacts: PropTypes.array,
        userland: PropTypes.shape({
            phone: PropTypes.shape({
                users: PropTypes.array
            })
        }),
        client: PropTypes.bool.isRequired,
        onProcessed: PropTypes.func.isRequired, // (topup)
        onSelectUser: PropTypes.func, // (user)
        onProgress: PropTypes.func.isRequired,
    };

    state = {
        expand: false
    };

    render() {
        let {id, contact, product, amount, steps, attempts, stripe, charge, fee, ding, profit, date} = this.props.topup;

        contact = this.props.contacts.find(({id}) => {
            return id === contact;
        });

        const user = this.props.userland.phone.users.find(({id}) => {
            return id === contact.user;
        });

        const provider = this.props.providers.find(({id, products}) => {
            return products.find(({id}) => {
                return id === product;
            });
        });

        let nextAttempt;
        switch (attempts) {
            case 1:
                nextAttempt = "2da";

                break;
            case 2:
                nextAttempt = "3ra";

                break;
            case 3:
                nextAttempt = "4ta";

                break;
            case 4:
                nextAttempt = "5ta";

                break;
            case 5:
                nextAttempt = "6ta";

                break;
            case 6:
                nextAttempt = "7ma";

                break;
            case 7:
                nextAttempt = "8va";

                break;
            case 8:
                nextAttempt = "9na";

                break;
            default:
                nextAttempt = "próxima";

                break;
        }

        const lastStep = steps[steps.length - 1];

        const actions = [
            lastStep === "transfer.exception" && <Button
                variant="outlined"
                tooltip={"Reintentar recarga por " + nextAttempt + " vez"}
                margin={{
                    left: 8
                }}
                onClick={() => {
                    this.props.onProgress(
                        true,
                        () => {
                            this.props.api.trySendingTopupAgain(
                                this.props.topup.id,
                            )
                                .then((topup) => {
                                    this.props.onProgress(
                                        false,
                                        () => {
                                            this.props.onProcessed(topup);
                                        }
                                    )
                                })
                                .catch(this.props.onError)
                        }
                    )
                }}
            >
                <this.props.icons.actions.retry />
                <Text>({attempts} int)</Text>
            </Button>,
            lastStep === "payment" && <Button
                variant="outlined"
                tooltip="Enviar recarga"
                margin={{
                    left: 8
                }}
                onClick={() => {
                    this.props.onProgress(
                        true,
                        () => {
                            this.props.api.sendDelayedTopup(
                                this.props.topup.id,
                            )
                                .then((topup) => {
                                    this.props.onProgress(
                                        false,
                                        () => {
                                            this.props.onProcessed(topup);
                                        }
                                    )
                                })
                                .catch(this.props.onError)
                        }
                    )
                }}
            >
                <this.props.icons.actions.topup />
                <Text>Enviar recarga</Text>
            </Button>,
            (lastStep === "payment" || lastStep === "transfer.exception") && <Button
                variant="outlined"
                tooltip="Devolver pago"
                margin={{
                    left: 8
                }}
                onClick={() => {
                    this.props.onProgress(
                        true,
                        () => {
                            this.props.api.refundTopup(
                                this.props.topup.id,
                            )
                                .then((topup) => {
                                    this.props.onProgress(
                                        false,
                                        () => {
                                            this.props.onProcessed(topup);
                                        }
                                    )
                                })
                                .catch(this.props.onError)
                        }
                    )
                }}
            >
                <this.props.icons.actions.refund />
                <Text>Devolver pago</Text>
            </Button>,
            lastStep === "transfer.success" && <Button
                variant="outlined"
                tooltip="Generar recibo"
                onClick={() => {
                this.props.onProgress(
                    true,
                    () => {
                        this.props.api.topup.generateReceipt(
                            this.props.topup.id,
                        )
                            .then((data) => {
                                this.props.onProgress(
                                    false,
                                    () => {
                                        import("file-saver")
                                            .then((FileSaver) => {
                                                FileSaver.saveAs(
                                                    b64toBlob(data, "application/pdf"),
                                                    "receipt.pdf"
                                                );
                                            })
                                            .catch(this.props.onError)
                                    }
                                );
                            })
                            .catch(this.props.onError)
                    }
                );
            }}
                margin={{
                    left: 8
                }}
            >
                <this.props.icons.actions.print />
                <Text>Generar recibo</Text>
            </Button>
        ]
            .filter(x => x);

        return <Card
            key={id}
            header={{
                avatar: <StepIcon
                    icons={this.props.icons}
                    steps={steps}
                />,
                title: <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                >
                    {this.props.client && <React.Fragment>
                        <Text>{amount} USD</Text>
                        <Text margin={{left: 8}}>De</Text>
                        <Flag
                            iso={user.country}
                            size="sm"
                            border={0}
                            margin={{left: 8}}
                        />
                        {Platform.dimensions.isMdUp(this.props.width) && <Text
                            margin={{left: 8}}
                        >
                            +{user.prefix}-{user.number}
                        </Text>}
                        <Text
                            margin={{left: 8}}
                        >
                            para
                        </Text>
                    </React.Fragment>}

                    <Flag
                        iso={provider.country}
                        size="sm"
                        border={0}
                        margin={{left: this.props.client ? 8 : 0}}
                    />
                    {Platform.dimensions.isMdUp(this.props.width) && <Text
                        margin={{left: 8}}
                    >
                        {contact.type === "phone"
                            ? `+${contact.prefix}-${contact.account}`
                            : contact.account
                        }
                    </Text>}
                </Container>,
                subtitle: <Text
                    margin={{
                        top: 4
                    }}
                >
                    {format(date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")}
                </Text>,
                action: <Button
                    onClick={this._handleExpandCollapse}
                >
                    {this.state.expand === false ? <this.props.icons.actions.expand /> : <this.props.icons.actions.collapse />}
                </Button>
            }}
            content={this.state.expand && <Container
                flow="column"
                align={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                }}
                margin={{
                    top: 8
                }}
            >
                <Container
                    flow="column"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                >
                    {this.props.client && this._renderData(
                        0,
                        "De",
                        <React.Fragment>
                            <Flag
                                iso={user.country}
                                size="sm"
                                border={0}
                            />
                            <Text
                                margin={{left: 8}}
                            >
                                +{user.prefix}-{user.number} ({this._resolveCountry(user.country)})
                            </Text>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    this.props.onSelectUser(user)
                                }}
                            >
                                <this.props.icons.actions.details />
                            </Button>
                        </React.Fragment>
                    )}

                    {this.props.client && this._renderData(
                        2,
                        "Para",
                        <React.Fragment>
                            <Flag
                                iso={provider.country}
                                size="sm"
                                border={0}
                            />
                            <Text
                                margin={{left: 8}}
                            >
                                {contact.type === "phone"
                                    ? `+${contact.prefix}-${contact.account}`
                                    : contact.account
                                } ({this._resolveCountry(provider.country)})
                            </Text>
                        </React.Fragment>
                    )}

                    {this._renderData(
                        0,
                        "Proveedor",
                        <Text>
                            {provider.name}
                        </Text>,
                    )}
                    {this._renderData(
                        2,
                        "Cantidad",
                        <React.Fragment>
                            <Text>
                                {amount} USD
                            </Text>
                        </React.Fragment>,
                    )}
                </Container>

                <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                    margin={{
                        top: 16
                    }}
                >
                    <this.props.icons.objects.payment />
                    <Text margin={{left: 8}}>Pago</Text>
                </Container>

                <Container
                    flow="column"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                    margin={{
                        top: 8
                    }}
                >
                    {this._renderData(
                        0,
                        "Id de Stripe",
                        <Text>
                            {stripe}
                        </Text>
                    )}

                    {this._renderData(
                        0,
                        "Cobro",
                        <Text>
                            {charge} USD ({fee} USD de cargo)
                        </Text>
                    )}
                </Container>

                <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                    margin={{
                        top: 16
                    }}
                >
                    <this.props.icons.objects.topup />
                    <Text margin={{left: 8}}>Recarga</Text>
                </Container>

                <Container
                    flow="column"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                    margin={{
                        top: 8
                    }}
                >
                    {lastStep === "payment" && <Text>Pendiente a revision...</Text>}

                    {steps.includes("transfer.exception") && <Text>Error en la recarga ({attempts} intentos)</Text>}

                    {lastStep === "transfer.success" && <React.Fragment>
                        {this._renderData(
                            0,
                            "Id de ding",
                            <Text>
                                {ding}
                            </Text>
                        )}

                        {this._renderData(
                            0,
                            "Ganancia",
                            <Text>
                                {profit} USD
                            </Text>
                        )}
                    </React.Fragment>}
                </Container>

                <Container
                    flow="column"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                    margin={{
                        top: 8
                    }}
                >
                    {lastStep === "refund" && <Text
                        margin={{
                            top: 8
                        }}
                    >
                        Pago devuelto
                    </Text>}
                </Container>
            </Container>}
            actions={this.state.expand && <React.Fragment>
                {actions.map((action, i) => {
                    let margin = {};

                    if (i !== 0) {
                        margin = {
                            left: 8
                        };
                    }

                    return <action.type key={i} {...action.props} margin={margin} />
                })
                }
            </React.Fragment>}
            margin={{
                top: 8
            }}
        />
    }

    _renderData = (top, key, value) => {
        return <Container
            flow="row"
            align={{
                justifyContent: "flex-start",
                alignItems: "center"
            }}
            margin={{
                top: top
            }}
        >
            {Platform.dimensions.isMdUp(this.props.width) && <Container
                flow="column"
                align={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                }}
                width="20%"
            >
                <Text
                    variant="body1"
                >
                    {key}:
                </Text>
            </Container>}
            <Container
                flow="row wrap"
                align={{
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}
            >
                {value}
            </Container>
        </Container>
    };

    _resolveCountry = (country) => {
        return this.props.countries.find(({iso}) => {
            return iso === country;
        }).name;
    };

    _handleExpandCollapse = () => {
        this.setState({
            expand: !this.state.expand
        });
    }
}

class StepIcon extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        steps: PropTypes.array.isRequired,
    };

    render() {
        let icon;

        const lastStep = this.props.steps[this.props.steps.length - 1];

        if (lastStep === "payment") {
            icon = <this.props.icons.topup.steps.delay />;
        } else if (lastStep === "transfer.success") {
            icon = <this.props.icons.topup.steps.transfer.success />;
        } else if (lastStep === "transfer.exception") {
            icon = <this.props.icons.topup.steps.transfer.exception />;
        } else if (lastStep === "refund") {
            icon = <this.props.icons.topup.steps.refund />;
        } else {
            throw this.props.topup;
        }

        return icon;
    }
}

export default Platform.dimensions.withWidth()(ListTopups);