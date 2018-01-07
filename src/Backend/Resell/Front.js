import React from "react";
import PropTypes from "prop-types";
import {resolve} from "@yosmy/resolution";
import ListUsers from "./ListUsers";
import ViewUser from "./ViewUser";
import SearchTopups from "./SearchTopups";

export default class Front extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        layout: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        api: PropTypes.shape({
            base: PropTypes.string.isRequired,
            calls: PropTypes.object.isRequired,
        }),
        navigation: PropTypes.object.isRequired,
        onError: PropTypes.func.isRequired, // ({code})
    };

    render() {
        return resolve(
            this.props.navigation.location,
            [
                {
                    location: /^\/admin\/reventa\/recargas/,
                    element: () => {
                        return <SearchTopups
                            icons={this.props.icons}
                            layout={this.props.layout}
                            api={{
                                reseller: {
                                    collectAgentsAsAdmin: (...props) => {
                                        return this.props.api.calls.reseller.collectAgentsAsAdmin(
                                            this.props.api.base,
                                            this.props.user.token,
                                            ...props,
                                        );
                                    },
                                    collectUsers: (...props) => {
                                        return this.props.api.calls.reseller.collectUsers(
                                            this.props.api.base,
                                            this.props.user.token,
                                            ...props,
                                        );
                                    },
                                    collectTopupsAsAdmin: (...props) => {
                                        return this.props.api.calls.reseller.collectTopupsAsAdmin(
                                            this.props.api.base,
                                            this.props.user.token,
                                            ...props,
                                        );
                                    },
                                }
                            }}
                            onError={this.props.onError}
                        />
                    },
                    default: true
                },
                {
                    location: /^\/admin\/reventa\/usuarios/,
                    element: () => {
                        return <ListUsers
                            icons={this.props.icons}
                            layout={this.props.layout}
                            api={{
                                reseller: {
                                    collectUsers: (...props) => {
                                        return this.props.api.calls.reseller.collectUsers(
                                            this.props.api.base,
                                            this.props.user.token,
                                            ...props,
                                        );
                                    },
                                }
                            }}
                            onSelect={({id}) => {
                                this.props.navigation.onNavigate(
                                    "/admin/reventa/usuario",
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
                    location: /^\/admin\/reventa\/usuario/,
                    element: () => {
                        return <ViewUser
                            icons={this.props.icons}
                            layout={this.props.layout}
                            api={{
                                reseller: {
                                    pickUserAsAdmin: (...props) => {
                                        return this.props.api.calls.reseller.pickUserAsAdmin(
                                            this.props.api.base,
                                            this.props.user.token,
                                            ...props,
                                        );
                                    },
                                    collectTransactionsAsAdmin: (...props) => {
                                        return this.props.api.calls.reseller.collectTransactionsAsAdmin(
                                            this.props.api.base,
                                            this.props.user.token,
                                            ...props,
                                        );
                                    },
                                    executeTransaction: (...props) => {
                                        return this.props.api.calls.reseller.executeTransaction(
                                            this.props.api.base,
                                            this.props.user.token,
                                            ...props,
                                        );
                                    }
                                }
                            }}
                            id={this.props.navigation.payload.id}
                            onBack={() => {
                                this.props.navigation.onNavigate(
                                    "/admin/reventa/usuarios"
                                );
                            }}
                            onError={this.props.onError}
                        />
                    }
                },
            ]
        );
    }
}
