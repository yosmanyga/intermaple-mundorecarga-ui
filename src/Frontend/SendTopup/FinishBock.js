import React from "react";
import PropTypes from "prop-types";
import {Button, Container, Flag, Image, Platform, Text} from "@yosmy/ui";

export default class FinishBock extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        country: PropTypes.object.isRequired,
        account: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["phone", "email"]),
        name: PropTypes.string,
        onFinish: PropTypes.func.isRequired, // ()
        onNavigateToAndroidApp: PropTypes.func.isRequired, // ()
        onNavigateToIosApp: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired, // ()
    };

    render() {
        return <Container
            margin={{
                top: 8
            }}
            style={{
                alignItems: "center",
            }}
        >
            <this.props.icons.objects.check
                style={{
                    color: "green",
                    fontSize: 108
                }}
            />
            <Text>La recarga se ha realizado exitosamente</Text>
            <Flag
                iso={this.props.country.iso}
                size="sm"
                margin={{
                    top: 8
                }}
            />
            <Text
                margin={{
                    top: 4
                }}
            >
                {this.props.type === "phone"
                    ? `${this.props.country.prefix}-${this.props.account}`
                    : this.props.account
                }
            </Text>
            {this.props.name ? <Text
                variant="caption"
                margin={{
                    top: 4
                }}
            >
                {this.props.name}
            </Text> : null}
            {Platform.select({
                web: <Container
                    margin={{
                        top: 32
                    }}
                >
                    <Text variant="body1">
                        Haz tu próxima recarga desde el App!
                    </Text>
                    <Container
                        flow="row wrap"
                        align={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Image
                            source={require("../google.png")}
                            onClick={this.props.onNavigateToAndroidApp}
                            margin={24}
                        />
                        <Image
                            source={require("../apple.png")}
                            onClick={this.props.onNavigateToIosApp}
                            margin={24}
                        />
                    </Container>
                </Container>
            })}
            <Button
                variant="text"
                onClick={this.props.onFinish}
                center
                margin={{
                    top: 32
                }}
            >
                <this.props.icons.actions.search />
                <Text>Ver historial</Text>
            </Button>
            {Platform.select({
                mobile: <Container
                    flow="column"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                    margin={{
                        top: 32,
                        bottom: 8
                    }}
                    padding={32}
                    border={{
                        top: {
                            width: 1,
                            color: "#ccc",
                            style: "solid"
                        }
                    }}
                >
                    <Image
                        source={require("../../Common/logo_v.png")}
                        width={200}
                        height={1157 * 200 / 2362}
                    />
                    <Text
                        margin={{
                            top: 8
                        }}
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        Rápido y económico
                    </Text>
                    <Text
                        margin={{
                            top: 16
                        }}
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        Ayuda a tus amigos a ahorrar dinero compartiendo el App
                    </Text>
                    <Button
                        color="primary"
                        margin={{
                            top: 16
                        }}
                        center
                        onClick={() => {
                            Platform.share(
                                "Prueba MundoRecarga para enviar recargas",
                                "En estos momentos usé MundoRecarga, es la aplicación más fácil y económica para enviar las recargas. Te la recomiendo! www.mundorecarga.com"
                            )
                                .then(() => {})
                                .catch(this.props.onError)
                        }}
                    >
                        <Text>Compartir MundoRecarga</Text>
                    </Button>
                </Container>
            })}
        </Container>
    }
}