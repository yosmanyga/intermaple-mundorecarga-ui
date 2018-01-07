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

var _ListTopups = require("./ListTopups.inc");

var _ListTopups2 = _interopRequireDefault(_ListTopups);

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
            topups: null,
            contacts: null,
            userland: {
                phone: {
                    users: null
                }
            },
            countries: null,
            providers: null,
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
        key: "render",
        value: function render() {
            var _this3 = this;

            var Layout = this._buildLayout;

            return _react2.default.createElement(
                Layout,
                null,
                _react2.default.createElement(SearchBy, {
                    icons: this.props.icons,
                    api: this.props.api,
                    onBegin: function onBegin(callback) {
                        _this3.setState({
                            topups: null,
                            contacts: null,
                            userland: {
                                phone: {
                                    users: null
                                }
                            },
                            countries: null,
                            providers: null
                        }, callback);
                    },
                    onFinish: function onFinish(topups) {
                        _this3.setState({
                            topups: topups
                        });
                    },
                    onProgress: this._handleProgress,
                    onError: this.props.onError
                }),
                this.state.topups !== null ? this.state.topups.length > 0 ? _react2.default.createElement(_ListTopups2.default, {
                    layout: function layout(_ref3) {
                        var children = _ref3.children;

                        return _react2.default.createElement(
                            _ui.Container,
                            {
                                margin: {
                                    top: 1
                                }
                            },
                            children
                        );
                    },
                    icons: this.props.icons,
                    api: this.props.api,
                    topups: this.state.topups,
                    client: true,
                    onProcessTopup: function onProcessTopup(topup) {
                        _this3._handleProcessTopup(topup);
                    },
                    onSelectUser: this.props.onSelectUser,
                    onProgress: this._handleProgress
                }) : _react2.default.createElement(
                    _ui.Text,
                    {
                        center: true,
                        margin: {
                            top: 1
                        }
                    },
                    "No se encontraron recargas."
                ) : null
            );
        }
    }, {
        key: "_handleProcessTopup",
        value: function _handleProcessTopup(targetTopup) {
            var topups = this.state.topups.map(function (topup) {
                if (topup.id !== targetTopup.id) {
                    return topup;
                }

                return targetTopup;
            });

            this.setState({
                topups: topups
            });
        }
    }]);

    return SearchTopups;
}(_react2.default.Component);

SearchTopups.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onSelectUser: _propTypes2.default.func.isRequired, // (user)
    onError: _propTypes2.default.func.isRequired
};

var SearchBy = function (_React$Component2) {
    _inherits(SearchBy, _React$Component2);

    function SearchBy() {
        var _ref4;

        var _temp2, _this4, _ret2;

        _classCallCheck(this, SearchBy);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref4 = SearchBy.__proto__ || Object.getPrototypeOf(SearchBy)).call.apply(_ref4, [this].concat(args))), _this4), _this4.state = {
            tab: 0,
            topups: null,
            progress: 0
        }, _this4._handleChangeTab = function (value) {
            _this4.setState({
                tab: value
            }, function () {
                _this4.props.onBegin();
            });
        }, _this4._collectTopupsByDate = function (from, to, resolve) {
            _this4.setState({
                topups: null
            }, function () {
                _this4.props.onProgress(true, function () {
                    _this4.props.api.collectTopupsByDateAsOperator(from / 1000, to / 1000).then(function (topups) {
                        _this4.setState({
                            topups: topups
                        }, function () {
                            _this4.props.onProgress(false, function () {
                                resolve(_this4.state.topups);
                            });
                        });
                    }).catch(_this4.props.onError);
                });
            });
        }, _this4._collectTopupsByPhone = function (phone, resolve) {
            _this4.setState({
                topups: null
            }, function () {
                _this4.props.onProgress(true, function () {
                    _this4.props.api.collectTopupsByPhoneAsOperator(phone).then(function (topups) {
                        _this4.setState({
                            topups: topups
                        }, function () {
                            _this4.props.onProgress(false, function () {
                                resolve(_this4.state.topups);
                            });
                        });
                    }).catch(_this4.props.onError);
                });
            });
        }, _this4._collectTopupsByStripe = function (stripe, resolve) {
            _this4.setState({
                topups: null
            }, function () {
                _this4.props.onProgress(true, function () {
                    _this4.props.api.collectTopupsByStripeAsOperator(stripe).then(function (topups) {
                        _this4.setState({
                            topups: topups
                        }, function () {
                            _this4.props.onProgress(false, function () {
                                resolve(_this4.state.topups);
                            });
                        });
                    }).catch(_this4.props.onError);
                });
            });
        }, _temp2), _possibleConstructorReturn(_this4, _ret2);
    }

    _createClass(SearchBy, [{
        key: "render",
        value: function render() {
            var _this5 = this;

            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "column",
                    align: {
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }
                },
                _react2.default.createElement(
                    _ui.Tabs,
                    {
                        value: this.state.tab,
                        margin: {
                            top: 8
                        },
                        onChange: this._handleChangeTab
                    },
                    _react2.default.createElement(_ui.Tab, { heading: "Buscar por fecha" }),
                    _react2.default.createElement(_ui.Tab, { heading: "Buscar por tel\xE9fono" }),
                    _react2.default.createElement(_ui.Tab, { heading: "Buscar por Stripe" })
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        margin: {
                            top: 8
                        }
                    },
                    this.state.tab === 0 && _react2.default.createElement(SearchByDate, {
                        icons: this.props.icons,
                        onBegin: function onBegin(from, to) {
                            _this5._collectTopupsByDate(from, to, function (topups) {
                                _this5.props.onFinish(topups);
                            });
                        },
                        onSet: function onSet(from, to) {
                            _this5.props.onBegin(function () {
                                _this5._collectTopupsByDate(from, to, function (topups) {
                                    _this5.props.onFinish(topups);
                                });
                            });
                        }
                    }),
                    this.state.tab === 1 && _react2.default.createElement(SearchByPhone, {
                        icons: this.props.icons,
                        onSet: function onSet(phone) {
                            _this5.props.onBegin(function () {
                                _this5._collectTopupsByPhone(phone, function (topups) {
                                    _this5.props.onFinish(topups);
                                });
                            });
                        }
                    }),
                    this.state.tab === 2 && _react2.default.createElement(SearchByStripe, {
                        icons: this.props.icons,
                        onSet: function onSet(stripe) {
                            _this5.props.onBegin(function () {
                                _this5._collectTopupsByStripe(stripe, function (topups) {
                                    _this5.props.onFinish(topups);
                                });
                            });
                        }
                    })
                )
            );
        }
    }]);

    return SearchBy;
}(_react2.default.Component);

SearchBy.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onBegin: _propTypes2.default.func.isRequired, // (callback)
    onFinish: _propTypes2.default.func.isRequired, // (topups)
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var SearchByDate = function (_React$Component3) {
    _inherits(SearchByDate, _React$Component3);

    function SearchByDate() {
        var _ref5;

        var _temp3, _this6, _ret3;

        _classCallCheck(this, SearchByDate);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return _ret3 = (_temp3 = (_this6 = _possibleConstructorReturn(this, (_ref5 = SearchByDate.__proto__ || Object.getPrototypeOf(SearchByDate)).call.apply(_ref5, [this].concat(args))), _this6), _this6.state = {
            from: null,
            to: null
        }, _temp3), _possibleConstructorReturn(_this6, _ret3);
    }

    _createClass(SearchByDate, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this7 = this;

            var now = new Date();

            this.setState({
                from: (0, _dayjs.startOfDay)(now),
                to: (0, _dayjs.endOfDay)(now)
            }, function () {
                _this7.props.onBegin(_this7.state.from, _this7.state.to);
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
            var _this8 = this;

            return _react2.default.createElement(
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
                        _this8.setState({
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
                        _this8.setState({
                            to: (0, _dayjs.endOfDay)(date)
                        });
                    }
                }),
                _react2.default.createElement(
                    _ui.Button,
                    {
                        color: "primary",
                        margin: {
                            left: 4
                        },
                        onClick: function onClick() {
                            _this8.props.onSet(_this8.state.from, _this8.state.to);
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

    return SearchByDate;
}(_react2.default.Component);

SearchByDate.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    onBegin: _propTypes2.default.func.isRequired, // (from, to)
    onSet: _propTypes2.default.func.isRequired // (from, to)
};

var SearchByPhone = function (_React$Component4) {
    _inherits(SearchByPhone, _React$Component4);

    function SearchByPhone() {
        var _ref6;

        var _temp4, _this9, _ret4;

        _classCallCheck(this, SearchByPhone);

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        return _ret4 = (_temp4 = (_this9 = _possibleConstructorReturn(this, (_ref6 = SearchByPhone.__proto__ || Object.getPrototypeOf(SearchByPhone)).call.apply(_ref6, [this].concat(args))), _this9), _this9.state = {
            phone: null
        }, _temp4), _possibleConstructorReturn(_this9, _ret4);
    }

    _createClass(SearchByPhone, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return this.state !== nextState;
        }
    }, {
        key: "render",
        value: function render() {
            var _this10 = this;

            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "row"
                },
                _react2.default.createElement(_ui.Input, {
                    label: "Tel\xE9fono",
                    value: this.state.phone,
                    focus: true,
                    onChange: function onChange(value) {
                        _this10.setState({
                            phone: value
                        });
                    },
                    onEnter: function onEnter() {
                        _this10.props.onSet(_this10.state.phone);
                    }
                }),
                _react2.default.createElement(
                    _ui.Button,
                    {
                        color: "primary",
                        margin: {
                            left: 4
                        },
                        onClick: function onClick() {
                            _this10.props.onSet(_this10.state.phone);
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

    return SearchByPhone;
}(_react2.default.Component);

SearchByPhone.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    onSet: _propTypes2.default.func.isRequired // (phone)
};

var SearchByStripe = function (_React$Component5) {
    _inherits(SearchByStripe, _React$Component5);

    function SearchByStripe() {
        var _ref7;

        var _temp5, _this11, _ret5;

        _classCallCheck(this, SearchByStripe);

        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        return _ret5 = (_temp5 = (_this11 = _possibleConstructorReturn(this, (_ref7 = SearchByStripe.__proto__ || Object.getPrototypeOf(SearchByStripe)).call.apply(_ref7, [this].concat(args))), _this11), _this11.state = {
            stripe: null
        }, _temp5), _possibleConstructorReturn(_this11, _ret5);
    }

    _createClass(SearchByStripe, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return this.state !== nextState;
        }
    }, {
        key: "render",
        value: function render() {
            var _this12 = this;

            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "row"
                },
                _react2.default.createElement(_ui.Input, {
                    label: "Id de stripe",
                    value: this.state.stripe,
                    focus: true,
                    onChange: function onChange(value) {
                        _this12.setState({
                            stripe: value
                        });
                    },
                    onEnter: function onEnter() {
                        _this12.props.onSet(_this12.state.stripe);
                    }
                }),
                _react2.default.createElement(
                    _ui.Button,
                    {
                        color: "primary",
                        margin: {
                            left: 4
                        },
                        onClick: function onClick() {
                            _this12.props.onSet(_this12.state.stripe);
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

    return SearchByStripe;
}(_react2.default.Component);

SearchByStripe.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    onSet: _propTypes2.default.func.isRequired // (id)
};
exports.default = SearchTopups;