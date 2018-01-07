import React from "react";
import PropTypes from "prop-types";
import {Button, Container, Text} from "@yosmy/ui";
import Row from "../Row";

export default class PreRegistrationBock extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        onContinue: PropTypes.func.isRequired, // ()
    };

    render() {
        return <React.Fragment>
            <Row
                left={<Container
                    flow="column"
                    align={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <this.props.icons.objects.check
                        style={{
                            color: "green",
                            fontSize: 40
                        }}
                    />
                </Container>}
                body={<Container>
                    <Text>
                        Tu recarga está lista para ser enviada
                    </Text>
                    <Text>
                        Ahora procederemos al registro de tu número de teléfono para realizar el pago
                    </Text>
                </Container>}
                underline={false}
                margin={{
                    top: 8,
                    bottom: 8
                }}
            />
            {/*<Container*/}
                {/*flow="row"*/}
                {/*align={{*/}
                    {/*justifyContent: "flex-start",*/}
                    {/*alignItems: "center"*/}
                {/*}}*/}
                {/*padding={8}*/}
                {/*style={{*/}
                    {/*// https://github.com/facebook/react-native/issues/1438#issuecomment-362949682*/}
                    {/*flex: 1*/}
                {/*}}*/}
            {/*>*/}
                {/*<this.props.icons.objects.shop*/}
                    {/*style={{*/}
                        {/*color: "green",*/}
                        {/*fontSize: 40*/}
                    {/*}}*/}
                {/*/>*/}
                {/*<Container*/}
                    {/*flow="column"*/}
                    {/*align={{*/}
                        {/*justifyContent: "flex-start",*/}
                        {/*alignItems: "flex-start"*/}
                    {/*}}*/}
                    {/*margin={{*/}
                        {/*left: 8*/}
                    {/*}}*/}
                    {/*style={{*/}
                        {/*// https://github.com/facebook/react-native/issues/1438#issuecomment-362949682*/}
                        {/*flex: 1*/}
                    {/*}}*/}
                {/*>*/}
                    {/*<Text>*/}
                        {/*Tu recarga está lista para ser enviada*/}
                    {/*</Text>*/}
                    {/*<Text>*/}
                        {/*Ahora procederemos al registro de tu número de teléfono para realizar el pago*/}
                    {/*</Text>*/}
                {/*</Container>*/}
            {/*</Container>*/}
            <Button
                color="primary"
                onClick={this.props.onContinue}
                center
                margin={{
                    top: 8,
                }}
            >
                <Text>Continuar</Text>
                <this.props.icons.actions.forward />
            </Button>
        </React.Fragment>
    }
}