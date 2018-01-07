import React from "react";
import PropTypes from "prop-types";
import {resolve} from "@yosmy/resolution";
import {Error} from "@yosmy/ui";
import ManageCountry from "./ManageCountry";
import ListPromotions from "./ListPromotions";
import ListCountries from "./ListCountries";
import ListMetadatas from "./ListMetadatas";
import EditMetadata from "./EditMetadata";
import SearchTopups from "./SearchTopups";
import ViewUser from "./ViewUser";
import ShowLogin from "../Common/ShowLogin";
import SearchEvents from "./SearchEvents";
import ResellFront from "./Resell/Front";
import ListUsers from "./ListUsers";
import ViewActivity from "./ViewActivity";

export default class Front extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        blankLayout: PropTypes.func.isRequired,
        drawerLayout: PropTypes.func.isRequired,
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
        onAuthenticated: PropTypes.func.isRequired, // (token)
        onError: PropTypes.func.isRequired, // ({code})
    };

    state = {
        notification: null,
    };

    render() {
        const {icons, navigation, user} = this.props;

        if (user.token === null) {
            return <ShowLogin
                layout={this.props.blankLayout}
                icons={icons}
                api={{
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
                }}
                user={this.props.user}
                referral={false}
                onAuthenticated={this.props.onAuthenticated}
                onError={this.props.onError}
            />
        }

        if (
            !this.props.user.roles
            || (
                this.props.user.roles.indexOf("admin") === -1
                && this.props.user.roles.indexOf("operator") === -1
            )
        ) {
            return <this.props.blankLayout>
                <Error>No tienes acceso a esta sección</Error>
            </this.props.blankLayout>;
        }

        const Layout = this._buildLayout;

        return resolve(
            navigation.location,
            [
                {
                    location: /^\/admin\/recargas/,
                    element: () => {
                        return <SearchTopups
                            icons={icons}
                            layout={({children, ...props}) => {
                                return <Layout
                                    {...props}
                                >
                                    {children}
                                </Layout>
                            }}
                            api={{
                                collectTopupsByDateAsOperator: (...props) => {
                                    return this.props.api.calls.collectTopupsByDateAsOperator(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
                                collectTopupsByPhoneAsOperator: (...props) => {
                                    return this.props.api.calls.collectTopupsByPhoneAsOperator(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
                                collectTopupsByStripeAsOperator: (...props) => {
                                    return this.props.api.calls.collectTopupsByStripeAsOperator(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
                                collectContactsAsOperator: (...props) => {
                                    return this.props.api.calls.collectContactsAsOperator(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
                                topup: {
                                    generateReceipt: (...props) => {
                                        return this.props.api.calls.topup.generateReceipt(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                },
                                userland: {
                                    phone: {
                                        collectUsers: (...props) => {
                                            return this.props.api.calls.userland.phone.collectUsers(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                    }
                                },
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
                                trySendingTopupAgain: (...props) => {
                                    return this.props.api.calls.trySendingTopupAgain(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
                                sendDelayedTopup: (...props) => {
                                    return this.props.api.calls.sendDelayedTopup(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
                                refundTopup: (...props) => {
                                    return this.props.api.calls.refundTopup(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
                            }}
                            onSelectUser={({id}) => {
                                this.props.navigation.onNavigate(
                                    "/admin/usuario",
                                    {
                                        id: id,
                                        target: 'blank'
                                    }
                                );
                            }}
                            onError={this.props.onError}
                        />
                    },
                    default: true
                },
                {
                    location: /^\/admin\/actividad/,
                    element: () => {
                        return <ViewActivity
                            icons={icons}
                            layout={({children, ...props}) => {
                                return <Layout
                                    {...props}
                                >
                                    {children}
                                </Layout>
                            }}
                            api={{
                                userland: {
                                    phone: {
                                        collectUsers: (...props) => {
                                            return this.props.api.calls.userland.phone.collectUsers(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                    },
                                    stripe: {
                                        card: {
                                            collectErrors: (...props) => {
                                                return this.props.api.calls.userland.stripe.card.collectErrors(
                                                    this.props.api.base,
                                                    user.token,
                                                    ...props,
                                                );
                                            },
                                        }
                                    }
                                },
                            }}
                            onSelectUser={({id}) => {
                                this.props.navigation.onNavigate(
                                    "/admin/usuario",
                                    {
                                        id: id,
                                        target: 'blank'
                                    }
                                );
                            }}
                            onError={this.props.onError}
                        />
                    },
                },
                {
                    location: /^\/admin\/paises/,
                    element: () => {
                        return <ListCountries
                            icons={icons}
                            layout={({children, ...props}) => {
                                return <Layout
                                    {...props}
                                >
                                    {children}
                                </Layout>
                            }}
                            api={{
                                collectCountries: (...props) => {
                                    return this.props.api.calls.collectCountries(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                            }}
                            onSelect={(iso) => {
                                this.props.navigation.onNavigate(
                                    "/admin/pais",
                                    {
                                        iso: iso
                                    }
                                );
                            }}
                            onError={this.props.onError}
                        />
                    },
                },
                {
                    location: /^\/admin\/pais/,
                    element: () => {
                        return <ManageCountry
                            icons={icons}
                            layout={({children, ...props}) => {
                                return <Layout
                                    {...props}
                                >
                                    {children}
                                </Layout>
                            }}
                            api={{
                                pickCountry: (...props) => {
                                    return this.props.api.calls.pickCountry(
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
                                collectPromotions: (...props) => {
                                    return this.props.api.calls.collectPromotions(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                promotion: {
                                    updateTitle: (...props) => {
                                        return this.props.api.calls.promotion.updateTitle(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                },
                                country: {
                                    collectPhotos: (...props) => {
                                        return this.props.api.calls.country.collectPhotos(
                                            this.props.api.base,
                                            ...props,
                                        );
                                    },
                                    uploadPhoto: (...props) => {
                                        return this.props.api.calls.country.uploadPhoto(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                    deletePhoto: (...props) => {
                                        return this.props.api.calls.country.deletePhoto(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                }
                            }}
                            iso={this.props.navigation.payload.iso}
                            onError={this.props.onError}
                        />
                    },
                },
                {
                    location: /^\/admin\/fraude/,
                    element: () => {
                        return <SearchEvents
                            icons={icons}
                            layout={({children, ...props}) => {
                                return <Layout
                                    {...props}
                                >
                                    {children}
                                </Layout>
                            }}
                            api={{
                                blacklist: {
                                    log: {
                                        collectEvents: (...props) => {
                                            return this.props.api.calls.blacklist.log.collectEvents(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                    },
                                }
                            }}
                            onError={this.props.onError}
                        />
                    },
                },
                {
                    location: /^\/admin\/promociones/,
                    element: () => {
                        return <ListPromotions
                            icons={icons}
                            layout={({children, ...props}) => {
                                return <Layout
                                    {...props}
                                >
                                    {children}
                                </Layout>
                            }}
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
                                collectPromotions: (...props) => {
                                    return this.props.api.calls.collectPromotions(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                promotion: {
                                    updateTitle: (...props) => {
                                        return this.props.api.calls.promotion.updateTitle(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                },

                            }}
                            onError={this.props.onError}
                        />
                    },
                },
                {
                    location: /^\/admin\/metadatos/,
                    element: () => {
                        return <ListMetadatas
                            icons={icons}
                            layout={({children, ...props}) => {
                                return <Layout
                                    {...props}
                                >
                                    {children}
                                </Layout>
                            }}
                            api={{
                                collectMetadatas: (...props) => {
                                    return this.props.api.calls.collectMetadatas(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
                            }}
                            onSelect={(id) => {
                                this.props.navigation.onNavigate(
                                    "/admin/metadato",
                                    {
                                        id: id
                                    }
                                );
                            }}
                            onError={this.props.onError}
                        />
                    },
                },
                {
                    location: /^\/admin\/metadato/,
                    element: () => {
                        return <EditMetadata
                            icons={icons}
                            layout={({children, ...props}) => {
                                return <Layout
                                    {...props}
                                >
                                    {children}
                                </Layout>
                            }}
                            api={{
                                pickMetadata: (...props) => {
                                    return this.props.api.calls.pickMetadata(
                                        this.props.api.base,
                                        ...props,
                                    );
                                },
                                updateMetadata: (...props) => {
                                    return this.props.api.calls.updateMetadata(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
                            }}
                            id={this.props.navigation.payload.id}
                            onEdit={() => {
                                this.props.navigation.onNavigate(
                                    "/admin/metadatos"
                                );
                            }}
                            onCancel={() => {
                                this.props.navigation.onNavigate(
                                    "/admin/metadatos"
                                );
                            }}
                            onError={this.props.onError}
                        />
                    },
                },
                {
                    location: /^\/admin\/usuarios/,
                    element: () => {
                        return <ListUsers
                            icons={icons}
                            layout={({children, ...props}) => {
                                return <Layout
                                    {...props}
                                >
                                    {children}
                                </Layout>
                            }}
                            api={{
                                userland: {
                                    registration: {
                                        computeUsers: (...props) => {
                                            return this.props.api.calls.userland.registration.computeUsers(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                    }
                                }
                            }}
                            onError={this.props.onError}
                        />
                    },
                },
                {
                    location: /^\/admin\/usuario/,
                    element: () => {
                        return <ViewUser
                            icons={icons}
                            layout={({children, ...props}) => {
                                return <Layout
                                    {...props}
                                >
                                    {children}
                                </Layout>
                            }}
                            api={{
                                userland: {
                                    log: {
                                        collectEvents: (...props) => {
                                            return this.props.api.calls.userland.log.collectEvents(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                    },
                                    registration: {
                                        pickUserAsOperator: (...props) => {
                                            return this.props.api.calls.userland.registration.pickUserAsOperator(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                    },
                                    phone: {
                                        pickUserAsOperator: (...props) => {
                                            return this.props.api.calls.userland.phone.pickUserAsOperator(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                        collectUsers: (...props) => {
                                            return this.props.api.calls.userland.phone.collectUsers(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                    },
                                    stripe: {
                                        pickUserAsOperator: (...props) => {
                                            return this.props.api.calls.userland.stripe.pickUserAsOperator(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                        collectCardsAsOperator: (...props) => {
                                            return this.props.api.calls.userland.stripe.collectCardsAsOperator(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                        card: {
                                            collectErrors: (...props) => {
                                                return this.props.api.calls.userland.stripe.card.collectErrors(
                                                    this.props.api.base,
                                                    user.token,
                                                    ...props,
                                                );
                                            },
                                        }
                                    },
                                    blacklist: {
                                        pickUserAsOperator: (...props) => {
                                            return this.props.api.calls.userland.blacklist.pickUserAsOperator(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                        banUser: (...props) => {
                                            return this.props.api.calls.userland.blacklist.banUser(
                                                this.props.api.base,
                                                user.token,
                                                ...props,
                                            );
                                        },
                                    },
                                },
                                collectTopupsByContactsAsOperator: (...props) => {
                                    return this.props.api.calls.collectTopupsByContactsAsOperator(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
                                collectContactsAsOperator: (...props) => {
                                    return this.props.api.calls.collectContactsAsOperator(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
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
                                trySendingTopupAgain: (...props) => {
                                    return this.props.api.calls.trySendingTopupAgain(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
                                sendDelayedTopup: (...props) => {
                                    return this.props.api.calls.sendDelayedTopup(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
                                refundTopup: (...props) => {
                                    return this.props.api.calls.refundTopup(
                                        this.props.api.base,
                                        user.token,
                                        ...props,
                                    );
                                },
                            }}
                            id={this.props.navigation.payload.id}
                            onBack={() => {
                                this.props.navigation.onNavigate(
                                    "/admin/usuarios"
                                );
                            }}
                            onError={this.props.onError}
                        />
                    },
                    default: true
                },
                {
                    location: /^\/admin\/reventa/,
                    element: () => {
                        return <ResellFront
                            icons={this.props.icons}
                            layout={Layout}
                            user={this.props.user}
                            api={this.props.api}
                            navigation={this.props.navigation}
                            onError={this.props.onError}
                        />
                    },
                },
            ]
        );
    }

    _buildLayout = ({children , align, ...props}) => {
        return <this.props.drawerLayout
            {...props}
            align={{
                alignItems: "flex-start",
                ...align
            }}
            padding={8}
            menu={{
                logo: require("./logo_v.png"),
                background: require("../Common/background.png"),
                list:   [
                    {
                        header: "Venta",
                        items: [
                            this.props.user.roles && this.props.user.roles.indexOf("admin") > -1 && {
                                key: "activity",
                                icon: <this.props.icons.objects.activity />,
                                text: "Actividad",
                                onClick: () => {
                                    this.props.navigation.onNavigate("/admin/actividad");
                                },
                            },
                            this.props.user.roles && this.props.user.roles.indexOf("operator") > -1 && {
                                key: "topups",
                                icon: <this.props.icons.menu.topups />,
                                text: "Recargas",
                                onClick: () => {
                                    this.props.navigation.onNavigate("/admin/recargas");
                                },
                            },
                            this.props.user.roles && this.props.user.roles.indexOf("admin") > -1 && {
                                key: "users",
                                icon: <this.props.icons.menu.users />,
                                text: "Usuarios",
                                onClick: () => {
                                    this.props.navigation.onNavigate("/admin/usuarios");
                                },
                            },
                            this.props.user.roles && this.props.user.roles.indexOf("admin") > -1 && {
                                key: "fraud",
                                icon: <this.props.icons.menu.fraud />,
                                text: "Fraude",
                                onClick: () => {
                                    this.props.navigation.onNavigate("/admin/fraude");
                                },
                            },
                            this.props.user.roles && this.props.user.roles.indexOf("admin") > -1 && {
                                key: "countries",
                                icon: <this.props.icons.menu.countries />,
                                text: "Países",
                                onClick: () => {
                                    this.props.navigation.onNavigate("/admin/paises");
                                },
                            },
                            this.props.user.roles && this.props.user.roles.indexOf("admin") > -1 && {
                                key: "promotions",
                                icon: <this.props.icons.menu.promotions />,
                                text: "Promociones",
                                onClick: () => {
                                    this.props.navigation.onNavigate("/admin/promociones");
                                },
                            },
                            this.props.user.roles && this.props.user.roles.indexOf("admin") > -1 && {
                                key: "metadatas",
                                icon: <this.props.icons.menu.metadatas />,
                                text: "Metadatos",
                                onClick: () => {
                                    this.props.navigation.onNavigate("/admin/metadatos");
                                },
                            },
                        ]
                    },
                    {
                        header: "Reventa",
                        items: [
                            this.props.user.roles && this.props.user.roles.indexOf("operator") > -1 && {
                                key: "topups",
                                icon: <this.props.icons.menu.topups />,
                                text: "Recargas",
                                onClick: () => {
                                    this.props.navigation.onNavigate("/admin/reventa/recargas");
                                },
                            },
                            this.props.user.roles && this.props.user.roles.indexOf("admin") > -1 && {
                                key: "resellers",
                                icon: <this.props.icons.menu.resellers />,
                                text: "Revendedores",
                                onClick: () => {
                                    this.props.navigation.onNavigate("/admin/reventa/usuarios");
                                },
                            },
                        ]
                    }
                ],
            }}
            notification={{
                message: this.state.notification,
                onClose: () => {
                    this.setState({
                        notification: null
                    });
                }
            }}
        >
            {children}
        </this.props.drawerLayout>;
    };
}
