import React from "react";
import {Container} from "@yosmy/ui";
import Row from "./Row";

export default class Preview extends React.Component {
    render() {
        const {icons, left, body, onUndo, ...props} = this.props;

        return <Row
            left={left}
            body={body}
            right={<Container
                onClick={onUndo}
                width="auto"
                margin={{
                    right: 8
                }}
            >
                <icons.close
                    style={{
                        color: "#883A3E"
                    }}
                />
            </Container>}
            {...props}
        />
    }
}