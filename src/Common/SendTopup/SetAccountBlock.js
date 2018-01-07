import React from "react";
import PropTypes from "prop-types";
import {Button, Container, Flag, Image, Input, Platform, Text} from "@yosmy/ui";
import Subtitle from "../Subtitle";
import Preview from "../Preview";
import ListPromotionsBlock from "../ListPromotionsBlock";

class SetAccountBlock extends React.Component {
    static propTypes = {
        width: PropTypes.string.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        providers: PropTypes.array,
        promotions: PropTypes.array,
        country: PropTypes.object.isRequired,
        account: PropTypes.string,
        photo: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired // Default photo
        ]),
        edit: PropTypes.bool,
        onProgress: PropTypes.func.isRequired, // (progress, callback)
        onSet: PropTypes.func.isRequired, // (account, type)
        onEdit: PropTypes.func.isRequired, // ()
        onBack: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired // ()
    };

    state = {
        edit: true,
        account: "",
        type: "phone", // "phone", "email"
        error: null
    };

    componentWillMount() {
        if (this.props.account) {
            this.setState({
                account: this.props.account,
                edit: false
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.edit !== nextProps.edit
            || this.props.photo !== nextProps.photo
            || this.state !== nextState
        );
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.edit === true) {
            if (prevProps.edit === this.props.edit) {
                // Avoid recursion
                return;
            }

            this.setState({
                edit: true
            })
        }
    }

    render() {
        if (this.state.edit === false) {
            return <React.Fragment>
                <Subtitle>{this.state.type === "phone" ? "Número de teléfono" : "Correo nauta"}</Subtitle>
                <Preview
                    icons={{
                        close: this.props.icons.actions.close,
                    }}
                    margin={{
                        top: 8,
                        bottom: 8
                    }}
                    left={<Container>
                        <Flag
                            iso={this.props.country.iso}
                            size="sm"
                        />
                    </Container>}
                    body={<Container
                        onClick={() => {
                            this.setState({
                                edit: true
                            }, this.props.onEdit);
                        }}
                    >
                        {this.state.type === "phone"
                            ? <Text>
                                +{this.props.country.prefix}-{this.state.account}
                            </Text>
                            : <Text>
                                {this.state.account}@nauta.com.cu
                            </Text>
                        }
                    </Container>}
                    onUndo={() => {
                        this.setState({
                            edit: true
                        }, this.props.onEdit);
                    }}
                />
            </React.Fragment>;
        }

        const photo = <Container
            flow="column"
            align={{
                justifyContent: "flex-start"
            }}
            background={this.props.photo}
            width={Platform.dimensions.get("window").width}
            height={Platform.dimensions.get("window").width / 2}
        >
            <Container
                flow="row"
                margin={{
                    top: 8
                }}
                padding={{
                    top: 4,
                    right: 12,
                    bottom: 4,
                    left: 12,
                }}
                width="auto"
                style={{
                    backgroundColor: "#fff"
                }}
            >
                <Flag
                    iso={this.props.country.iso}
                    size="sm"
                />
                <Text
                    variant="body1"
                    margin={{
                        left: 4
                    }}
                >
                    {this.props.country.name}
                </Text>
            </Container>
        </Container>;

        return <Container
            flow="column"
            align={{
                alignItems: "center"
            }}
        >
            {Platform.select({
                android: photo,
                ios: photo,
            })}

            {Platform.select({
                web: <Container
                    flow="row"
                    margin={{
                        top: 8
                    }}
                    padding={{
                        top: 4,
                        right: 12,
                        bottom: 4,
                        left: 12,
                    }}
                    width="auto"
                    style={{
                        backgroundColor: "#fff"
                    }}
                >
                    <Flag
                        iso={this.props.country.iso}
                        size="sm"
                    />
                    <Text
                        variant="body1"
                        margin={{
                            left: 4
                        }}
                        wrap={false}
                    >
                        {this.props.country.name}
                    </Text>
                </Container>
            })}

            <Subtitle
                active
                margin={{
                    top: 8
                }}
            >
                {this.state.type === "phone" ? "Escribe el número de teléfono a recargar" : "Escribe el correo nauta a recargar"}
            </Subtitle>
            <Input
                rounded
                start={this.state.type === "phone"
                    ? `+${this.props.country.prefix}`
                        // Put a minus sign to separate prefix from number
                        + (this.state.account !== "" ? "-" : "")
                    : undefined
                }
                end={this.state.type === "email" && "@nauta.com.cu"}
                error={this.state.error}
                value={this.state.account}
                keyboard={this.state.type === "phone" ? "numeric" : "default"}
                capitalize={this.state.type === "email" ? "none" : undefined}
                onChange={(value) => {
                    this.setState({
                        account: value
                    });
                }}
                onEnter={this._handleSet}
                width={this.state.type === "phone" ? 200 : 250}
                margin={{
                    top: 8
                }}
            />
            <Container
                flow="row wrap"
                align={{
                    justifyContent: "center",
                    alignItems: "flex-start"
                }}
                margin={{
                    top: 8,
                    bottom: 8
                }}
            >
                <Button
                    variant="outlined"
                    margin={4}
                    center={Platform.select({
                        mobile: true
                    })}
                    onClick={this.props.onBack}
                >
                    <this.props.icons.actions.back />
                    <Text>Cambiar país</Text>
                </Button>
                <Button
                    color="primary"
                    margin={4}
                    center={Platform.select({
                        mobile: true
                    })}
                    onClick={() => {
                        this._handleSet();
                    }}
                >
                    <Text>Continuar</Text>
                    <this.props.icons.actions.forward />
                </Button>
            </Container>
            {this.props.country.iso === "CU" && <Button
                variant="outlined"
                margin={{
                    top: 24,
                    bottom: 24,
                }}
                padding={{
                    right: 16
                }}
                center
                onClick={() => {
                    this.setState({
                        type: this.state.type === "phone" ? "email" : "phone",
                        account: ""
                    });
                }}
            >
                {this.state.type === "phone"
                    ? [
                        <Text
                            key={1}
                        >
                            Recargar
                        </Text>,
                        <Image
                            key={2}
                            source={require("./nauta.png")}
                            width={20 * 279 / 80}
                            height={20}
                            margin={{
                                left: Platform.select({
                                    web: 8,
                                    mobile: 0
                                }),
                                bottom: Platform.dimensions.isSmDown(this.props.width)
                                    ? 4
                                    : 6
                            }}
                        />,
                        <Text
                            key={3}
                            margin={{
                                left: Platform.select({
                                    web: 8,
                                    mobile: 0
                                })
                            }}
                        >
                            (WiFi)
                        </Text>
                    ]
                    : <Text>Recargar un teléfono</Text>
                }
            </Button>}
            {this.props.promotions !== null && this.props.promotions.length
                ? <React.Fragment>
                    <Subtitle>Promociones para {this.props.country.name}</Subtitle>
                    <ListPromotionsBlock
                        providers={this.props.providers}
                        promotions={this.props.promotions}
                        padding={8}
                    />
                    <Container
                        flow="column"
                        align={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        padding={8}
                        style={{
                            backgroundColor: "#fcf8e3",
                        }}
                    >
                        <Text
                            style={Platform.select({
                                mobile: {
                                    textAlign: "center"
                                }
                            })}
                        >
                            Para disfrutar de las promociones, seguir los pasos escribiendo el número a recargar al inicio de esta página.
                        </Text>
                        <Text
                            margin={{
                                top: 8
                            }}
                            style={Platform.select({
                                mobile: {
                                    textAlign: "center"
                                }
                            })}
                        >
                            Escríbenos a info@mundorecarga.com para cualquier pregunta.
                        </Text>
                    </Container>
                </React.Fragment>
                : null
            }
        </Container>
    }

    _handleSet = () => {
        this.setState({
            error: null
        }, () => {


            this.props.onProgress(
                true,
                () => {
                    this.props.api.validateAccount(
                        this.state.account,
                        this.state.type
                    )
                        .then(() => {
                            this.setState({
                                edit: false
                            }, () => {
                                let account = this.state.account;

                                if (this.state.type === "phone") {
                                    // Remove all but numbers
                                    account = account.replace(/\D/g,'');

                                    if (this.props.country.iso === "CU") {
                                        if (account.length === 6) {
                                            account = "53" + account;
                                        }
                                    }
                                } else {
                                    account = account.replace(" ", "");

                                    account = account.toLowerCase();

                                    const parts = account.split("@");
                                    if (parts[0]) {
                                        account = parts[0];
                                    }
                                }

                                this.setState({
                                    account: account
                                }, () => {
                                    this.props.onProgress(
                                        false,
                                        () => {
                                            this.props.onSet(
                                                this.state.type === "email"
                                                    ? `${account}@nauta.com.cu`
                                                    : account,
                                                this.state.type
                                            )
                                        }
                                    );
                                });
                            })
                        })
                        .catch((response) => {
                            const {code} = response;

                            switch (code) {
                                case "invalid-account-exception":
                                    this.setState({
                                        error: this.state.type === "phone"
                                            ? "El numero es incorrecto"
                                            : "El correo es incorrecto"
                                    }, () => {
                                        this.props.onProgress(
                                            false
                                        );
                                    });

                                    break;
                                default:
                                    this.props.onError(response);
                            }
                        })
                }
            );
        });
    };
}

export default SetAccountBlock;
