import React from "react";
import PropTypes from "prop-types";
import {Platform} from "@yosmy/ui";
import {resolve} from "@yosmy/resolution";
import ListCountries from "./ListCountries";
import SendTopupToUnknown from "./SendTopupToUnknown";
import SendTopupToContact from "./SendTopupToContact";
import ListContacts from "./ListContacts";
import ViewContact from "./ViewContact";
import ManageOptions from "./ManageOptions";
import ShowWelcome from "./ShowWelcome";
import ViewPrivacyPolicy from "./ViewPrivacyPolicy";
import ViewHelp from "./ViewHelp";
import ShowLogin from "../Common/ShowLogin";

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

    state = {
        notification: null,
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

        if (
            (
                navigation.location === "/contactos"
                || navigation.location === "/contacto"
                || navigation.location === "/enviar-recarga-a-contacto"
            )
            && user.token === null
        ) {
            return <ShowLogin
                layout={FrontendLayout}
                icons={this.props.icons}
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
                onAuthenticated={this.props.onAuthenticated}
                onError={this.props.onError}
            />;
        }

        try {
            return resolve(
                navigation.location,
                [
                    {
                        location: Platform.select({
                            android: /^\/bienvenida/,
                            ios: /^\/bienvenida/,
                            web: [
                                "/", // exact match
                                /^\/bienvenida/
                            ]
                        }),
                        element: () => {
                            return <ShowWelcome
                                icons={icons}
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
                                    collectPromotions: (...props) => {
                                        return this.props.api.calls.collectPromotions(
                                            this.props.api.base,
                                            ...props,
                                        );
                                    },
                                }}
                                onSelect={({slug}) => {
                                    navigation.onNavigate("/" + slug);
                                }}
                                onBegin={() => {
                                    navigation.onNavigate("/listar-paises");
                                }}
                                onNavigateToAboutUs={() => {
                                    navigation.onNavigate("/acerca-de-nosotros");
                                }}
                                onNavigateToTermsAndConditions={() => {
                                    navigation.onNavigate("/terminos-y-condiciones");
                                }}
                                onNavigateToPrivacyPolicy={() => {
                                    navigation.onNavigate("/politica-de-privacidad");
                                }}
                                onNavigateToAndroidApp={() => {
                                    this._handleNavigateToApp(navigation, "android");
                                }}
                                onNavigateToIosApp={() => {
                                    this._handleNavigateToApp(navigation, "ios");
                                }}
                                onNavigateToFacebookPage={() => {
                                    navigation.onNavigate("https://facebook.com/mundorecargacom");
                                }}
                                onError={this.props.onError}
                            />
                        }
                    },
                    {
                        location: Platform.select({
                            android: [
                                "/", // exact match
                                /^\/listar-paises/
                            ],
                            ios: [
                                "/", // exact match
                                /^\/listar-paises/
                            ],
                            web: /^\/listar-paises/,
                        }),
                        element: () => {
                            return <ListCountries
                                layout={this._buildListCountriesLayout}
                                api={{
                                    collectCountries: (...props) => {
                                        return this.props.api.calls.collectCountries(
                                            this.props.api.base,
                                            ...props,
                                        );
                                    },
                                }}
                                onSelect={({slug}) => {
                                    navigation.onNavigate("/" + slug);
                                }}
                                onError={this.props.onError}
                            />
                        },
                    },
                    {
                        location: /^\/enviar-recarga-a-nueva-persona/,
                        element: () => {
                            const country = navigation.location.split("/")[1];

                            return <SendTopupToUnknown
                                icons={icons}
                                layout={this._buildSendTopupToUnknownLayout}
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
                                    testTopup: (...props) => {
                                        return this.props.api.calls.testTopup(
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
                                    sendTopup: (...props) => {
                                        return this.props.api.calls.sendTopup(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
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
                                onNavigateToAndroidApp={() => {
                                    this._handleNavigateToApp(navigation, "android");
                                }}
                                onNavigateToIosApp={() => {
                                    this._handleNavigateToApp(navigation, "ios");
                                }}
                                onError={this.props.onError}
                            />
                        },
                        default: true
                    },
                    {
                        location: /^\/enviar-recarga-a-contacto/,
                        element: () => {
                            return <SendTopupToContact
                                icons={icons}
                                layout={this._buildSendTopupToContactLayout}
                                api={{
                                    pickContactAsClient: (...props) => {
                                        return this.props.api.calls.pickContactAsClient(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                    pickCountry: (...props) => {
                                        return this.props.api.calls.pickCountry(
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
                                    pickProvider: (...props) => {
                                        return this.props.api.calls.pickProvider(
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
                                    sendTopup: (...props) => {
                                        return this.props.api.calls.sendTopup(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                    collectProviders: (...props) => {
                                        return this.props.api.calls.collectProviders(
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
                                    findProviders: (...props) => {
                                        return this.props.api.calls.findProviders(
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
                                    userland: {
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
                                    }
                                }}
                                user={user}
                                id={navigation.payload.id}
                                onFinish={(id) => {
                                    navigation.onNavigate("/contacto", {id: id});
                                }}
                                onBack={(id) => {
                                    navigation.onNavigate("/contacto", {id: id});
                                }}
                                onNavigateToAndroidApp={() => {
                                    this._handleNavigateToApp(navigation, "android");
                                }}
                                onNavigateToIosApp={() => {
                                    this._handleNavigateToApp(navigation, "ios");
                                }}
                                onError={this.props.onError}
                            />
                        },
                        enabled: navigation.payload !== null && typeof navigation.payload.id !== 'undefined'
                    },
                    {
                        location: /^\/contactos/,
                        element: () => {
                            return <ListContacts
                                icons={icons}
                                layout={this._buildListContactsLayout}
                                api={{
                                    collectContactsAsClient: (...props) => {
                                        return this.props.api.calls.collectContactsAsClient(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                    collectTopupsAsClient: (...props) => {
                                        return this.props.api.calls.collectTopupsAsClient(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    }
                                }}
                                onReTopup={({contact}) => {
                                    navigation.onNavigate("/enviar-recarga-a-contacto", {id: contact});
                                }}
                                onNewTopup={() => {
                                    navigation.onNavigate("/listar-paises");
                                }}
                                onSelect={({id}) => {
                                    navigation.onNavigate("/contacto", {id: id});
                                }}
                                onBack={() => {
                                    navigation.onNavigate("/listar-paises");
                                }}
                                onError={this.props.onError}
                            />
                        },
                        default: user.from !== "topup"
                    },
                    {
                        location: /^\/contacto/,
                        element: () => {
                            return <ViewContact
                                icons={icons}
                                layout={this._buildViewContactLayout}
                                api={{
                                    pickContactAsClient: (...props) => {
                                        return this.props.api.calls.pickContactAsClient(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                    collectTopupsAsClient: (...props) => {
                                        return this.props.api.calls.collectTopupsAsClient(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    },
                                    updateContact: (...props) => {
                                        return this.props.api.calls.updateContact(
                                            this.props.api.base,
                                            user.token,
                                            ...props,
                                        );
                                    }
                                }}
                                id={navigation.payload.id}
                                onTopup={({id}) => {
                                    navigation.onNavigate("/enviar-recarga-a-contacto", {id: id});
                                }}
                                onUpdate={() => {
                                    // this._handleNotify("El contacto se ha actualizado");
                                }}
                                onBack={() => {
                                    navigation.onNavigate("/contactos");
                                }}
                                onError={this.props.onError}
                            />
                        },
                        enabled: navigation.payload !== null && typeof navigation.payload.id !== 'undefined'
                    },
                    {
                        location: /^\/opciones/,
                        element: () => {
                            return <ManageOptions
                                icons={icons}
                                layout={this._buildManageOptionsLayout}
                                api={{
                                    pickMetadata: (...props) => {
                                        return this.props.api.calls.pickMetadata(
                                            this.props.api.base,
                                            ...props,
                                        );
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
                                        phone: {
                                            pickUserAsClient: (...props) => {
                                                return this.props.api.calls.userland.phone.pickUserAsClient(
                                                    this.props.api.base,
                                                    user.token,
                                                    ...props,
                                                );
                                            },
                                        },
                                        referral: {
                                            user: {
                                                addReferral: (...props) => {
                                                    return this.props.api.calls.userland.referral.user.addReferral(
                                                        this.props.api.base,
                                                        user.token,
                                                        ...props,
                                                    );
                                                },
                                            },
                                            addUser: (...props) => {
                                                return this.props.api.calls.userland.referral.addUser(
                                                    this.props.api.base,
                                                    user.token,
                                                    ...props,
                                                );
                                            },
                                            pickUser: (...props) => {
                                                return this.props.api.calls.userland.referral.pickUser(
                                                    this.props.api.base,
                                                    user.token,
                                                    ...props,
                                                );
                                            },
                                            countUsers: (...props) => {
                                                return this.props.api.calls.userland.referral.countUsers(
                                                    this.props.api.base,
                                                    user.token,
                                                    ...props,
                                                );
                                            },
                                            computeReferrals: (...props) => {
                                                return this.props.api.calls.userland.referral.computeReferrals(
                                                    this.props.api.base,
                                                    user.token,
                                                    ...props,
                                                );
                                            },
                                            computeTopups: (...props) => {
                                                return this.props.api.calls.userland.referral.computeTopups(
                                                    this.props.api.base,
                                                    user.token,
                                                    ...props,
                                                );
                                            },
                                        }
                                    },
                                }}
                                user={user}
                                onAuthenticated={props.onAuthenticated}
                                onNavigateToHelp={() => {
                                    navigation.onNavigate("/ayuda");
                                }}
                                onNavigateToPrivacyPolicy={() => {
                                    navigation.onNavigate("/politica-de-privacidad");
                                }}
                                onNavigateToAndroidApp={() => {
                                    navigation.onNavigate("https://play.google.com/store/apps/details?id=com.intermaple.mundorecarga");
                                }}
                                onNavigateToIosApp={() => {
                                    navigation.onNavigate("https://itunes.apple.com/es/app/mundorecarga/id1437067665?mt=8");
                                }}
                                onLogout={() => {
                                    navigation.onNavigate(
                                        "/listar-paises",
                                        {},
                                        () => {
                                            this.props.onLogout();
                                        }
                                    );
                                }}
                                onBack={() => {
                                    navigation.onNavigate("/listar-paises");
                                }}
                                onError={this.props.onError}
                            />
                        }
                    },
                    {
                        location: /^\/ayuda/,
                        element: () => {
                            return <ViewHelp
                                icons={icons}
                                layout={FrontendLayout}
                                api={{
                                    pickMetadata: (...props) => {
                                        return this.props.api.calls.pickMetadata(
                                            this.props.api.base,
                                            ...props,
                                        );
                                    }
                                }}
                                onBack={() => {
                                    navigation.onNavigate("/opciones");
                                }}
                                onError={this.props.onError}
                            />
                        }
                    },
                    {
                        location: /^\/politica-de-privacidad/,
                        element: () => {
                            return <ViewPrivacyPolicy
                                icons={icons}
                                layout={FrontendLayout}
                                api={{
                                    pickMetadata: (...props) => {
                                        return this.props.api.calls.pickMetadata(
                                            this.props.api.base,
                                            ...props,
                                        );
                                    }
                                }}
                                onBack={() => {
                                    navigation.onNavigate("/opciones");
                                }}
                                onError={this.props.onError}
                            />
                        }
                    }
                ]
            );
        } catch (e) {
            console.error(this.props.navigation);

            throw e;
        }
    }

    _buildFrontendLayout = ({menu, children , ...props}) => {
        return <this.props.frontendLayout
            menu={{
                logo: require("../Common/logo_h.png"),
                items: [
                    {
                        key: "topup",
                        icon: <this.props.icons.menu.home />,
                        text: "Inicio",
                        onClick: () => {
                            this.props.navigation.onNavigate("/listar-paises");
                        },
                    },
                    {
                        key: "contacts",
                        icon: <this.props.icons.menu.contacts />,
                        text: "Contactos",
                        onClick: () => {
                            this.props.navigation.onNavigate("/contactos");
                        },
                    },
                    {
                        key: "options",
                        icon: <this.props.icons.menu.options />,
                        text: "Opciones",
                        onClick: () => {
                            this.props.navigation.onNavigate("/opciones");
                        },
                    },
                    Platform.select({
                        web: this.props.user && this.props.user.roles && this.props.user.roles.indexOf("admin") > -1 && {
                            key: "admin",
                            icon: <this.props.icons.menu.admin/>,
                            text: "Admin",
                            onClick: () => {
                                this.props.navigation.onNavigate("/admin");
                            },
                        }
                    })
                ],
                ...menu,
            }}
            notification={{
                message: this.state.notification,
                onClose: (callback) => {
                    this.setState({
                        notification: null
                    }, callback);
                }
            }}
            onNavigateToWelcome={() => {
                this.props.navigation.onNavigate("/bienvenida");
            }}
            {...props}
        >
            {children}
        </this.props.frontendLayout>;
    };

    _handleNotify = (notification) => {
        this.setState({
            notification: notification
        });
    };

    _buildListCountriesLayout = ({children, ...props}) => {
        const FrontendLayout = this._buildFrontendLayout;

        return <FrontendLayout
            {...props}
            menu={{
                active: "topup"
            }}
        >
            {children}
        </FrontendLayout>
    };

    _buildSendTopupToUnknownLayout = ({children, ...props}) => {
        const FrontendLayout = this._buildFrontendLayout;

        return <FrontendLayout
            {...props}
            menu={{
                hidden: true
            }}
        >
            {children}
        </FrontendLayout>;
    };

    _buildSendTopupToContactLayout = ({children, ...props}) => {
        const FrontendLayout = this._buildFrontendLayout;

        return <FrontendLayout
            {...props}
            menu={{
                hidden: true
            }}
        >
            {children}
        </FrontendLayout>;
    };

    _buildListContactsLayout = ({children, ...props}) => {
        const FrontendLayout = this._buildFrontendLayout;

        return <FrontendLayout
            {...props}
            menu={{
                ...props.menu,
                active: "contacts"
            }}
        >
            {children}
        </FrontendLayout>
    };

    _buildViewContactLayout = ({children, ...props}) => {
        const FrontendLayout = this._buildFrontendLayout;

        return <FrontendLayout
            {...props}
            menu={{
                hidden: true
            }}
        >
            {children}
        </FrontendLayout>
    };

    _buildManageOptionsLayout = ({children, ...props}) => {
        const FrontendLayout = this._buildFrontendLayout;

        return <FrontendLayout
            {...props}
            menu={{
                ...props.menu,
                active: "options"
            }}
        >
            {children}
        </FrontendLayout>
    };

    _handleNavigateToApp = (navigation, platform) => {
        switch (platform) {
            case "android":
                navigation.onNavigate("https://play.google.com/store/apps/details?id=com.intermaple.mundorecarga");

                break;
            case "ios":
                navigation.onNavigate("https://itunes.apple.com/es/app/mundorecarga/id1437067665?mt=8");

                break;
            default:
                throw platform;
        }
    }
}
