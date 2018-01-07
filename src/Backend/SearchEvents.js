import React from "react";
import PropTypes from "prop-types";
import {format} from "@yosmy/dayjs";
import {Container, Text} from "@yosmy/ui";
import Search from './Search.inc';

class SearchEvents extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.object.isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        events: null,
        progress: 0,
    };

    _collectEvents = (from, to) => {
        this.setState({
            events: null
        }, () => {
            this._handleProgress(
                true,
                () => {
                    this.props.api.blacklist.log.collectEvents(
                        from / 1000,
                        to / 1000,
                    )
                        .then((events) => {
                            this.setState({
                                events: events
                            }, () => {
                                this._handleProgress(false);
                            });
                        })
                        .catch(this.props.onError)
                }
            );
        });
    };

    render() {
        const Layout = this._buildLayout;

        return <Layout>
            <Search
                icons={this.props.icons}
                onBegin={(from, to) => {
                    this._collectEvents(from, to);
                }}
                onSet={(from, to) => {
                    this._collectEvents(from, to);
                }}
            />

            {this.state.events !== null
                ? this.state.events.length > 0
                    ? this.state.events.map(({id, labels, contents, date}) => {
                        return <Event
                            key={id}
                            icons={this.props.icons}
                            id={id}
                            labels={labels}
                            contents={contents}
                            date={date}
                        />
                    })
                    : <Text
                        center
                        margin={{
                            top: 1
                        }}
                    >
                        No se encontraron logs.
                    </Text>
                : null
            }
        </Layout>
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Fraude"
            progress={this.state.progress > 0}
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

class Event extends React.Component {
    static propTypes = {
        icons: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        labels: PropTypes.array.isRequired,
        contents: PropTypes.array.isRequired,
        date: PropTypes.number.isRequired,
    };

    render() {
        const {labels, contents, date} = this.props;

        return <Container
            flow="column"
            align={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}
            margin={{
                top: 8
            }}
            padding={8}
            elevation={1}
        >
            <Container
                flow="row"
                align={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
                margin={{
                    top: 8
                }}
            >
                <Text variant="caption">{format(date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")}</Text>
            </Container>
            <Container
                flow="row"
                align={{
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}
                margin={{
                    top: 8
                }}
            >
                {this._buildCharacter(labels)}
                {this._buildTrace(contents)}
            </Container>
        </Container>
    }

    _buildCharacter = (labels) => {
        const type = labels.find(({key}) => {
            return key === 'type';
        }).value;

        let icon, character, value, ban;

        switch (type) {
            case "yosmy.userland.blacklist.ban_session":
                icon = <this.props.icons.objects.session />;

                value = labels.find(({key}) => {
                    return key === 'session';
                }).value;

                value = <Text
                    variant="subtitle2"
                    margin={{left: 4}}
                >
                    {value}
                </Text>;

                character = "Sesión";

                ban = "baneada";

                break;
            case "yosmy.userland.blacklist.ban_user":
                icon = <this.props.icons.objects.user />;

                value = labels.find(({key}) => {
                    return key === 'user';
                }).value;

                value = <Text
                    variant="subtitle2"
                    margin={{left: 4}}
                >
                    {value}
                </Text>;

                // value = <Button
                //     variant="outlined"
                //     margin={{left: 4}}
                //     onClick={() => {}}
                // >
                //     <this.props.icons.actions.details />
                //     <Text
                //         variant="subtitle2"
                //     >
                //         {value}
                //     </Text>
                // </Button>;

                character = "Usuario";

                ban = "baneado";

                break;
            case "yosmy.userland.stripe.blacklist.ban_card":
                icon = <this.props.icons.objects.card />;

                value = labels.find(({key}) => {
                    return key === 'card';
                }).value;

                value = <Text
                    variant="subtitle2"
                    margin={{left: 4}}
                >
                    {value}
                </Text>;

                character = "Tarjeta";

                ban = "baneada";

                break;
            case "blacklist.ban_contact":
                icon = <this.props.icons.objects.contact />;

                value = labels.find(({key}) => {
                    return key === 'contact';
                }).value;

                value = <Text
                    variant="subtitle2"
                    margin={{left: 4}}
                >
                    {value}
                </Text>;

                character = "Contacto";

                ban = "baneado";

                break;
            default:
                throw new Error(type);
        }

        return <React.Fragment>
            {icon}
            <Text
                margin={{left: 4}}
            >
                {character}
            </Text>
            {value}
            <Text
                margin={{left: 4}}
            >
                {ban}
            </Text>
        </React.Fragment>;
    };

    _buildTrace = (contents) => {
        let trace = contents.find(({key}) => {
            return key === 'trace';
        }).value;

        if (trace.length === 0) {
            return null;
        }

        const {type, value} = trace;

        let icon, reason;

        switch (type) {
            case 'session-banned':
                icon = <this.props.icons.objects.session />;
                reason = 'Sesión baneada';

                break;
            case 'user-banned':
                icon = <this.props.icons.objects.user />;
                reason = 'Usuario baneado';

                break;
            case 'card-banned':
                icon = <this.props.icons.objects.card />;
                reason = 'Tarjeta baneada';

                break;
            case 'charge-blocked':
                icon = <this.props.icons.objects.charge />;
                reason = 'Pago bloqueado por Stripe';

                break;
            case 'charge-risked':
                icon = <this.props.icons.objects.charge />;
                reason = 'Pago riesgoso para Stripe';

                break;
            case 'card-blocked':
                icon = <this.props.icons.objects.card />;
                reason = 'Tarjeta bloqueada por Stripe';

                break;
            case 'country-different':
                icon = <this.props.icons.objects.country />;
                reason = 'País distinto al del usuario';

                break;
            case 'contact-banned':
                icon = <this.props.icons.objects.contact />;
                reason = 'Contacto baneado';

                break;
            case 'dispute-imported':
                icon = <this.props.icons.objects.dispute />;
                reason = 'Disputa creada';

                break;
            case 'errors-surpassed':
                icon = <this.props.icons.objects.card />;
                reason = 'Demasiados intentos de introducir tarjetas';

                break;
            case 'hand':
                icon = <this.props.icons.objects.hand />;
                reason = 'Bloqueado manualmente';

                break;
            default:
                throw type;
        }

        return <React.Fragment>
            <Text
                margin={{
                    left: 4,
                    right: 4
                }}
            >
                debido a
            </Text>
            {icon}
            <Text
                margin={{left: 4}}
            >
                {reason}
            </Text>
            {value && <Text
                variant="subtitle2"
                margin={{left: 4}}
            >
                {value}
            </Text>}
        </React.Fragment>;
    };
}

export default SearchEvents;