import React from "react";
import PropTypes from "prop-types";
import {Card, Checkbox, Container, Flag, Image, Text} from "@yosmy/ui";
import PromotionCard from "./PromotionCard";

export default class ListPromotions extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.shape({
            collectCountries: PropTypes.func.isRequired,
            collectProviders: PropTypes.func.isRequired,
            collectPromotions: PropTypes.func.isRequired,
            promotion: PropTypes.shape({
                updateTitle: PropTypes.func.isRequired
            }).isRequired
        }).isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        filter: {
            favorites: true,
            new: false
        },
        countries: null,
        providers: null,
        promotions: null,
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
                                })
                            }
                        );
                    })
                    .catch(this.props.onError)
            }
        );

        this._handleProgress(
            true,
            () => {
                this.props.api.collectProviders(
                    null,
                    null,
                )
                    .then((providers) => {
                        this._handleProgress(
                            false,
                            () => {
                                this.setState({
                                    providers: providers
                                });
                            }
                        );
                    })
                    .catch(this.props.onError)
            }
        );

        this._collectPromotions();
    }

    _collectPromotions = (callback = null) => {
        this._handleProgress(
            true,
            () => {
                this.props.api.collectPromotions(
                    null,
                    null
                )
                    .then((promotions) => {
                        this._handleProgress(
                            false,
                            () => {
                                this.setState({
                                    promotions: promotions
                                }, callback);
                            }
                        );
                    })
                    .catch(this.props.onError)
            }
        );
    };

    render() {
        const Layout = this._buildLayout;

        if (
            this.state.countries === null
            || this.state.providers === null
            || this.state.promotions === null
        ) {
            return <Layout />;
        }

        return <Layout>
            <Container
                flow="row"
                align={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <Checkbox
                    label="Países favoritos"
                    checked={this.state.filter.favorites}
                    onChange={(value) => {
                        this.setState({
                            filter: {
                                ...this.state.filter,
                                favorites: value
                            }
                        });
                    }}
                />
                <Checkbox
                    label="Promociones nuevas"
                    checked={this.state.filter.new}
                    margin={{
                        left: 8
                    }}
                    onChange={(value) => {
                        this.setState({
                            filter: {
                                ...this.state.filter,
                                new: value
                            }
                        });
                    }}
                />
            </Container>

            {this.state.countries
                // Just leave countries with promotions
                .filter(({iso, favorite}) => {
                    // Apply favorites filter
                    if (this.state.filter.favorites === true && favorite === false) {
                        return false;
                    }

                    let count = 0;

                    this.state.providers
                        .filter(({country}) => {
                            return country === iso;
                        })
                        .forEach(({id}) => {
                            const promotions = this.state.promotions
                                .filter(({provider}) => {
                                    return provider === id;
                                })
                                .filter(({title}) => {
                                    // Apply new filter (promotions with title are not new)
                                    return this.state.filter.new === false || !title;
                                });

                            count += promotions.length
                        });

                    return count > 0;
                })
                .map(({iso, name}) => {
                    let count = 0;

                    this.state.providers
                        .filter(({country}) => {
                            return country === iso;
                        })
                        .forEach(({id}) => {
                            const promotions = this.state.promotions
                                .filter(({provider}) => {
                                    return provider === id;
                                });

                            count += promotions.length
                        });

                    const providers = this.state.providers
                        .filter(({country}) => {
                            return country === iso;
                        })
                        .map(({id, name, logo}) => {
                            const promotions = this.state.promotions
                                .filter(({provider}) => {
                                    return provider === id;
                                })
                                .map((promotion) => {
                                    return <PromotionCard
                                        key={id}
                                        icons={this.props.icons}
                                        api={{
                                            updateTitle: this.props.api.promotion.updateTitle
                                        }}
                                        promotion={promotion}
                                        onProgress={this._handleProgress}
                                        onUpdate={(callback) => {
                                            this._collectPromotions(callback);
                                        }}
                                    />;
                                });

                            if (promotions.length === 0) {
                                return null;
                            }

                            return <Card
                                key={id}
                                header={{
                                    avatar: <Image
                                        source={logo}
                                        width={24}
                                    />,
                                    title: name
                                }}
                                content={promotions}
                                margin={{
                                    bottom: 8
                                }}
                            />
                        });

                    return <Card
                        key={iso}
                        header={{
                            avatar: <Flag
                                iso={iso}
                                name={name}
                                size="sm"
                                margin={{right: 1}}
                            />,
                            title: <Text
                                type="h6"
                                margin={{left: 1}}
                            >
                                {name} ({count === 1 ? "1 promoción" : count + " promociones"})
                            </Text>
                        }}
                        content={providers}
                        margin={{
                            bottom: 8
                        }}
                    />;
                })}
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
