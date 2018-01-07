import React from "react";
import PropTypes from "prop-types";
import {List, ListItem} from "@yosmy/ui";

export default class ListMetadatas extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onSelect: PropTypes.func.isRequired, // (id)
        onError: PropTypes.func.isRequired,
    };

    state = {
        metadatas: null,
        progress: 0
    };

    componentDidMount() {
        this._handleProgress(
            true,
            () => {
                this.props.api.collectMetadatas()
                    .then((metadatas) => {
                        this._handleProgress(
                            false,
                            () => {
                                this.setState({
                                    metadatas: metadatas
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

        if (this.state.metadatas === null) {
            return <Layout />;
        }

        return <Layout>
            <List>
                {this.state.metadatas.map(({id, description}) => {
                    return <ListItem
                        key={id}
                        text={description}
                        onClick={() => {
                            this.props.onSelect(id)
                        }}
                    />;
                })}
            </List>
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Metadatos"
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
