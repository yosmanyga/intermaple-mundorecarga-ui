import React from "react";
import PropTypes from "prop-types";
import {Button, Container, Flag, Text} from "@yosmy/ui";

export default class FinishBock extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        country: PropTypes.object.isRequired,
        account: PropTypes.string.isRequired,
        onNew: PropTypes.func.isRequired, // ()
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
            <Button
                color="primary"
                onClick={this.props.onNew}
                margin={{
                    top: 8
                }}
            >
                <this.props.icons.actions.back />
                <Text>Enviar otra recarga</Text>
            </Button>
        </Container>
    }
}