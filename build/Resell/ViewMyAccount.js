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

var _ui = require("@yosmy/ui");

var _dayjs = require("@yosmy/dayjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewMyAccount = function (_React$Component) {
    _inherits(ViewMyAccount, _React$Component);

    function ViewMyAccount() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, ViewMyAccount);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ViewMyAccount.__proto__ || Object.getPrototypeOf(ViewMyAccount)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            tab: 0,
            progress: 0
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["children"]);

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
                    title: "Mi cuenta",
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

    _createClass(ViewMyAccount, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            var Layout = this._buildLayout;

            return _react2.default.createElement(
                Layout,
                null,
                _react2.default.createElement(
                    _ui.Tabs,
                    {
                        value: this.state.tab,
                        onChange: function onChange(value) {
                            _this3.setState({
                                tab: value
                            });
                        }
                    },
                    _react2.default.createElement(_ui.Tab, { heading: "Principal" }),
                    _react2.default.createElement(_ui.Tab, { heading: "Transacciones" }),
                    _react2.default.createElement(_ui.Tab, { heading: "Proveedores" }),
                    _react2.default.createElement(_ui.Tab, { heading: "Agentes" })
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        margin: {
                            top: 8
                        },
                        padding: 8
                    },
                    this.state.tab === 0 && _react2.default.createElement(ViewMain, {
                        api: this.props.api,
                        onProgress: this._handleProgress,
                        onError: this.props.onError
                    }),
                    this.state.tab === 1 && _react2.default.createElement(ListTransactions, {
                        api: this.props.api,
                        onProgress: this._handleProgress,
                        onError: this.props.onError
                    }),
                    this.state.tab === 2 && _react2.default.createElement(ListProviders, {
                        api: this.props.api,
                        onProgress: this._handleProgress,
                        onError: this.props.onError
                    }),
                    this.state.tab === 3 && _react2.default.createElement(ListAgents, {
                        icons: this.props.icons,
                        api: this.props.api,
                        onProgress: this._handleProgress,
                        onError: this.props.onError
                    })
                )
            );
        }
    }]);

    return ViewMyAccount;
}(_react2.default.Component);

ViewMyAccount.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onError: _propTypes2.default.func.isRequired
};
exports.default = ViewMyAccount;

var ViewMain = function (_React$Component2) {
    _inherits(ViewMain, _React$Component2);

    function ViewMain() {
        var _ref3;

        var _temp2, _this4, _ret2;

        _classCallCheck(this, ViewMain);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref3 = ViewMain.__proto__ || Object.getPrototypeOf(ViewMain)).call.apply(_ref3, [this].concat(args))), _this4), _this4.state = {
            user: null
        }, _temp2), _possibleConstructorReturn(_this4, _ret2);
    }

    _createClass(ViewMain, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this5 = this;

            this.props.onProgress(true, function () {
                _this5.props.api.reseller.pickUserAsReseller().then(function (user) {
                    _this5.setState({
                        user: user
                    }, function () {
                        _this5.props.onProgress(false);
                    });
                }).catch(_this5.props.onError);
            });
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.user === null) {
                return _react2.default.createElement(_react2.default.Fragment, null);
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    _ui.Text,
                    null,
                    "Nombre: ",
                    this.state.user.name
                ),
                _react2.default.createElement(
                    _ui.Text,
                    {
                        margin: {
                            top: 8
                        }
                    },
                    "Saldo actual: ",
                    this.state.user.balance,
                    " USD"
                )
            );
        }
    }]);

    return ViewMain;
}(_react2.default.Component);

ViewMain.propTypes = {
    api: _propTypes2.default.object.isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var ListTransactions = function (_React$Component3) {
    _inherits(ListTransactions, _React$Component3);

    function ListTransactions() {
        var _ref4;

        var _temp3, _this6, _ret3;

        _classCallCheck(this, ListTransactions);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return _ret3 = (_temp3 = (_this6 = _possibleConstructorReturn(this, (_ref4 = ListTransactions.__proto__ || Object.getPrototypeOf(ListTransactions)).call.apply(_ref4, [this].concat(args))), _this6), _this6.state = {
            transactions: null
        }, _temp3), _possibleConstructorReturn(_this6, _ret3);
    }

    _createClass(ListTransactions, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this7 = this;

            this.props.onProgress(true, function () {
                _this7.props.api.reseller.collectTransactionsAsReseller().then(function (transactions) {
                    _this7.setState({
                        transactions: transactions
                    }, function () {
                        _this7.props.onProgress(false);
                    });
                }).catch(_this7.props.onError);
            });
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.transactions === null) {
                return _react2.default.createElement(_react2.default.Fragment, null);
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    _ui.List,
                    null,
                    this.state.transactions.map(function (_ref5) {
                        var id = _ref5.id,
                            reference = _ref5.reference,
                            amount = _ref5.amount,
                            date = _ref5.date;

                        return _react2.default.createElement(_ui.ListItem, {
                            key: id,
                            text: amount + " USD",
                            note: (0, _dayjs.format)(date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")
                        });
                    })
                )
            );
        }
    }]);

    return ListTransactions;
}(_react2.default.Component);

ListTransactions.propTypes = {
    api: _propTypes2.default.object.isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var ListProviders = function (_React$Component4) {
    _inherits(ListProviders, _React$Component4);

    function ListProviders() {
        var _ref6;

        var _temp4, _this8, _ret4;

        _classCallCheck(this, ListProviders);

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        return _ret4 = (_temp4 = (_this8 = _possibleConstructorReturn(this, (_ref6 = ListProviders.__proto__ || Object.getPrototypeOf(ListProviders)).call.apply(_ref6, [this].concat(args))), _this8), _this8.state = {
            reseller: {
                user: null,
                providers: null
            },
            countries: null,
            providers: null,
            products: null
        }, _temp4), _possibleConstructorReturn(_this8, _ret4);
    }

    _createClass(ListProviders, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this9 = this;

            this.props.onProgress(true, function () {
                Promise.all([_this9.props.api.reseller.pickUserAsReseller(), _this9.props.api.reseller.collectProviders(), _this9.props.api.collectCountries(), _this9.props.api.collectProviders(null, null), _this9.props.api.collectProducts(null, null)]).then(function (values) {
                    _this9.setState({
                        reseller: {
                            user: values[0],
                            providers: values[1]
                        },
                        countries: values[2],
                        providers: values[3],
                        products: values[4]
                    }, function () {
                        _this9.props.onProgress(false);
                    });
                }).catch(_this9.props.onError);
            });
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "render",
        value: function render() {
            var _this10 = this;

            if (this.state.reseller.user === null || this.state.reseller.providers === null || this.state.countries === null || this.state.providers === null || this.state.products === null) {
                return _react2.default.createElement(_react2.default.Fragment, null);
            }

            var countries = this.state.countries;

            this.state.reseller.providers.forEach(function (_ref7) {
                var id = _ref7.id,
                    pid = _ref7.pid,
                    discount = _ref7.discount;

                var provider = _this10.state.providers.find(function (_ref8) {
                    var id = _ref8.id;

                    return id === pid;
                });

                var products = _this10.state.products.filter(function (product) {
                    return product.provider === pid;
                });

                countries = countries.map(function (country) {
                    var iso = country.iso,
                        providers = country.providers;

                    // Different country?

                    if (iso !== provider.country) {
                        return country;
                    }

                    if (!providers) {
                        providers = [];
                    }

                    providers = providers.concat({
                        id: provider.id,
                        name: provider.name,
                        logo: provider.logo,
                        width: provider.width,
                        height: provider.height,
                        discount: discount,
                        products: products
                    });

                    return _extends({}, country, {
                        providers: providers
                    });
                });
            });

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                countries.map(function (_ref9) {
                    var iso = _ref9.iso,
                        name = _ref9.name,
                        providers = _ref9.providers;

                    if (!providers) {
                        return null;
                    }

                    return _react2.default.createElement(_ui.Card, {
                        key: iso,
                        header: {
                            avatar: _react2.default.createElement(_ui.Flag, {
                                iso: iso,
                                size: "sm"
                            }),
                            title: name
                        },
                        content: _react2.default.createElement(
                            _react2.default.Fragment,
                            null,
                            providers.map(function (_ref10) {
                                var id = _ref10.id,
                                    name = _ref10.name,
                                    logo = _ref10.logo,
                                    width = _ref10.width,
                                    height = _ref10.height,
                                    discount = _ref10.discount,
                                    products = _ref10.products;

                                // Trick to put the logo inside a box

                                if (width >= 24) {
                                    height = height * 24 / width;
                                    width = 24;
                                } else if (height >= 24) {
                                    width = width * 24 / height;
                                    height = 24;
                                }

                                return _react2.default.createElement(_ui.Card, {
                                    key: id,
                                    header: {
                                        avatar: _react2.default.createElement(_ui.Image, {
                                            source: logo !== null ? logo : require("../Common/provider.png"),
                                            width: logo !== null ? width : 24,
                                            height: logo !== null ? height : 24
                                        }),
                                        title: name
                                    },
                                    content: _react2.default.createElement(
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
                                                    "Costo de mi saldo"
                                                ),
                                                _react2.default.createElement(
                                                    _ui.TableCell,
                                                    null,
                                                    "Recibe"
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            _ui.TableBody,
                                            null,
                                            products.map(function (product) {
                                                var combinations = product.combinations;


                                                return combinations.map(function (_ref11, i) {
                                                    var send = _ref11.send,
                                                        receive = _ref11.receive;

                                                    var d = send.amount * discount / 100;

                                                    return _react2.default.createElement(
                                                        _ui.TableRow,
                                                        {
                                                            key: i
                                                        },
                                                        _react2.default.createElement(
                                                            _ui.TableCell,
                                                            null,
                                                            send.amount - d,
                                                            " ",
                                                            send.currency
                                                        ),
                                                        _react2.default.createElement(
                                                            _ui.TableCell,
                                                            null,
                                                            receive.amount,
                                                            " ",
                                                            receive.currency
                                                        )
                                                    );
                                                });
                                            })
                                        )
                                    ),
                                    margin: {
                                        top: 8
                                    }
                                });
                            })
                        ),
                        margin: {
                            top: 8
                        }
                    });
                }).filter(function (x) {
                    return x;
                })
            );
        }
    }]);

    return ListProviders;
}(_react2.default.Component);

ListProviders.propTypes = {
    api: _propTypes2.default.object.isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var ListAgents = function (_React$Component5) {
    _inherits(ListAgents, _React$Component5);

    function ListAgents() {
        var _ref12;

        var _temp5, _this11, _ret5;

        _classCallCheck(this, ListAgents);

        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        return _ret5 = (_temp5 = (_this11 = _possibleConstructorReturn(this, (_ref12 = ListAgents.__proto__ || Object.getPrototypeOf(ListAgents)).call.apply(_ref12, [this].concat(args))), _this11), _this11.state = {
            agents: null,
            agent: null,
            action: null // "add", "edit"
        }, _this11._collectData = function () {
            _this11.props.onProgress(true, function () {
                _this11.props.api.reseller.collectAgentsAsReseller().then(function (agents) {
                    _this11.props.onProgress(false, function () {
                        _this11.setState({
                            agents: agents
                        });
                    });
                }).catch(_this11.props.onError);
            });
        }, _temp5), _possibleConstructorReturn(_this11, _ret5);
    }

    _createClass(ListAgents, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this._collectData();
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "render",
        value: function render() {
            var _this12 = this;

            if (this.state.agents === null) {
                return _react2.default.createElement(_react2.default.Fragment, null);
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.state.action === null && _react2.default.createElement(
                    _ui.Button,
                    {
                        variant: "outlined",
                        onClick: function onClick() {
                            _this12.setState({
                                action: "add"
                            });
                        }
                    },
                    _react2.default.createElement(this.props.icons.actions.add, null),
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Agregar agente"
                    )
                ),
                this.state.action === "add" && _react2.default.createElement(AddAgent, {
                    icons: this.props.icons,
                    api: this.props.api,
                    onAdd: function onAdd() {
                        _this12.setState({
                            action: null
                        }, _this12._collectData);
                    },
                    onCancel: function onCancel() {
                        _this12.setState({
                            action: null
                        });
                    },
                    onProgress: this.props.onProgress,
                    onError: this.props.onError
                }),
                this.state.action === "edit" && _react2.default.createElement(EditAgent, {
                    icons: this.props.icons,
                    api: this.props.api,
                    agent: this.state.agent,
                    onEdit: function onEdit() {
                        _this12.setState({
                            action: null
                        }, _this12._collectData);
                    },
                    onCancel: function onCancel() {
                        _this12.setState({
                            action: null
                        });
                    },
                    onProgress: this.props.onProgress,
                    onError: this.props.onError
                }),
                _react2.default.createElement(
                    _ui.List,
                    null,
                    this.state.agents.map(function (agent) {
                        var id = agent.id,
                            name = agent.name;


                        return _react2.default.createElement(_ui.ListItem, {
                            key: id,
                            text: name,
                            action: _react2.default.createElement(
                                _ui.Button,
                                {
                                    onClick: function onClick() {
                                        _this12.setState({
                                            action: "edit",
                                            agent: agent
                                        });
                                    }
                                },
                                _react2.default.createElement(_this12.props.icons.actions.edit, null)
                            )
                        });
                    })
                )
            );
        }
    }]);

    return ListAgents;
}(_react2.default.Component);

ListAgents.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var AddAgent = function (_React$Component6) {
    _inherits(AddAgent, _React$Component6);

    function AddAgent() {
        var _ref13;

        var _temp6, _this13, _ret6;

        _classCallCheck(this, AddAgent);

        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
        }

        return _ret6 = (_temp6 = (_this13 = _possibleConstructorReturn(this, (_ref13 = AddAgent.__proto__ || Object.getPrototypeOf(AddAgent)).call.apply(_ref13, [this].concat(args))), _this13), _this13.state = {
            input: {
                name: null
            }
        }, _temp6), _possibleConstructorReturn(_this13, _ret6);
    }

    _createClass(AddAgent, [{
        key: "render",
        value: function render() {
            var _this14 = this;

            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "column",
                    align: {
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }
                },
                _react2.default.createElement(_ui.Input, {
                    label: "Nombre",
                    help: "Nombre del nuevo agente",
                    value: this.state.input.name,
                    focus: true,
                    onChange: function onChange(value) {
                        _this14.setState({
                            input: _extends({}, _this14.state.input, {
                                name: value
                            })
                        });
                    }
                }),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        margin: {
                            top: 8
                        }
                    },
                    _react2.default.createElement(
                        _ui.Button,
                        {
                            onClick: this.props.onCancel,
                            margin: { right: 1 }
                        },
                        _react2.default.createElement(this.props.icons.actions.back, null),
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Cancelar"
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Button,
                        {
                            color: "primary",
                            disabled: !this.state.input.name,
                            margin: {
                                left: 8
                            },
                            onClick: function onClick() {
                                _this14.props.onProgress(true, function () {
                                    _this14.props.api.reseller.addAgent(_this14.state.input.name).then(function () {
                                        _this14.props.onProgress(false, _this14.props.onAdd);
                                    });
                                });
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Agregar"
                        ),
                        _react2.default.createElement(this.props.icons.actions.ok, null)
                    )
                )
            );
        }
    }]);

    return AddAgent;
}(_react2.default.Component);

AddAgent.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onAdd: _propTypes2.default.func.isRequired,
    onCancel: _propTypes2.default.func.isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var EditAgent = function (_React$Component7) {
    _inherits(EditAgent, _React$Component7);

    function EditAgent() {
        var _ref14;

        var _temp7, _this15, _ret7;

        _classCallCheck(this, EditAgent);

        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
        }

        return _ret7 = (_temp7 = (_this15 = _possibleConstructorReturn(this, (_ref14 = EditAgent.__proto__ || Object.getPrototypeOf(EditAgent)).call.apply(_ref14, [this].concat(args))), _this15), _this15.state = {
            input: {
                name: null
            }
        }, _temp7), _possibleConstructorReturn(_this15, _ret7);
    }

    _createClass(EditAgent, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.setState({
                input: _extends({}, this.state.input, {
                    name: this.props.agent.name
                })
            });
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "render",
        value: function render() {
            var _this16 = this;

            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "column",
                    align: {
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }
                },
                _react2.default.createElement(_ui.Input, {
                    label: "Nombre",
                    help: "Nombre del agente",
                    value: this.state.input.name,
                    focus: true,
                    onChange: function onChange(value) {
                        _this16.setState({
                            input: _extends({}, _this16.state.input, {
                                name: value
                            })
                        });
                    }
                }),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        margin: {
                            top: 8
                        }
                    },
                    _react2.default.createElement(
                        _ui.Button,
                        {
                            onClick: this.props.onCancel,
                            margin: { right: 1 }
                        },
                        _react2.default.createElement(this.props.icons.actions.back, null),
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Cancelar"
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Button,
                        {
                            color: "primary",
                            disabled: !this.state.input.name,
                            margin: {
                                left: 8
                            },
                            onClick: function onClick() {
                                _this16.props.onProgress(true, function () {
                                    _this16.props.api.reseller.updateAgent(_this16.props.agent.id, _this16.state.input.name).then(function () {
                                        _this16.props.onProgress(false, _this16.props.onEdit);
                                    });
                                });
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Agregar"
                        ),
                        _react2.default.createElement(this.props.icons.actions.ok, null)
                    )
                )
            );
        }
    }]);

    return EditAgent;
}(_react2.default.Component);

EditAgent.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    agent: _propTypes2.default.object.isRequired,
    onEdit: _propTypes2.default.func.isRequired,
    onCancel: _propTypes2.default.func.isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};