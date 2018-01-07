import React from "react";
import {Button, Container, Error, Text} from "@yosmy/ui";
import PropTypes from "prop-types";

export class ServerErrorMessage extends React.Component {
    render() {
        return <Message
            message={[
                "Se ha producido un error interno",
                "Nuestro equipo trabajará para solucionarlo",
                "Por favor intenta más tarde"
            ]}
        />
    }
}

export class ConnectionErrorMessage extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        onRetry: PropTypes.func.isRequired,
    };

    render() {
        return <Message
            icons={this.props.icons}
            message={[
                "Se ha producido un problema con la red",
                "Por favor comprueba tu conexión a internet"
            ]}
            onRetry={this.props.onRetry}
        />
    }
}

class Message extends React.Component {
    static propTypes = {
        icons: PropTypes.object,
        message: PropTypes.array.isRequired,
        onRetry: PropTypes.func,
    };

    render() {
        return <Container
            flow="column"
            align={{
                justifyContent: "flex-start",
                alignItems: "center"
            }}
            margin={{
                top: 64
            }}
        >
            {this.props.message.map((message, i) => {
                return <Error
                    key={i}
                    margin={{
                        top: 1
                    }}
                >
                    {message}
                </Error>
            })}
            {this.props.onRetry && <Button
                color="primary"
                margin={{top: 8}}
                center
                onClick={this.props.onRetry}
            >
                <this.props.icons.actions.retry />
                <Text>Reintentar</Text>
            </Button>}
        </Container>
    };
}
