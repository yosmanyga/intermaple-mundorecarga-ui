import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Container, Flag, Image, List, ListItem, Tabs, Tab, Text, Upload, Theme} from "@yosmy/ui";
import PromotionCard from "./PromotionCard";

class ManageCountry extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.shape({
            pickCountry: PropTypes.func.isRequired,
            collectProviders: PropTypes.func.isRequired,
            collectPromotions: PropTypes.func.isRequired,
            promotion: PropTypes.shape({
                updateTitle: PropTypes.func.isRequired,
            }).isRequired,
            country: PropTypes.shape({
                collectPhotos: PropTypes.func.isRequired,
                uploadPhoto: PropTypes.func.isRequired,
                deletePhoto: PropTypes.func.isRequired,
            }).isRequired,
        }).isRequired,
        iso: PropTypes.string.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        country: null,
        tab: 0,
        progress: 0
    };

    componentDidMount() {
        this._handleProgress(
            true,
            () => {
                this.props.api.pickCountry(
                    this.props.iso,
                )
                    .then((country) => {
                        this._handleProgress(
                            false,
                            () => {
                                this.setState({
                                    country: country
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

        if (
            this.state.country === null
            || this.state.providers === null
            || this.state.promotions === null
        ) {
            return <Layout />;
        }

        return <Layout>
            <Container
                flow="row"
            >
                <Flag
                    iso={this.state.country.iso}
                    name={this.state.country.name}
                    size="sm"
                />
                <Text
                    margin={{
                        left: 8
                    }}
                >
                    {this.state.country.name}
                </Text>
            </Container>
            <Container>
                <Text
                    margin={{
                        top: 8
                    }}
                >
                    https://mundorecarga.com/{this.state.country.slug}
                </Text>
            </Container>
            <Tabs
                value={this.state.tab}
                margin={{
                    top: 8
                }}
                onChange={this._handleChangeTab}
            >
                <Tab heading="Fotos" />
                <Tab heading="Proveedores" />
            </Tabs>
            {this.state.tab === 0 && <ManagePhotos
                layout={({children, ...props}) => {
                    return <Container
                        flow="column"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                        }}
                        padding={8}
                        {...props}
                    >
                        {children}
                    </Container>
                }}
                theme={this.props.theme}
                icons={this.props.icons}
                api={{
                    collectPhotos: this.props.api.country.collectPhotos,
                    uploadPhoto: this.props.api.country.uploadPhoto,
                    deletePhoto: this.props.api.country.deletePhoto,
                }}
                iso={this.props.iso}
                onProgress={this._handleProgress}
                onError={this.props.onError}
            />}
            {this.state.tab === 1 && <ListProviders
                layout={({children, ...props}) => {
                    return <Container
                        flow="column"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                        }}
                        padding={8}
                        {...props}
                    >
                        {children}
                    </Container>
                }}
                theme={this.props.theme}
                icons={this.props.icons}
                api={{
                    collectProviders: this.props.api.collectProviders,
                    collectPromotions: this.props.api.collectPromotions,
                    promotion: {
                        updateTitle: this.props.api.promotion.updateTitle,
                    }
                }}
                iso={this.props.iso}
                onProgress={this._handleProgress}
            />}
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Gestionar país"
            progress={this.state.progress > 0}
        >
            {children}
        </this.props.layout>
    };

    _handleChangeTab = (value) => {
        this.setState({
            tab: value
        });
    };

    _handleProgress = (progress, callback = null) => {
        this.setState((prevState) => {
            return {
                progress: prevState.progress + (progress === true ? 1 : -1)
            }
        }, callback);
    };
}

class ManagePhotos extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.shape({
            collectPhotos: PropTypes.func.isRequired,
            uploadPhoto: PropTypes.func.isRequired,
            deletePhoto: PropTypes.func.isRequired,
        }).isRequired,
        iso: PropTypes.string.isRequired,
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        photos: null,
    };

    componentDidMount() {
        this._collectPhotos();
    }

    _collectPhotos = () => {
        this.props.onProgress(
            true,
            () => {
                this.props.api.collectPhotos(
                    this.props.iso,
                )
                    .then((photos) => {
                        this.setState({
                            photos: photos
                        }, () => {
                            this.props.onProgress(
                                false,
                            );
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    };

    render() {
        if (
            this.state.photos === null
        ) {
            return <this.props.layout />;
        }

        return <this.props.layout>
            <Upload
                variant="outlined"
                margin={{
                    top: 8
                }}
                accept="image/*"
                onChange={(file) => {
                    this.props.onProgress(
                        true,
                        () => {
                            this.props.api.uploadPhoto(
                                this.props.iso,
                                file,
                            )
                                .then(() => {
                                    this.props.onProgress(
                                        false,
                                        () => {
                                            this._collectPhotos();
                                        }
                                    )
                                })
                                .catch((response) => {
                                    const {code} = response;

                                    switch (code) {
                                        case "unexpected-exception":
                                            this.props.onProgress(
                                                false,
                                                () => {
                                                    this.props.onError("Ocurrió un error al subir la imagen");
                                                }
                                            );

                                            break;
                                        default:
                                            this.props.onError(response);
                                    }
                                })
                        }
                    );
                }}
            >
                <this.props.icons.actions.upload />
                <Text>Subir foto</Text>
            </Upload>
            {this.state.photos.length > 0
                ? <List>
                    {this.state.photos.map(({id, country, original}) => {
                        return <ListItem
                            key={id}
                            text={<Image
                                source={original}
                                width={400}
                            />}
                            action={<Button
                                onClick={() => {
                                    this.props.onProgress(
                                        true,
                                        () => {
                                            this.props.api.deletePhoto(
                                                id,
                                            )
                                                .then(() => {
                                                    this.setState({
                                                        edit: false
                                                    }, () => {
                                                        this.props.onProgress(
                                                            false,
                                                            () => {
                                                                this._collectPhotos(this.props.onDelete);
                                                            }
                                                        );
                                                    })
                                                })
                                                .catch(this.props.onError)
                                        }
                                    );
                                }}
                            >
                                <this.props.icons.actions.delete/>
                                <Text>Borrar</Text>
                            </Button>}
                        />;
                    })}
                </List>
                : <Text
                    margin={{
                        top: 8
                    }}
                >
                    No hay fotos
                </Text>
            }
        </this.props.layout>;
    }
}

class ListProviders extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.shape({
            collectProviders: PropTypes.func.isRequired,
            collectPromotions: PropTypes.func.isRequired,
            promotion: PropTypes.shape({
                updateTitle: PropTypes.func.isRequired,
            }).isRequired,
        }).isRequired,
        iso: PropTypes.string.isRequired,
        onProgress: PropTypes.func.isRequired,
    };

    state = {
        providers: null,
        promotions: null,
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.collectProviders(
                    null,
                    this.props.iso,
                )
                    .then((providers) => {
                        this.setState({
                            providers: providers
                        }, () => {
                            this.props.onProgress(
                                false,
                            );
                        });
                    })
                    .catch(this.props.onError)
            }
        );

        this._collectPromotions();
    }

    _collectPromotions = (callback = null) => {
        this.props.onProgress(
            true,
            () => {
                this.props.api.collectPromotions(
                    null,
                    null
                )
                    .then((promotions) => {
                        this.props.onProgress(
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
        if (
            this.state.providers === null
            || this.state.promotions === null
        ) {
            return <this.props.layout />;
        }

        return <this.props.layout>
            {this.state.providers.map(({id, name, logo, width, height, products}) => {
                let promotions = this.state.promotions
                    .filter(({provider}) => {
                        return provider === id;
                    })
                    .map((promotion) => {
                        return <PromotionCard
                            key={promotion.id}
                            icons={this.props.icons}
                            api={{
                                updateTitle: this.props.api.promotion.updateTitle
                            }}
                            promotion={promotion}
                            onProgress={this.props.onProgress}
                            onUpdate={(callback) => {
                                this._collectPromotions(callback);
                            }}
                        />;
                    });

                if (promotions.length === 0) {
                    promotions = <Text>No hay promociones</Text>;
                }

                products = products.map(({id, name, min, max, amounts}) => {
                    amounts = amounts.map((amount) => {
                        return <Text
                            key={amount}
                            margin={{
                                left: 8
                            }}
                        >
                            {amount}
                        </Text>
                    });

                    return <Card
                        key={id}
                        header={{
                            title: name,
                            subtitle: id
                        }}
                        content={<React.Fragment>
                            <Container
                                flow="row"
                                align={{
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start'
                                }}
                            >
                                <Text>Mínimo:</Text>
                                <Text margin={{left: 8}}>{min.amount} {min.currency}</Text>
                            </Container>
                            <Container
                                flow="row"
                                align={{
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start'
                                }}
                            >
                                <Text>Máximo:</Text>
                                <Text margin={{left: 8}}>{max.amount} {max.currency}</Text>
                            </Container>
                            <Container
                                flow="row"
                                align={{
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start'
                                }}
                            >
                                <Text>Cantidades creadas: </Text>
                                {amounts}
                            </Container>
                        </React.Fragment>}
                        margin={{
                            top: 8
                        }}
                    />
                });

                if (products.length === 0) {
                    products = <Text>No hay productos</Text>;
                }

                // Trick to put the logo inside a box

                if (width >= 24) {
                    height = height * 24 / width;
                    width = 24;
                } else if (height >= 24) {
                    width = width * 24 / height;
                    height = 24;
                }

                return <Card
                    key={id}
                    header={{
                        avatar: <Image
                            source={logo !== null
                                ? logo
                                : require("../Common/provider.png")
                            }
                            width={logo !== null
                                ? width
                                : 24
                            }
                            height={logo !== null
                                ? height
                                : 24
                            }
                        />,
                        title: name,
                        subtitle: id
                    }}
                    content={<React.Fragment>
                        <Text
                            variant="h6"
                        >
                            Promociones
                        </Text>
                        {promotions}
                        <Text
                            variant="h6"
                            margin={{
                                top: 8
                            }}
                        >
                            Productos
                        </Text>
                        {products}
                    </React.Fragment>}
                    margin={{
                        bottom: 8
                    }}
                />
            })}
        </this.props.layout>;
    }
}

export default Theme.withTheme()(ManageCountry);