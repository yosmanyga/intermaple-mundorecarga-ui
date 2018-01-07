import React from "react";
import PropTypes from "prop-types";
import {Container, Platform, Text} from "@yosmy/ui";
import Subtitle from "../../Common/Subtitle";
import Row from "../../Common/Row";
import Preview from "../../Common/Preview";

class SetAgentBlock extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        edit: PropTypes.bool,
        onProgress: PropTypes.func.isRequired, // (progress, callback)
        onSet: PropTypes.func.isRequired, // (agent)
        onEdit: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired,
    };

    state = {
        edit: true,
        error: null,
        agent: null,
        agents: null,
    };

    componentDidMount() {
        this.props.onProgress(
            true,
            () => {
                this.props.api.reseller.collectAgentsAsReseller()
                    .then((agents) => {
                        this.setState({
                            agents: agents
                        }, () => {
                            this.props.onProgress(
                                false,
                                () => {
                                    // Just one agent? Select it by default
                                    if (agents.length === 1) {
                                        this._handleSelect(agents[0]);
                                    }
                                }
                            );
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.edit !== nextProps.edit
            || this.state !== nextState
        );
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.edit === true) {
            if (prevProps.edit === this.props.edit) {
                // Avoid recursion
                return;
            }

            this.setState({
                edit: true
            })
        }
    }

    render() {
        if (this.state.edit === false) {
            let {name} = this.state.agent;

            return <React.Fragment>
                <Subtitle
                    margin={{
                        top: 8
                    }}
                >
                    Agente
                </Subtitle>
                <Preview
                    icons={{
                        close: this.props.icons.actions.close,
                    }}
                    margin={{
                        top: 8,
                        bottom: 8
                    }}
                    left={<Container
                        flow="column"
                        align={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <this.props.icons.objects.reseller.agent />
                    </Container>}
                    body={<Container
                        flow="column"
                        align={{
                            alignItems: "flex-start",
                            justifyContent: "flex-start"
                        }}
                    >
                        <Text>{name}</Text>
                    </Container>}
                    onUndo={() => {
                        this.setState({
                            edit: true
                        }, this.props.onEdit);
                    }}
                />
            </React.Fragment>
        }

        if (this.state.agents === null) {
            return null;
        }

        return <React.Fragment>
            <Subtitle
                active
                margin={{
                    top: 8
                }}
            >
                Selecciona el agente
            </Subtitle>
            {this.state.agents.map((agent) => {
                let {id, name} = agent;

                return <Row
                    key={id}
                    align={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    left={<Container
                        flow="column"
                        align={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {this.state.agent && this.state.agent.id === id
                            ? <this.props.icons.objects.selected />
                            : <this.props.icons.objects.unselected />
                        }
                    </Container>}
                    body={<Container
                        flow="row"
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        {name}
                    </Container>}
                    onClick={() => {
                        this._handleSelect(agent);
                    }}
                />
            })}
        </React.Fragment>
    }

    _handleSelect = (agent) => {
        this.setState({
            error: null,
            agent: agent,
            edit: false
        }, () => {
            this.props.onSet(agent);
        });
    }
}

export default Platform.dimensions.withWidth()(SetAgentBlock);
