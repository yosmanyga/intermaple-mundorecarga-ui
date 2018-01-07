import React from "react";
import PropTypes from "prop-types";
import {format, distance} from "@yosmy/dayjs";
import {Container, Flag, Platform, Text} from "@yosmy/ui";
import Row from "../Common/Row";

export default class Topup extends React.Component {
    static propTypes = {
        width: PropTypes.string.isRequired,
        icons: PropTypes.object.isRequired,
        data: PropTypes.object.isRequired,
        contact: PropTypes.object,
        onClick: PropTypes.func
    };

    render() {
        let icon, status, color;

        const lastStep = this.props.data.steps[this.props.data.steps.length - 1];

        if (lastStep === "payment") {
            icon = <this.props.icons.topup.steps.delay />;
            status = "Pendiente";
            color = "#ffca28";
        } else if (lastStep === "transfer.exception") {
            icon = <this.props.icons.topup.steps.transfer.exception />;
            status = "Pendiente";
            color = "#ef5350";
        } else if (lastStep === "transfer.success") {
            icon = <this.props.icons.topup.steps.transfer.success />;
            status = "Enviada";
            color = "#66bb6a";
        } else if (lastStep === "refund") {
            icon = <this.props.icons.topup.steps.refund />;
            status = "Fallida. Pago devuelto";
            color = "#ef5350";
        } else {
            throw this.props.data.steps.join(", ");
        }

        return <Row
            left={this.props.contact && <Container
                flow="column"
                align={{
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}
                margin={{
                    right: 8
                }}
                width={64}
            >
                <this.props.icons.objects.contact
                    style={{
                        fontSize: 56,
                        color: "#ccc"
                    }}
                />
            </Container>}
            body={<Container
                flow="column"
                align={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
                style={Platform.select({
                    web: undefined,
                    mobile: {
                        flex: 1
                    }
                })}
                padding={{
                    bottom: 16
                }}
            >
                {this.props.contact && <Text
                    variant="body1"
                >
                    {this.props.contact.name ? this.props.contact.name : "Sin nombre"}
                </Text>}
                {this.props.contact && <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                    margin={{
                        top: 4
                    }}
                >
                    <Flag
                        iso={this.props.contact.country}
                        size="sm"
                        border={0}
                    />
                    <Text
                        margin={{
                            left: 4
                        }}
                    >
                        {this.props.contact.type === "phone"
                            ? `+${this.props.contact.prefix}-${this.props.contact.account}`
                            : (Platform.dimensions.isSmDown(this.props.width)
                                ? `${this.props.contact.account.substring(0, 15)}${this.props.contact.account.length > 15 && "..."}`
                                : `${this.props.contact.account}`)
                        }
                    </Text>
                </Container>}
                <Container
                    flow="row"
                    align={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    width={Platform.select({
                        web: undefined,
                        mobile: "100%"
                    })}
                    margin={{
                        top: 4
                    }}
                >
                    <Text
                        variant="caption"
                        // size={Platform.dimensions.isSmDown(this.props.width) ? 12 : null}
                    >
                        {Date.now() - this.props.data.date * 1000 > 60 * 60 * 1000
                            // More than one hour ago
                            ? format(this.props.data.date * 1000, "D [de] MMMM, YYYY")
                            // Less than one hour
                            : distance(Date.now(), this.props.date * 1000)
                        }
                    </Text>
                    <Text>
                        ${this.props.data.sendValue.toFixed(2)}
                    </Text>
                </Container>
                <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                    margin={{
                        top: 4
                    }}
                >
                    {<icon.type
                        {...icon.props}
                        style={{
                            fontSize: 12,
                            color: color
                        }}
                    />}
                    <Text
                        variant="caption"
                        margin={{
                            left: 4
                        }}
                        style={{
                            color: color
                        }}
                    >
                        {status}
                    </Text>
                </Container>
            </Container>}
            onClick={this.props.onClick}
            padding={{
                ...this.props.padding,
                top: 16
            }}
        />
    }
};
