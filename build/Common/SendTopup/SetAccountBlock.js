"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ui = require("@yosmy/ui");

var _Subtitle = require("../Subtitle");

var _Subtitle2 = _interopRequireDefault(_Subtitle);

var _Preview = require("../Preview");

var _Preview2 = _interopRequireDefault(_Preview);

var _ListPromotionsBlock = require("../ListPromotionsBlock");

var _ListPromotionsBlock2 = _interopRequireDefault(_ListPromotionsBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SetAccountBlock = function (_React$Component) {
    _inherits(SetAccountBlock, _React$Component);

    function SetAccountBlock() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SetAccountBlock);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SetAccountBlock.__proto__ || Object.getPrototypeOf(SetAccountBlock)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            edit: true,
            account: "",
            type: "phone", // "phone", "email"
            error: null
        }, _this._handleSet = function () {
            _this.setState({
                error: null
            }, function () {

                _this.props.onProgress(true, function () {
                    _this.props.api.validateAccount(_this.state.account, _this.state.type).then(function () {
                        _this.setState({
                            edit: false
                        }, function () {
                            var account = _this.state.account;

                            if (_this.state.type === "phone") {
                                // Remove all but numbers
                                account = account.replace(/\D/g, '');

                                if (_this.props.country.iso === "CU") {
                                    if (account.length === 6) {
                                        account = "53" + account;
                                    }
                                }
                            } else {
                                account = account.replace(" ", "");

                                account = account.toLowerCase();

                                var parts = account.split("@");
                                if (parts[0]) {
                                    account = parts[0];
                                }
                            }

                            _this.setState({
                                account: account
                            }, function () {
                                _this.props.onProgress(false, function () {
                                    _this.props.onSet(_this.state.type === "email" ? account + "@nauta.com.cu" : account, _this.state.type);
                                });
                            });
                        });
                    }).catch(function (response) {
                        var code = response.code;


                        switch (code) {
                            case "invalid-account-exception":
                                _this.setState({
                                    error: _this.state.type === "phone" ? "El numero es incorrecto" : "El correo es incorrecto"
                                }, function () {
                                    _this.props.onProgress(false);
                                });

                                break;
                            default:
                                _this.props.onError(response);
                        }
                    });
                });
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SetAccountBlock, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            if (this.props.account) {
                this.setState({
                    account: this.props.account,
                    edit: false
                });
            }
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return this.props.edit !== nextProps.edit || this.props.photo !== nextProps.photo || this.state !== nextState;
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState, prevContext) {
            if (this.props.edit === true) {
                if (prevProps.edit === this.props.edit) {
                    // Avoid recursion
                    return;
                }

                this.setState({
                    edit: true
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            if (this.state.edit === false) {
                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        _Subtitle2.default,
                        null,
                        this.state.type === "phone" ? "Número de teléfono" : "Correo nauta"
                    ),
                    _react2.default.createElement(_Preview2.default, {
                        icons: {
                            close: this.props.icons.actions.close
                        },
                        margin: {
                            top: 8,
                            bottom: 8
                        },
                        left: _react2.default.createElement(
                            _ui.Container,
                            null,
                            _react2.default.createElement(_ui.Flag, {
                                iso: this.props.country.iso,
                                size: "sm"
                            })
                        ),
                        body: _react2.default.createElement(
                            _ui.Container,
                            {
                                onClick: function onClick() {
                                    _this2.setState({
                                        edit: true
                                    }, _this2.props.onEdit);
                                }
                            },
                            this.state.type === "phone" ? _react2.default.createElement(
                                _ui.Text,
                                null,
                                "+",
                                this.props.country.prefix,
                                "-",
                                this.state.account
                            ) : _react2.default.createElement(
                                _ui.Text,
                                null,
                                this.state.account,
                                "@nauta.com.cu"
                            )
                        ),
                        onUndo: function onUndo() {
                            _this2.setState({
                                edit: true
                            }, _this2.props.onEdit);
                        }
                    })
                );
            }

            var photo = _react2.default.createElement(
                _ui.Container,
                {
                    flow: "column",
                    align: {
                        justifyContent: "flex-start"
                    },
                    background: this.props.photo,
                    width: _ui.Platform.dimensions.get("window").width,
                    height: _ui.Platform.dimensions.get("window").width / 2
                },
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        margin: {
                            top: 8
                        },
                        padding: {
                            top: 4,
                            right: 12,
                            bottom: 4,
                            left: 12
                        },
                        width: "auto",
                        style: {
                            backgroundColor: "#fff"
                        }
                    },
                    _react2.default.createElement(_ui.Flag, {
                        iso: this.props.country.iso,
                        size: "sm"
                    }),
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "body1",
                            margin: {
                                left: 4
                            }
                        },
                        this.props.country.name
                    )
                )
            );

            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "column",
                    align: {
                        alignItems: "center"
                    }
                },
                _ui.Platform.select({
                    android: photo,
                    ios: photo
                }),
                _ui.Platform.select({
                    web: _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            margin: {
                                top: 8
                            },
                            padding: {
                                top: 4,
                                right: 12,
                                bottom: 4,
                                left: 12
                            },
                            width: "auto",
                            style: {
                                backgroundColor: "#fff"
                            }
                        },
                        _react2.default.createElement(_ui.Flag, {
                            iso: this.props.country.iso,
                            size: "sm"
                        }),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                variant: "body1",
                                margin: {
                                    left: 4
                                },
                                wrap: false
                            },
                            this.props.country.name
                        )
                    )
                }),
                _react2.default.createElement(
                    _Subtitle2.default,
                    {
                        active: true,
                        margin: {
                            top: 8
                        }
                    },
                    this.state.type === "phone" ? "Escribe el número de teléfono a recargar" : "Escribe el correo nauta a recargar"
                ),
                _react2.default.createElement(_ui.Input, {
                    rounded: true,
                    start: this.state.type === "phone" ? "+" + this.props.country.prefix
                    // Put a minus sign to separate prefix from number
                    + (this.state.account !== "" ? "-" : "") : undefined,
                    end: this.state.type === "email" && "@nauta.com.cu",
                    error: this.state.error,
                    value: this.state.account,
                    keyboard: this.state.type === "phone" ? "numeric" : "default",
                    capitalize: this.state.type === "email" ? "none" : undefined,
                    onChange: function onChange(value) {
                        _this2.setState({
                            account: value
                        });
                    },
                    onEnter: this._handleSet,
                    width: this.state.type === "phone" ? 200 : 250,
                    margin: {
                        top: 8
                    }
                }),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row wrap",
                        align: {
                            justifyContent: "center",
                            alignItems: "flex-start"
                        },
                        margin: {
                            top: 8,
                            bottom: 8
                        }
                    },
                    _react2.default.createElement(
                        _ui.Button,
                        {
                            variant: "outlined",
                            margin: 4,
                            center: _ui.Platform.select({
                                mobile: true
                            }),
                            onClick: this.props.onBack
                        },
                        _react2.default.createElement(this.props.icons.actions.back, null),
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Cambiar pa\xEDs"
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Button,
                        {
                            color: "primary",
                            margin: 4,
                            center: _ui.Platform.select({
                                mobile: true
                            }),
                            onClick: function onClick() {
                                _this2._handleSet();
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Continuar"
                        ),
                        _react2.default.createElement(this.props.icons.actions.forward, null)
                    )
                ),
                this.props.country.iso === "CU" && _react2.default.createElement(
                    _ui.Button,
                    {
                        variant: "outlined",
                        margin: {
                            top: 24,
                            bottom: 24
                        },
                        padding: {
                            right: 16
                        },
                        center: true,
                        onClick: function onClick() {
                            _this2.setState({
                                type: _this2.state.type === "phone" ? "email" : "phone",
                                account: ""
                            });
                        }
                    },
                    this.state.type === "phone" ? [_react2.default.createElement(
                        _ui.Text,
                        {
                            key: 1
                        },
                        "Recargar"
                    ), _react2.default.createElement(_ui.Image, {
                        key: 2,
                        source: require("./nauta.png"),
                        width: 20 * 279 / 80,
                        height: 20,
                        margin: {
                            left: _ui.Platform.select({
                                web: 8,
                                mobile: 0
                            }),
                            bottom: _ui.Platform.dimensions.isSmDown(this.props.width) ? 4 : 6
                        }
                    }), _react2.default.createElement(
                        _ui.Text,
                        {
                            key: 3,
                            margin: {
                                left: _ui.Platform.select({
                                    web: 8,
                                    mobile: 0
                                })
                            }
                        },
                        "(WiFi)"
                    )] : _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Recargar un tel\xE9fono"
                    )
                ),
                this.props.promotions !== null && this.props.promotions.length ? _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        _Subtitle2.default,
                        null,
                        "Promociones para ",
                        this.props.country.name
                    ),
                    _react2.default.createElement(_ListPromotionsBlock2.default, {
                        providers: this.props.providers,
                        promotions: this.props.promotions,
                        padding: 8
                    }),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "center",
                                alignItems: "center"
                            },
                            padding: 8,
                            style: {
                                backgroundColor: "#fcf8e3"
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                style: _ui.Platform.select({
                                    mobile: {
                                        textAlign: "center"
                                    }
                                })
                            },
                            "Para disfrutar de las promociones, seguir los pasos escribiendo el n\xFAmero a recargar al inicio de esta p\xE1gina."
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    top: 8
                                },
                                style: _ui.Platform.select({
                                    mobile: {
                                        textAlign: "center"
                                    }
                                })
                            },
                            "Escr\xEDbenos a info@mundorecarga.com para cualquier pregunta."
                        )
                    )
                ) : null
            );
        }
    }]);

    return SetAccountBlock;
}(_react2.default.Component);

SetAccountBlock.propTypes = {
    width: _propTypes2.default.string.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    providers: _propTypes2.default.array,
    promotions: _propTypes2.default.array,
    country: _propTypes2.default.object.isRequired,
    account: _propTypes2.default.string,
    photo: _propTypes2.default.oneOfType([_propTypes2.default.string.isRequired, _propTypes2.default.number.isRequired // Default photo
    ]),
    edit: _propTypes2.default.bool,
    onProgress: _propTypes2.default.func.isRequired, // (progress, callback)
    onSet: _propTypes2.default.func.isRequired, // (account, type)
    onEdit: _propTypes2.default.func.isRequired, // ()
    onBack: _propTypes2.default.func.isRequired, // ()
    onError: _propTypes2.default.func.isRequired // ()
};
exports.default = SetAccountBlock;