import React from "react";
import PropTypes from "prop-types";
import {Container, Platform} from "@yosmy/ui";

class InnerLayoutBlock extends React.Component {
    static propTypes = {
        photo: PropTypes.string,
    };

    render() {
        const Component = Platform.select({
            web: this._buildWebInnerLayout,
            mobile: this._buildMobileInnerLayout,
        });

        return <Component {...this.props} />;
    }

    _buildWebInnerLayout = ({photo, children}) => {
        return <Container
            flow="column"
            align={{
                justifyContent: "flex-start"
            }}
            background={{
                image: photo,
                size: [
                    Platform.dimensions.get("window").width,
                    Platform.dimensions.get("window").width / 2
                ]
            }}
            style={{
                minHeight: Platform.dimensions.get("window").width / 2
            }}
        >
            <Container
                flow="column"
                width={Platform.select({
                    web: Platform.dimensions.isSmDown(this.props.width) ? "80%" : "60%",
                    android: "80%",
                    ios: "80%",
                })}
                margin={{
                    top: 48,
                }}
                padding={{
                    bottom: 8
                }}
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                }}
            >
                {children}
            </Container>
        </Container>
    };

    _buildMobileInnerLayout = ({children}) => {
        return <Container
            flow="column"
            padding={{
                bottom: 8,
            }}
        >
            {children}
        </Container>
    }
}

export default Platform.dimensions.withWidth()(InnerLayoutBlock);
