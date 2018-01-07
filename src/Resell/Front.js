import React from "react";
import PropTypes from "prop-types";
import {resolve} from "@yosmy/resolution";
import {Error} from "@yosmy/ui";
import ListCountries from "./ListCountries";
import SendTopupToUnknown from "./SendTopupToUnknown";
import ViewMyAccount from "./ViewMyAccount";
import SearchTopups from "./SearchTopups";
import ShowLogin from "./ShowLogin";

export default class Front extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        blankLayout: PropTypes.func.isRequired,
        frontendLayout: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        api: PropTypes.shape({
            base: PropTypes.string.isRequired,
            calls: PropTypes.object.isRequired,
        }),
        navigation: PropTypes.shape({
            location: PropTypes.string.isRequired,
            payload: PropTypes.object,
            onNavigate: PropTypes.func.isRequired, // (location, callback)
        }).isRequired,
        onAuthenticated: PropTypes.func.isRequired,
        onLogout: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired, // ({code})
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.user !== nextProps.user
            || this.props.navigation.location !== nextProps.navigation.location
            || this.state !== nextState
        );
    }

    render() {
        const {icons, navigation, user, ...props} = this.props;

        const FrontendLayout = this._buildFrontendLayout;

        if (user.token === null) {
            return <ShowLogin
                layout={FrontendLayout}
                icons={icons}
                api={{
                    processResellerAuthentication: (...props) => {
                        return this.props.api.calls.userland.processResellerAuthentication(
                            this.props.api.base,
                            ...props,
                        );
                    },
                }}
                user={this.props.user}
                referral={false}
                onAuthenticated={this.props.onAuthenticated}
                onError={this.props.onError}
            />
        }

        if (user.roles.indexOf("reseller") === -1) {
            return <FrontendLayout>
                <Error
                    margin={{
                        top: 8
                    }}
                >
                    No tienes acceso a esta sección
                </Error>
            </FrontendLayout>;
        }

        const listCountriesElement = <ListCountries
            layout={FrontendLayout}
            api={{
                collectCountries: (...props) => {
                    return this.props.api.calls.collectCountries(
                        this.props.api.base,
                        ...props,
                    );
                },
                collectProviders: (...props) => {
                    return this.props.api.calls.collectProviders(
                        this.props.api.base,
                        ...props,
                    );
                },
                reseller: {
                    collectProviders: (...props) => {
                        return this.props.api.calls.reseller.collectProviders(
                            this.props.api.base,
                            user.token,
                            ...props,
                        );
                    },
                }
            }}
            onSelect={({slug}) => {
                navigation.onNavigate("/reventa/" + slug);
            }}
            onError={this.props.onError}
        />;

        return resolve(
            navigation.location,
            [
                {
                    location: /^\/reventa\/paises/,
                    element: () => {
                        return listCountriesElement;
                    },
                },
                {
                    location: /^\/reventa\/mi-cuenta/,
                    element: () => {
                        return <ViewMyAccount
                            layout={FrontendLayout}
                            icons={this.props.icons}
                            api={{
                                collectCountries: (...props) => {
                                    return this.props.api.calls.collectCountries(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                collectProviders: (...props) => {
                                    return this.props.api.calls.collectProviders(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                collectProducts: (...props) => {
                                    return this.props.api.calls.collectProducts(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                reseller: {
                                    pickUserAsReseller: (...props) => {
                                        return this.props.api.calls.reseller.pickUserAsReseller(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                    collectTransactionsAsReseller: (...props) => {
                                        return this.props.api.calls.reseller.collectTransactionsAsReseller(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                    collectAgentsAsReseller: (...props) => {
                                        return this.props.api.calls.reseller.collectAgentsAsReseller(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                    addAgent: (...props) => {
                                        return this.props.api.calls.reseller.addAgent(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                    updateAgent: (...props) => {
                                        return this.props.api.calls.reseller.updateAgent(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                    collectProviders: (...props) => {
                                        return this.props.api.calls.reseller.collectProviders(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                }
                            }}
                            onError={this.props.onError}
                        />
                    },
                },
                {
                    location: /^\/reventa\/recargas/,
                    element: () => {
                        return <SearchTopups
                            layout={FrontendLayout}
                            icons={this.props.icons}
                            api={{
                                collectCountries: (...props) => {
                                    return this.props.api.calls.collectCountries(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                collectProviders: (...props) => {
                                    return this.props.api.calls.collectProviders(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                reseller: {
                                    collectAgentsAsReseller: (...props) => {
                                        return this.props.api.calls.reseller.collectAgentsAsReseller(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                    collectTopupsAsReseller: (...props) => {
                                        return this.props.api.calls.reseller.collectTopupsAsReseller(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                }
                            }}
                            onError={this.props.onError}
                        />
                    },
                },
                {
                    location: /^\/reventa/,
                    element: () => {
                        const country = navigation.location.split("/")[2];

                        if (typeof country === 'undefined') {
                            return listCountriesElement;
                        }

                        return <SendTopupToUnknown
                            icons={icons}
                            layout={FrontendLayout}
                            api={{
                                pickCountry: (...props) => {
                                    return this.props.api.calls.pickCountry(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                collectCountries: (...props) => {
                                    return this.props.api.calls.collectCountries(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                validateAccount: (...props) => {
                                    return this.props.api.calls.validateAccount(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                country: {
                                    pickPhoto: (...props) => {
                                        return this.props.api.calls.country.pickPhoto(
                                            this.props.api.base,
                                            ...props,
                                        );
                                    },
                                },
                                collectProviders: (...props) => {
                                    return this.props.api.calls.collectProviders(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                findProviders: (...props) => {
                                    return this.props.api.calls.findProviders(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                detectProviders: (...props) => {
                                    return this.props.api.calls.detectProviders(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                collectPromotions: (...props) => {
                                    return this.props.api.calls.collectPromotions(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                resolvePromotions: (...props) => {
                                    return this.props.api.calls.resolvePromotions(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                resolveProducts: (...props) => {
                                    return this.props.api.calls.resolveProducts(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                testTopup: (...props) => {
                                    return this.props.api.calls.testTopup(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                reseller: {
                                    collectAgentsAsReseller: (...props) => {
                                        return this.props.api.calls.reseller.collectAgentsAsReseller(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                    sendTopup: (...props) => {
                                        return this.props.api.calls.reseller.sendTopup(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                },
                                userland: {
                                    startAuthentication: (...props) => {
                                        return this.props.api.calls.userland.startAuthentication(
                                            this.props.api.base,
                                            ...props,
                                        );
                                    },
                                    completeAuthentication: (...props) => {
                                        return this.props.api.calls.userland.completeAuthentication(
                                            this.props.api.base,
                                            ...props,
                                        );
                                    },
                                    stripe: {
                                        setupCard: (...props) => {
                                            return this.props.api.calls.userland.stripe.setupCard(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                        collectCardsAsClient: (...props) => {
                                            return this.props.api.calls.userland.stripe.collectCardsAsClient(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                        deleteCard: (...props) => {
                                            return this.props.api.calls.userland.stripe.deleteCard(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                    }
                                },
                            }}
                            user={user}
                            country={country}
                            onAuthenticated={props.onAuthenticated}
                            onFinish={(id) => {
                                navigation.onNavigate("/contacto", {id: id});
                            }}
                            onBack={() => {
                                navigation.onNavigate("/listar-paises");
                            }}
                            onNonexistentCountry={() => {
                                this.props.navigation.onNavigate("/bienvenida");
                            }}
                            onError={this.props.onError}
                        />
                    },
                    default: true
                },
            ]
        );
    }

    _buildFrontendLayout = ({menu, children , ...props}) => {
        return <this.props.frontendLayout
            menu={{
                logo: require("../Common/logo_h.png"),
                items: [
                    {
                        key: "my-account",
                        icon: <this.props.icons.objects.reseller.user />,
                        text: "Mi cuenta",
                        onClick: () => {
                            this.props.navigation.onNavigate("/reventa/mi-cuenta");
                        },
                    },
                    {
                        key: "topups",
                        icon: <this.props.icons.objects.reseller.topup />,
                        text: "Recargas",
                        onClick: () => {
                            this.props.navigation.onNavigate("/reventa/recargas");
                        },
                    },
                ],
                ...menu,
            }}
            onNavigateToWelcome={() => {
                this.props.navigation.onNavigate("/reventa/paises");
            }}
            {...props}
        >
            {children}
        </this.props.frontendLayout>;
    };
}
