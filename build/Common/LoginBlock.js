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

var _authUi = require("@yosmy/auth-ui");

var _ui = require("@yosmy/ui");

var _Subtitle = require("./Subtitle");

var _Subtitle2 = _interopRequireDefault(_Subtitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginBlock = function (_React$Component) {
    _inherits(LoginBlock, _React$Component);

    function LoginBlock() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, LoginBlock);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoginBlock.__proto__ || Object.getPrototypeOf(LoginBlock)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            step: "request_phone", // request_phone, confirm_phone
            referral: false,
            registration: {
                referral: null,
                phone: null,
                retry: false
            }
        }, _this._buildRequestPhoneLayout = function (_ref2) {
            var input = _ref2.input,
                buttons = _ref2.buttons;

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    _Subtitle2.default,
                    {
                        active: true,
                        margin: {
                            top: 8,
                            bottom: 8
                        }
                    },
                    "Escribe tu n\xFAmero de tel\xE9fono"
                ),
                input,

                // Just if user is new (didn't logout)
                _this.props.user.session === null
                // Just if referral is wanted (not wanted on backend)
                && _this.props.referral !== false
                // Just if referral didn't come by properties (entered by url?)
                && _this.props.user.referral === null && _react2.default.createElement(
                    _ui.Container,
                    {
                        margin: {
                            top: 32,
                            bottom: 32
                        }
                    },
                    _this.state.referral === false ? _react2.default.createElement(
                        _ui.Button,
                        {
                            variant: "text",
                            onClick: function onClick() {
                                _this.setState({
                                    referral: true
                                });
                            }
                        },
                        _react2.default.createElement(_this2.props.icons.actions.add, null),
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Tengo una invitaci\xF3n"
                        )
                    ) : _react2.default.createElement(_ui.Input, {
                        value: _this.state.registration.referral,
                        onChange: function onChange(value) {
                            _this.setState({
                                registration: _extends({}, _this.state.registration, {
                                    referral: value
                                })
                            });
                        },
                        placeholder: "C\xF3digo de invitaci\xF3n",
                        help: "Dejarlo en blanco si no tienes",
                        onEnter: function onEnter() {},
                        rounded: true,
                        width: 200,
                        capitalize: "characters"
                    })
                ),
                buttons
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(LoginBlock, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            if (this.props.user.referral !== null) {
                this.setState({
                    registration: _extends({}, this.state.registration, {
                        referral: this.props.user.referral
                    })
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.state.step === "request_phone" && _react2.default.createElement(_authUi.RequestPhone, {
                    layout: this._buildRequestPhoneLayout,
                    icons: {
                        forward: this.props.icons.actions.forward
                    },
                    phone: this.state.registration.phone,
                    retry: this.state.registration.retry,
                    onProgress: this.props.onProgress,
                    onExec: function onExec(phone, onError) {
                        _this3.props.onProgress(true, function () {
                            _this3.props.api.startAuthentication(phone.country.prefix, phone.number).then(function () {
                                _this3.props.onProgress(false, function () {
                                    _this3.setState({
                                        registration: _extends({}, _this3.state.registration, {
                                            phone: phone,
                                            retry: false
                                        }),
                                        step: "confirm_phone"
                                    });
                                });
                            }).catch(function (response) {
                                var code = response.code;


                                switch (code) {
                                    case "userland.authentication.invalid-number-exception":
                                        _this3.props.onProgress(false, function () {
                                            onError("El número es incorrecto");
                                        });

                                        break;
                                    default:
                                        throw response;
                                }
                            });
                        });
                    }
                }),
                this.state.step === "confirm_phone" && _react2.default.createElement(_authUi.ConfirmPhone, {
                    layout: function layout(_ref3) {
                        var children = _ref3.children;

                        return _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "column",
                                align: {
                                    alignItems: "center"
                                }
                            },
                            _react2.default.createElement(
                                _Subtitle2.default,
                                {
                                    active: true,
                                    margin: {
                                        top: 8
                                    }
                                },
                                "Escribe el c\xF3digo de verificaci\xF3n"
                            ),
                            children
                        );
                    },
                    icons: {
                        back: this.props.icons.actions.back,
                        forward: this.props.icons.actions.forward,
                        key: this.props.icons.objects.key
                    },
                    phone: this.state.registration.phone,
                    onExec: function onExec(code, onError) {
                        _this3.props.onProgress(true, function () {
                            _this3.props.api.completeAuthentication(_this3.state.registration.referral, _this3.props.user.session, _this3.state.registration.phone.country.iso, _this3.state.registration.phone.country.prefix, _this3.state.registration.phone.number, code).then(function (authentication) {
                                _this3.props.onProgress(false, function () {
                                    _this3.props.onAuthenticated(authentication);
                                });
                            }).catch(function (response) {
                                var code = response.code;


                                switch (code) {
                                    case "userland.authentication.invalid-code-exception":
                                        _this3.props.onProgress(false, function () {
                                            onError("El código es incorrecto");
                                        });

                                        break;
                                    case "unexpected-exception":
                                        _this3.props.onProgress(false, function () {
                                            onError("No es posible hacer la verificación. Por favor intenta más tarde");
                                        });

                                        break;
                                    default:
                                        throw response;
                                }
                            });
                        });
                    },
                    onBack: function onBack() {
                        _this3.setState({
                            registration: _extends({}, _this3.state.registration, {
                                retry: true
                            }),
                            step: "request_phone"
                        });
                    }
                })
            );
        }
    }]);

    return LoginBlock;
}(_react2.default.Component);

LoginBlock.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    user: _propTypes2.default.object.isRequired,
    referral: _propTypes2.default.bool, // Allows to remove referral, like in backend
    api: _propTypes2.default.shape({
        startAuthentication: _propTypes2.default.func.isRequired,
        completeAuthentication: _propTypes2.default.func.isRequired
    }).isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onAuthenticated: _propTypes2.default.func.isRequired
};
exports.default = LoginBlock;