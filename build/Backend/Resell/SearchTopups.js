"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dayjs = require("@yosmy/dayjs");

var _ui = require("@yosmy/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchTopups = function (_React$Component) {
    _inherits(SearchTopups, _React$Component);

    function SearchTopups() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, SearchTopups);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchTopups.__proto__ || Object.getPrototypeOf(SearchTopups)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            agents: null,
            users: null,
            topups: null,
            progress: 0
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["children"]);

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
                    title: "Recargas",
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

    _createClass(SearchTopups, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            this._handleProgress(true, function () {
                Promise.all([_this3.props.api.reseller.collectAgentsAsAdmin(), _this3.props.api.reseller.collectUsers()]).then(function (values) {
                    _this3.setState({
                        agents: values[0],
                        users: values[1]
                    }, function () {
                        _this3._handleProgress(false);
                    });
                }).catch(_this3.props.onError);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var Layout = this._buildLayout;

            if (this.state.agents === null || this.state.users === null) {
                return _react2.default.createElement(Layout, null);
            }

            return _react2.default.createElement(
                Layout,
                null,
                _react2.default.createElement(Search, {
                    layout: function layout(_ref3) {
                        var children = _ref3.children;

                        return _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "column",
                                align: {
                                    justifyContent: "flex-start",
                                    alignItems: "center"
                                }
                            },
                            children
                        );
                    },
                    icons: this.props.icons,
                    api: this.props.api,
                    agents: this.state.agents,
                    users: this.state.users,
                    onProgress: this._handleProgress,
                    onBegin: function onBegin(callback) {
                        _this4.setState({
                            topups: null
                        }, callback);
                    },
                    onFinish: function onFinish(topups, callback) {
                        _this4.setState({
                            topups: topups
                        }, callback);
                    }
                }),
                this.state.topups !== null && _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            margin: {
                                top: 8
                            }
                        },
                        this.state.topups.length === 0 ? "No se encontraron recargas" : "Se encontraron " + this.state.topups.length + " recargas"
                    ),
                    this.state.topups.length > 0 && _react2.default.createElement(
                        _ui.Table,
                        null,
                        _react2.default.createElement(
                            _ui.TableHead,
                            null,
                            _react2.default.createElement(
                                _ui.TableRow,
                                null,
                                _react2.default.createElement(
                                    _ui.TableCell,
                                    null,
                                    "Revendedor"
                                ),
                                _react2.default.createElement(
                                    _ui.TableCell,
                                    null,
                                    "Cuenta"
                                ),
                                _react2.default.createElement(
                                    _ui.TableCell,
                                    null,
                                    "Costo"
                                ),
                                _react2.default.createElement(
                                    _ui.TableCell,
                                    null,
                                    "Recibe"
                                ),
                                _react2.default.createElement(
                                    _ui.TableCell,
                                    null,
                                    "Fecha"
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _ui.TableBody,
                            null,
                            this.state.topups.map(function (topup) {
                                var id = topup.id,
                                    agent = topup.agent,
                                    account = topup.account,
                                    charge = topup.charge,
                                    receive = topup.receive,
                                    currency = topup.currency,
                                    date = topup.date;


                                agent = _this4.state.agents.find(function (_ref4) {
                                    var id = _ref4.id;

                                    return id === agent;
                                });

                                var user = _this4.state.users.find(function (_ref5) {
                                    var id = _ref5.id;

                                    return id === agent.user;
                                });

                                return _react2.default.createElement(
                                    _ui.TableRow,
                                    {
                                        key: id
                                    },
                                    _react2.default.createElement(
                                        _ui.TableCell,
                                        null,
                                        _react2.default.createElement(
                                            _ui.Text,
                                            null,
                                            user.name
                                        )
                                    ),
                                    _react2.default.createElement(
                                        _ui.TableCell,
                                        null,
                                        _react2.default.createElement(
                                            _ui.Text,
                                            null,
                                            account
                                        )
                                    ),
                                    _react2.default.createElement(
                                        _ui.TableCell,
                                        null,
                                        _react2.default.createElement(
                                            _ui.Text,
                                            null,
                                            charge,
                                            " USD"
                                        )
                                    ),
                                    _react2.default.createElement(
                                        _ui.TableCell,
                                        null,
                                        _react2.default.createElement(
                                            _ui.Text,
                                            null,
                                            receive,
                                            " ",
                                            currency
                                        )
                                    ),
                                    _react2.default.createElement(
                                        _ui.TableCell,
                                        null,
                                        _react2.default.createElement(
                                            _ui.Text,
                                            null,
                                            (0, _dayjs.format)(date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")
                                        )
                                    )
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return SearchTopups;
}(_react2.default.Component);

SearchTopups.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var Search = function (_React$Component2) {
    _inherits(Search, _React$Component2);

    function Search() {
        var _ref6;

        var _temp2, _this5, _ret2;

        _classCallCheck(this, Search);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this5 = _possibleConstructorReturn(this, (_ref6 = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref6, [this].concat(args))), _this5), _this5.state = {
            from: null,
            to: null,
            user: null
        }, _this5._collectTopups = function (from, to, user, resolve) {
            _this5.props.onProgress(true, function () {
                var agents = _this5.props.agents.filter(function (agent) {
                    return agent.user === user;
                });

                _this5.props.api.reseller.collectTopupsAsAdmin(from / 1000, to / 1000, agents).then(function (topups) {
                    resolve(topups, function () {
                        _this5.props.onProgress(false);
                    });
                }).catch(_this5.props.onError);
            });
        }, _temp2), _possibleConstructorReturn(_this5, _ret2);
    }

    _createClass(Search, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this6 = this;

            var now = new Date();

            this.setState({
                from: (0, _dayjs.startOfDay)(now),
                to: (0, _dayjs.endOfDay)(now)
            }, function () {
                _this6._collectTopups(_this6.state.from, _this6.state.to, _this6.state.user, _this6.props.onFinish);
            });
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return this.state !== nextState;
        }
    }, {
        key: "render",
        value: function render() {
            var _this7 = this;

            if (this.state.from === null || this.state.to === null) {
                return _react2.default.createElement(this.props.layout, null);
            }

            return _react2.default.createElement(
                this.props.layout,
                null,
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row"
                    },
                    _react2.default.createElement(_ui.DatePicker, {
                        margin: {
                            left: 4
                        },
                        value: this.state.from,
                        placeholder: "Desde",
                        onChange: function onChange(date) {
                            _this7.setState({
                                from: (0, _dayjs.startOfDay)(date)
                            });
                        }
                    }),
                    _react2.default.createElement(_ui.DatePicker, {
                        margin: {
                            left: 4
                        },
                        value: this.state.to,
                        placeholder: "Hasta",
                        onChange: function onChange(date) {
                            _this7.setState({
                                to: (0, _dayjs.endOfDay)(date)
                            });
                        }
                    })
                ),
                _react2.default.createElement(
                    _ui.Select,
                    {
                        label: "Revendedores",
                        margin: {
                            top: 8
                        },
                        value: this.state.user,
                        width: 200,
                        onChange: function onChange(value) {
                            _this7.setState({
                                user: value
                            });
                        }
                    },
                    this.props.users.map(function (user) {
                        var id = user.id,
                            name = user.name;


                        return _react2.default.createElement(
                            _ui.SelectItem,
                            {
                                key: id,
                                value: id
                            },
                            name
                        );
                    })
                ),
                _react2.default.createElement(
                    _ui.Button,
                    {
                        color: "primary",
                        margin: {
                            top: 8
                        },
                        onClick: function onClick() {
                            _this7.props.onBegin(function () {
                                _this7._collectTopups(_this7.state.from, _this7.state.to, _this7.state.users, _this7.props.onFinish);
                            });
                        }
                    },
                    _react2.default.createElement(this.props.icons.actions.search, null),
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Buscar"
                    )
                )
            );
        }
    }]);

    return Search;
}(_react2.default.Component);

Search.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    agents: _propTypes2.default.array,
    users: _propTypes2.default.array,
    onProgress: _propTypes2.default.func.isRequired,
    onBegin: _propTypes2.default.func.isRequired, // (callback)
    onFinish: _propTypes2.default.func.isRequired // (topups, callback)
};
exports.default = SearchTopups;