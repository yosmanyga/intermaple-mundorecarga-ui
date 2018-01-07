import React from "react";
import PropTypes from "prop-types";
import LoginBlock from "./LoginBlock";

export default class ShowLogin extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        referral: PropTypes.bool,
        onAuthenticated: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired,
    };

    state = {
        progress: 0
    };

    render() {
        const Layout = this._buildLayout;

        return <Layout>
            <LoginBlock
                icons={this.props.icons}
                api={this.props.api}
                user={this.props.user}
                referral={this.props.referral}
                onProgress={this._handleProgress}
                onAuthenticated={this.props.onAuthenticated}
            />
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Acceso"
            progress={this.state.progress > 0}
            flex={{
                alignItems: "center"
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
}
