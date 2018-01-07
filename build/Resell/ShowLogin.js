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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowLogin = function (_React$Component) {
    _inherits(ShowLogin, _React$Component);

    function ShowLogin() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, ShowLogin);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShowLogin.__proto__ || Object.getPrototypeOf(ShowLogin)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            phone: {
                country: {
                    iso: 'CU',
                    prefix: '53',
                    name: 'Cuba'
                },
                number: ''
            },
            password: null,
            error: null,
            progress: 0
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["children"]);

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
                    title: "Acceso a revendedor",
                    progress: _this.state.progress > 0,
                    flex: {
                        alignItems: "center"
                    }
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

    _createClass(ShowLogin, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            var Layout = this._buildLayout;

            return _react2.default.createElement(
                Layout,
                null,
                this.state.error && _react2.default.createElement(
                    _ui.Error,
                    null,
                    this.state.error
                ),
                _react2.default.createElement(_ui.CountryPicker, {
                    allow: this.props.allow,
                    onChange: function onChange(iso, prefix, name) {
                        _this3.setState({
                            phone: _extends({}, _this3.state.phone, {
                                country: {
                                    iso: iso,
                                    prefix: prefix,
                                    name: name
                                }
                            })
                        });
                    },
                    country: this.state.phone.country,
                    translation: "spa",
                    margin: {
                        top: 8
                    }
                }),
                _react2.default.createElement(_ui.Input, {
                    start: "+" + this.state.phone.country.prefix,
                    value: this.state.phone.number,
                    keyboard: "numeric",
                    onChange: function onChange(value) {
                        _this3.setState({
                            phone: _extends({}, _this3.state.phone, {
                                number: value
                            })
                        });
                    },
                    onEnter: this._handleExec,
                    focus: _ui.Platform.select({
                        web: true
                    }),
                    width: 200,
                    margin: {
                        top: 8
                    }
                }),
                _react2.default.createElement(_ui.Input, {
                    value: this.state.password,
                    type: "password",
                    onChange: function onChange(value) {
                        _this3.setState({
                            password: value
                        });
                    },
                    onEnter: function onEnter() {},
                    width: 200,
                    placeholder: "Constrase\xF1a",
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
                            top: 8
                        }
                    },
                    _react2.default.createElement(
                        _ui.Button,
                        {
                            color: "primary",
                            margin: 4,
                            center: _ui.Platform.select({
                                mobile: true
                            }),
                            onClick: function onClick() {
                                _this3.setState({
                                    error: null
                                }, function () {
                                    _this3._handleProgress(true, function () {
                                        _this3.props.api.processResellerAuthentication(_this3.state.phone.country.iso, _this3.state.phone.country.prefix, _this3.state.phone.number, _this3.state.password).then(function (authentication) {
                                            _this3._handleProgress(false, function () {
                                                _this3.props.onAuthenticated(authentication);
                                            });
                                        }).catch(function (response) {
                                            var code = response.code;


                                            switch (code) {
                                                case "userland.invalid-authentication-exception":
                                                    _this3.setState({
                                                        error: "Acceso incorrecto"
                                                    }, function () {
                                                        _this3._handleProgress(false);
                                                    });

                                                    break;
                                                default:
                                                    _this3.props.onError(response);
                                            }
                                        });
                                    });
                                });
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Continuar"
                        ),
                        _react2.default.createElement(this.props.icons.actions.forward, null)
                    )
                )
            );
        }
    }]);

    return ShowLogin;
}(_react2.default.Component);

ShowLogin.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    user: _propTypes2.default.object.isRequired,
    onAuthenticated: _propTypes2.default.func.isRequired, // ()
    onError: _propTypes2.default.func.isRequired
};
exports.default = ShowLogin;