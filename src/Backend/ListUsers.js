import React from 'react';
import PropTypes from 'prop-types';
import {startOfDay, startOfMonth, startOfYear, subMonths, addDays, addMonths, addYears, getTime} from '@yosmy/dayjs';
import {Container, Platform, Progress, Select, SelectItem} from '@yosmy/ui';

export default class ListUsers extends React.Component {
    static propTypes = {
        layout: PropTypes.func.isRequired,
        icons: PropTypes.object.isRequired,
        api: PropTypes.shape({
            userland: PropTypes.shape({
                registration: PropTypes.shape({
                    computeUsers: PropTypes.func.isRequired
                })
            }).isRequired
        }).isRequired,
        onError: PropTypes.func.isRequired,
    };

    state = {
        interval: 'current_month',
        stats: null,
        userChart: null,
        progress: 0
    };

    componentDidMount() {
        this._collectStats();
    }

    componentDidUpdate(prevProps, prevState) {
        prevProps = null;

        if (
            prevState.stats !== null
            && this.state.stats === null
        ) {
            this._collectStats();
        }
    }

    _collectStats = () => {
        let from, to, group;

        if (this.state.interval === 'last_month') {
            // Beginning of last month
            from = subMonths(
                startOfMonth(Date.now()),
                1
            );
            from = getTime(from);

            // Beginning of current month
            to = addMonths(from, 1);
            to = getTime(to);

            from = from / 1000;
            to = to / 1000;

            group = 'by-day';
        }

        if (this.state.interval === 'current_month') {
            // Beginning of current month
            from = startOfMonth(
                Date.now()
            );
            from = getTime(from);

            to = startOfDay(
                Date.now()
            );
            to = addDays(
                to,
                1
            );
            to = getTime(to);

            // // Beginning of next month
            // to = addMonths(from, 1);
            // to = getTime(to);

            from = from / 1000;
            to = to / 1000;

            group = 'by-day';
        }

        if (this.state.interval === 'current_year') {
            from = startOfYear(
                Date.now()
            );
            from = getTime(from);

            // Beginning of next year
            to = addYears(
                from,
                1
            );
            to = getTime(to);

            from = from / 1000;
            to = to / 1000;

            group = 'by-month';
        }

        this._handleProgress(
            true,
            () => {
                import("@yosmy/ui")
                    .then((module) => {
                        const Chart = Platform.select({
                            web: ({children, ...props}) => {
                                const Chart = module.Chart;

                                return <Chart {...props}>
                                    {children}
                                </Chart>
                            },
                            mobile: ({children, ...props}) => {
                                const Chart = module.default.Chart;

                                return <Chart {...props}>
                                    {children}
                                </Chart>
                            }
                        });

                        this.props.api.userland.registration.computeUsers(
                            from,
                            to,
                            group
                        )
                            .then((stats) => {
                                this.setState({
                                    stats: stats
                                }, () => {
                                    this.setState({
                                        userChart: <Chart {...{
                                            data: this.state.stats,
                                            xAxis:{
                                                name: this.state.interval !== 'current_year'
                                                    ? 'Día' : 'Mes',
                                                dataKey: this.state.interval !== 'current_year'
                                                    ? 'day' : 'month',
                                            },
                                            lines: [{
                                                name: "Registros",
                                                dataKey: "total",
                                                unit: 'usuarios',
                                            }]
                                        }}/>
                                    }, () => {
                                        this._handleProgress(
                                            false
                                        )
                                    });
                                });
                            })
                    })
                    .catch(this.props.onError)
            }
        );
    };

    render() {
        const Layout = this._buildLayout;

        if (this.state.stats === null) {
            return <Layout />;
        }

        return <Layout>
            <Container
                width={400}
            >
                <Select
                    label="Intervalo"
                    value={this.state.interval}
                    onChange={(value) => {
                        this.setState({
                            interval: value,
                            stats: null
                        });
                    }}
                    center
                >
                    <SelectItem
                        key="last_month"
                        value="last_month"
                    >
                        Mes anterior
                    </SelectItem>
                    <SelectItem
                        key="current_month"
                        value="current_month"
                    >
                        Mes actual
                    </SelectItem>
                    <SelectItem
                        key="current_year"
                        value="current_year"
                    >
                        Año actual
                    </SelectItem>
                </Select>
                {this.state.stats.length !== 0
                    ? this.state.userChart !== null
                        ? this.state.userChart
                        : <Progress />
                    : <Container>No hay reporte para esas fechas</Container>
                }
            </Container>
        </Layout>;
    }

    _buildLayout = ({children, ...props}) => {
        return <this.props.layout
            {...props}
            title="Usuarios"
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

