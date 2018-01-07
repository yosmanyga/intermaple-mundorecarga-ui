import React from "react";
import PropTypes from "prop-types";
import {Button, Container, Error, Image, Platform, Text} from "@yosmy/ui";
import Subtitle from "../Subtitle";
import Row from "../Row";
import Preview from "../Preview";
import gift from "../../Frontend/gift.png";

class SetProviderBlock extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        country: PropTypes.object.isRequired,
        account: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["phone", "email"]),
        provider: PropTypes.object,
        onSet: PropTypes.func.isRequired, // (provider)
        onEdit: PropTypes.func.isRequired, // ()
        onProgress: PropTypes.func.isRequired, // (progress, callback)
        onError: PropTypes.func.isRequired,
    };

    state = {
        detected: true, // Determines whether to show detected providers or all providers
        provider: null,
        error: null,
    };

    componentWillMount() {
        this.setState({
            provider: this.props.provider
                ? this.props.provider
                : false
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            nextState !== this.state
        );
    }

    render() {
        if (this.state.provider === null) {
            return null;
        }

        if (this.state.provider) {
            let {name, logo, width, height, detected} = this.state.provider;

            // Trick to put the logo inside a box

            if (width >= 24) {
                height = height * 24 / width;
                width = 24;
            } else if (height >= 24) {
                width = width * 24 / height;
                height = 24;
            }

            return <React.Fragment>
                <Subtitle
                    margin={{
                        top: 8
                    }}
                >
                    Operadora
                </Subtitle>
                <Preview
                    icons={{
                        close: this.props.icons.actions.close,
                    }}
                    margin={{
                        top: 8,
                        bottom: 8
                    }}
                    left={<Container
                        flow="column"
                        align={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Image
                            source={logo !== null
                                ? logo
                                : require("../provider.png")
                            }
                            margin={{
                                top: 2
                            }}
                            width={logo !== null
                                ? width
                                : 24
                            }
                            height={logo !== null
                                ? height
                                : 24
                            }
                        />
                    </Container>}
                    body={<Container
                        flow="column"
                        align={{
                            alignItems: "flex-start",
                            justifyContent: "flex-start"
                        }}
                    >
                        <Text>{name}</Text>
                        {detected && <Text
                            variant="caption"
                        >
                            Operadora detectada
                        </Text>}
                    </Container>}
                    onUndo={() => {
                        this.setState({
                            detected: false,
                            provider: false,
                            error: null
                        }, this.props.onEdit);
                    }}
                />
                {this.state.error !== null && <Error
                    center
                    margin={{
                        top: 8,
                        bottom: 8
                    }}
                >
                    {this.state.error}
                </Error>}
            </React.Fragment>
        }

        return <React.Fragment>
            {this.state.detected
                ? <ListDetectedProviders
                    layout={({children}) => {
                        return <Container
                            flow="column"
                            align={{
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}
                        >
                            <Subtitle
                                active
                                margin={{
                                    top: 8,
                                }}
                            >
                                Selecciona la operadora
                            </Subtitle>
                            {children}
                            <Button
                                variant="outlined"
                                margin={{
                                    top: 8
                                }}
                                center={Platform.select({
                                    web: undefined,
                                    mobile: true
                                })}
                                onClick={() => {
                                    this.setState({
                                        detected: false
                                    });
                                }}
                            >
                                <Text>Ver todas las operadoras</Text>
                            </Button>
                        </Container>
                    }}
                    icons={this.props.icons}
                    api={this.props.api}
                    country={this.props.country}
                    account={this.props.account}
                    type={this.props.type}
                    onSelect={this._handleSelect}
                    onEmpty={() => {
                        this.setState({
                            detected: false
                        });
                    }}
                    onProgress={this.props.onProgress}
                    onError={this.props.onError}
                />
                : <ListAllProviders
                    layout={({children}) => {
                        return <Container
                            flow="column"
                            align={{
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}
                        >
                            <Subtitle
                                active
                                margin={{
                                    top: 8,
                                }}
                            >
                                Selecciona la operadora
                            </Subtitle>
                            {this.props.provider && <Error
                                center
                                margin={{
                                    top: 8,
                                    bottom: 8
                                }}
                            >
                                Solo cambiar la operadora si estás seguro que tu contacto la cambió en su país.
                            </Error>}
                            {children}
                        </Container>
                    }}
                    icons={this.props.icons}
                    api={this.props.api}
                    country={this.props.country}
                    account={this.props.account}
                    type={this.props.type}
                    onSelect={this._handleSelect}
                    onProgress={this.props.onProgress}
                    onError={this.props.onError}
                />
            }
        </React.Fragment>;
    }

    _handleSelect = (provider) => {
        this.setState({
            provider: provider,
        }, () => {
            this.props.onProgress(
                true,
                () => {
                    this.props.api.testTopup(
                        this.props.country.prefix,
                        this.props.account,
                        this.state.provider.id,
                    )
                        .then(() => {
                            this.props.onProgress(
                                false,
                                () => {
                                    this.props.onSet(provider);
                                }
                            )
                        })
                        .catch((response) => {
                            const {code} = response;

                            switch (code) {
                                case "topup.account-exception":
                                    this.setState({
                                        error: "Se ha producido un error de validación. Por favor, verifica que el número y la operadora sean correctos"
                                    }, () => {
                                        this.props.onProgress(false)
                                    });

                                    break;
                                case "topup.provider-exception":
                                    let error;

                                    // Is Cuba Nauta?
                                    if (this.state.provider.id === "NUCU") {
                                        error = "Se recibió un error desde Etecsa. Por favor revisa que ese correo nauta esté bien"
                                    } else {
                                        error = "En estos momentos no es posible enviar una recarga a esa operadora. Por favor intenta más tarde";
                                    }

                                    this.setState({
                                        error: error
                                    }, () => {
                                        this.props.onProgress(false)
                                    });

                                    break;
                                case "unexpected-exception":
                                    this.setState({
                                        error: "En estos momentos no es posible enviar una recarga a esa operadora. Por favor intenta más tarde"
                                    }, () => {
                                        this.props.onProgress(false)
                                    });

                                    break;
                                default:
                                    this.props.onProgress(
                                        false,
                                        () => {
                                            this.props.onError(response);
                                        }
                                    );
                            }
                        })
                }
            );
        });
    }
}

class ListDetectedProviders extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        country: PropTypes.object.isRequired,
        account: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["phone", "email"]),
        onSelect: PropTypes.func.isRequired, // (provider)
        onEmpty: PropTypes.func.isRequired, // ()
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        providers: null,
        promotions: null
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.detectProviders(
                    this.props.country.prefix,
                    this.props.account,
                    this.props.type
                )
                    .then((providers) => {
                        if (providers.length === 1) {
                            const provider = {
                                ...providers[0],
                                detected: true
                            };

                            this.props.onProgress(
                                false,
                                () => {
                                    this.props.onSelect(provider);
                                }
                            );
                        } else if (providers.length > 1) {
                            this.setState({
                                providers: providers
                            }, () => {
                                this.props.api.collectPromotions(
                                    null,
                                    Date.now() / 1000
                                )
                                    .then((promotions) => {
                                        this.setState({
                                            promotions: promotions
                                        }, () => {
                                            this.props.onProgress(false);
                                        });
                                    })
                                    .catch(this.props.onError);
                            });
                        } else {
                            this.props.onProgress(
                                false,
                                () => {
                                    this.props.onEmpty();
                                }
                            );
                        }
                    })
                    .catch((response) => {
                        const {code} = response;

                        switch (code) {
                            case "invalid-account-exception":
                                this.props.onProgress(
                                    false,
                                    () => {
                                        this.props.onEmpty();
                                    }
                                );

                                break;
                            default:
                                this.props.onProgress(
                                    false,
                                    () => {
                                        this.props.onError(response);
                                    }
                                );

                        }
                    })
            }
        );
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state !== nextState
        );
    }

    render() {
        if (
            this.state.providers === null
            || this.state.promotions === null
        ) {
            return null;
        }

        return <this.props.layout>
            <Providers
                width={this.props.width}
                icons={this.props.icons}
                list={this.state.providers}
                promotions={this.state.promotions}
                onSelect={this.props.onSelect}
            />
        </this.props.layout>
    }
}

class ListAllProviders extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        country: PropTypes.object.isRequired,
        account: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["phone", "email"]),
        onSelect: PropTypes.func.isRequired, // (provider)
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        providers: null
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.findProviders(
                    this.props.country.iso,
                    this.props.country.prefix,
                    this.props.account,
                    this.props.type
                )
                    .then((providers) => {
                        this.setState({
                            providers: providers
                        }, () => {
                            this.props.onProgress(
                                false
                            );
                        });
                    })
                    .catch(this.props.onError);
            }
        );
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state !== nextState
        );
    }

    render() {
        if (this.state.providers === null) {
            return null;
        }

        if (this.state.providers.length === 0) {
            return <this.props.layout>
                <Error>
                    No encontramos operadoras. Por favor verifica que el número es correcto.
                </Error>
            </this.props.layout>
        }

        return <this.props.layout>
            <Providers
                width={this.props.width}
                icons={this.props.icons}
                list={this.state.providers}
                onSelect={this.props.onSelect}
            />
        </this.props.layout>
    }
}

class Providers extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        list: PropTypes.array,
        promotions: PropTypes.array,
        selected: PropTypes.object,
        onSelect: PropTypes.func.isRequired, // (provider)
    };

    render() {
        return <React.Fragment>
            {this.props.list.map((provider) => {
                let {id, name, logo, width, height} = provider;

                if (logo) {
                    // Trick to put the logo inside a box

                    if (width >= 24) {
                        height = height * 24 / width;
                        width = 24;
                    } else if (height >= 24) {
                        width = width * 24 / height;
                        height = 24;
                    }
                } else {
                    logo = require("../provider.png");
                    width = 24;
                    height = 24;
                }

                const promotions = this.props.promotions && this.props.promotions
                    .filter((promotion) => {
                        return promotion.provider === id;
                    })
                    .map(({id, headline}) => {
                        return <Row
                            key={id}
                            body={<Container
                                flow="row"
                                align={{
                                    justifyContent: "flex-start",
                                    alignItems: "center"
                                }}
                                margin={{
                                    left: 24 + 8,
                                    bottom: 4,
                                }}
                            >
                                <Image
                                    source={gift}
                                    style={{
                                        width: 16,
                                        height: 16,
                                    }}
                                />
                                <Text
                                    size={Platform.dimensions.isSmDown(this.props.width) ? 12 : null}
                                    margin={{
                                        left: 8
                                    }}
                                >
                                    {headline}
                                </Text>
                            </Container>}
                            underline={false}
                            margin={{
                                top: 4
                            }}
                        />
                    });

                return <Row
                    key={id}
                    align={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    left={<Container
                        flow="column"
                        align={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        margin={{
                            bottom: 8
                        }}
                    >
                        {this.props.selected && id === this.props.selected.id
                            ? <this.props.icons.objects.selected />
                            : <this.props.icons.objects.unselected />
                        }
                    </Container>}
                    body={<Container
                        flow="column"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                        }}
                        margin={{
                            bottom: 8
                        }}
                    >
                        <Container
                            flow="row"
                            align={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <Container
                                width={24}
                                height={24}
                            >
                                <Image
                                    source={logo}
                                    width={width}
                                    height={height}
                                />
                            </Container>
                            <Text
                                // Size is needed as a workaround for small devices, because text won"t wrap
                                // https://github.com/facebook/react-native/issues/901
                                // https://github.com/facebook/react-native/issues/5361
                                // https://react-native.canny.io/feature-requests/p/flexdirection-row-breaks-wrap-and-forces-content-off-screen
                                size={Platform.dimensions.isSmDown(this.props.width) ? 12 : null}
                                margin={{
                                    left: 8
                                }}
                            >
                                {name}
                            </Text>
                        </Container>
                        {promotions}
                    </Container>}
                    padding={{
                        top: 8
                    }}
                    onClick={() => {
                        this.props.onSelect(provider);
                    }}
                />
            })}
        </React.Fragment>
    }
}

export default Platform.dimensions.withWidth()(SetProviderBlock);
