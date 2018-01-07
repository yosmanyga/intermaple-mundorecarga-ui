'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dayjs = require('@yosmy/dayjs');

var _ui = require('@yosmy/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListUsers = function (_React$Component) {
    _inherits(ListUsers, _React$Component);

    function ListUsers() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, ListUsers);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListUsers.__proto__ || Object.getPrototypeOf(ListUsers)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            interval: 'current_month',
            stats: null,
            userChart: null,
            progress: 0
        }, _this._collectStats = function () {
            var from = void 0,
                to = void 0,
                group = void 0;

            if (_this.state.interval === 'last_month') {
                // Beginning of last month
                from = (0, _dayjs.subMonths)((0, _dayjs.startOfMonth)(Date.now()), 1);
                from = (0, _dayjs.getTime)(from);

                // Beginning of current month
                to = (0, _dayjs.addMonths)(from, 1);
                to = (0, _dayjs.getTime)(to);

                from = from / 1000;
                to = to / 1000;

                group = 'by-day';
            }

            if (_this.state.interval === 'current_month') {
                // Beginning of current month
                from = (0, _dayjs.startOfMonth)(Date.now());
                from = (0, _dayjs.getTime)(from);

                to = (0, _dayjs.startOfDay)(Date.now());
                to = (0, _dayjs.addDays)(to, 1);
                to = (0, _dayjs.getTime)(to);

                // // Beginning of next month
                // to = addMonths(from, 1);
                // to = getTime(to);

                from = from / 1000;
                to = to / 1000;

                group = 'by-day';
            }

            if (_this.state.interval === 'current_year') {
                from = (0, _dayjs.startOfYear)(Date.now());
                from = (0, _dayjs.getTime)(from);

                // Beginning of next year
                to = (0, _dayjs.addYears)(from, 1);
                to = (0, _dayjs.getTime)(to);

                from = from / 1000;
                to = to / 1000;

                group = 'by-month';
            }

            _this._handleProgress(true, function () {
                import("@yosmy/ui").then(function (module) {
                    var Chart = _ui.Platform.select({
                        web: function web(_ref2) {
                            var children = _ref2.children,
                                props = _objectWithoutProperties(_ref2, ['children']);

                            var Chart = module.Chart;

                            return _react2.default.createElement(
                                Chart,
                                props,
                                children
                            );
                        },
                        mobile: function mobile(_ref3) {
                            var children = _ref3.children,
                                props = _objectWithoutProperties(_ref3, ['children']);

                            var Chart = module.default.Chart;

                            return _react2.default.createElement(
                                Chart,
                                props,
                                children
                            );
                        }
                    });

                    _this.props.api.userland.registration.computeUsers(from, to, group).then(function (stats) {
                        _this.setState({
                            stats: stats
                        }, function () {
                            _this.setState({
                                userChart: _react2.default.createElement(Chart, {
                                    data: _this.state.stats,
                                    xAxis: {
                                        name: _this.state.interval !== 'current_year' ? 'Día' : 'Mes',
                                        dataKey: _this.state.interval !== 'current_year' ? 'day' : 'month'
                                    },
                                    lines: [{
                                        name: "Registros",
                                        dataKey: "total",
                                        unit: 'usuarios'
                                    }]
                                })
                            }, function () {
                                _this._handleProgress(false);
                            });
                        });
                    });
                }).catch(_this.props.onError);
            });
        }, _this._buildLayout = function (_ref4) {
            var children = _ref4.children,
                props = _objectWithoutProperties(_ref4, ['children']);

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
                    title: 'Usuarios',
                    progress: _this.state.progress > 0
                }),
                children
            );
        }, _this._handleProgress = function (progress) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            _this.setState(function (prevState) {
                return {
                    progress: prevState.progress + (progress === true ? 1 : -1)
                };
            }, callback);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ListUsers, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._collectStats();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            prevProps = null;

            if (prevState.stats !== null && this.state.stats === null) {
                this._collectStats();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var Layout = this._buildLayout;

            if (this.state.stats === null) {
                return _react2.default.createElement(Layout, null);
            }

            return _react2.default.createElement(
                Layout,
                null,
                _react2.default.createElement(
                    _ui.Container,
                    {
                        width: 400
                    },
                    _react2.default.createElement(
                        _ui.Select,
                        {
                            label: 'Intervalo',
                            value: this.state.interval,
                            onChange: function onChange(value) {
                                _this3.setState({
                                    interval: value,
                                    stats: null
                                });
                            },
                            center: true
                        },
                        _react2.default.createElement(
                            _ui.SelectItem,
                            {
                                key: 'last_month',
                                value: 'last_month'
                            },
                            'Mes anterior'
                        ),
                        _react2.default.createElement(
                            _ui.SelectItem,
                            {
                                key: 'current_month',
                                value: 'current_month'
                            },
                            'Mes actual'
                        ),
                        _react2.default.createElement(
                            _ui.SelectItem,
                            {
                                key: 'current_year',
                                value: 'current_year'
                            },
                            'A\xF1o actual'
                        )
                    ),
                    this.state.stats.length !== 0 ? this.state.userChart !== null ? this.state.userChart : _react2.default.createElement(_ui.Progress, null) : _react2.default.createElement(
                        _ui.Container,
                        null,
                        'No hay reporte para esas fechas'
                    )
                )
            );
        }
    }]);

    return ListUsers;
}(_react2.default.Component);

ListUsers.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.shape({
        userland: _propTypes2.default.shape({
            registration: _propTypes2.default.shape({
                computeUsers: _propTypes2.default.func.isRequired
            })
        }).isRequired
    }).isRequired,
    onError: _propTypes2.default.func.isRequired
};
exports.default = ListUsers;