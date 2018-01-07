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

var _b64ToBlob = require("b64-to-blob");

var _b64ToBlob2 = _interopRequireDefault(_b64ToBlob);

var _dayjs = require("@yosmy/dayjs");

var _ui = require("@yosmy/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListTopups = function (_React$Component) {
    _inherits(ListTopups, _React$Component);

    function ListTopups() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ListTopups);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListTopups.__proto__ || Object.getPrototypeOf(ListTopups)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            contacts: null,
            userland: {
                phone: {
                    users: null
                }
            },
            countries: null,
            providers: null
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ListTopups, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.props.onProgress(true, function () {
                var contacts = _this2.props.topups.map(function (_ref2) {
                    var contact = _ref2.contact;

                    return contact;
                });

                Promise.all([new Promise(function (resolve) {
                    _this2.props.api.collectContactsAsOperator(contacts, null).then(function (contacts) {
                        _this2.setState({
                            contacts: contacts
                        }, function () {
                            var users = _this2.state.contacts.map(function (_ref3) {
                                var user = _ref3.user;

                                return user;
                            });

                            _this2.props.api.userland.phone.collectUsers(users).then(function (users) {
                                _this2.setState({
                                    userland: _extends({}, _this2.state.userland, {
                                        phone: {
                                            users: users
                                        }
                                    })
                                }, resolve);
                            }).catch(_this2.props.onError);
                        });
                    }).catch(_this2.props.onError);
                }), new Promise(function (resolve) {
                    _this2.props.api.collectCountries(null).then(function (countries) {
                        _this2.setState({
                            countries: countries
                        }, resolve);
                    }).catch(_this2.props.onError);
                }), new Promise(function (resolve) {
                    _this2.props.api.collectProviders(null, null).then(function (providers) {
                        _this2.setState({
                            providers: providers
                        }, resolve);
                    }).catch(_this2.props.onError);
                })]).then(function () {
                    _this2.props.onProgress(false);
                });
            });
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextProps.topups !== this.props.topups || nextState !== this.state;
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.contacts === null || this.state.userland.phone.users === null || this.state.countries === null || this.state.providers === null) {
                return _react2.default.createElement(this.props.layout, null);
            }

            return _react2.default.createElement(
                this.props.layout,
                null,
                this.props.topups.map(function (topup) {
                    var id = topup.id;


                    return _react2.default.createElement(Topup, {
                        key: id,
                        width: _this3.props.width,
                        icons: _this3.props.icons,
                        api: _this3.props.api,
                        topup: topup,
                        contacts: _this3.state.contacts,
                        userland: {
                            phone: {
                                users: _this3.state.userland.phone.users
                            }
                        },
                        countries: _this3.state.countries,
                        providers: _this3.state.providers,
                        client: _this3.props.client,
                        onProcessed: _this3.props.onProcessTopup,
                        onSelectUser: _this3.props.onSelectUser,
                        onProgress: _this3.props.onProgress
                    });
                })
            );
        }
    }]);

    return ListTopups;
}(_react2.default.Component);

ListTopups.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    topups: _propTypes2.default.array,
    client: _propTypes2.default.bool.isRequired,
    onProcessTopup: _propTypes2.default.func, // (topup)
    onSelectUser: _propTypes2.default.func, // (user)
    onProgress: _propTypes2.default.func.isRequired // ()
};

var Topup = function (_React$Component2) {
    _inherits(Topup, _React$Component2);

    function Topup() {
        var _ref4;

        var _temp2, _this4, _ret2;

        _classCallCheck(this, Topup);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref4 = Topup.__proto__ || Object.getPrototypeOf(Topup)).call.apply(_ref4, [this].concat(args))), _this4), _this4.state = {
            expand: false
        }, _this4._renderData = function (top, key, value) {
            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "row",
                    align: {
                        justifyContent: "flex-start",
                        alignItems: "center"
                    },
                    margin: {
                        top: top
                    }
                },
                _ui.Platform.dimensions.isMdUp(_this4.props.width) && _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "column",
                        align: {
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        },
                        width: "20%"
                    },
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "body1"
                        },
                        key,
                        ":"
                    )
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row wrap",
                        align: {
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }
                    },
                    value
                )
            );
        }, _this4._resolveCountry = function (country) {
            return _this4.props.countries.find(function (_ref5) {
                var iso = _ref5.iso;

                return iso === country;
            }).name;
        }, _this4._handleExpandCollapse = function () {
            _this4.setState({
                expand: !_this4.state.expand
            });
        }, _temp2), _possibleConstructorReturn(_this4, _ret2);
    }

    _createClass(Topup, [{
        key: "render",
        value: function render() {
            var _this5 = this;

            var _props$topup = this.props.topup,
                id = _props$topup.id,
                contact = _props$topup.contact,
                product = _props$topup.product,
                amount = _props$topup.amount,
                steps = _props$topup.steps,
                attempts = _props$topup.attempts,
                stripe = _props$topup.stripe,
                charge = _props$topup.charge,
                fee = _props$topup.fee,
                ding = _props$topup.ding,
                profit = _props$topup.profit,
                date = _props$topup.date;


            contact = this.props.contacts.find(function (_ref6) {
                var id = _ref6.id;

                return id === contact;
            });

            var user = this.props.userland.phone.users.find(function (_ref7) {
                var id = _ref7.id;

                return id === contact.user;
            });

            var provider = this.props.providers.find(function (_ref8) {
                var id = _ref8.id,
                    products = _ref8.products;

                return products.find(function (_ref9) {
                    var id = _ref9.id;

                    return id === product;
                });
            });

            var nextAttempt = void 0;
            switch (attempts) {
                case 1:
                    nextAttempt = "2da";

                    break;
                case 2:
                    nextAttempt = "3ra";

                    break;
                case 3:
                    nextAttempt = "4ta";

                    break;
                case 4:
                    nextAttempt = "5ta";

                    break;
                case 5:
                    nextAttempt = "6ta";

                    break;
                case 6:
                    nextAttempt = "7ma";

                    break;
                case 7:
                    nextAttempt = "8va";

                    break;
                case 8:
                    nextAttempt = "9na";

                    break;
                default:
                    nextAttempt = "próxima";

                    break;
            }

            var lastStep = steps[steps.length - 1];

            var actions = [lastStep === "transfer.exception" && _react2.default.createElement(
                _ui.Button,
                {
                    variant: "outlined",
                    tooltip: "Reintentar recarga por " + nextAttempt + " vez",
                    margin: {
                        left: 8
                    },
                    onClick: function onClick() {
                        _this5.props.onProgress(true, function () {
                            _this5.props.api.trySendingTopupAgain(_this5.props.topup.id).then(function (topup) {
                                _this5.props.onProgress(false, function () {
                                    _this5.props.onProcessed(topup);
                                });
                            }).catch(_this5.props.onError);
                        });
                    }
                },
                _react2.default.createElement(this.props.icons.actions.retry, null),
                _react2.default.createElement(
                    _ui.Text,
                    null,
                    "(",
                    attempts,
                    " int)"
                )
            ), lastStep === "payment" && _react2.default.createElement(
                _ui.Button,
                {
                    variant: "outlined",
                    tooltip: "Enviar recarga",
                    margin: {
                        left: 8
                    },
                    onClick: function onClick() {
                        _this5.props.onProgress(true, function () {
                            _this5.props.api.sendDelayedTopup(_this5.props.topup.id).then(function (topup) {
                                _this5.props.onProgress(false, function () {
                                    _this5.props.onProcessed(topup);
                                });
                            }).catch(_this5.props.onError);
                        });
                    }
                },
                _react2.default.createElement(this.props.icons.actions.topup, null),
                _react2.default.createElement(
                    _ui.Text,
                    null,
                    "Enviar recarga"
                )
            ), (lastStep === "payment" || lastStep === "transfer.exception") && _react2.default.createElement(
                _ui.Button,
                {
                    variant: "outlined",
                    tooltip: "Devolver pago",
                    margin: {
                        left: 8
                    },
                    onClick: function onClick() {
                        _this5.props.onProgress(true, function () {
                            _this5.props.api.refundTopup(_this5.props.topup.id).then(function (topup) {
                                _this5.props.onProgress(false, function () {
                                    _this5.props.onProcessed(topup);
                                });
                            }).catch(_this5.props.onError);
                        });
                    }
                },
                _react2.default.createElement(this.props.icons.actions.refund, null),
                _react2.default.createElement(
                    _ui.Text,
                    null,
                    "Devolver pago"
                )
            ), lastStep === "transfer.success" && _react2.default.createElement(
                _ui.Button,
                {
                    variant: "outlined",
                    tooltip: "Generar recibo",
                    onClick: function onClick() {
                        _this5.props.onProgress(true, function () {
                            _this5.props.api.topup.generateReceipt(_this5.props.topup.id).then(function (data) {
                                _this5.props.onProgress(false, function () {
                                    import("file-saver").then(function (FileSaver) {
                                        FileSaver.saveAs((0, _b64ToBlob2.default)(data, "application/pdf"), "receipt.pdf");
                                    }).catch(_this5.props.onError);
                                });
                            }).catch(_this5.props.onError);
                        });
                    },
                    margin: {
                        left: 8
                    }
                },
                _react2.default.createElement(this.props.icons.actions.print, null),
                _react2.default.createElement(
                    _ui.Text,
                    null,
                    "Generar recibo"
                )
            )].filter(function (x) {
                return x;
            });

            return _react2.default.createElement(_ui.Card, {
                key: id,
                header: {
                    avatar: _react2.default.createElement(StepIcon, {
                        icons: this.props.icons,
                        steps: steps
                    }),
                    title: _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }
                        },
                        this.props.client && _react2.default.createElement(
                            _react2.default.Fragment,
                            null,
                            _react2.default.createElement(
                                _ui.Text,
                                null,
                                amount,
                                " USD"
                            ),
                            _react2.default.createElement(
                                _ui.Text,
                                { margin: { left: 8 } },
                                "De"
                            ),
                            _react2.default.createElement(_ui.Flag, {
                                iso: user.country,
                                size: "sm",
                                border: 0,
                                margin: { left: 8 }
                            }),
                            _ui.Platform.dimensions.isMdUp(this.props.width) && _react2.default.createElement(
                                _ui.Text,
                                {
                                    margin: { left: 8 }
                                },
                                "+",
                                user.prefix,
                                "-",
                                user.number
                            ),
                            _react2.default.createElement(
                                _ui.Text,
                                {
                                    margin: { left: 8 }
                                },
                                "para"
                            )
                        ),
                        _react2.default.createElement(_ui.Flag, {
                            iso: provider.country,
                            size: "sm",
                            border: 0,
                            margin: { left: this.props.client ? 8 : 0 }
                        }),
                        _ui.Platform.dimensions.isMdUp(this.props.width) && _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: { left: 8 }
                            },
                            contact.type === "phone" ? "+" + contact.prefix + "-" + contact.account : contact.account
                        )
                    ),
                    subtitle: _react2.default.createElement(
                        _ui.Text,
                        {
                            margin: {
                                top: 4
                            }
                        },
                        (0, _dayjs.format)(date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")
                    ),
                    action: _react2.default.createElement(
                        _ui.Button,
                        {
                            onClick: this._handleExpandCollapse
                        },
                        this.state.expand === false ? _react2.default.createElement(this.props.icons.actions.expand, null) : _react2.default.createElement(this.props.icons.actions.collapse, null)
                    )
                },
                content: this.state.expand && _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "column",
                        align: {
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        },
                        margin: {
                            top: 8
                        }
                    },
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "flex-start"
                            }
                        },
                        this.props.client && this._renderData(0, "De", _react2.default.createElement(
                            _react2.default.Fragment,
                            null,
                            _react2.default.createElement(_ui.Flag, {
                                iso: user.country,
                                size: "sm",
                                border: 0
                            }),
                            _react2.default.createElement(
                                _ui.Text,
                                {
                                    margin: { left: 8 }
                                },
                                "+",
                                user.prefix,
                                "-",
                                user.number,
                                " (",
                                this._resolveCountry(user.country),
                                ")"
                            ),
                            _react2.default.createElement(
                                _ui.Button,
                                {
                                    variant: "outlined",
                                    onClick: function onClick() {
                                        _this5.props.onSelectUser(user);
                                    }
                                },
                                _react2.default.createElement(this.props.icons.actions.details, null)
                            )
                        )),
                        this.props.client && this._renderData(2, "Para", _react2.default.createElement(
                            _react2.default.Fragment,
                            null,
                            _react2.default.createElement(_ui.Flag, {
                                iso: provider.country,
                                size: "sm",
                                border: 0
                            }),
                            _react2.default.createElement(
                                _ui.Text,
                                {
                                    margin: { left: 8 }
                                },
                                contact.type === "phone" ? "+" + contact.prefix + "-" + contact.account : contact.account,
                                " (",
                                this._resolveCountry(provider.country),
                                ")"
                            )
                        )),
                        this._renderData(0, "Proveedor", _react2.default.createElement(
                            _ui.Text,
                            null,
                            provider.name
                        )),
                        this._renderData(2, "Cantidad", _react2.default.createElement(
                            _react2.default.Fragment,
                            null,
                            _react2.default.createElement(
                                _ui.Text,
                                null,
                                amount,
                                " USD"
                            )
                        ))
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            margin: {
                                top: 16
                            }
                        },
                        _react2.default.createElement(this.props.icons.objects.payment, null),
                        _react2.default.createElement(
                            _ui.Text,
                            { margin: { left: 8 } },
                            "Pago"
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "flex-start"
                            },
                            margin: {
                                top: 8
                            }
                        },
                        this._renderData(0, "Id de Stripe", _react2.default.createElement(
                            _ui.Text,
                            null,
                            stripe
                        )),
                        this._renderData(0, "Cobro", _react2.default.createElement(
                            _ui.Text,
                            null,
                            charge,
                            " USD (",
                            fee,
                            " USD de cargo)"
                        ))
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            margin: {
                                top: 16
                            }
                        },
                        _react2.default.createElement(this.props.icons.objects.topup, null),
                        _react2.default.createElement(
                            _ui.Text,
                            { margin: { left: 8 } },
                            "Recarga"
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "flex-start"
                            },
                            margin: {
                                top: 8
                            }
                        },
                        lastStep === "payment" && _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Pendiente a revision..."
                        ),
                        steps.includes("transfer.exception") && _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Error en la recarga (",
                            attempts,
                            " intentos)"
                        ),
                        lastStep === "transfer.success" && _react2.default.createElement(
                            _react2.default.Fragment,
                            null,
                            this._renderData(0, "Id de ding", _react2.default.createElement(
                                _ui.Text,
                                null,
                                ding
                            )),
                            this._renderData(0, "Ganancia", _react2.default.createElement(
                                _ui.Text,
                                null,
                                profit,
                                " USD"
                            ))
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "flex-start"
                            },
                            margin: {
                                top: 8
                            }
                        },
                        lastStep === "refund" && _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    top: 8
                                }
                            },
                            "Pago devuelto"
                        )
                    )
                ),
                actions: this.state.expand && _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    actions.map(function (action, i) {
                        var margin = {};

                        if (i !== 0) {
                            margin = {
                                left: 8
                            };
                        }

                        return _react2.default.createElement(action.type, _extends({ key: i }, action.props, { margin: margin }));
                    })
                ),
                margin: {
                    top: 8
                }
            });
        }
    }]);

    return Topup;
}(_react2.default.Component);

Topup.propTypes = {
    width: _propTypes2.default.string.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    topup: _propTypes2.default.object.isRequired,
    countries: _propTypes2.default.array,
    providers: _propTypes2.default.array,
    contacts: _propTypes2.default.array,
    userland: _propTypes2.default.shape({
        phone: _propTypes2.default.shape({
            users: _propTypes2.default.array
        })
    }),
    client: _propTypes2.default.bool.isRequired,
    onProcessed: _propTypes2.default.func.isRequired, // (topup)
    onSelectUser: _propTypes2.default.func, // (user)
    onProgress: _propTypes2.default.func.isRequired
};

var StepIcon = function (_React$Component3) {
    _inherits(StepIcon, _React$Component3);

    function StepIcon() {
        _classCallCheck(this, StepIcon);

        return _possibleConstructorReturn(this, (StepIcon.__proto__ || Object.getPrototypeOf(StepIcon)).apply(this, arguments));
    }

    _createClass(StepIcon, [{
        key: "render",
        value: function render() {
            var icon = void 0;

            var lastStep = this.props.steps[this.props.steps.length - 1];

            if (lastStep === "payment") {
                icon = _react2.default.createElement(this.props.icons.topup.steps.delay, null);
            } else if (lastStep === "transfer.success") {
                icon = _react2.default.createElement(this.props.icons.topup.steps.transfer.success, null);
            } else if (lastStep === "transfer.exception") {
                icon = _react2.default.createElement(this.props.icons.topup.steps.transfer.exception, null);
            } else if (lastStep === "refund") {
                icon = _react2.default.createElement(this.props.icons.topup.steps.refund, null);
            } else {
                throw this.props.topup;
            }

            return icon;
        }
    }]);

    return StepIcon;
}(_react2.default.Component);

StepIcon.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    steps: _propTypes2.default.array.isRequired
};
exports.default = _ui.Platform.dimensions.withWidth()(ListTopups);