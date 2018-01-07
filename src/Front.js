import React from "react";
import PropTypes from "prop-types";
import {resolve} from "@yosmy/resolution";
import {Platform} from '@yosmy/ui';
import FrontendFront from "./Frontend/Front";
import BackendFront from "./Backend/Front";
import ResellFront from "./Resell/Front";
import calls from './Api';

export default class Front extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        blankLayout: PropTypes.func.isRequired,
        frontendLayout: PropTypes.func.isRequired,
        drawerLayout: PropTypes.func.isRequired,
        api: PropTypes.shape({
            base: PropTypes.string
        }),
        navigation: PropTypes.shape({
            location: PropTypes.string.isRequired,
            payload: PropTypes.object,
            onNavigate: PropTypes.func.isRequired, // (location, callback)
        }).isRequired,
        onError: PropTypes.func.isRequired, // ()
    };

    state = {
        user: null,
    };

    componentWillMount() {
        /* User */

        // Platform.secure.delete('user');

        Platform.secure.get('user')
            .then((user) => {
                if (typeof user === 'undefined') {
                    user = {
                        session: null,
                        token: null,
                        phone: null,
                        roles: null,
                        time: null,
                    };

                    /* Referral */

                    const referral = typeof this.props.navigation.payload.ref !== 'undefined'
                        ? this.props.navigation.payload.ref
                        : null;

                    user = {
                        ...user,
                        referral: referral
                    };
                }

                // Force users who don't have phone stored to logout
                if (typeof user.phone === "undefined") {
                    user = {
                        session: null,
                        token: null,
                        phone: null,
                        roles: null,
                        time: null,
                    };
                }

                // TODO: Temporal patch
                if (typeof user.token === "undefined") {
                    user = {
                        ...user,
                        token: null
                    }
                }

                this.setState({
                    user: user
                });
            });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.user !== nextState.user
            || this.props.navigation.location !== nextProps.navigation.location
        );
    }

    render() {
        if (this.state.user === null) {
            return <this.props.blankLayout />;
        }

        const api = {
            ...this.props.api,
            calls: calls
        };

        try {
            return resolve(
                this.props.navigation.location,
                [
                    {
                        location: /^\/admin/,
                        element: () => {
                            return <BackendFront
                                icons={this.props.icons}
                                blankLayout={this.props.blankLayout}
                                drawerLayout={this.props.drawerLayout}
                                user={this.state.user}
                                api={api}
                                navigation={this.props.navigation}
                                onAuthenticated={this._handleAuthenticated}
                                onError={this.props.onError}
                            />
                        },
                    },
                    {
                        location: /^\/reventa/,
                        element: () => {
                            return <ResellFront
                                icons={this.props.icons}
                                blankLayout={this.props.blankLayout}
                                frontendLayout={this.props.frontendLayout}
                                user={this.state.user}
                                api={api}
                                navigation={this.props.navigation}
                                onAuthenticated={this._handleAuthenticated}
                                onLogout={this._handleLogout}
                                onError={this.props.onError}
                            />
                        },
                    },
                    // Last, because it will match everything
                    {
                        location: /^\//,
                        element: () => {
                            return <FrontendFront
                                icons={this.props.icons}
                                blankLayout={this.props.blankLayout}
                                frontendLayout={this.props.frontendLayout}
                                user={this.state.user}
                                api={api}
                                navigation={this.props.navigation}
                                onAuthenticated={this._handleAuthenticated}
                                onLogout={this._handleLogout}
                                onError={this.props.onError}
                            />
                        },
                        default: true
                    },
                ]
            );
        } catch (e) {
            console.error(this.props.navigation);

            throw e;
        }
    }

    _handleAuthenticated = (authentication) => {
        const {session, token, phone, roles} = authentication;

        const resolvePush = Platform.select({
            web: () => {
                return new Promise((resolve) => {
                    resolve(null);
                });
            },
            mobile: async () => {
                const {status: existingStatus} = await Platform.permissions.get(
                    Platform.permissions.NOTIFICATIONS
                );
                let finalStatus = existingStatus;

                // Only ask if permissions have not already been determined, because
                // iOS won't necessarily prompt the user a second time.
                if (existingStatus !== 'granted') {
                    // Android remote notification permissions are granted during the app
                    // install, so this will only ask on iOS
                    const {status} = await Platform.permissions.ask(Platform.permissions.NOTIFICATIONS);
                    finalStatus = status;
                }

                // Stop here if the user did not grant permissions
                if (finalStatus !== 'granted') {
                    return;
                }

                // Get the token that uniquely identifies this device
                return await Platform.notifications.getToken();
            }
        });

        const finish = () => {
            this.setState({
                user: {
                    time: Date.now(),
                    session: session,
                    token: token,
                    phone: phone,
                    roles: roles,
                }
            }, () => {
                Platform.secure.set(
                    'user',
                    this.state.user
                );
            });
        };

        resolvePush()
            .then((push) => {
                if (!push) {
                    finish();

                    return;
                }

                calls.userland.push.assignUser(
                    this.props.api.base,
                    token,
                    push
                )
                    .then(() => {
                        finish();
                    })
                    .catch(this.props.onError)
            })
            .catch(() => {
                finish();
            })
    };

    _handleLogout = () => {
        this.setState({
            user: {
                ...this.state.user, // Keep session
                referral: null,
                token: null,
                phone: null,
                roles: null,
                time: null,
            }
        }, () => {
            Platform.secure.set(
                'user',
                this.state.user
            );
        });
    };
}