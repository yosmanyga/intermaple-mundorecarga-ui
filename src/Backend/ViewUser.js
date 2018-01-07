import React from "react";
import PropTypes from "prop-types";
import BaseViewUser from "./ViewUser.inc";

export default class ViewUser extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onBack: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        progress: 0
    };

    render() {
        return <BaseViewUser
            layout={this._buildLayout}
            icons={this.props.icons}
            api={this.props.api}
            id={this.props.id}
            onBack={this.props.onBack}
            onProgress={this._handleProgress}
            onError={this.props.onError}
        />
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            title="Usuario"
            left={{
                icon: <this.props.icons.actions.back />,
                onClick: this.props.onBack
            }}
            progress={this.state.progress > 0}
            {...props}
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
