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

var _Subtitle = require("../Common/Subtitle");

var _Subtitle2 = _interopRequireDefault(_Subtitle);

var _Topup = require("./Topup.inc");

var _Topup2 = _interopRequireDefault(_Topup);

var _InnerLayoutBlock = require("../Common/InnerLayoutBlock");

var _InnerLayoutBlock2 = _interopRequireDefault(_InnerLayoutBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewContact = function (_React$Component) {
    _inherits(ViewContact, _React$Component);

    function ViewContact() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, ViewContact);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ViewContact.__proto__ || Object.getPrototypeOf(ViewContact)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            contact: null,
            topups: null,
            edit: false,
            progress: 0
        }, _this.componentWillMount = function () {
            _ui.Platform.back.add(_this._handleBack);
        }, _this.componentDidMount = function () {
            _this._handleProgress(true, function () {
                Promise.all([_this.props.api.pickContactAsClient(_this.props.id), _this.props.api.collectTopupsAsClient(_this.props.id)]).then(function (values) {
                    _this.setState({
                        contact: values[0],
                        topups: values[1]
                    }, function () {
                        _this._handleProgress(false);
                    });
                }).catch(_this.props.onError);
            });
        }, _this._handleBack = function () {
            _this.props.onBack();

            return true;
        }, _this._handleUpdate = function () {
            _this._handleProgress(true, function () {
                _this.props.api.updateContact(_this.props.id, _this.state.contact.name).then(function () {
                    _this.setState({
                        edit: false
                    }, function () {
                        _this._handleProgress(false, _this.props.onUpdate);
                    });
                }).catch(_this.props.onError);
            });
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

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
                    title: "Contacto",
                    left: {
                        icon: _react2.default.createElement(_this2.props.icons.actions.back, null),
                        onClick: _this.props.onBack
                    },
                    progress: _this.state.progress > 0
                }),
                children
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ViewContact, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _ui.Platform.back.remove(this._handleBack);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var Layout = this._buildLayout;

            if (this.state.contact === null || this.state.topups === null) {
                return _react2.default.createElement(Layout, null);
            }

            if (this.state.edit === true) {
                return _react2.default.createElement(
                    Layout,
                    {
                        flex: {
                            alignItems: "center"
                        }
                    },
                    _react2.default.createElement(
                        _InnerLayoutBlock2.default,
                        {
                            photo: _ui.Platform.select({
                                web: require('../Common/city.jpg'),
                                mobile: undefined
                            })
                        },
                        _react2.default.createElement(
                            _Subtitle2.default,
                            null,
                            "Cambiar nombre"
                        ),
                        _react2.default.createElement(_ui.Flag, {
                            iso: this.state.contact.country,
                            size: "sm",
                            margin: {
                                top: 8
                            }
                        }),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                variant: "subtitle2",
                                margin: {
                                    top: 8
                                }
                            },
                            this.state.contact.type === "phone" ? "+" + this.state.contact.prefix + "-" + this.state.contact.account : this.state.contact.account
                        ),
                        _react2.default.createElement(_ui.Input, {
                            value: this.state.contact.name,
                            focus: true,
                            capitalize: "words",
                            label: "Nombre",
                            width: 200,
                            margin: {
                                top: 2
                            },
                            onChange: function onChange(value) {
                                _this3.setState({
                                    contact: _extends({}, _this3.state.contact, {
                                        name: value
                                    })
                                });
                            },
                            onEnter: this._handleUpdate
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
                                    variant: "outlined",
                                    onClick: function onClick() {
                                        _this3.setState({
                                            edit: false
                                        });
                                    }
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
                                    onClick: this._handleUpdate,
                                    margin: {
                                        left: 8
                                    }
                                },
                                _react2.default.createElement(this.props.icons.actions.ok, null),
                                _react2.default.createElement(
                                    _ui.Text,
                                    null,
                                    "Actualizar"
                                )
                            )
                        )
                    )
                );
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
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                alignItems: "center"
                            },
                            margin: {
                                top: 8
                            }
                        },
                        _react2.default.createElement(_ui.Flag, {
                            iso: this.state.contact.country,
                            size: "sm"
                        }),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                variant: "subtitle2",
                                margin: {
                                    top: 8
                                }
                            },
                            this.state.contact.type === "phone" ? "+" + this.state.contact.prefix + "-" + this.state.contact.account : this.state.contact.account
                        ),
                        _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "row",
                                align: {
                                    justifyContent: "center",
                                    alignItems: "center"
                                }
                            },
                            _react2.default.createElement(
                                _ui.Text,
                                {
                                    variant: "caption",
                                    margin: {
                                        top: 4
                                    }
                                },
                                this.state.contact.name || "(Sin nombre)"
                            ),
                            _react2.default.createElement(
                                _ui.Button,
                                {
                                    variant: "text",
                                    tooltip: this.state.contact.name === "" ? "Poner nombre" : "Cambiar nombre",
                                    margin: {
                                        left: 4
                                    },
                                    padding: 0,
                                    onClick: function onClick() {
                                        _this3.setState({
                                            edit: true
                                        });
                                    }
                                },
                                _react2.default.createElement(this.props.icons.actions.edit, {
                                    style: {
                                        fontSize: 15
                                    }
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _ui.Button,
                            {
                                color: "primary",
                                onClick: function onClick() {
                                    _this3.props.onTopup(_this3.state.contact);
                                },
                                center: true,
                                margin: {
                                    top: 8
                                }
                            },
                            _react2.default.createElement(this.props.icons.actions.add, null),
                            _react2.default.createElement(
                                _ui.Text,
                                null,
                                "Nueva recarga"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            margin: {
                                top: 8
                            }
                        },
                        this.state.topups.length > 0 && _react2.default.createElement(
                            _react2.default.Fragment,
                            null,
                            _react2.default.createElement(
                                _Subtitle2.default,
                                null,
                                "Recargas enviadas"
                            ),
                            this.state.topups.map(function (topup, i) {
                                return _react2.default.createElement(_Topup2.default, {
                                    key: i,
                                    width: _this3.props.width,
                                    icons: _this3.props.icons,
                                    data: topup,
                                    onClick: function onClick() {
                                        _this3.props.onTopup(_this3.state.contact);
                                    },
                                    padding: {
                                        left: 8,
                                        right: 8
                                    }
                                });
                            })
                        )
                    )
                )
            );
        }
    }]);

    return ViewContact;
}(_react2.default.Component);

ViewContact.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.shape({
        pickContactAsClient: _propTypes2.default.func.isRequired,
        collectTopupsAsClient: _propTypes2.default.func.isRequired,
        updateContact: _propTypes2.default.func.isRequired
    }).isRequired,
    id: _propTypes2.default.string.isRequired,
    onTopup: _propTypes2.default.func.isRequired, // (contact)
    onUpdate: _propTypes2.default.func.isRequired,
    onBack: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};
;

exports.default = _ui.Platform.dimensions.withWidth()(_ui.Theme.withTheme()(ViewContact));