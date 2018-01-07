import React from "react";
import PropTypes from "prop-types";
import {Platform} from "@yosmy/ui";

class LayoutBlock extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        keywords: PropTypes.string,
        country: PropTypes.object,
        progress: PropTypes.number,
        onBack: PropTypes.func.isRequired,
    };

    render() {
        return <this.props.layout
            site={this.props.country && "Recargas económicas a " + this.props.country.name}
            title="Nueva recarga"
            meta={{
                keywords: this.props.keywords
            }}
            left={{
                icon: <this.props.icons.actions.back />,
                onClick: this.props.onBack
            }}
            progress={this.props.progress > 0}
        >
            {this.props.children}
        </this.props.layout>
    }
}

export default Platform.dimensions.withWidth()(LayoutBlock);
