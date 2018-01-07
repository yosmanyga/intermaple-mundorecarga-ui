import React from "react";
import PropTypes from "prop-types";
import {Button, Card, Container, Input, List, ListItem, Text} from "@yosmy/ui";
import {format} from "@yosmy/dayjs";

export default class ViewUser extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        user: null,
        transactions: null,
        action: null, // "add-balance"
        progress: 0
    };

    componentDidMount() {
        this._collectData();
    }

    _collectData = () => {
        this._handleProgress(
            true,
            () => {
                Promise.all([
                    this.props.api.reseller.pickUserAsAdmin(
                        this.props.id
                    ),
                    this.props.api.reseller.collectTransactionsAsAdmin(
                        this.props.id
                    ),
                ])
                    .then((values) => {
                        this.setState({
                            user: values[0],
                            transactions: values[1]
                        }, () => {
                            this._handleProgress(false)
                        });
                    })
                    .catch(this.props.onError)
            }
        );
    };

    render() {
        const Layout = this._buildLayout;

        if (
            this.state.user === null
            || this.state.transactions === null
        ) {
            return <Layout />;
        }

        if (this.state.action === "add-balance") {
            return <Layout
                title="Poner saldo a revendedor"
                padding={8}
            >
                <AddTransaction
                    icons={this.props.icons}
                    api={this.props.api}
                    user={this.state.user}
                    onAdd={() => {
                        this.setState({
                            action: null,
                            user: null,
                            transactions: null
                        }, () => {
                            this._collectData();
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            action: null
                        });
                    }}
                    onProgress={this._handleProgress}
                    onError={this.props.onError}
                />
            </Layout>
        }

        return <Layout
            padding={8}
        >
            <Card
                header={{
                    title: "Principal"
                }}
                content={<React.Fragment>
                    <Text>
                        Nombre: {this.state.user.name}
                    </Text>
                    <Text
                        margin={{
                            top: 8
                        }}
                    >
                        Saldo: ${this.state.user.balance}
                    </Text>
                </React.Fragment>}
                actions={<React.Fragment>
                    <Button
                        variant="outlined"
                        tooltip="Ponerle saldo"
                        onClick={() => {
                            this.setState({
                                action: "add-balance"
                            });
                        }}
                    >
                        <this.props.icons.actions.add />
                    </Button>
                </React.Fragment>}
            />
            <Card
                header={{
                    title: "Transacciones",
                    subtitle: "Son las transacciones que hace el usuario a nuestra cuenta de banco, para poner saldo"
                }}
                content={<React.Fragment>
                    {this.state.transactions.length > 0 ? <List>
                        {this.state.transactions.map(({id, reference, amount, date}) => {
                            return <ListItem
                                key={id}
                                text={`$${amount} - ${reference}`}
                                note={format(date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")}
                            />;
                        })}
                    </List> : <Text>No hay transacciones aún para este usuario</Text>}
                </React.Fragment>}
                margin={{
                    top: 8
                }}
            />
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            title="Revendedor"
            progress={this.state.progress > 0}
            {...props}
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

class AddTransaction extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        onAdd: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onProgress: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        input: {
            amount: null,
            reference: null
        },
    };

    render() {
        return <React.Fragment>
            <Container>
                <Input
                    label="Cantidad"
                    value={this.state.input.amount}
                    focus
                    onChange={(value)  => {
                        this.setState({
                            input: {
                                ...this.state.input,
                                amount: value
                            }
                        })
                    }}
                />
                <Input
                    label="Id de transacción"
                    value={this.state.input.reference}
                    help="Id de transacción del banco"
                    onChange={(value)  => {
                        this.setState({
                            input: {
                                ...this.state.input,
                                reference: value
                            }
                        })
                    }}
                />
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
                    disabled={!this.state.input.amount || !this.state.input.reference}
                    margin={{
                        left: 8
                    }}
                    onClick={() => {
                        this.props.onProgress(
                            true,
                            () => {
                                this.props.api.reseller.executeTransaction(
                                    this.props.user.id,
                                    this.state.input.amount,
                                    this.state.input.reference,
                                )
                                    .then(() => {
                                        this.props.onProgress(
                                            false,
                                            this.props.onAdd
                                        )
                                    })
                            }
                        )
                    }}
                >
                    <Text>Poner saldo</Text>
                    <this.props.icons.actions.ok />
                </Button>
            </Container>
        </React.Fragment>
    }
}
