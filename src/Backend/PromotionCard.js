import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Container, Input, Text,} from "@yosmy/ui";
import {format} from "@yosmy/dayjs";

export default class PromotionCard extends React.Component  {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.shape({
            updateTitle: PropTypes.func.isRequired
        }).isRequired,
        promotion: PropTypes.object.isRequired,
        onProgress: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired // (callback),
    };

    state = {
        edit: false,
        title: null
    };

    componentDidMount() {
        this.setState({
            title: this.props.promotion.title
        });
    }

    render() {
        const {id, title, headline, type, minimum, currency, validity, terms, start, end} = this.props.promotion;

        return <Card
            key={id}
            margin={{
                top: 8
            }}
            content={<Container
                flow="column"
                align={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                }}
                margin={{
                    bottom: 8
                }}
            >
                {this.state.edit === false
                    ? <Container
                        flow="row"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        {this.state.title
                            ? <React.Fragment>
                                <Text
                                    variant="body2"
                                >
                                    Título personalizado:
                                </Text>
                                <Text
                                    margin={{
                                        left: 8
                                    }}
                                >
                                    {title}
                                </Text>
                                <Button
                                    variant="outlined"
                                    margin={{
                                        left: 8
                                    }}
                                    onClick={() => {
                                        this.setState({
                                            edit: true
                                        });
                                    }}
                                >
                                    <this.props.icons.actions.edit />
                                    <Text>Editar</Text>
                                </Button>
                            </React.Fragment>
                            : <React.Fragment>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        this.setState({
                                            edit: true
                                        });
                                    }}
                                >
                                    <this.props.icons.actions.edit />
                                    <Text>Asignar título personalizado</Text>
                                </Button>
                            </React.Fragment>
                        }
                    </Container>
                    : <Container
                        flow="row"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Input
                            label="Título personalizado"
                            value={this.state.title}
                            width="full"
                            focus
                            onChange={(value)  => {
                                this.setState({
                                    title: value
                                })
                            }}
                            onEnter={this._handleUpdate}
                        />
                        <Button
                            variant="outlined"
                            margin={{
                                left: 8
                            }}
                            onClick={() => {
                                this.setState({
                                    edit: false
                                })
                            }}
                        >
                            <this.props.icons.actions.back />
                            <Text>Cancelar</Text>
                        </Button>
                        <Button
                            color="primary"
                            margin={{
                                left: 8
                            }}
                            onClick={this._handleUpdate}
                        >
                            <this.props.icons.actions.ok />
                            <Text>Guardar</Text>
                        </Button>
                    </Container>
                }
                <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <Text
                        variant="body2"
                    >
                        Mínimo:
                    </Text>
                    <Text
                        margin={{
                            left: 8
                        }}
                    >
                        {minimum} {currency}
                    </Text>
                </Container>
                <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <Text
                        variant="body2"
                    >
                        Comienzo:
                    </Text>
                    <Text
                        margin={{
                            left: 8
                        }}
                    >
                        {format(start * 1000, "D [de] MMMM, YYYY - h:mm:ss A")}
                    </Text>
                </Container>
                <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <Text
                        variant="body2"
                    >
                        Final:
                    </Text>
                    <Text
                        margin={{
                            left: 8
                        }}
                    >
                        {format(end * 1000, "D [de] MMMM, YYYY - h:mm:ss A")}
                    </Text>
                </Container>
                <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <Text
                        variant="body2"
                    >
                        Títular:
                    </Text>
                    <Text
                        margin={{
                            left: 8
                        }}
                    >
                        {headline}
                    </Text>
                </Container>
                <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <Text
                        variant="body2"
                    >
                        Tipo:
                    </Text>
                    <Text
                        margin={{
                            left: 8
                        }}
                    >
                        {type}
                    </Text>
                </Container>
                <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <Text
                        variant="body2"
                    >
                        Validez:
                    </Text>
                    <Text
                        margin={{
                            left: 8
                        }}
                    >
                        {validity}
                    </Text>
                </Container>
                <Container
                    flow="row"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <Text
                        variant="body2"
                    >
                        Términos:
                    </Text>
                    <Text
                        margin={{
                            left: 8
                        }}
                    >
                        {terms}
                    </Text>
                </Container>
            </Container>}
        />
    }

    _handleUpdate = () => {
        this.props.onProgress(
            true,
            () => {
                this.props.api.updateTitle(
                    this.props.promotion.id,
                    this.state.title,
                )
                    .then(() => {
                        this.props.onProgress(
                            false,
                            () => {
                                this.props.onUpdate(() => {
                                    this.setState({
                                        edit: false
                                    })
                                });
                            }
                        );
                    })
                    .catch(this.props.onError)
            }
        );
    };
}