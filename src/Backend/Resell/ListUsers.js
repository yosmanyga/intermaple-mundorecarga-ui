import React from "react";
import PropTypes from "prop-types";
import {List, ListItem} from "@yosmy/ui";

export default class ListUsers extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onSelect: PropTypes.func.isRequired, // (user)
        onError: PropTypes.func.isRequired,
    };

    state = {
        users: null,
        progress: 0
    };

    componentDidMount() {
        this._handleProgress(
            true,
            () => {
                this.props.api.reseller.collectUsers()
                    .then((users) => {
                        this._handleProgress(
                            false,
                            () => {
                                this.setState({
                                    users: users
                                });
                            }
                        );
                    })
                    .catch(this.props.onError)
            }
        );
    }

    render() {
        const Layout = this._buildLayout;

        if (this.state.users === null) {
            return <Layout />;
        }

        return <Layout>
            <List>
                {this.state.users.map((user) => {
                    const {id, name} = user;

                    return <ListItem
                        key={id}
                        text={name}
                        onClick={() => {
                            this.props.onSelect(user);
                        }}
                    />;
                })}
            </List>
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Revendedores"
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
