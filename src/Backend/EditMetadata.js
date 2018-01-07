import React from "react";
import PropTypes from "prop-types";
import {Container, Button, Markdown, Input, Text} from "@yosmy/ui";

export default class EditMetadata extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onEdit: PropTypes.func.isRequired, // ()
        onCancel: PropTypes.func.isRequired, // ()
        onError: PropTypes.func.isRequired,
    };

    state = {
        metadata: null,
        progress: 0
    };

    componentDidMount() {
        this._handleProgress(
            true,
            () => {
                this.props.api.pickMetadata(
                    this.props.id,
                )
                    .then((metadata) => {
                        this._handleProgress(
                            false,
                            () => {
                                this.setState({
                                    metadata: metadata
                                });
                            }
                        );
                    })
                    .catch(this.props.onError)
            }
        )
    }

    render() {
        const Layout = this._buildLayout;

        if (this.state.metadata === null) {
            return <Layout />;
        }

        return <Layout>
            <Container
                flow="row"
                align={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                }}
            >
                <Container
                    flow="column"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                    width="50%"
                >
                    <Text
                        type="h6"
                    >
                        {this.state.metadata.description}
                    </Text>
                    <Input
                        label="Valor"
                        value={this.state.metadata.value}
                        focus
                        margin={{top: 1}}
                        rows={20}
                        width="full"
                        onChange={(value)  => {
                            this.setState({
                                metadata: {
                                    ...this.state.metadata,
                                    value: value
                                }
                            })
                        }}
                    />
                </Container>
                <Container
                    flow="column"
                    align={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}
                    width="50%"
                >
                    <Text
                        type="h6"
                    >
                        Vista previa
                    </Text>
                    <Markdown
                        align={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        }}
                    >
                        {this.state.metadata.value}
                    </Markdown>
                </Container>
            </Container>
            <Container
                flow="row"
                margin={{
                    top: 8
                }}
            >
                <Button
                    onClick={this.props.onCancel}
                    margin={{right: 1}}
                >
                    <this.props.icons.actions.back />
                    <Text>Cancelar</Text>
                </Button>
                <Button
                    color="primary"
                    disabled={this.state.metadata.value === ""}
                    margin={{
                        left: 8
                    }}
                    onClick={() => {
                        this._handleProgress(
                            true,
                            () => {
                                this.props.api.updateMetadata(
                                    this.state.metadata.id,
                                    this.state.metadata.value,
                                )
                                    .then(() => {
                                        this._handleProgress(
                                            false,
                                            this.props.onEdit
                                        )
                                    })
                                    .catch(this.props.onError)
                            }
                        )
                    }}
                >
                    <Text>Actualizar</Text>
                    <this.props.icons.actions.ok />
                </Button>
            </Container>
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Editar metadato"
            progress={this.state.progress > 0}
            right={{
                icon: <this.props.icons.menu.help />,
                tooltip: "Ayuda",
                onClick: "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
            }}
        >
            {children}
        </this.props.layout>
    };

    _handleProgress = (progress, callback = null) => {
        this.setState((prevState) => {
            return {
                progress: prevState.progress + (progress === true ? 1 : -1)
            }
        }, callback);
    };
}
