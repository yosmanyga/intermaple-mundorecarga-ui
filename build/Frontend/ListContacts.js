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

var _Row = require("../Common/Row");

var _Row2 = _interopRequireDefault(_Row);

var _Topup = require("./Topup.inc");

var _Topup2 = _interopRequireDefault(_Topup);

var _InnerLayoutBlock = require("../Common/InnerLayoutBlock");

var _InnerLayoutBlock2 = _interopRequireDefault(_InnerLayoutBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListContacts = function (_React$Component) {
    _inherits(ListContacts, _React$Component);

    function ListContacts() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, ListContacts);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListContacts.__proto__ || Object.getPrototypeOf(ListContacts)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            tab: 0,
            progress: 0
        }, _this.componentWillMount = function () {
            _ui.Platform.back.add(_this._handleBack);
        }, _this._handleBack = function () {
            _this.props.onBack();

            return true;
        }, _this._handleProgress = function (progress) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            _this.setState(function (prevState) {
                return {
                    progress: prevState.progress + (progress === true ? 1 : -1)
                };
            }, callback);
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["children"]);

            var title = void 0;
            switch (_this.state.tab) {
                case 0:
                    title = "Contactos";

                    break;
                case 1:
                    title = "Historial";

                    break;
                default:
                    throw _this.state.tab;
            }

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
                    title: title,
                    right: {
                        icon: _react2.default.createElement(_this2.props.icons.actions.add, null),
                        onClick: _this.props.onNewTopup
                    },
                    progress: _this.state.progress > 0
                }),
                children
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ListContacts, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _ui.Platform.back.remove(this._handleBack);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var Layout = this._buildLayout;

            if (this.state.contacts === null) {
                return _react2.default.createElement(Layout, null);
            }

            return _react2.default.createElement(
                Layout,
                null,
                _react2.default.createElement(
                    _InnerLayoutBlock2.default,
                    {
                        photo: _ui.Platform.select({
                            web: require('../Common/city.jpg'),
                            mobile: undefined
                        })
                    },
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
                        _react2.default.createElement(_ui.Tab, { heading: "Contactos" }),
                        _react2.default.createElement(_ui.Tab, { heading: "Historial" })
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            margin: {
                                top: 16
                            }
                        },
                        this.state.tab === 0 && _react2.default.createElement(ListContactsTab, {
                            layout: function layout(_ref3) {
                                var children = _ref3.children;

                                return _react2.default.createElement(
                                    _react2.default.Fragment,
                                    null,
                                    children
                                );
                            },
                            icons: this.props.icons,
                            api: this.props.api,
                            onSelect: this.props.onSelect,
                            onNewTopup: this.props.onNewTopup,
                            onBack: this._handleBack,
                            onProgress: this._handleProgress,
                            onError: this.props.onError
                        }),
                        this.state.tab === 1 && _react2.default.createElement(ListHistoryTab, {
                            width: this.props.width,
                            layout: function layout(_ref4) {
                                var children = _ref4.children;

                                return _react2.default.createElement(
                                    _react2.default.Fragment,
                                    null,
                                    children
                                );
                            },
                            icons: this.props.icons,
                            api: this.props.api,
                            onSelect: this.props.onReTopup,
                            onBack: this._handleBack,
                            onProgress: this._handleProgress,
                            onError: this.props.onError
                        })
                    )
                )
            );
        }
    }]);

    return ListContacts;
}(_react2.default.Component);

ListContacts.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onSelect: _propTypes2.default.func.isRequired, // (contact)
    onNewTopup: _propTypes2.default.func.isRequired, // ()
    onReTopup: _propTypes2.default.func.isRequired, // (topup)
    onBack: _propTypes2.default.func.isRequired, // (contact)
    onError: _propTypes2.default.func.isRequired
};

var ListContactsTab = function (_React$Component2) {
    _inherits(ListContactsTab, _React$Component2);

    function ListContactsTab() {
        var _ref5;

        var _temp2, _this4, _ret2;

        _classCallCheck(this, ListContactsTab);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref5 = ListContactsTab.__proto__ || Object.getPrototypeOf(ListContactsTab)).call.apply(_ref5, [this].concat(args))), _this4), _this4.state = {
            contacts: null
        }, _temp2), _possibleConstructorReturn(_this4, _ret2);
    }

    _createClass(ListContactsTab, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this5 = this;

            this.props.onProgress(true, function () {
                _this5.props.api.collectContactsAsClient().then(function (contacts) {
                    _this5.setState({
                        contacts: contacts
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
            var _this6 = this;

            if (this.state.contacts === null) {
                return _react2.default.createElement(this.props.layout, null);
            }

            if (this.state.contacts.length === 0) {
                return _react2.default.createElement(
                    this.props.layout,
                    null,
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            color: "primary",
                            variant: "subtitle1",
                            size: _ui.Platform.select({
                                mobile: _ui.Platform.dimensions.isSmDown(this.props.width) ? 18 : null
                            }),
                            center: true,
                            style: {
                                textAlign: 'center'
                            }
                        },
                        "Bienvenido a MundoRecarga"
                    ),
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            margin: {
                                top: 16
                            },
                            center: true,
                            style: {
                                textAlign: 'center'
                            }
                        },
                        "No tienes contactos a\xFAn."
                    ),
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            margin: {
                                top: 8
                            },
                            center: true,
                            style: {
                                textAlign: 'center'
                            }
                        },
                        "Crea tu primer contacto haciendo una recarga."
                    ),
                    _react2.default.createElement(
                        _ui.Button,
                        {
                            color: "primary",
                            onClick: this.props.onNewTopup,
                            margin: {
                                top: 8
                            },
                            center: true
                        },
                        _react2.default.createElement(this.props.icons.actions.add, null),
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Nueva recarga"
                        )
                    )
                );
            }

            return _react2.default.createElement(
                this.props.layout,
                null,
                this.state.contacts.map(function (contact) {
                    var id = contact.id,
                        prefix = contact.prefix,
                        country = contact.country,
                        account = contact.account,
                        type = contact.type,
                        name = contact.name;


                    return _react2.default.createElement(_Row2.default, {
                        key: id,
                        left: _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "column",
                                align: {
                                    justifyContent: "flex-start",
                                    alignItems: "center"
                                },
                                margin: {
                                    top: 12
                                }
                            },
                            _react2.default.createElement(_this6.props.icons.objects.contact, {
                                style: {
                                    fontSize: 56,
                                    color: "#ccc"
                                }
                            })
                        ),
                        body: _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "column",
                                margin: {
                                    left: 8,
                                    top: 16,
                                    bottom: 16
                                }
                            },
                            _react2.default.createElement(
                                _ui.Text,
                                null,
                                name !== "" ? name : "Sin nombre"
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
                                        top: 4
                                    }
                                },
                                _react2.default.createElement(_ui.Flag, {
                                    iso: country,
                                    size: "sm",
                                    border: 0
                                }),
                                _react2.default.createElement(
                                    _ui.Text,
                                    {
                                        variant: "caption",
                                        margin: {
                                            left: 4
                                        }
                                    },
                                    type === "phone" ? "+" + prefix + "-" + account : account
                                )
                            )
                        ),
                        onClick: function onClick() {
                            _this6.props.onSelect(contact);
                        },
                        padding: {
                            left: 8
                        }
                    });
                })
            );
        }
    }]);

    return ListContactsTab;
}(_react2.default.Component);

ListContactsTab.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onSelect: _propTypes2.default.func.isRequired, // (contact)
    onNewTopup: _propTypes2.default.func.isRequired, // ()
    onBack: _propTypes2.default.func.isRequired, // (contact)
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var ListHistoryTab = function (_React$Component3) {
    _inherits(ListHistoryTab, _React$Component3);

    function ListHistoryTab() {
        var _ref6;

        var _temp3, _this7, _ret3;

        _classCallCheck(this, ListHistoryTab);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return _ret3 = (_temp3 = (_this7 = _possibleConstructorReturn(this, (_ref6 = ListHistoryTab.__proto__ || Object.getPrototypeOf(ListHistoryTab)).call.apply(_ref6, [this].concat(args))), _this7), _this7.state = {
            contacts: null,
            topups: null
        }, _temp3), _possibleConstructorReturn(_this7, _ret3);
    }

    _createClass(ListHistoryTab, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this8 = this;

            this.props.onProgress(true, function () {
                Promise.all([_this8.props.api.collectContactsAsClient(), _this8.props.api.collectTopupsAsClient(null)]).then(function (values) {
                    _this8.setState({
                        contacts: values[0],
                        topups: values[1]
                    }, function () {
                        _this8.props.onProgress(false);
                    });
                }).catch(_this8.props.onError);
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
            var _this9 = this;

            if (this.state.contacts === null || this.state.topups === null) {
                return _react2.default.createElement(this.props.layout, null);
            }

            if (this.state.topups.length === 0) {
                return _react2.default.createElement(
                    this.props.layout,
                    null,
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            margin: {
                                top: 16
                            },
                            center: true,
                            style: {
                                textAlign: 'center'
                            }
                        },
                        "No tienes recargas a\xFAn."
                    )
                );
            }

            return _react2.default.createElement(
                this.props.layout,
                null,
                this.state.topups.map(function (topup, i) {
                    var contact = _this9.state.contacts.find(function (_ref7) {
                        var id = _ref7.id;

                        return id === topup.contact;
                    });

                    return _react2.default.createElement(_Topup2.default, {
                        key: i,
                        width: _this9.props.width,
                        icons: _this9.props.icons,
                        contact: contact,
                        data: topup,
                        onClick: function onClick() {
                            _this9.props.onSelect(topup);
                        },
                        padding: {
                            left: 8,
                            right: 8
                        }
                    });
                })
            );
        }
    }]);

    return ListHistoryTab;
}(_react2.default.Component);

ListHistoryTab.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onBack: _propTypes2.default.func.isRequired, // (contact)
    onSelect: _propTypes2.default.func.isRequired, // (topup)
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};
exports.default = _ui.Platform.dimensions.withWidth()(ListContacts);