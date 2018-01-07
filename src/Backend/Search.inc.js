import React from "react";
import PropTypes from "prop-types";
import {startOfDay, endOfDay} from "@yosmy/dayjs";
import {Button, Container, DatePicker, Text} from "@yosmy/ui";

class Search extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        onBegin: PropTypes.func.isRequired, // (from, to)
        onSet: PropTypes.func.isRequired, // (from, to)
    };

    state = {
        from: null,
        to: null
    };

    componentDidMount() {
        const now = new Date();

        this.setState({
            from: startOfDay(now),
            to: endOfDay(now),
        }, () => {
            this.props.onBegin(this.state.from, this.state.to);
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state !== nextState
        );
    }

    render() {
        return <Container
            flow="row"
        >
            <DatePicker
                margin={{
                    left: 4
                }}
                value={this.state.from}
                placeholder="Desde"
                onChange={(date) => {
                    this.setState({
                        from: startOfDay(date)
                    });
                }}
            />
            <DatePicker
                margin={{
                    left: 4
                }}
                value={this.state.to}
                placeholder="Hasta"
                onChange={(date) => {
                    this.setState({
                        to: endOfDay(date)
                    });
                }}
            />
            <Button
                color="primary"
                margin={{
                    left: 4
                }}
                onClick={() => {
                    this.props.onSet(
                        this.state.from,
                        this.state.to
                    );
                }}
            >
                <this.props.icons.actions.search />
                <Text>Buscar</Text>
            </Button>
        </Container>
    }
}

export default Search;