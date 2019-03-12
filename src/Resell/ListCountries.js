import React from "react";
import PropTypes from "prop-types";
import {Platform} from "@yosmy/ui";
import ListCountriesBlock from "../Common/ListCountriesBlock";

class ListCountries extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        api: PropTypes.object.isRequired,
        onSelect: PropTypes.func.isRequired, // (country)
        onError: PropTypes.func.isRequired,
    };

    state = {
        countries: null,
        progress: 0,
    };

    componentWillMount() {
        Platform.back.add(this._handleBack);
    }

    componentDidMount() {
        this._handleProgress(
            true,
            () => {
                this.props.api.reseller.collectProviders()
                    .then((providers) => {
                        providers = providers.map(({pid}) => {
                            return pid;
                        });

                        this.props.api.collectProviders(
                            providers,
                            null
                        )
                            .then((providers) => {
                                const countries = providers.map(({country}) => {
                                    return country;
                                });

                                this.props.api.collectCountries(
                                    countries
                                )
                                    .then((countries) => {
                                        this.setState({
                                            countries: countries
                                        }, () => {
                                            this._handleProgress(
                                                false
                                            );
                                        });
                                    })
                                    .catch(this.props.onError);
                            })
                            .catch(this.props.onError);
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

        if (this.state.countries === null) {
            return <Layout />;
        }

        return <ListCountriesBlock
            layout={Layout}
            countries={this.state.countries}
            fav={false}
            onSelect={this.props.onSelect}
        />
    }

    _handleBack = () => {
        return false;
    };

    _handleProgress = (progress, callback = null) => {
        this.setState((prevState) => {
            return {
                progress: prevState.progress + (progress === true ? 1 : -1)
            }
        }, callback);
    };

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Nueva recarga"
            progress={this.state.progress > 0}
        >
            {children}
        </this.props.layout>
    };
}

export default ListCountries;