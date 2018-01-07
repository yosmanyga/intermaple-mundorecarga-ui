import React from "react";
import PropTypes from "prop-types";
import {Button, Container, Image, Platform, Select, SelectItem, Text, Theme} from "@yosmy/ui";
import {format, startOfMonth, startOfYear, subMonths, endOfMonth, addMonths, addYears, getTime} from "@yosmy/dayjs";
import InnerLayoutBlock from "../Common/InnerLayoutBlock";
import Subtitle from "../Common/Subtitle";
import LoginBlock from '../Common/LoginBlock';

class ManageOptions extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        onAuthenticated: PropTypes.func.isRequired, // ()
        onNavigateToHelp: PropTypes.func.isRequired, // ()
        onNavigateToPrivacyPolicy: PropTypes.func.isRequired, // ()
        onNavigateToAndroidApp: PropTypes.func.isRequired, // ()
        onNavigateToIosApp: PropTypes.func.isRequired, // ()
        onLogout: PropTypes.func.isRequired, // (),
        onBack: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired,
    };

    state = {
        progress: 0,
        page: "account" // "account", "reports", "payments"
    };

    componentWillMount = () => {
        Platform.back.add(this._handleBack);
    };

    componentWillUnmount() {
        Platform.back.remove(this._handleBack);
    }

    render() {
        const Layout = this._buildLayout;

        return <Layout
            flow="column"
            align={{
                justifyContent: "flex-start",
                alignItems: "center"
            }}
        >
            <InnerLayoutBlock
                photo={Platform.select({
                    web: require('../Common/city.jpg'),
                })}
            >
                {this.state.page === "account" && <ViewAccountBlock
                    theme={this.props.theme}
                    width={this.props.width}
                    api={this.props.api}
                    user={this.props.user}
                    icons={this.props.icons}
                    onAuthenticated={this.props.onAuthenticated}
                    onLogout={this.props.onLogout}
                    onNavigateToHelp={this.props.onNavigateToHelp}
                    onNavigateToPrivacyPolicy={this.props.onNavigateToPrivacyPolicy}
                    onNavigateToAndroidApp={this.props.onNavigateToAndroidApp}
                    onNavigateToIosApp={this.props.onNavigateToIosApp}
                    onNavigateToReferralReports={() => {
                        this.setState({
                            page: "reports"
                        });
                    }}
                    onNavigateToReferralPayments={() => {
                        this.setState({
                            page: "payments"
                        });
                    }}
                    onProgress={this._handleProgress}
                    onError={this.props.onError}
                />}
                {this.state.page === "reports" && <ReportsBlock
                    icons={this.props.icons}
                    api={this.props.api}
                    onBack={() => {
                        this.setState({
                            page: "account"
                        });
                    }}
                    onProgress={this._handleProgress}
                    onError={this.props.onError}
                />}
                {this.state.page === "payments" && <PaymentsBlock
                    icons={this.props.icons}
                    api={this.props.api}
                    onProgress={this._handleProgress}
                    onBack={() => {
                        this.setState({
                            page: "account"
                        });
                    }}
                />}
            </InnerLayoutBlock>
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        let title, left;

        switch (this.state.page) {
            case "account":
                title = "Opciones";

                break;
            case "reports":
                title = "Afiliado - Reportes";

                left = {
                    icon: <this.props.icons.actions.back />,
                    onClick: this._handleBack
                };

                break;
            case "payments":
                title = "Afiliado - Pagos";

                left = {
                    icon: <this.props.icons.actions.back />,
                    onClick: this._handleBack
                };

                break;
            default:
                throw this.state.page;
        }

        return <this.props.layout
            {...props}
            title={title}
            left={left}
            progress={this.state.progress > 0}
            align={{
                alignItems: "flex-start"
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

    _handleBack = () => {
        if (this.state.page === "account") {
            this.props.onBack();
        } else {
            this.setState({
                page: "account"
            });
        }

        return true;
    };
}

class ViewAccountBlock extends React.Component {
    static propTypes = {
        theme: PropTypes.object.isRequired,
        width: PropTypes.string.isRequired,
        icons: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onNavigateToAndroidApp: PropTypes.func.isRequired, // ()
        onNavigateToIosApp: PropTypes.func.isRequired, // ()
        onNavigateToHelp: PropTypes.func.isRequired, // ()
        onNavigateToPrivacyPolicy: PropTypes.func.isRequired, // ()
        onNavigateToReferralReports: PropTypes.func.isRequired, // ()
        onNavigateToReferralPayments: PropTypes.func.isRequired, // ()
        onAuthenticated: PropTypes.func.isRequired,
        onLogout: PropTypes.func.isRequired,
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        userland: {
            phone: {
                user: null
            }
        }
    };

    componentDidMount() {
        if (this.props.user.token !== null) {
            this.props.onProgress(
                true,
                () => {
                    this.props.api.userland.phone.pickUserAsClient()
                        .then((user) => {
                            this.setState({
                                userland: {
                                    phone: {
                                        user: user
                                    }
                                }
                            }, () => {
                                this.props.onProgress(false);
                            });
                        })
                        .catch(this.props.onError)
                }
            );
        }
    }

    render() {
        return <React.Fragment>
            {this.state.userland.phone.user && <Container
                background={this.props.theme.palette.primary.main}
                width={Platform.select({
                    mobile: "100%"
                })}
            >
                <this.props.icons.objects.user
                    style={{
                        color: "#fff",
                        fontSize: 108
                    }}
                />
                <Text
                    variant="subtitle1"
                    style={{
                        color: "#fff"
                    }}
                >
                    +{this.state.userland.phone.user.prefix}-{this.state.userland.phone.user.number}
                </Text>
            </Container>}
            {Platform.select({
                web: <Container
                    flow="column"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                    margin={{
                        top: 32
                    }}
                >
                    <Text
                        variant="body1"
                        style={Platform.dimensions.isXsDown(this.props.width)
                            ? {
                                textAlign: "center"
                            }
                            : undefined
                        }
                    >
                        MundoRecarga funciona mejor en una app!
                    </Text>
                    <Container
                        flow="row wrap"
                        align={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Image
                            source={require("./google.png")}
                            onClick={this.props.onNavigateToAndroidApp}
                            margin={24}
                        />
                        <Image
                            source={require("./apple.png")}
                            onClick={this.props.onNavigateToIosApp}
                            margin={24}
                        />
                    </Container>
                </Container>
            })}
            {this.props.user.token === null && <LoginBlock
                icons={this.props.icons}
                user={this.props.user}
                api={{
                    startAuthentication: this.props.api.userland.startAuthentication,
                    completeAuthentication: this.props.api.userland.completeAuthentication,
                }}
                onProgress={this.props.onProgress}
                onAuthenticated={this.props.onAuthenticated}
            />}
            {this.props.user.token !== null && <React.Fragment>
                <Subtitle
                    margin={{
                        top: 16
                    }}
                >
                    Afiliado
                </Subtitle>
                <ViewReferralBlock
                    width={this.props.width}
                    layout={({children}) => {
                        return <Container
                            flow="column"
                            align={{
                                justifyContent: "flex-start",
                                alignItems: "flex-start"
                            }}
                            padding={{
                                left: 8,
                                right: 8
                            }}
                            width="100%"
                        >
                            {children}
                        </Container>
                    }}
                    icons={this.props.icons}
                    api={this.props.api}
                    onNavigateToReferralReports={this.props.onNavigateToReferralReports}
                    onNavigateToReferralPayments={this.props.onNavigateToReferralPayments}
                    onProgress={this.props.onProgress}
                    onAuthenticated={this.props.onAuthenticated}
                    onError={this.props.onError}
                />
            </React.Fragment>}
            <Subtitle
                margin={{
                    top: 16
                }}
            >
                Enlaces
            </Subtitle>
            <Container
                padding={{
                    left: 16,
                    right: 16
                }}
                width="100%"
            >
                {this._renderLink(
                    "Ayuda",
                    this.props.onNavigateToHelp,
                    "primary",
                    true
                )}
                {this._renderLink(
                    "Política de privacidad",
                    this.props.onNavigateToPrivacyPolicy,
                    "primary",
                    true
                )}
                {this.state.userland.phone.user && this._renderLink(
                    "Cerrar sesión",
                    this.props.onLogout,
                    "secondary",
                    false
                )}
            </Container>
            <Container
                flow="column"
                align={{
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}
                background="#f5f5f5"
                padding={{
                    top: 32,
                    bottom: 32
                }}
                width={Platform.select({
                    mobile: "100%"
                })}
            >
                <Text>&copy; 2019 MundoRecarga</Text>
                <Text>Un servicio de Intermaple Inc.</Text>
            </Container>
        </React.Fragment>
    }

    _renderLink = (text, onClick, color, border) => {
        return <Container
            flow="row"
            padding={{
                top: 16,
                bottom: 16
            }}
            border={border ? {
                bottom: {
                    width: 1,
                    color: "#ccc",
                    style: "solid"
                }
            } : undefined}
            onClick={onClick}
            style={Platform.select({
                mobile: {
                    flex: 1
                }
            })}
        >
            <Text
                color={Platform.select({
                    web: color,
                    mobile: color !== "secondary" ? color : undefined
                })}
                style={Platform.select({
                    mobile: color === "secondary"
                        ? {
                            color: "red"
                        }
                        : undefined
                })}
            >
                {text}
            </Text>
        </Container>
    };
}

class ViewReferralBlock extends React.Component {
    static propTypes = {
        width: PropTypes.string.isRequired,
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onNavigateToReferralReports: PropTypes.func.isRequired, // ()
        onNavigateToReferralPayments: PropTypes.func.isRequired, // ()
        onProgress: PropTypes.func.isRequired,
        onAuthenticated: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    render() {
        return <ManageReferralBlock
            width={this.props.width}
            layout={this.props.layout}
            icons={this.props.icons}
            api={this.props.api}
            onNavigateToReferralReports={this.props.onNavigateToReferralReports}
            onNavigateToReferralPayments={this.props.onNavigateToReferralPayments}
            onProgress={this.props.onProgress}
            onError={this.props.onError}
        />
    }
}

class ManageReferralBlock extends React.Component {
    static propTypes = {
        width: PropTypes.string.isRequired,
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onNavigateToReferralReports: PropTypes.func.isRequired, // ()
        onNavigateToReferralPayments: PropTypes.func.isRequired, // ()
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        userland: {
            referral: {
                user: null,
            }
        },
    };

    componentDidMount() {
        this._pickUser();
    }

    _pickUser = () => {
        this.props.onProgress(
            true,
            () => {
                this.props.api.userland.referral.pickUser()
                    .then((user) => {
                        this.setState({
                            userland: {
                                ...this.state.userland,
                                referral: {
                                    ...this.state.userland.referral,
                                    user: user
                                }
                            }
                        }, () => {
                            this.props.onProgress(false);
                        });
                    })
                    .catch((response) => {
                        const {code} = response;

                        switch (code) {
                            case "userland.referral.nonexistent-user-exception":
                                this.setState({
                                    userland: {
                                        ...this.state.userland,
                                        referral: {
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
        if (
            this.state.userland.referral.user === null
        ) {
            return null;
        }

        if (this.state.userland.referral.user === false) {
            return <Container
                flow="row"
                align={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
                padding={16}
            >
                <Image
                    source={require("./social.png")}
                    width={150}
                    height={150}
                />
                <Container
                    flow="column"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                    margin={{
                        left: 16
                    }}
                    style={Platform.select({
                        mobile: {
                            flex: 1
                        }
                    })}
                >
                    <Text>
                        Invita a tus amigos en las redes sociales.
                    </Text>
                    <Text
                        margin={{
                            top: 16
                        }}
                    >
                        Gana comisiones de hasta $1 USD por cada recarga que hagan.
                    </Text>
                    <Button
                        color="primary"
                        margin={{
                            top: 16
                        }}
                        onClick={() => {
                            this.props.onProgress(
                                true,
                                () => {
                                    this.props.api.userland.referral.addUser()
                                        .then(() => {
                                            this.props.onProgress(
                                                false,
                                                () => {
                                                    this._pickUser();
                                                }
                                            );
                                        })
                                        .catch(this.props.onError)
                                }
                            );
                        }}
                    >
                        <this.props.icons.actions.join />
                        <Text>Participar</Text>
                    </Button>
                </Container>
            </Container>;
        }

        const url = `www.mundorecarga.com?ref=${this.state.userland.referral.user.code}`;

        return <this.props.layout>
            <Container
                flow="row"
                align={{
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
                padding={{
                    top: 16,
                    bottom: 16
                }}
                border={{
                    bottom: {
                        width: 1,
                        color: "#ccc",
                        style: "solid"
                    }
                }}
                width={Platform.select({
                    mobile: "100%"
                })}
            >
                <Text
                    variant="subtitle2"
                >
                    Saldo
                </Text>
                <Text
                    variant="subtitle2"
                    style={{
                        color: "green"
                    }}
                >
                    ${this.state.userland.referral.user.balance.toFixed(2)}
                </Text>
            </Container>

            <Text
                color="primary"
                variant="subtitle2"
                margin={{
                    top: 16,
                }}
                center
                style={{
                    color: "green"
                }}
            >
                Gana dinero con MundoRecarga
            </Text>

            <Text
                margin={{
                    top: 8,
                }}
            >
                Te pagamos por cada recarga que realicen tus invitados.
            </Text>

            <Container
                flow="row"
                align={{
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
                margin={{
                    top: 16
                }}
                width={Platform.select({
                    mobile: "100%"
                })}
            >
                <Text
                    variant="subtitle2"
                >
                    Tu código de invitación
                </Text>
                <Text
                    color="primary"
                    variant="subtitle2"
                >
                    {this.state.userland.referral.user.code}
                </Text>
            </Container>

            <Text
                margin={{
                    top: 8
                }}
            >
                Invita a tus amigos a MundoRecarga.
            </Text>

            <Text
                margin={{
                    top: 8
                }}
            >
                Pídeles que se registren con tu código de invitación.
            </Text>

            <Text
                variant="subtitle2"
                margin={{
                    top: 16
                }}
            >
                Tu página de invitación
            </Text>

            <Container
                flow={Platform.dimensions.isXsDown(this.props.width) ? "column" : "row"}
                align={Platform.dimensions.isXsDown(this.props.width)
                    ? {
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }
                    : {
                        justifyContent: "center",
                        alignItems: "center"
                    }
                }
                margin={{
                    top: 8
                }}
                width={Platform.select({
                    web: "auto"
                })}
            >
                <Text
                    variant="subtitle2"
                    color="primary"
                >
                    {url}
                </Text>
                <Button
                    color="primary"
                    size="small"
                    variant="outlined"
                    margin={{
                        top: Platform.dimensions.isXsDown(this.props.width) ? 8 : 0,
                        left: Platform.dimensions.isXsDown(this.props.width) ? 0: 8,
                    }}
                    onClick={() => {
                        Platform.clipboard.set(url);
                    }}
                >
                    <this.props.icons.actions.copy />
                    <Text
                        color="primary"
                    >
                        Copiar
                    </Text>
                </Button>
            </Container>

            <Text
                margin={{
                    top: 8,
                }}
                padding={{
                    bottom: 8
                }}
            >
                Copia y comparte tu página de invitación con tus amigos en las redes sociales.
            </Text>

            <Container
                margin={{
                    top: 8
                }}
                border={{
                    top: {
                        width: 1,
                        color: "#ccc",
                        style: "solid"
                    }
                }}
                width={Platform.select({
                    mobile: "100%"
                })}
            >
                {this._renderLink(
                    "Reportes",
                    this.props.onNavigateToReferralReports,
                )}
                {this._renderLink(
                    "Pagos",
                    this.props.onNavigateToReferralPayments,
                )}
            </Container>
        </this.props.layout>
    }

    _renderLink = (text, onClick) => {
        return <Container
            flow="row"
            padding={{
                top: 16,
                bottom: 16
            }}
            border={{
                bottom: {
                    width: 1,
                    color: "#ccc",
                    style: "solid"
                }
            }}
            onClick={onClick}
            style={Platform.select({
                mobile: {
                    flex: 1
                }
            })}
        >
            <Text>
                {text}
            </Text>
        </Container>
    };
}

class ReportsBlock extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState !== this.state;
    }

    state = {
        userland: {
            referral: {
                user: null,
            }
        },
        interval: "current_month",
        charts: {
            referrals: null,
            topups: null,
            profit: null
        }
    };

    componentDidMount() {
        this._pickUser();

        this._collectStats();
    }

    _pickUser = () => {
        this.props.onProgress(
            true,
            () => {
                this.props.api.userland.referral.pickUser()
                    .then((user) => {
                        this.setState({
                            userland: {
                                ...this.state.userland,
                                referral: {
                                    ...this.state.userland.referral,
                                    user: user
                                }
                            }
                        }, () => {
                            this.props.onProgress(false);
                        });
                    })
                    .catch((response) => {
                        const {code} = response;

                        switch (code) {
                            case "userland.referral.nonexistent-user-exception":
                                this.setState({
                                    userland: {
                                        ...this.state.userland,
                                        referral: {
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

    _collectStats = () => {
        let from, to, group;

        if (this.state.interval === "last_month") {
            // Beginning of last month
            from = subMonths(
                startOfMonth(Date.now()),
                1
            );
            from = getTime(from);

            // Beginning of current month
            to = addMonths(from, 1);
            to = getTime(to);

            from = from / 1000;
            to = to / 1000;

            group = "by-day";
        }

        if (this.state.interval === "current_month") {
            // Beginning of current month
            from = startOfMonth(
                Date.now()
            );
            from = getTime(from);

            to = endOfMonth(
                Date.now()
            );
            to = getTime(to);

            from = from / 1000;
            to = to / 1000;

            group = "by-day";
        }

        if (this.state.interval === "current_year") {
            from = startOfYear(
                Date.now()
            );
            from = getTime(from);

            // Beginning of next year
            to = addYears(
                from,
                1
            );
            to = getTime(to);

            from = from / 1000;
            to = to / 1000;

            group = "by-month";
        }

        this.props.onProgress(
            true,
            () => {
                import("@yosmy/ui")
                    .then((module) => {
                        const Chart = Platform.select({
                            web: ({children, ...props}) => {
                                const Chart = module.Chart;

                                return <Chart {...props}>
                                    {children}
                                </Chart>
                            },
                            mobile: ({children, ...props}) => {
                                const Chart = module.default.Chart;

                                return <Chart {...props}>
                                    {children}
                                </Chart>
                            }
                        });

                        this.props.api.userland.referral.computeReferrals(
                            from,
                            to,
                            group
                        )
                            .then((stats) => {
                                this.setState({
                                    charts: {
                                        ...this.state.charts,
                                        referrals: stats.length > 0
                                            ? <Chart {...{
                                                data: stats,
                                                xAxis:{
                                                    name: this.state.interval !== "current_year"
                                                        ? "Día" : "Mes",
                                                    dataKey: this.state.interval !== "current_year"
                                                        ? "day" : "month",
                                                },
                                                lines: [
                                                    {
                                                        name: "Usuarios",
                                                        dataKey: "referrals",
                                                        unit: "usuarios",
                                                    },
                                                ]
                                            }} />
                                            : false
                                    },
                                }, () => {
                                    this.props.onProgress(
                                        false
                                    )
                                });
                            })
                            .catch(this.props.onError)
                    })
                    .catch(this.props.onError)
            }
        );

        this.props.onProgress(
            true,
            () => {
                import("@yosmy/ui")
                    .then((module) => {
                        const Chart = Platform.select({
                            web: ({children, ...props}) => {
                                const Chart = module.Chart;

                                return <Chart {...props}>
                                    {children}
                                </Chart>
                            },
                            mobile: ({children, ...props}) => {
                                const Chart = module.default.Chart;

                                return <Chart {...props}>
                                    {children}
                                </Chart>
                            }
                        });

                        this.props.api.userland.referral.computeTopups(
                            from,
                            to,
                            group,
                        )
                            .then((stats) => {
                                this.setState({
                                    charts: {
                                        ...this.state.charts,
                                        topups: stats.length > 0
                                            ? <Chart {...{
                                                data: stats,
                                                xAxis:{
                                                    name: this.state.interval !== "current_year"
                                                        ? "Día" : "Mes",
                                                    dataKey: this.state.interval !== "current_year"
                                                        ? "day" : "month",
                                                },
                                                lines: [
                                                    {
                                                        name: "Recargas",
                                                        dataKey: "topups",
                                                        unit: "recargas",
                                                    },
                                                ]
                                            }} />
                                            : false,
                                        profit: stats.length > 0
                                            ? <Chart {...{
                                                data: stats,
                                                xAxis:{
                                                    name: this.state.interval !== "current_year"
                                                        ? "Día" : "Mes",
                                                    dataKey: this.state.interval !== "current_year"
                                                        ? "day" : "month",
                                                },
                                                lines: [
                                                    {
                                                        name: "Ganancias",
                                                        dataKey: "profit",
                                                        unit: "usd",
                                                    },
                                                ]
                                            }} />
                                            : false
                                    }
                                }, () => {
                                    this.props.onProgress(
                                        false
                                    )
                                });
                            })
                            .catch(this.props.onError)
                    })
                    .catch(this.props.onError)
            }
        );
    };

    render() {
        if (
            this.state.userland.referral.user === null
            || this.state.charts.referrals === null
            || this.state.charts.topups === null
            || this.state.charts.profit === null
        ) {
            return null;
        }

        return <React.Fragment>
            <Subtitle
                margin={{
                    top: 16
                }}
            >
                Usuarios, recargas y ganancias
            </Subtitle>

            <Container
                width={150}
                style={{
                    // TODO: Patch to set width for the Select component
                    alignItems: undefined
                }}
                margin={{
                    top: 8
                }}
                padding={{
                    left: 8,
                    right: 8
                }}
            >
                <Select
                    label="Intervalo"
                    value={this.state.interval}
                    onChange={(value) => {
                        this.setState({
                            interval: value,
                        }, () => {
                            this._collectStats();
                        });
                    }}
                    style={{
                        width: 100
                    }}
                >
                    <SelectItem
                        value="last_month"
                    >
                        Mes anterior
                    </SelectItem>
                    <SelectItem
                        value="current_month"
                    >
                        Mes actual
                    </SelectItem>
                    <SelectItem
                        value="current_year"
                    >
                        Año actual
                    </SelectItem>
                </Select>
            </Container>

            <Container
                flow="row wrap"
                align={{
                    justifyContent: "center",
                    alignItems: "flex-start"
                }}
                margin={{
                    top: 8
                }}
                padding={{
                    left: 8,
                    right: 8
                }}
            >
                {this.state.charts.referrals !== false && <Container width={200}>
                    <Text>Usuarios</Text>
                    {this.state.charts.referrals}
                </Container>}
                {this.state.charts.topups !== false && <Container width={200}>
                    <Text>Recargas</Text>
                    {this.state.charts.topups}
                </Container>}
                {this.state.charts.profit !== false && <Container width={200}>
                    <Text>Ganancias</Text>
                    {this.state.charts.profit}
                </Container>}
            </Container>

            <Button
                color="primary"
                center
                margin={{
                    top: 8
                }}
                onClick={this.props.onBack}
            >
                <this.props.icons.actions.back />
                <Text>Regresar</Text>
            </Button>
        </React.Fragment>;
    }
}

class PaymentsBlock extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onProgress: PropTypes.func.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    state = {
        userland: {
            referral: {
                user: null,
            }
        },
    };

    componentDidMount() {
        this._pickUser();
    }

    _pickUser = () => {
        this.props.onProgress(
            true,
            () => {
                this.props.api.userland.referral.pickUser()
                    .then((user) => {
                        this.setState({
                            userland: {
                                ...this.state.userland,
                                referral: {
                                    ...this.state.userland.referral,
                                    user: user
                                }
                            }
                        }, () => {
                            this.props.onProgress(false);
                        });
                    })
                    .catch((response) => {
                        const {code} = response;

                        switch (code) {
                            case "userland.referral.nonexistent-user-exception":
                                this.setState({
                                    userland: {
                                        ...this.state.userland,
                                        referral: {
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
        if (
            this.state.userland.referral.user === null
        ) {
            return null;
        }

        return <React.Fragment>
            <Subtitle
                margin={{
                    top: 16
                }}
            >
                Saldo actual
            </Subtitle>
            <Container
                flow="row"
                align={{
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
                padding={8}
                border={{
                    bottom: {
                        width: 1,
                        color: "#ccc",
                        style: "solid"
                    }
                }}
                width={Platform.select({
                    mobile: "100%"
                })}
            >
                <Text
                    variant="subtitle2"
                >
                    Saldo de afiliado
                </Text>
                <Text
                    variant="subtitle2"
                    style={{
                        color: "green"
                    }}
                >
                    ${this.state.userland.referral.user.balance.toFixed(2)}
                </Text>
            </Container>
            <Subtitle
                margin={{
                    top: 16
                }}
            >
                Últimos pagos
            </Subtitle>
            <Text
                padding={8}
            >
                Los pagos serán enviados por Paypal al final de cada mes.
            </Text>
            <Container
                flow="row"
                align={{
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}
                padding={8}
                border={{
                    bottom: {
                        width: 1,
                        color: "#ccc",
                        style: "solid"
                    }
                }}
                width={Platform.select({
                    mobile: "100%"
                })}
            >
                <Text>
                    Pago mínimo:
                </Text>
                <Text
                    color="primary"
                    margin={{
                        left: 8
                    }}
                >
                    $100.00
                </Text>
            </Container>
            <Container
                flow="row"
                align={{
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
                padding={8}
                margin={{
                    top: 8
                }}
                width={Platform.select({
                    mobile: "100%"
                })}
            >
                <Text
                    variant="subtitle2"
                >
                    Próximo pago
                </Text>
                <Text
                    variant="subtitle2"
                    style={{
                        color: "green"
                    }}
                >
                    {format(endOfMonth(Date.now()), "MMMM D, YYYY")}
                </Text>
            </Container>
            <Text
                margin={8}
                style={{
                    color: "red"
                }}
            >
                Tu saldo actual es insuficiente para poder realizar un cobro.
            </Text>
            <Button
                color="primary"
                center
                margin={{
                    top: 8
                }}
                onClick={this.props.onBack}
            >
                <this.props.icons.actions.back />
                <Text>Regresar</Text>
            </Button>
        </React.Fragment>
    }
}

export default Platform.dimensions.withWidth()(Theme.withTheme()(ManageOptions));