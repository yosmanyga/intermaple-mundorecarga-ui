import React from "react";
import PropTypes from "prop-types";
import {Container, Image, Platform, Text} from "@yosmy/ui";
import {Payment} from "@yosmy/payment-ui";
import Subtitle from "../Subtitle";
import Row from "../Row";
import Preview from "../Preview";
import cards from "./cards.png"

export default class SetPaymentBlock extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        phone: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        edit: PropTypes.bool,
        onSet: PropTypes.func.isRequired, // (card)
        onEdit: PropTypes.func.isRequired, // ()
        onProgress: PropTypes.func.isRequired, // (progress, callback)
    };

    render() {
        return <Payment
            layout={({children}) => {
                return <Container
                    flow="column"
                    margin={{
                        top: 1
                    }}
                >
                    {children}
                    <Image
                        source={cards}
                        margin={{
                            top: 8
                        }}
                        style={{
                            width: 200,
                            height: 200 * 110/549,
                        }}
                    />
                    <Text
                        center
                        padding={8}
                        margin={{
                            top: 4
                        }}
                        style={Platform.select({
                            mobile: {
                                textAlign: "center"
                            }
                        })}
                    >
                        Todos los pagos son procesados de forma segura por medio de nuestro proveedor de pago confiable Stripe. Para más información leer nuestra Política de Privacidad.
                    </Text>
                </Container>
            }}
            previewCardLayout={(Card, onEdit) => {
                return <React.Fragment>
                    <Subtitle
                        margin={{
                            top: 8
                        }}
                    >
                        Método de pago
                    </Subtitle>
                    <Preview
                        icons={{
                            close: this.props.icons.actions.close,
                        }}
                        margin={{
                            top: 1
                        }}
                        left={<Container />}
                        body={<Container
                            flow="column"
                            align={{
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                            }}
                        >
                            <Card />
                        </Container>}
                        onUndo={() => {
                            onEdit(this.props.onEdit);
                        }}
                    />
                </React.Fragment>
            }}
            listCardsLayout={(Cards) => {
                return <React.Fragment>
                    <Subtitle
                        active
                        margin={{
                            top: 8
                        }}
                    >
                        Forma de pago
                    </Subtitle>
                    <Cards />
                </React.Fragment>
            }}
            newCardLayout={(NewCard) => {
                return <React.Fragment>
                    <Subtitle
                        active
                        margin={{
                            top: 8,
                            bottom: 8
                        }}
                    >
                        Método de pago
                    </Subtitle>
                    <NewCard />
                </React.Fragment>
            }}
            cardInputsLayout={(NumberInput, NameInput, ExpiryInput, CvcInput, ZipInput, SaveInput) => {
                return <React.Fragment>
                    <Row
                        flow="row"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                        margin={{
                            top: 1
                        }}
                        left={<Container
                            flow="column"
                            align={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <this.props.icons.card.number />
                        </Container>}
                        body={<Container
                            flow="row"
                            align={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                            padding={{
                                right: 8
                            }}
                        >
                            <NumberInput />
                        </Container>}
                        underline={false}
                    />
                    <Row
                        flow="row"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                        margin={{
                            top: 1
                        }}
                        left={<Container
                            flow="column"
                            align={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <this.props.icons.card.name />
                        </Container>}
                        body={<Container
                            flow="row"
                            align={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                            padding={{
                                right: 8
                            }}
                        >
                            <NameInput />
                        </Container>}
                        underline={false}
                    />
                    <Row
                        flow="row"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                        margin={{
                            top: 1
                        }}
                        left={<Container
                            flow="column"
                            align={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <this.props.icons.card.expiry />
                        </Container>}
                        body={<Container
                            flow="row"
                            align={{
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}
                            padding={{
                                right: 8
                            }}
                        >
                            <ExpiryInput />
                        </Container>}
                        underline={false}
                    />
                    <Row
                        flow="row"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                        margin={{
                            top: 1
                        }}
                        left={<Container
                            flow="column"
                            align={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <this.props.icons.card.cvc />
                        </Container>}
                        body={<Container
                            flow="row"
                            align={{
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}
                            padding={{
                                right: 8
                            }}
                        >
                            <CvcInput />
                        </Container>}
                        underline={false}
                    />
                    {this.props.phone.country === "US" && <Row
                        flow="row"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                        margin={{
                            top: 1
                        }}
                        left={<Container
                            flow="column"
                            align={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <this.props.icons.card.zip />
                        </Container>}
                        body={<Container
                            flow="row"
                            align={{
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}
                            padding={{
                                right: 8
                            }}
                        >
                            <ZipInput />
                        </Container>}
                        underline={false}
                    />}
                    <Row
                        flow="row"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                        margin={{
                            top: Platform.select({
                                web: 1,
                                android: 8,
                                ios: 8
                            })
                        }}
                        left={<Container />}
                        body={<Container
                            flow="row"
                            align={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <SaveInput />
                        </Container>}
                        underline={false}
                    />
                </React.Fragment>
            }}
            cardListItemLayout={({select, body, action, ...props}) => {
                return <Row
                    left={select}
                    body={body}
                    right={action}
                    {...props} // key
                />
            }}
            messages={{
                save: "Guardar método de pago",
            }}
            icons={{
                actions: {
                    add: this.props.icons.actions.add,
                    delete: this.props.icons.actions.delete,
                    forward: this.props.icons.actions.forward,
                    back: this.props.icons.actions.back,
                    close: this.props.icons.actions.close,
                },
                selected: this.props.icons.objects.selected,
                unselected: this.props.icons.objects.unselected,
            }}
            api={this.props.api}
            edit={this.props.edit}
            onProgress={this.props.onProgress}
            onSet={this.props.onSet}
            onEdit={this.props.onEdit}
        />
    }
}