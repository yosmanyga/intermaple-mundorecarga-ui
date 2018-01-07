import React from "react";
import PropTypes from "prop-types";
import {Badge, Button, Container, Flag, Image, Platform, Theme, Text} from "@yosmy/ui";
import arrow from "../Common/arrow.png";

class ShowWelcome extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.shape({
            collectCountries: PropTypes.func.isRequired,
            collectProviders: PropTypes.func.isRequired,
            collectPromotions: PropTypes.func.isRequired,
        }),
        onSelect: PropTypes.func.isRequired, // (country)
        onBegin: PropTypes.func.isRequired, // ()
        onNavigateToAboutUs: PropTypes.func.isRequired, // ()
        onNavigateToTermsAndConditions: PropTypes.func.isRequired, // ()
        onNavigateToPrivacyPolicy: PropTypes.func.isRequired, // ()
        onNavigateToAndroidApp: PropTypes.func.isRequired, // ()
        onNavigateToIosApp: PropTypes.func.isRequired, // ()
        onNavigateToFacebookPage: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired,
    };

    state = {
        progress: 0,
        countries: null,
        providers: null,
        promotions: null,
    };

    componentDidMount() {
        this._handleProgress(
            true,
            () => {
                Promise.all([
                    this.props.api.collectCountries(
                        null,
                    ),
                    this.props.api.collectProviders(
                        null,
                        null,
                    ),
                    this.props.api.collectPromotions(
                        null,
                        Date.now() / 1000
                    )
                ])
                    .then((values) => {
                        this.setState({
                            countries: values[0],
                            providers: values[1],
                            promotions: values[2]
                        }, () => {
                            this._handleProgress(
                                false
                            );
                        })
                    })
                    .catch(this.props.onError)

            }
        );
    }

    render() {
        const Layout = this._buildLayout;

        if (
            this.state.countries === null
            || this.state.providers === null
            || this.state.promotions === null
        ) {
            return <Layout />;
        }

        const countries = this.state.countries
            .filter(({favorite}) => {
                return favorite === true;
            })
            .map((country) => {
                return this._renderCountry(country);
            })
            .filter(x => x);

        return <Layout
            style={{
                backgroundColor: "#fff"
            }}
        >
            <Container
                center
                padding={{
                    top: 90,
                    bottom: 30,
                }}
                background={{
                    image: require("../Common/city.jpg"),
                    size: "cover"
                }}
            >
                <Container
                >
                    <Text
                        center
                        margin={{
                            bottom: 30
                        }}
                        style={{
                            fontSize: Platform.dimensions.isSmDown(this.props.width)
                                ? "20px" : "50px",
                            color: "white",
                            textAlign: "center"
                        }}
                    >
                        Recargas a móviles de todo el mundo
                    </Text>
                </Container>
                <Container
                >
                    <Text
                        margin={{
                            bottom: 30
                        }}
                        style={{
                            color: "white",
                            fontSize: Platform.dimensions.isSmDown(this.props.width)
                                ? "14px" : "20px",
                            textAlign: "center"
                        }}
                    >
                        Enviamos recargas a cualquier teléfono de manera instantánea
                    </Text>
                </Container>
                <Container
                    padding={24}
                >
                    <Container
                        flow="row wrap"
                        padding={{
                            top: 16,
                            right: 8,
                            bottom: 16,
                            left: 8
                        }}
                        background="#fff"
                        style={{
                            opacity: "0.9"
                        }}
                    >
                        {countries}
                    </Container>
                </Container>
                <Container
                    margin={{
                        top: 30
                    }}
                >
                    <Button
                        color="primary"
                        onClick={this.props.onBegin}
                        style={{
                            backgroundColor: "#00CC33"
                        }}
                    >
                        <Text>Ver todos los países</Text>
                    </Button>
                </Container>
            </Container>
            <Container>
                <Container
                    flow="row"
                    align={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    margin={{
                        top: 32,
                        bottom: 24
                    }}
                    padding={{
                        bottom: 24
                    }}
                    style={{
                        backgroundImage: `url(${arrow})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center bottom",
                    }}
                >
                    <Text
                        variant="body2"
                        margin={{
                            right: 4
                        }}
                    >
                        ¿Cuáles son las ventajas de
                    </Text>
                    <Image
                        source={require("../Common/logo_h.png")}
                        width={100}
                    />
                    <Text
                        variant="body2"
                        margin={{
                            left: 4
                        }}
                    >
                        ?
                    </Text>
                </Container>
                <Container
                    flow={Platform.dimensions.isSmDown(this.props.width)
                        ? "column"
                        : "row"
                    }
                    align={Platform.dimensions.isSmDown(this.props.width)
                        ? {
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }
                        : {
                            justifyContent: "center",
                            alignItems: "flex-start"
                        }
                    }
                >
                    <Container
                        width={Platform.dimensions.isSmDown(this.props.width)
                            ? "100%" : "25%"}
                    >
                        <Info
                            theme={this.props.theme}
                            icon={this.props.icons.welcome.global}
                            title="Es global"
                            text="Puedes enviar recargas a cualquier persona que la necesite, no importa donde se encuentre"
                        />
                    </Container>
                    <Container
                        width={Platform.dimensions.isSmDown(this.props.width)
                            ? "100%" : "25%"}
                    >
                        <Info
                            theme={this.props.theme}
                            icon={this.props.icons.welcome.fast}
                            title="Es fácil y rápido"
                            text="Con sencillos pasos tus familiares y amigos recibirán la recarga en su teléfono al momento"
                        />
                    </Container>
                    <Container
                        width={Platform.dimensions.isSmDown(this.props.width)
                            ? "100%" : "25%"}
                    >
                        <Info
                            theme={this.props.theme}
                            icon={this.props.icons.welcome.cheap}
                            title="Es económico"
                            text="Sabemos lo importante que es la comunicación para ti, así que ofrecemos más minutos por tu dinero que nadie más"
                        />
                    </Container>
                </Container>
                <Container
                    margin={{
                        top: 24,
                        bottom: 24
                    }}
                    padding={{
                        bottom: 24
                    }}
                    style={{
                        backgroundImage: `url(${arrow})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center bottom",
                    }}
                >
                    <Text
                        variant="body2"
                    >
                        Descarga nuestra App!
                    </Text>
                </Container>
                <Container
                    flow={Platform.dimensions.isSmDown(this.props.width)
                        ? "column"
                        : "row"
                    }
                    align={Platform.dimensions.isSmDown(this.props.width)
                        ? {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                        : {
                            justifyContent: "center",
                            alignItems: "flex-start"
                        }
                    }
                >
                    <Image
                        source={require("./google.png")}
                        onClick={this.props.onNavigateToAndroidApp}
                        margin={24}
                    />
                    <Image
                        source={require("./apple.png")}
                        onClick={this.props.onNavigateToIosApp}
                        margin={24}
                    />
                </Container>
                <Container
                    margin={{
                        top: 64,
                        bottom: 24
                    }}
                    padding={{
                        bottom: 24
                    }}
                    style={{
                        backgroundImage: `url(${arrow})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center bottom",
                    }}
                >
                    <Text
                        variant="body2"
                    >
                        Nuestra cobertura es mundial
                    </Text>
                </Container>
                <Image
                    source={require("./coverage.png")}
                    title="Cobertura"
                    onClick={this.props.onBegin}
                    style={{
                        width: "100%"
                    }}
                />
                <Container
                    flow="row"
                    margin={{
                        top: 16
                    }}
                    align={{
                        justifyContent: "flex-end",
                    }}
                >
                    <Image
                        source={require("./facebook.png")}
                        title="Síguenos en Facebook"
                        onClick={this.props.onNavigateToFacebookPage}
                        width={150}
                    />
                    <Button
                        variant="text"
                        onClick={this.props.onNavigateToPrivacyPolicy}
                        margin={{
                            left: 8,
                            right: 8
                        }}
                    >
                        <this.props.icons.objects.page />
                        <Text>Política de Privacidad</Text>
                    </Button>
                </Container>
            </Container>
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            progress={this.state.progress > 0}
        >
            {children}
        </this.props.layout>
    };

    _renderCountry(country) {
        const {iso, name} = country;

        // Countries with no flag
        if (
            iso === 'AN'
            || iso === 'XK'
        ) {
            return null;
        }

        const providers = this.state.providers
            .filter((provider) => {
                return provider.country === iso;
            })
            .map(({id}) => {
                return id
            });

        const promotions = this.state.promotions
            .filter((promotion) => {
                return providers.indexOf(promotion.provider) > -1
            });

        let flag = <Flag
            iso={iso}
            size="lg"
        />;

        if (promotions.length > 0) {
            flag = <Badge
                content={promotions.length}
                color="secondary"
            >
                {flag}
            </Badge>
        }

        return <Container
            key={iso}
            flow="column"
            align={{
                alignItems: "center",
                justifyContent: "flex-start"
            }}
            margin={{
                bottom: Platform.select({
                    web: 16,
                    android: 0,
                    ios: 0,
                })
            }}
            padding={Platform.select({
                web: 16,
                android: 8,
                ios: 8
            })}
            width={Platform.select({
                web: 110,
                mobile: Platform.dimensions.isXsDown(this.props.width) ? 90 : 110,
            })}
            height={Platform.select({
                web: 110,
                mobile: Platform.dimensions.isXsDown(this.props.width) ? 90 : 110,
            })}
            onClick={() => {
                this.props.onSelect(country);
            }}
            style={Platform.select({
                web: {
                    textAlign: "center",
                }
            })}
        >
            {flag}
            <Text
                center
                margin={{
                    top: 4
                }}
                style={{
                    fontSize: Platform.select({
                        web: 14,
                        android: 10,
                        ios: 12
                    }),
                    textAlign: Platform.select({
                        web: "inherit",
                        android: "center",
                        ios: "center"
                    })
                }}
            >
                {name}
            </Text>
        </Container>
    }

    _handleProgress = (progress, callback = null) => {
        this.setState((prevState) => {
            return {
                progress: prevState.progress + (progress === true ? 1 : -1)
            }
        }, callback);
    };
}

class Info extends React.Component {
    static propTypes = {
        theme: PropTypes.object.isRequired,
        icon: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    };

    render() {
        const {icon, title, text, ...props} = this.props;

        const Icon = icon;

        return <Container
            flow="row"
            align={{
                alignItems: "flex-start",
            }}
            margin={{
                bottom: 24
            }}
            {...props}
        >
            <Container
                flow="column"
                align={{
                    justifyContent: "flex-start",
                    alignItems: "flex-end"
                }}
                width={72}
                height={72}
            >
                <Icon
                    style={{
                        fontSize: 60,
                        color: "#1A7BBD"
                    }}
                />
            </Container>
            <Container
                align={{
                    alignItems: "flex-start"
                }}
                margin={{
                    left: 8
                }}
            >
                <Text
                    variant="body2"
                    margin={{
                        bottom: 1
                    }}
                >
                    {title}
                </Text>
                <Text>
                    {text}
                </Text>
            </Container>
        </Container>
    }
}

export default Platform.dimensions.withWidth()(Theme.withTheme()(ShowWelcome));