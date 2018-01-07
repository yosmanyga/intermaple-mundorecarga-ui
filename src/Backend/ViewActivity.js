import React from "react";
import PropTypes from "prop-types";
import {Card, Text} from "@yosmy/ui";
import Search from './Search.inc';
import Error from "./Stripe/Card/Error";

class ViewActivity extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onSelectUser: PropTypes.func.isRequired, // (user)
        onError: PropTypes.func.isRequired,
    };

    state = {
        progress: 0,
        search: null
    };

    render() {
        const Layout = this._buildLayout;

        return <Layout>
            <Search
                icons={this.props.icons}
                onBegin={(from, to) => {
                    this.setState({
                        search: {
                            from: from,
                            to: to
                        }
                    });
                }}
                onSet={(from, to) => {
                    this.setState({
                        search: {
                            from: from,
                            to: to
                        }
                    });
                }}
            />

            {this.state.search && <ListCardErrors
                layout={({children}) => {
                    return <Card
                        header={{
                            title: "Errores en la entrada de tarjetas"
                        }}
                        content={children}
                    />
                }}
                icons={this.props.icons}
                api={this.props.api}
                search={this.state.search}
                onSelectUser={this.props.onSelectUser}
                onProgress={this._handleProgress}
                onError={this.props.onError}
            />}
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Actividad"
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

class ListCardErrors extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        search: PropTypes.shape({
            from: PropTypes.number.isRequired,
            to: PropTypes.number.isRequired,
        }).isRequired,
        onSelectUser: PropTypes.func.isRequired, // (user)
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        errors: null,
        userland: {
            phone: {
                users: null
            }
        }
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            nextProps.search !== this.props.search
            || nextState !== this.state
        );
    }

    componentWillMount() {
        this._collectErrors(
            this.props.search.from,
            this.props.search.to,
        );
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.search !== this.props.search) {
            this._collectErrors(
                nextProps.search.from,
                nextProps.search.to,
            )
        }
    }

    _collectErrors(from, to) {
        this.setState({
            errors: null,
            userland: {
                phone: {
                    users: null
                }
            }
        }, () => {
            this.props.onProgress(
                true,
                () => {
                    this.props.api.userland.stripe.card.collectErrors(
                        null,
                        from / 1000,
                        to / 1000,
                    )
                        .then((errors) => {
                            this.setState({
                                errors: errors
                            }, () => {
                                const ids = this.state.errors.map(({user}) => {
                                    return user;
                                });

                                this.props.api.userland.phone.collectUsers(
                                    ids
                                )
                                    .then((users) => {
                                        this.setState({
                                            userland: {
                                                phone: {
                                                    users: users
                                                }
                                            }
                                        });
                                    })
                                    .catch(this.props.onError);

                                this.props.onProgress(false);
                            });
                        })
                        .catch(this.props.onError)
                }
            );
        });
    }

    render() {
        if (
            this.state.errors === null
            || this.state.userland.phone.users === null
        ) {
            return <this.props.layout />;
        }

        if (this.state.errors.length === 0) {
            return <this.props.layout>
                <Text
                    center
                >
                    No se encontraron errores.
                </Text>
            </this.props.layout>;
        }

        return <this.props.layout>
            <Text>Se encontraron {this.state.errors.length} errores</Text>
            {this.state.errors.map((error) => {
                const {id} = error;

                return <Error
                    key={id}
                    data={error}
                    icons={this.props.icons}
                    users={this.state.userland.phone.users}
                    onSelectUser={this.props.onSelectUser}
                />
            })}
        </this.props.layout>
    }
}

export default ViewActivity;