import React from "react";
import {Container, Text, Theme} from "@yosmy/ui";

class Subtitle extends React.Component {
    render() {
        const {theme, margin, active, style, children, ...props} = this.props;

        return <Container
            flow="column"
            align={{
                justifyContent: "center",
                alignItems: "center"
            }}
            margin={margin}
            padding={{
                top: 16
            }}
            border={active && {
                top: {
                    width: 1,
                    style: "solid",
                    color: "#faf2cc"
                },
                bottom: {
                    width: 1,
                    style: "solid",
                    color: "#faf2cc"
                }
            }}
            background={active ? "#fcf8e3" : theme.palette.primary.main}
            style={{
                alignSelf: "stretch",
                ...style,
            }}
            {...props}
        >
            <Text
                center
                padding={{
                    top: 2,
                    bottom: 2
                }}
                style={{
                    color: !active ? "#fff" : null
                }}
            >
                {children}
            </Text>
        </Container>
    }
}

export default Theme.withTheme()(Subtitle);