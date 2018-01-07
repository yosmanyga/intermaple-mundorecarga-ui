import React from "react";
import PropTypes from "prop-types";
import {format, distance} from "@yosmy/dayjs";
import {Card, Container, Text, Json, Flag, Button} from "@yosmy/ui";

export default class Error extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        icons: PropTypes.object.isRequired,
        users: PropTypes.array,
        onSelectUser: PropTypes.func, // (user)

    };

    render() {
        let {id, user, message, payload, stripe, date} = this.props.data;

        if (this.props.onSelectUser) {
            user = this.props.users.find(({id}) => {
                return id === user;
            });
        }

        return <Card
            key={id}
            header={{
                title: message,
                subtitle: Date.now() - date * 1000 > 60 * 60 * 1000
                    // More than one hour ago
                    ? format(date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")
                    // Less than one hour
                    : distance(Date.now(), date * 1000)
            }}
            content={<Container
                flow="column"
                align={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                }}
            >
                {this.props.onSelectUser && <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                >
                    <Text>Usuario</Text>
                    <Flag
                        iso={user.country}
                        size="sm"
                        border={0}
                        margin={{
                            left: 8
                        }}
                    />
                    <Text
                        margin={{left: 8}}
                    >
                        +{user.prefix}-{user.number}
                    </Text>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            this.props.onSelectUser(user)
                        }}
                    >
                        <this.props.icons.actions.details />
                    </Button>
                </Container>}
                {payload && <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                    width="auto"
                >
                    <Text>Datos de entrada</Text>
                    <Container
                        margin={{
                            left: 8
                        }}
                    >
                        <Json
                            collapsed={true}
                            margin={{}}
                        >
                            {payload}
                        </Json>
                    </Container>
                </Container>}
                {stripe && <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                    margin={{
                        top: 16
                    }}
                    width="auto"
                >
                    <Text>Error de Stripe</Text>
                    <Container
                        margin={{
                            left: 8
                        }}
                    >
                        <Json
                            collapsed={true}
                            margin={{}}
                        >
                            {stripe}
                        </Json>
                    </Container>
                </Container>}
            </Container>}
            margin={{
                top: 8
            }}
        />
    }
}
