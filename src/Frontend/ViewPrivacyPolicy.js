import React from "react";
import PropTypes from "prop-types";
import {Button, Markdown, Platform, Text} from "@yosmy/ui";

export default class ViewPrivacyPolicy extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired,
    };

    state = {
        text: null,
        progress: 0,
    };

    componentWillMount = () => {
        Platform.back.add(this._handleBack);
    };

    componentDidMount() {
        this._handleProgress(
            true,
            () => {
                this.props.api.pickMetadata(
                    "privacy-policy-text"
                )
                    .then(({value}) => {
                        this.setState({
                            text: value
                        }, () => {
                            this._handleProgress(false);
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    }

    componentWillUnmount() {
        Platform.back.remove(this._handleBack);
    }

    render() {
        const Layout = this._buildLayout;

        if (this.state.text === null) {
            return <Layout />;
        }

        return <Layout>
            <Markdown
                margin={8}
            >
                {this.state.text}
            </Markdown>
            <Button
                color="primary"
                center
                onClick={this.props.onBack}
            >
                <this.props.icons.actions.back />
                <Text>Regresar</Text>
            </Button>
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Política de privacidad"
            progress={this.state.progress > 0}
            align={{
                alignItems: "flex-start"
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

    _handleBack = () => {
        this.props.onBack();

        return true;
    };
};
