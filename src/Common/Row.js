import React from "react";
import PropTypes from "prop-types";
import {Container, Platform} from "@yosmy/ui";

export default class Row extends React.Component {
    static propTypes = {
        left: PropTypes.element,            // Container
        body: PropTypes.element.isRequired, // Container
        right: PropTypes.oneOfType([
            PropTypes.element, // Container
            PropTypes.bool
        ]),
        underline: PropTypes.bool,
        onClick: PropTypes.func,
    };

    render() {
        let {left, body, right, align, padding, underline, onClick, ...props} = this.props;

        const flex = Platform.select({
            web: {},
            android: {
                flex: 1
            },
            ios: {
                flex: 1
            }
        });

        return <Container
            flow="row"
            align={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                ...align
            }}
            padding={padding}
            onClick={onClick}
            {...props}
        >
            {/* To make an empty left, pass an empty container as left */}
            {left && this._renderLeft(left, underline)}
            <Container
                flow="row"
                align={{
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                }}
                border={typeof underline === "undefined" || underline === true
                    ? {
                        bottom: {
                            width: 1,
                            color: "#ccc",
                            style: "solid"
                        }
                    } : {}}
                style={{
                    ...flex,
                }}
            >
                {this._renderBody(body)}
                {right}
            </Container>
        </Container>;
    }

    _renderLeft = (left, underline) => {
        const {flow, align, onClick, children, ...props} = left.props;

        return <left.type
            flow={flow}
            width={64}
            align={{
                justifyContent: "center",
                alignItems: "center",
                ...align
            }}
            padding={{
                bottom: underline ? 8 : 0
            }}
            onClick={onClick}
            {...props}
        >
            {children}
        </left.type>;
    };

    _renderBody = (body) => {
        const {flow, align, padding, onClick, style, children, ...props} = body.props;

        return <Container
            flow={flow}
            align={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                ...align
            }}
            padding={padding}
            onClick={onClick}
            style={{
                ...style
            }}
            {...props}
        >
            {children}
        </Container>
    }
}
