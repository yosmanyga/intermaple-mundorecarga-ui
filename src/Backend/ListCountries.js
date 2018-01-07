import React from "react";
import PropTypes from "prop-types";
import {normalize} from "@yosmy/string";
import {Flag, Input, List, ListItem, Text} from "@yosmy/ui";

export default class ListCountries extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onSelect: PropTypes.func.isRequired, // (iso)
        onError: PropTypes.func.isRequired,
    };

    state = {
        countries: null,
        filter: {
            text: "",
        },
        progress: 0
    };

    componentDidMount() {
        this._handleProgress(
            true,
            () => {
                this.props.api.collectCountries(
                    null,
                )
                    .then((countries) => {
                        this._handleProgress(
                            false,
                            () => {
                                this.setState({
                                    countries: countries
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

        if (this.state.countries === null) {
            return <Layout />;
        }

        return <Layout>
            <Input
                label="Filtrar por nombre"
                value={this.state.filter.text}
                focus
                onChange={(value) => {
                    this.setState({
                        filter: {
                            ...this.state.filter,
                            text: value
                        }
                    });
                }}
                onEnter={() => {
                    const countries = this.state.countries.filter((country) => {
                        const {name} = country;

                        return (
                            this.state.filter.text === ""
                            || normalize(name)
                                .indexOf(
                                    normalize(this.state.filter.text)
                                ) > -1
                        )
                    });

                    if (countries.length === 1) {
                        this.props.onSelect(countries[0].iso);
                    }
                }}
            />
            <List>
                {this.state.countries
                    .filter(({name}) => {
                        return (
                            this.state.filter.text === ""
                            || normalize(name)
                                .indexOf(
                                    normalize(this.state.filter.text)
                                ) > -1
                        );
                    })
                    .map(({iso, name}) => {
                        return <ListItem
                            key={iso}
                            icon={<Flag
                                iso={iso}
                                name={name}
                                size="sm"
                                margin={{right: 1}}
                            />}
                            text={<Text
                                type="h6"
                                margin={{left: 1}}
                            >
                                {name}
                            </Text>}
                            onClick={() => {
                                this.props.onSelect(iso)
                            }}
                        />;
                    })}
            </List>
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Países"
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
