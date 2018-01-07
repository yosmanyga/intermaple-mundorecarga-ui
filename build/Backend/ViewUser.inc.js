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

var _Error = require("./Stripe/Card/Error");

var _Error2 = _interopRequireDefault(_Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewUser = function (_React$Component) {
    _inherits(ViewUser, _React$Component);

    function ViewUser() {
        _classCallCheck(this, ViewUser);

        return _possibleConstructorReturn(this, (ViewUser.__proto__ || Object.getPrototypeOf(ViewUser)).apply(this, arguments));
    }

    _createClass(ViewUser, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                this.props.layout,
                {
                    align: {
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }
                },
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row wrap",
                        align: {
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        }
                    },
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            width: "50%"
                        },
                        _react2.default.createElement(ViewRegistration, {
                            layout: function layout(props) {
                                return _react2.default.createElement(_ui.Card, props);
                            },
                            api: this.props.api,
                            id: this.props.id,
                            onProgress: this.props.onProgress
                        }),
                        _react2.default.createElement(ViewPhone, {
                            layout: function layout(props) {
                                return _react2.default.createElement(_ui.Card, _extends({
                                    margin: {
                                        top: 8
                                    }
                                }, props));
                            },
                            api: this.props.api,
                            id: this.props.id,
                            onProgress: this.props.onProgress
                        }),
                        _react2.default.createElement(ViewContacts, {
                            layout: function layout(props) {
                                return _react2.default.createElement(_ui.Card, _extends({
                                    margin: {
                                        top: 8
                                    }
                                }, props));
                            },
                            api: this.props.api,
                            id: this.props.id,
                            onProgress: this.props.onProgress
                        })
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            width: "50%",
                            padding: {
                                left: 8,
                                right: 8
                            }
                        },
                        _react2.default.createElement(ViewBlacklist, {
                            layout: function layout(props) {
                                return _react2.default.createElement(_ui.Card, props);
                            },
                            icons: this.props.icons,
                            api: this.props.api,
                            id: this.props.id,
                            onProgress: this.props.onProgress
                        }),
                        _react2.default.createElement(ViewStripe, {
                            layout: function layout(props) {
                                return _react2.default.createElement(_ui.Card, _extends({
                                    margin: {
                                        top: 8
                                    }
                                }, props));
                            },
                            api: this.props.api,
                            id: this.props.id,
                            onProgress: this.props.onProgress
                        }),
                        _react2.default.createElement(ViewCards, {
                            layout: function layout(props) {
                                return _react2.default.createElement(_ui.Card, _extends({
                                    margin: {
                                        top: 8
                                    }
                                }, props));
                            },
                            api: this.props.api,
                            id: this.props.id,
                            onProgress: this.props.onProgress
                        }),
                        _react2.default.createElement(ViewStripeCardErrors, {
                            layout: function layout(props) {
                                return _react2.default.createElement(_ui.Card, _extends({
                                    margin: {
                                        top: 8
                                    }
                                }, props));
                            },
                            icons: this.props.icons,
                            api: this.props.api,
                            id: this.props.id,
                            onProgress: this.props.onProgress
                        }),
                        _react2.default.createElement(ViewTopups, {
                            layout: function layout(props) {
                                return _react2.default.createElement(_ui.Card, _extends({
                                    margin: {
                                        top: 8
                                    }
                                }, props));
                            },
                            icons: this.props.icons,
                            api: this.props.api,
                            id: this.props.id,
                            onProgress: this.props.onProgress
                        })
                    )
                )
            );
        }
    }]);

    return ViewUser;
}(_react2.default.Component);

ViewUser.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    onBack: _propTypes2.default.func.isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};
exports.default = ViewUser;

var ViewRegistration = function (_React$Component2) {
    _inherits(ViewRegistration, _React$Component2);

    function ViewRegistration() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, ViewRegistration);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = ViewRegistration.__proto__ || Object.getPrototypeOf(ViewRegistration)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
            userland: {
                registration: {
                    user: null
                }
            }
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(ViewRegistration, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            this.props.onProgress(true, function () {
                _this3.props.api.userland.registration.pickUserAsOperator(_this3.props.id).then(function (user) {
                    _this3.setState({
                        userland: _extends({}, _this3.state.userland, {
                            registration: {
                                user: user
                            }
                        })
                    }, function () {
                        _this3.props.onProgress(false);
                    });
                }).catch(_this3.props.onError);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var Layout = function Layout(_ref2) {
                var content = _ref2.content;

                return _react2.default.createElement(_this4.props.layout, {
                    header: {
                        title: "Registro"
                    },
                    content: content
                });
            };

            if (this.state.userland.registration.user === null) {
                return _react2.default.createElement(Layout, { content: _react2.default.createElement(_react2.default.Fragment, null) });
            }

            return _react2.default.createElement(Layout, {
                content: _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Fecha de registro: ",
                        (0, _dayjs.format)(this.state.userland.registration.user.date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")
                    )
                )
            });
        }
    }]);

    return ViewRegistration;
}(_react2.default.Component);

ViewRegistration.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    api: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    onProgress: _propTypes2.default.func.isRequired
};

var ViewPhone = function (_React$Component3) {
    _inherits(ViewPhone, _React$Component3);

    function ViewPhone() {
        var _ref3;

        var _temp2, _this5, _ret2;

        _classCallCheck(this, ViewPhone);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this5 = _possibleConstructorReturn(this, (_ref3 = ViewPhone.__proto__ || Object.getPrototypeOf(ViewPhone)).call.apply(_ref3, [this].concat(args))), _this5), _this5.state = {
            userland: {
                phone: {
                    user: null
                },
                country: {
                    user: null
                }
            }
        }, _temp2), _possibleConstructorReturn(_this5, _ret2);
    }

    _createClass(ViewPhone, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this6 = this;

            this.props.onProgress(true, function () {
                _this6.props.api.userland.phone.pickUserAsOperator(_this6.props.id).then(function (user) {
                    _this6.setState({
                        userland: _extends({}, _this6.state.userland, {
                            phone: {
                                user: user
                            }
                        })
                    }, function () {
                        _this6.props.api.collectCountries([_this6.state.userland.phone.user.country]).then(function (countries) {
                            _this6.setState({
                                userland: _extends({}, _this6.state.userland, {
                                    country: {
                                        user: {
                                            name: countries[0].name
                                        }
                                    }
                                })
                            }, function () {
                                _this6.props.onProgress(false);
                            });
                        }).catch(_this6.props.onError);
                    });
                }).catch(_this6.props.onError);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this7 = this;

            var Layout = function Layout(_ref4) {
                var content = _ref4.content;

                return _react2.default.createElement(_this7.props.layout, {
                    header: {
                        title: "Teléfono"
                    },
                    content: content
                });
            };

            if (this.state.userland.phone.user === null || this.state.userland.country.user === null) {
                return _react2.default.createElement(Layout, { content: _react2.default.createElement(_react2.default.Fragment, null) });
            }

            return _react2.default.createElement(Layout, {
                content: _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }
                    },
                    _react2.default.createElement(_ui.Flag, {
                        iso: this.state.userland.phone.user.country,
                        size: "sm",
                        border: 0
                    }),
                    _react2.default.createElement(
                        _ui.Text,
                        { margin: { left: 8 } },
                        this.state.userland.country.user.name
                    ),
                    _react2.default.createElement(
                        _ui.Text,
                        { margin: { left: 8 } },
                        "+",
                        this.state.userland.phone.user.prefix,
                        "-",
                        this.state.userland.phone.user.number
                    )
                )
            });
        }
    }]);

    return ViewPhone;
}(_react2.default.Component);

ViewPhone.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    api: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    onProgress: _propTypes2.default.func.isRequired
};

var ViewContacts = function (_React$Component4) {
    _inherits(ViewContacts, _React$Component4);

    function ViewContacts() {
        var _ref5;

        var _temp3, _this8, _ret3;

        _classCallCheck(this, ViewContacts);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return _ret3 = (_temp3 = (_this8 = _possibleConstructorReturn(this, (_ref5 = ViewContacts.__proto__ || Object.getPrototypeOf(ViewContacts)).call.apply(_ref5, [this].concat(args))), _this8), _this8.state = {
            contacts: null
        }, _temp3), _possibleConstructorReturn(_this8, _ret3);
    }

    _createClass(ViewContacts, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this9 = this;

            this.props.onProgress(true, function () {
                _this9.props.api.collectContactsAsOperator(null, [_this9.props.id]).then(function (contacts) {
                    _this9.setState({
                        contacts: contacts
                    }, function () {
                        _this9.props.onProgress(false);
                    });
                }).catch(_this9.props.onError);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this10 = this;

            var Layout = function Layout(_ref6) {
                var content = _ref6.content;

                return _react2.default.createElement(_this10.props.layout, {
                    header: {
                        title: "Contactos"
                    },
                    content: content
                });
            };

            if (this.state.contacts === null) {
                return _react2.default.createElement(Layout, { content: _react2.default.createElement(_react2.default.Fragment, null) });
            }

            return _react2.default.createElement(Layout, {
                content: _react2.default.createElement(
                    _ui.List,
                    null,
                    this.state.contacts.map(function (contact) {
                        var id = contact.id,
                            prefix = contact.prefix,
                            country = contact.country,
                            account = contact.account,
                            type = contact.type,
                            name = contact.name;


                        return _react2.default.createElement(_ui.ListItem, {
                            key: id,
                            icon: _react2.default.createElement(_ui.Flag, {
                                iso: country,
                                size: "sm",
                                border: 0
                            }),
                            text: type === "phone" ? "+" + prefix + "-" + account : account,
                            note: name !== "" ? name : "(Sin nombre)"
                        });
                    })
                )
            });
        }
    }]);

    return ViewContacts;
}(_react2.default.Component);

ViewContacts.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    api: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    onProgress: _propTypes2.default.func.isRequired
};

var ViewBlacklist = function (_React$Component5) {
    _inherits(ViewBlacklist, _React$Component5);

    function ViewBlacklist() {
        var _ref7;

        var _temp4, _this11, _ret4;

        _classCallCheck(this, ViewBlacklist);

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        return _ret4 = (_temp4 = (_this11 = _possibleConstructorReturn(this, (_ref7 = ViewBlacklist.__proto__ || Object.getPrototypeOf(ViewBlacklist)).call.apply(_ref7, [this].concat(args))), _this11), _this11.state = {
            userland: {
                blacklist: {
                    user: null
                }
            }
        }, _this11._collectData = function () {
            _this11.props.onProgress(true, function () {
                _this11.props.api.userland.blacklist.pickUserAsOperator(_this11.props.id).then(function (user) {
                    _this11.setState({
                        userland: _extends({}, _this11.state.userland, {
                            blacklist: {
                                user: user
                            }
                        })
                    }, function () {
                        _this11.props.onProgress(false);
                    });
                }).catch(function (response) {
                    var code = response.code;


                    switch (code) {
                        case "userland.blacklist.nonexistent-user-exception":
                            _this11.setState({
                                userland: {
                                    blacklist: {
                                        user: false
                                    }
                                }
                            }, function () {
                                _this11.props.onProgress(false);
                            });

                            break;
                        default:
                            _this11.props.onError(response);
                    }
                });
            });
        }, _temp4), _possibleConstructorReturn(_this11, _ret4);
    }

    _createClass(ViewBlacklist, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this._collectData();
        }
    }, {
        key: "render",
        value: function render() {
            var _this12 = this;

            var Layout = function Layout(_ref8) {
                var content = _ref8.content;

                return _react2.default.createElement(_this12.props.layout, {
                    header: {
                        title: "Lista negra"
                    },
                    content: content,
                    actions: _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        _this12.state.userland.blacklist.user === false && _react2.default.createElement(
                            _ui.Button,
                            {
                                variant: "outlined",
                                tooltip: "Bloquear usuario",
                                onClick: function onClick() {
                                    _this12.props.onProgress(true, function () {
                                        _this12.props.api.userland.blacklist.banUser(_this12.props.id).then(function () {
                                            _this12.props.onProgress(false, _this12._collectData());
                                        }).catch(_this12.props.onError);
                                    });
                                }
                            },
                            _react2.default.createElement(_this12.props.icons.actions.block, null),
                            _react2.default.createElement(
                                _ui.Text,
                                null,
                                "Bloquear usuario"
                            )
                        )
                    )
                });
            };

            if (this.state.userland.blacklist.user === null) {
                return _react2.default.createElement(Layout, { content: _react2.default.createElement(_react2.default.Fragment, null) });
            }

            return _react2.default.createElement(Layout, {
                content: _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }
                    },
                    this.state.userland.blacklist.user === false ? "El usuario no está en la lista negra" : "El usuario está en la lista negra"
                )
            });
        }
    }]);

    return ViewBlacklist;
}(_react2.default.Component);

ViewBlacklist.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    onProgress: _propTypes2.default.func.isRequired
};

var ViewStripe = function (_React$Component6) {
    _inherits(ViewStripe, _React$Component6);

    function ViewStripe() {
        var _ref9;

        var _temp5, _this13, _ret5;

        _classCallCheck(this, ViewStripe);

        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        return _ret5 = (_temp5 = (_this13 = _possibleConstructorReturn(this, (_ref9 = ViewStripe.__proto__ || Object.getPrototypeOf(ViewStripe)).call.apply(_ref9, [this].concat(args))), _this13), _this13.state = {
            userland: {
                stripe: {
                    user: null
                }
            }
        }, _temp5), _possibleConstructorReturn(_this13, _ret5);
    }

    _createClass(ViewStripe, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this14 = this;

            this.props.onProgress(true, function () {
                _this14.props.api.userland.stripe.pickUserAsOperator(_this14.props.id).then(function (user) {
                    _this14.setState({
                        userland: _extends({}, _this14.state.userland, {
                            stripe: {
                                user: user
                            }
                        })
                    }, function () {
                        _this14.props.onProgress(false);
                    });
                }).catch(function (response) {
                    var code = response.code;


                    switch (code) {
                        case "userland.stripe.nonexistent-user-exception":
                            _this14.props.onProgress(false, function () {
                                _this14.setState({
                                    userland: _extends({}, _this14.state.userland, {
                                        stripe: {
                                            user: false
                                        }
                                    })
                                });
                            });

                            break;
                        default:
                            _this14.props.onError(response);
                    }
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this15 = this;

            var Layout = function Layout(_ref10) {
                var content = _ref10.content;

                return _react2.default.createElement(_this15.props.layout, {
                    header: {
                        title: "Stripe"
                    },
                    content: content
                });
            };

            if (this.state.userland.stripe.user === null) {
                return _react2.default.createElement(Layout, { content: _react2.default.createElement(_react2.default.Fragment, null) });
            }

            return _react2.default.createElement(Layout, {
                content: _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        this.state.userland.stripe.user !== false ? "Customer de Stripe: " + this.state.userland.stripe.user.customer : "Aún no tiene customer en Stripe"
                    )
                )
            });
        }
    }]);

    return ViewStripe;
}(_react2.default.Component);

ViewStripe.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    api: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    onProgress: _propTypes2.default.func.isRequired
};

var ViewCards = function (_React$Component7) {
    _inherits(ViewCards, _React$Component7);

    function ViewCards() {
        var _ref11;

        var _temp6, _this16, _ret6;

        _classCallCheck(this, ViewCards);

        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
        }

        return _ret6 = (_temp6 = (_this16 = _possibleConstructorReturn(this, (_ref11 = ViewCards.__proto__ || Object.getPrototypeOf(ViewCards)).call.apply(_ref11, [this].concat(args))), _this16), _this16.state = {
            cards: null
        }, _temp6), _possibleConstructorReturn(_this16, _ret6);
    }

    _createClass(ViewCards, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this17 = this;

            this.props.onProgress(true, function () {
                _this17.props.api.userland.stripe.collectCardsAsOperator(_this17.props.id).then(function (cards) {
                    _this17.setState({
                        cards: cards
                    }, function () {
                        _this17.props.onProgress(false);
                    });
                }).catch(_this17.props.onError);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this18 = this;

            var Layout = function Layout(_ref12) {
                var content = _ref12.content;

                return _react2.default.createElement(_this18.props.layout, {
                    header: {
                        title: "Tarjetas actuales"
                    },
                    content: content
                });
            };

            if (this.state.cards === null) {
                return _react2.default.createElement(Layout, { content: _react2.default.createElement(_react2.default.Fragment, null) });
            }

            return _react2.default.createElement(Layout, {
                content: this.state.cards.length > 0 ? _react2.default.createElement(
                    _ui.List,
                    null,
                    this.state.cards.map(function (_ref13) {
                        var id = _ref13.id,
                            number = _ref13.number,
                            name = _ref13.name;

                        return _react2.default.createElement(_ui.ListItem, {
                            key: id,
                            text: number,
                            note: name
                        });
                    })
                ) : _react2.default.createElement(
                    _ui.Text,
                    null,
                    "Este usuario no tiene tarjetas actualmente"
                )
            });
        }
    }]);

    return ViewCards;
}(_react2.default.Component);

ViewCards.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    api: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    onProgress: _propTypes2.default.func.isRequired
};

var ViewStripeCardErrors = function (_React$Component8) {
    _inherits(ViewStripeCardErrors, _React$Component8);

    function ViewStripeCardErrors() {
        var _ref14;

        var _temp7, _this19, _ret7;

        _classCallCheck(this, ViewStripeCardErrors);

        for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
        }

        return _ret7 = (_temp7 = (_this19 = _possibleConstructorReturn(this, (_ref14 = ViewStripeCardErrors.__proto__ || Object.getPrototypeOf(ViewStripeCardErrors)).call.apply(_ref14, [this].concat(args))), _this19), _this19.state = {
            errors: null
        }, _temp7), _possibleConstructorReturn(_this19, _ret7);
    }

    _createClass(ViewStripeCardErrors, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this20 = this;

            this.props.onProgress(true, function () {
                _this20.props.api.userland.stripe.card.collectErrors(_this20.props.id, null, null).then(function (errors) {
                    _this20.setState({
                        errors: errors
                    }, function () {
                        _this20.props.onProgress(false);
                    });
                }).catch(_this20.props.onError);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this21 = this;

            var Layout = function Layout(_ref15) {
                var children = _ref15.children;

                return _react2.default.createElement(_this21.props.layout, {
                    header: {
                        title: "Errores al entrar tarjetas"
                    },
                    content: children
                });
            };

            if (this.state.errors === null) {
                return _react2.default.createElement(Layout, null);
            }

            if (this.state.errors.length === 0) {
                return _react2.default.createElement(
                    Layout,
                    null,
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "No se encontraron errores."
                    )
                );
            }

            return _react2.default.createElement(
                Layout,
                null,
                _react2.default.createElement(
                    _ui.Text,
                    null,
                    "Se encontraron ",
                    this.state.errors.length,
                    " errores"
                ),
                this.state.errors.map(function (error) {
                    var id = error.id;


                    return _react2.default.createElement(_Error2.default, {
                        key: id,
                        data: error,
                        icons: _this21.props.icons
                    });
                })
            );
        }
    }]);

    return ViewStripeCardErrors;
}(_react2.default.Component);

ViewStripeCardErrors.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    onProgress: _propTypes2.default.func.isRequired
};

var ViewTopups = function (_React$Component9) {
    _inherits(ViewTopups, _React$Component9);

    function ViewTopups() {
        var _ref16;

        var _temp8, _this22, _ret8;

        _classCallCheck(this, ViewTopups);

        for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            args[_key8] = arguments[_key8];
        }

        return _ret8 = (_temp8 = (_this22 = _possibleConstructorReturn(this, (_ref16 = ViewTopups.__proto__ || Object.getPrototypeOf(ViewTopups)).call.apply(_ref16, [this].concat(args))), _this22), _this22.state = {
            topups: null
        }, _temp8), _possibleConstructorReturn(_this22, _ret8);
    }

    _createClass(ViewTopups, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this23 = this;

            this.props.onProgress(true, function () {
                _this23.props.api.collectContactsAsOperator(null, [_this23.props.id]).then(function (contacts) {
                    var ids = contacts.map(function (_ref17) {
                        var id = _ref17.id;

                        return id;
                    });

                    _this23.props.api.collectTopupsByContactsAsOperator(ids).then(function (topups) {
                        _this23.setState({
                            topups: topups
                        }, function () {
                            _this23.props.onProgress(false);
                        });
                    }).catch(_this23.props.onError);
                }).catch(_this23.props.onError);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this24 = this;

            var Layout = function Layout(_ref18) {
                var content = _ref18.content;

                return _react2.default.createElement(_this24.props.layout, {
                    header: {
                        title: "Recargas"
                    },
                    content: content
                });
            };

            if (this.state.topups === null) {
                return _react2.default.createElement(Layout, { content: _react2.default.createElement(_react2.default.Fragment, null) });
            }

            return _react2.default.createElement(Layout, {
                content: _react2.default.createElement(_ListTopups2.default, {
                    layout: function layout(_ref19) {
                        var children = _ref19.children;

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
                    client: false,
                    onProcessTopup: function onProcessTopup(topup) {
                        _this24._handleProcessTopup(topup);
                    },
                    onProgress: this.props.onProgress
                })
            });
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

    return ViewTopups;
}(_react2.default.Component);

ViewTopups.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    onProgress: _propTypes2.default.func.isRequired
};