import React from "react";
import PropTypes from "prop-types";
import {Container, Button, Image, Platform, Text} from "@yosmy/ui";
import {format} from "@yosmy/dayjs";
import Row from "./Row";

class ListPromotionsBlock extends React.Component {
    static propTypes = {
        providers: PropTypes.array,
        promotions: PropTypes.array
    };

    state = {
        promotion: null,
    };

    render() {
        return <Container
            padding={this.props.padding}
            background="#fcf8e3"
        >
            {this.props.promotions.map((promotion) => {
                let logo, width, height;

                if (this.props.providers) {
                    const provider = this.props.providers.find(({id}) => {
                        return id === promotion.provider
                    });

                    if (provider.logo !== null) {
                        logo = provider.logo;
                        width = provider.width;
                        height = provider.height;
                    } else {
                        logo = require("./provider.png");
                        width = 24;
                        height = 24;
                    }

                    // Trick to put the logo inside a box

                    if (width >= 24) {
                        height = height * 24 / width;
                        width = 24;
                    } else if (height >= 24) {
                        width = width * 24 / height;
                        height = 24;
                    }
                } else {
                    logo = require("../Frontend/gift.png");
                    width = 24;
                    height = 24;
                }

                return <Row
                    key={promotion.id}
                    left={<Container
                        width={24}
                        height={24}
                    >
                        <Image
                            source={logo}
                            width={width}
                            height={height}
                            margin={{
                                top: 4
                            }}
                        />
                    </Container>}
                    body={<Container
                        flow="column"
                        margin={{
                            left: 8,
                            bottom: 0
                        }}
                    >
                        <Text
                            variant="subtitle2"
                        >
                            {promotion.title || promotion.type}
                        </Text>
                        <Text
                            style={{
                                color: "#883A3E"
                            }}
                        >
                            {/* Del 31 Ene al 2 Feb, 2018 */}
                            {/* Del 12 al 17 Feb, 2018 */}
                            {"Del "}{format(promotion.start * 1000, "D")}
                            {format(promotion.start * 1000, "MMMM") !== format(promotion.end * 1000, "MMMM") ? " " + format(promotion.start * 1000, "MMMM") : null}
                            {" al "}{format(promotion.end * 1000, "D")} {format(promotion.end * 1000, "MMMM")}
                            {", "}{format(promotion.end * 1000, "YYYY")}
                        </Text>
                        {promotion === this.state.promotion
                            ? <React.Fragment>
                                <Text
                                    margin={{
                                        top: 8,
                                        right: 8
                                    }}
                                >
                                    {promotion.validity}
                                </Text>
                                <Text
                                    margin={{
                                        top: 8,
                                        right: 8
                                    }}
                                >
                                    {promotion.terms}
                                </Text>
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={() => {
                                        this.setState({
                                            promotion: null
                                        });
                                    }}
                                    margin={Platform.select({
                                        web: {
                                            top: 8,
                                            right: 0,
                                            bottom: 0,
                                            left: 0
                                        },
                                        mobile: 0
                                    })}
                                    padding={0}
                                >
                                    <Text
                                        margin={Platform.select({
                                            mobile: 0
                                        })}
                                        padding={0}
                                    >
                                        Ocultar detalles
                                    </Text>
                                </Button>
                            </React.Fragment>
                            : <Button
                                variant="text"
                                color="primary"
                                size="small"
                                onClick={() => {
                                    this.setState({
                                        promotion: promotion
                                    });
                                }}
                                margin={Platform.select({
                                    web: 0
                                })}
                                padding={0}
                            >
                                <Text
                                    margin={Platform.select({
                                        web: 0,
                                    })}
                                    padding={0}
                                >
                                    Mostrar detalles
                                </Text>
                            </Button>
                        }
                    </Container>}
                    padding={{
                        top: 8,
                        bottom: 8
                    }}
                    underline={false}
                />
            })}
        </Container>
    };
}

export default Platform.dimensions.withWidth()(ListPromotionsBlock);
