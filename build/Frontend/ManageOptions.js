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

var _InnerLayoutBlock = require("../Common/InnerLayoutBlock");

var _InnerLayoutBlock2 = _interopRequireDefault(_InnerLayoutBlock);

var _Subtitle = require("../Common/Subtitle");

var _Subtitle2 = _interopRequireDefault(_Subtitle);

var _LoginBlock = require("../Common/LoginBlock");

var _LoginBlock2 = _interopRequireDefault(_LoginBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ManageOptions = function (_React$Component) {
    _inherits(ManageOptions, _React$Component);

    function ManageOptions() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, ManageOptions);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ManageOptions.__proto__ || Object.getPrototypeOf(ManageOptions)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            progress: 0,
            page: "account" // "account", "reports", "payments"
        }, _this.componentWillMount = function () {
            _ui.Platform.back.add(_this._handleBack);
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["children"]);

            var title = void 0,
                left = void 0;

            switch (_this.state.page) {
                case "account":
                    title = "Opciones";

                    break;
                case "reports":
                    title = "Afiliado - Reportes";

                    left = {
                        icon: _react2.default.createElement(_this2.props.icons.actions.back, null),
                        onClick: _this._handleBack
                    };

                    break;
                case "payments":
                    title = "Afiliado - Pagos";

                    left = {
                        icon: _react2.default.createElement(_this2.props.icons.actions.back, null),
                        onClick: _this._handleBack
                    };

                    break;
                default:
                    throw _this.state.page;
            }

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
                    title: title,
                    left: left,
                    progress: _this.state.progress > 0,
                    align: {
                        alignItems: "flex-start"
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
        }, _this._handleBack = function () {
            if (_this.state.page === "account") {
                _this.props.onBack();
            } else {
                _this.setState({
                    page: "account"
                });
            }

            return true;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ManageOptions, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _ui.Platform.back.remove(this._handleBack);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var Layout = this._buildLayout;

            return _react2.default.createElement(
                Layout,
                {
                    flow: "column",
                    align: {
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }
                },
                _react2.default.createElement(
                    _InnerLayoutBlock2.default,
                    {
                        photo: _ui.Platform.select({
                            web: require('../Common/city.jpg')
                        })
                    },
                    this.state.page === "account" && _react2.default.createElement(ViewAccountBlock, {
                        theme: this.props.theme,
                        width: this.props.width,
                        api: this.props.api,
                        user: this.props.user,
                        icons: this.props.icons,
                        onAuthenticated: this.props.onAuthenticated,
                        onLogout: this.props.onLogout,
                        onNavigateToHelp: this.props.onNavigateToHelp,
                        onNavigateToPrivacyPolicy: this.props.onNavigateToPrivacyPolicy,
                        onNavigateToAndroidApp: this.props.onNavigateToAndroidApp,
                        onNavigateToIosApp: this.props.onNavigateToIosApp,
                        onNavigateToReferralReports: function onNavigateToReferralReports() {
                            _this3.setState({
                                page: "reports"
                            });
                        },
                        onNavigateToReferralPayments: function onNavigateToReferralPayments() {
                            _this3.setState({
                                page: "payments"
                            });
                        },
                        onProgress: this._handleProgress,
                        onError: this.props.onError
                    }),
                    this.state.page === "reports" && _react2.default.createElement(ReportsBlock, {
                        icons: this.props.icons,
                        api: this.props.api,
                        onBack: function onBack() {
                            _this3.setState({
                                page: "account"
                            });
                        },
                        onProgress: this._handleProgress,
                        onError: this.props.onError
                    }),
                    this.state.page === "payments" && _react2.default.createElement(PaymentsBlock, {
                        icons: this.props.icons,
                        api: this.props.api,
                        onProgress: this._handleProgress,
                        onBack: function onBack() {
                            _this3.setState({
                                page: "account"
                            });
                        }
                    })
                )
            );
        }
    }]);

    return ManageOptions;
}(_react2.default.Component);

ManageOptions.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    user: _propTypes2.default.object.isRequired,
    onAuthenticated: _propTypes2.default.func.isRequired, // ()
    onNavigateToHelp: _propTypes2.default.func.isRequired, // ()
    onNavigateToPrivacyPolicy: _propTypes2.default.func.isRequired, // ()
    onNavigateToAndroidApp: _propTypes2.default.func.isRequired, // ()
    onNavigateToIosApp: _propTypes2.default.func.isRequired, // ()
    onLogout: _propTypes2.default.func.isRequired, // (),
    onBack: _propTypes2.default.func.isRequired, // ()
    onError: _propTypes2.default.func.isRequired
};

var ViewAccountBlock = function (_React$Component2) {
    _inherits(ViewAccountBlock, _React$Component2);

    function ViewAccountBlock() {
        var _ref3;

        var _temp2, _this4, _ret2;

        _classCallCheck(this, ViewAccountBlock);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref3 = ViewAccountBlock.__proto__ || Object.getPrototypeOf(ViewAccountBlock)).call.apply(_ref3, [this].concat(args))), _this4), _this4.state = {
            userland: {
                phone: {
                    user: null
                }
            }
        }, _this4._renderLink = function (text, onClick, color, border) {
            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "row",
                    padding: {
                        top: 16,
                        bottom: 16
                    },
                    border: border ? {
                        bottom: {
                            width: 1,
                            color: "#ccc",
                            style: "solid"
                        }
                    } : undefined,
                    onClick: onClick,
                    style: _ui.Platform.select({
                        mobile: {
                            flex: 1
                        }
                    })
                },
                _react2.default.createElement(
                    _ui.Text,
                    {
                        color: _ui.Platform.select({
                            web: color,
                            mobile: color !== "secondary" ? color : undefined
                        }),
                        style: _ui.Platform.select({
                            mobile: color === "secondary" ? {
                                color: "red"
                            } : undefined
                        })
                    },
                    text
                )
            );
        }, _temp2), _possibleConstructorReturn(_this4, _ret2);
    }

    _createClass(ViewAccountBlock, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this5 = this;

            if (this.props.user.token !== null) {
                this.props.onProgress(true, function () {
                    _this5.props.api.userland.phone.pickUserAsClient().then(function (user) {
                        _this5.setState({
                            userland: {
                                phone: {
                                    user: user
                                }
                            }
                        }, function () {
                            _this5.props.onProgress(false);
                        });
                    }).catch(_this5.props.onError);
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.state.userland.phone.user && _react2.default.createElement(
                    _ui.Container,
                    {
                        background: this.props.theme.palette.primary.main,
                        width: _ui.Platform.select({
                            mobile: "100%"
                        })
                    },
                    _react2.default.createElement(this.props.icons.objects.user, {
                        style: {
                            color: "#fff",
                            fontSize: 108
                        }
                    }),
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "subtitle1",
                            style: {
                                color: "#fff"
                            }
                        },
                        "+",
                        this.state.userland.phone.user.prefix,
                        "-",
                        this.state.userland.phone.user.number
                    )
                ),
                _ui.Platform.select({
                    web: _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            margin: {
                                top: 32
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                variant: "body1",
                                style: _ui.Platform.dimensions.isXsDown(this.props.width) ? {
                                    textAlign: "center"
                                } : undefined
                            },
                            "MundoRecarga funciona mejor en una app!"
                        ),
                        _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "row wrap",
                                align: {
                                    justifyContent: "center",
                                    alignItems: "center"
                                }
                            },
                            _react2.default.createElement(_ui.Image, {
                                source: require("./google.png"),
                                onClick: this.props.onNavigateToAndroidApp,
                                margin: 24
                            }),
                            _react2.default.createElement(_ui.Image, {
                                source: require("./apple.png"),
                                onClick: this.props.onNavigateToIosApp,
                                margin: 24
                            })
                        )
                    )
                }),
                this.props.user.token === null && _react2.default.createElement(_LoginBlock2.default, {
                    icons: this.props.icons,
                    user: this.props.user,
                    api: {
                        startAuthentication: this.props.api.userland.startAuthentication,
                        completeAuthentication: this.props.api.userland.completeAuthentication
                    },
                    onProgress: this.props.onProgress,
                    onAuthenticated: this.props.onAuthenticated
                }),
                this.props.user.token !== null && _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        _Subtitle2.default,
                        {
                            margin: {
                                top: 16
                            }
                        },
                        "Afiliado"
                    ),
                    _react2.default.createElement(ViewReferralBlock, {
                        width: this.props.width,
                        layout: function layout(_ref4) {
                            var children = _ref4.children;

                            return _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "column",
                                    align: {
                                        justifyContent: "flex-start",
                                        alignItems: "flex-start"
                                    },
                                    padding: {
                                        left: 8,
                                        right: 8
                                    },
                                    width: "100%"
                                },
                                children
                            );
                        },
                        icons: this.props.icons,
                        api: this.props.api,
                        onNavigateToReferralReports: this.props.onNavigateToReferralReports,
                        onNavigateToReferralPayments: this.props.onNavigateToReferralPayments,
                        onProgress: this.props.onProgress,
                        onAuthenticated: this.props.onAuthenticated,
                        onError: this.props.onError
                    })
                ),
                _react2.default.createElement(
                    _Subtitle2.default,
                    {
                        margin: {
                            top: 16
                        }
                    },
                    "Enlaces"
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        padding: {
                            left: 16,
                            right: 16
                        },
                        width: "100%"
                    },
                    this._renderLink("Ayuda", this.props.onNavigateToHelp, "primary", true),
                    this._renderLink("Política de privacidad", this.props.onNavigateToPrivacyPolicy, "primary", true),
                    this.state.userland.phone.user && this._renderLink("Cerrar sesión", this.props.onLogout, "secondary", false)
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "column",
                        align: {
                            justifyContent: "flex-start",
                            alignItems: "center"
                        },
                        background: "#f5f5f5",
                        padding: {
                            top: 32,
                            bottom: 32
                        },
                        width: _ui.Platform.select({
                            mobile: "100%"
                        })
                    },
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "\xA9 2019 MundoRecarga"
                    ),
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Un servicio de Intermaple Inc."
                    )
                )
            );
        }
    }]);

    return ViewAccountBlock;
}(_react2.default.Component);

ViewAccountBlock.propTypes = {
    theme: _propTypes2.default.object.isRequired,
    width: _propTypes2.default.string.isRequired,
    icons: _propTypes2.default.object.isRequired,
    user: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onNavigateToAndroidApp: _propTypes2.default.func.isRequired, // ()
    onNavigateToIosApp: _propTypes2.default.func.isRequired, // ()
    onNavigateToHelp: _propTypes2.default.func.isRequired, // ()
    onNavigateToPrivacyPolicy: _propTypes2.default.func.isRequired, // ()
    onNavigateToReferralReports: _propTypes2.default.func.isRequired, // ()
    onNavigateToReferralPayments: _propTypes2.default.func.isRequired, // ()
    onAuthenticated: _propTypes2.default.func.isRequired,
    onLogout: _propTypes2.default.func.isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var ViewReferralBlock = function (_React$Component3) {
    _inherits(ViewReferralBlock, _React$Component3);

    function ViewReferralBlock() {
        _classCallCheck(this, ViewReferralBlock);

        return _possibleConstructorReturn(this, (ViewReferralBlock.__proto__ || Object.getPrototypeOf(ViewReferralBlock)).apply(this, arguments));
    }

    _createClass(ViewReferralBlock, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(ManageReferralBlock, {
                width: this.props.width,
                layout: this.props.layout,
                icons: this.props.icons,
                api: this.props.api,
                onNavigateToReferralReports: this.props.onNavigateToReferralReports,
                onNavigateToReferralPayments: this.props.onNavigateToReferralPayments,
                onProgress: this.props.onProgress,
                onError: this.props.onError
            });
        }
    }]);

    return ViewReferralBlock;
}(_react2.default.Component);

ViewReferralBlock.propTypes = {
    width: _propTypes2.default.string.isRequired,
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onNavigateToReferralReports: _propTypes2.default.func.isRequired, // ()
    onNavigateToReferralPayments: _propTypes2.default.func.isRequired, // ()
    onProgress: _propTypes2.default.func.isRequired,
    onAuthenticated: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var ManageReferralBlock = function (_React$Component4) {
    _inherits(ManageReferralBlock, _React$Component4);

    function ManageReferralBlock() {
        var _ref5;

        var _temp3, _this7, _ret3;

        _classCallCheck(this, ManageReferralBlock);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return _ret3 = (_temp3 = (_this7 = _possibleConstructorReturn(this, (_ref5 = ManageReferralBlock.__proto__ || Object.getPrototypeOf(ManageReferralBlock)).call.apply(_ref5, [this].concat(args))), _this7), _this7.state = {
            userland: {
                referral: {
                    user: null
                }
            }
        }, _this7._pickUser = function () {
            _this7.props.onProgress(true, function () {
                _this7.props.api.userland.referral.pickUser().then(function (user) {
                    _this7.setState({
                        userland: _extends({}, _this7.state.userland, {
                            referral: _extends({}, _this7.state.userland.referral, {
                                user: user
                            })
                        })
                    }, function () {
                        _this7.props.onProgress(false);
                    });
                }).catch(function (response) {
                    var code = response.code;


                    switch (code) {
                        case "userland.referral.nonexistent-user-exception":
                            _this7.setState({
                                userland: _extends({}, _this7.state.userland, {
                                    referral: {
                                        user: false
                                    }
                                })
                            }, function () {
                                _this7.props.onProgress(false);
                            });

                            break;
                        default:
                            _this7.props.onError(response);
                    }
                });
            });
        }, _this7._renderLink = function (text, onClick) {
            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "row",
                    padding: {
                        top: 16,
                        bottom: 16
                    },
                    border: {
                        bottom: {
                            width: 1,
                            color: "#ccc",
                            style: "solid"
                        }
                    },
                    onClick: onClick,
                    style: _ui.Platform.select({
                        mobile: {
                            flex: 1
                        }
                    })
                },
                _react2.default.createElement(
                    _ui.Text,
                    null,
                    text
                )
            );
        }, _temp3), _possibleConstructorReturn(_this7, _ret3);
    }

    _createClass(ManageReferralBlock, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this._pickUser();
        }
    }, {
        key: "render",
        value: function render() {
            var _this8 = this;

            if (this.state.userland.referral.user === null) {
                return null;
            }

            if (this.state.userland.referral.user === false) {
                return _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            justifyContent: "center",
                            alignItems: "center"
                        },
                        padding: 16
                    },
                    _react2.default.createElement(_ui.Image, {
                        source: require("./social.png"),
                        width: 150,
                        height: 150
                    }),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "flex-start"
                            },
                            margin: {
                                left: 16
                            },
                            style: _ui.Platform.select({
                                mobile: {
                                    flex: 1
                                }
                            })
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Invita a tus amigos en las redes sociales."
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    top: 16
                                }
                            },
                            "Gana comisiones de hasta $1 USD por cada recarga que hagan."
                        ),
                        _react2.default.createElement(
                            _ui.Button,
                            {
                                color: "primary",
                                margin: {
                                    top: 16
                                },
                                onClick: function onClick() {
                                    _this8.props.onProgress(true, function () {
                                        _this8.props.api.userland.referral.addUser().then(function () {
                                            _this8.props.onProgress(false, function () {
                                                _this8._pickUser();
                                            });
                                        }).catch(_this8.props.onError);
                                    });
                                }
                            },
                            _react2.default.createElement(this.props.icons.actions.join, null),
                            _react2.default.createElement(
                                _ui.Text,
                                null,
                                "Participar"
                            )
                        )
                    )
                );
            }

            var url = "www.mundorecarga.com?ref=" + this.state.userland.referral.user.code;

            return _react2.default.createElement(
                this.props.layout,
                null,
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            justifyContent: "space-between",
                            alignItems: "center"
                        },
                        padding: {
                            top: 16,
                            bottom: 16
                        },
                        border: {
                            bottom: {
                                width: 1,
                                color: "#ccc",
                                style: "solid"
                            }
                        },
                        width: _ui.Platform.select({
                            mobile: "100%"
                        })
                    },
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "subtitle2"
                        },
                        "Saldo"
                    ),
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "subtitle2",
                            style: {
                                color: "green"
                            }
                        },
                        "$",
                        this.state.userland.referral.user.balance.toFixed(2)
                    )
                ),
                _react2.default.createElement(
                    _ui.Text,
                    {
                        color: "primary",
                        variant: "subtitle2",
                        margin: {
                            top: 16
                        },
                        center: true,
                        style: {
                            color: "green"
                        }
                    },
                    "Gana dinero con MundoRecarga"
                ),
                _react2.default.createElement(
                    _ui.Text,
                    {
                        margin: {
                            top: 8
                        }
                    },
                    "Te pagamos por cada recarga que realicen tus invitados."
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            justifyContent: "space-between",
                            alignItems: "center"
                        },
                        margin: {
                            top: 16
                        },
                        width: _ui.Platform.select({
                            mobile: "100%"
                        })
                    },
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "subtitle2"
                        },
                        "Tu c\xF3digo de invitaci\xF3n"
                    ),
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            color: "primary",
                            variant: "subtitle2"
                        },
                        this.state.userland.referral.user.code
                    )
                ),
                _react2.default.createElement(
                    _ui.Text,
                    {
                        margin: {
                            top: 8
                        }
                    },
                    "Invita a tus amigos a MundoRecarga."
                ),
                _react2.default.createElement(
                    _ui.Text,
                    {
                        margin: {
                            top: 8
                        }
                    },
                    "P\xEDdeles que se registren con tu c\xF3digo de invitaci\xF3n."
                ),
                _react2.default.createElement(
                    _ui.Text,
                    {
                        variant: "subtitle2",
                        margin: {
                            top: 16
                        }
                    },
                    "Tu p\xE1gina de invitaci\xF3n"
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: _ui.Platform.dimensions.isXsDown(this.props.width) ? "column" : "row",
                        align: _ui.Platform.dimensions.isXsDown(this.props.width) ? {
                            justifyContent: "flex-start",
                            alignItems: "center"
                        } : {
                            justifyContent: "center",
                            alignItems: "center"
                        },
                        margin: {
                            top: 8
                        },
                        width: _ui.Platform.select({
                            web: "auto"
                        })
                    },
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "subtitle2",
                            color: "primary"
                        },
                        url
                    ),
                    _react2.default.createElement(
                        _ui.Button,
                        {
                            color: "primary",
                            size: "small",
                            variant: "outlined",
                            margin: {
                                top: _ui.Platform.dimensions.isXsDown(this.props.width) ? 8 : 0,
                                left: _ui.Platform.dimensions.isXsDown(this.props.width) ? 0 : 8
                            },
                            onClick: function onClick() {
                                _ui.Platform.clipboard.set(url);
                            }
                        },
                        _react2.default.createElement(this.props.icons.actions.copy, null),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                color: "primary"
                            },
                            "Copiar"
                        )
                    )
                ),
                _react2.default.createElement(
                    _ui.Text,
                    {
                        margin: {
                            top: 8
                        },
                        padding: {
                            bottom: 8
                        }
                    },
                    "Copia y comparte tu p\xE1gina de invitaci\xF3n con tus amigos en las redes sociales."
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        margin: {
                            top: 8
                        },
                        border: {
                            top: {
                                width: 1,
                                color: "#ccc",
                                style: "solid"
                            }
                        },
                        width: _ui.Platform.select({
                            mobile: "100%"
                        })
                    },
                    this._renderLink("Reportes", this.props.onNavigateToReferralReports),
                    this._renderLink("Pagos", this.props.onNavigateToReferralPayments)
                )
            );
        }
    }]);

    return ManageReferralBlock;
}(_react2.default.Component);

ManageReferralBlock.propTypes = {
    width: _propTypes2.default.string.isRequired,
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onNavigateToReferralReports: _propTypes2.default.func.isRequired, // ()
    onNavigateToReferralPayments: _propTypes2.default.func.isRequired, // ()
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var ReportsBlock = function (_React$Component5) {
    _inherits(ReportsBlock, _React$Component5);

    function ReportsBlock() {
        var _ref6;

        var _temp4, _this9, _ret4;

        _classCallCheck(this, ReportsBlock);

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        return _ret4 = (_temp4 = (_this9 = _possibleConstructorReturn(this, (_ref6 = ReportsBlock.__proto__ || Object.getPrototypeOf(ReportsBlock)).call.apply(_ref6, [this].concat(args))), _this9), _this9.state = {
            userland: {
                referral: {
                    user: null
                }
            },
            interval: "current_month",
            charts: {
                referrals: null,
                topups: null,
                profit: null
            }
        }, _this9._pickUser = function () {
            _this9.props.onProgress(true, function () {
                _this9.props.api.userland.referral.pickUser().then(function (user) {
                    _this9.setState({
                        userland: _extends({}, _this9.state.userland, {
                            referral: _extends({}, _this9.state.userland.referral, {
                                user: user
                            })
                        })
                    }, function () {
                        _this9.props.onProgress(false);
                    });
                }).catch(function (response) {
                    var code = response.code;


                    switch (code) {
                        case "userland.referral.nonexistent-user-exception":
                            _this9.setState({
                                userland: _extends({}, _this9.state.userland, {
                                    referral: {
                                        user: false
                                    }
                                })
                            }, function () {
                                _this9.props.onProgress(false);
                            });

                            break;
                        default:
                            _this9.props.onError(response);
                    }
                });
            });
        }, _this9._collectStats = function () {
            var from = void 0,
                to = void 0,
                group = void 0;

            if (_this9.state.interval === "last_month") {
                // Beginning of last month
                from = (0, _dayjs.subMonths)((0, _dayjs.startOfMonth)(Date.now()), 1);
                from = (0, _dayjs.getTime)(from);

                // Beginning of current month
                to = (0, _dayjs.addMonths)(from, 1);
                to = (0, _dayjs.getTime)(to);

                from = from / 1000;
                to = to / 1000;

                group = "by-day";
            }

            if (_this9.state.interval === "current_month") {
                // Beginning of current month
                from = (0, _dayjs.startOfMonth)(Date.now());
                from = (0, _dayjs.getTime)(from);

                to = (0, _dayjs.endOfMonth)(Date.now());
                to = (0, _dayjs.getTime)(to);

                from = from / 1000;
                to = to / 1000;

                group = "by-day";
            }

            if (_this9.state.interval === "current_year") {
                from = (0, _dayjs.startOfYear)(Date.now());
                from = (0, _dayjs.getTime)(from);

                // Beginning of next year
                to = (0, _dayjs.addYears)(from, 1);
                to = (0, _dayjs.getTime)(to);

                from = from / 1000;
                to = to / 1000;

                group = "by-month";
            }

            _this9.props.onProgress(true, function () {
                import("@yosmy/ui").then(function (module) {
                    var Chart = _ui.Platform.select({
                        web: function web(_ref7) {
                            var children = _ref7.children,
                                props = _objectWithoutProperties(_ref7, ["children"]);

                            var Chart = module.Chart;

                            return _react2.default.createElement(
                                Chart,
                                props,
                                children
                            );
                        },
                        mobile: function mobile(_ref8) {
                            var children = _ref8.children,
                                props = _objectWithoutProperties(_ref8, ["children"]);

                            var Chart = module.default.Chart;

                            return _react2.default.createElement(
                                Chart,
                                props,
                                children
                            );
                        }
                    });

                    _this9.props.api.userland.referral.computeReferrals(from, to, group).then(function (stats) {
                        _this9.setState({
                            charts: _extends({}, _this9.state.charts, {
                                referrals: stats.length > 0 ? _react2.default.createElement(Chart, {
                                    data: stats,
                                    xAxis: {
                                        name: _this9.state.interval !== "current_year" ? "Día" : "Mes",
                                        dataKey: _this9.state.interval !== "current_year" ? "day" : "month"
                                    },
                                    lines: [{
                                        name: "Usuarios",
                                        dataKey: "referrals",
                                        unit: "usuarios"
                                    }]
                                }) : false
                            })
                        }, function () {
                            _this9.props.onProgress(false);
                        });
                    }).catch(_this9.props.onError);
                }).catch(_this9.props.onError);
            });

            _this9.props.onProgress(true, function () {
                import("@yosmy/ui").then(function (module) {
                    var Chart = _ui.Platform.select({
                        web: function web(_ref9) {
                            var children = _ref9.children,
                                props = _objectWithoutProperties(_ref9, ["children"]);

                            var Chart = module.Chart;

                            return _react2.default.createElement(
                                Chart,
                                props,
                                children
                            );
                        },
                        mobile: function mobile(_ref10) {
                            var children = _ref10.children,
                                props = _objectWithoutProperties(_ref10, ["children"]);

                            var Chart = module.default.Chart;

                            return _react2.default.createElement(
                                Chart,
                                props,
                                children
                            );
                        }
                    });

                    _this9.props.api.userland.referral.computeTopups(from, to, group).then(function (stats) {
                        _this9.setState({
                            charts: _extends({}, _this9.state.charts, {
                                topups: stats.length > 0 ? _react2.default.createElement(Chart, {
                                    data: stats,
                                    xAxis: {
                                        name: _this9.state.interval !== "current_year" ? "Día" : "Mes",
                                        dataKey: _this9.state.interval !== "current_year" ? "day" : "month"
                                    },
                                    lines: [{
                                        name: "Recargas",
                                        dataKey: "topups",
                                        unit: "recargas"
                                    }]
                                }) : false,
                                profit: stats.length > 0 ? _react2.default.createElement(Chart, {
                                    data: stats,
                                    xAxis: {
                                        name: _this9.state.interval !== "current_year" ? "Día" : "Mes",
                                        dataKey: _this9.state.interval !== "current_year" ? "day" : "month"
                                    },
                                    lines: [{
                                        name: "Ganancias",
                                        dataKey: "profit",
                                        unit: "usd"
                                    }]
                                }) : false
                            })
                        }, function () {
                            _this9.props.onProgress(false);
                        });
                    }).catch(_this9.props.onError);
                }).catch(_this9.props.onError);
            });
        }, _temp4), _possibleConstructorReturn(_this9, _ret4);
    }

    _createClass(ReportsBlock, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextState !== this.state;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this._pickUser();

            this._collectStats();
        }
    }, {
        key: "render",
        value: function render() {
            var _this10 = this;

            if (this.state.userland.referral.user === null || this.state.charts.referrals === null || this.state.charts.topups === null || this.state.charts.profit === null) {
                return null;
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    _Subtitle2.default,
                    {
                        margin: {
                            top: 16
                        }
                    },
                    "Usuarios, recargas y ganancias"
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        width: 150,
                        style: {
                            // TODO: Patch to set width for the Select component
                            alignItems: undefined
                        },
                        margin: {
                            top: 8
                        },
                        padding: {
                            left: 8,
                            right: 8
                        }
                    },
                    _react2.default.createElement(
                        _ui.Select,
                        {
                            label: "Intervalo",
                            value: this.state.interval,
                            onChange: function onChange(value) {
                                _this10.setState({
                                    interval: value
                                }, function () {
                                    _this10._collectStats();
                                });
                            },
                            style: {
                                width: 100
                            }
                        },
                        _react2.default.createElement(
                            _ui.SelectItem,
                            {
                                value: "last_month"
                            },
                            "Mes anterior"
                        ),
                        _react2.default.createElement(
                            _ui.SelectItem,
                            {
                                value: "current_month"
                            },
                            "Mes actual"
                        ),
                        _react2.default.createElement(
                            _ui.SelectItem,
                            {
                                value: "current_year"
                            },
                            "A\xF1o actual"
                        )
                    )
                ),
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
                        },
                        padding: {
                            left: 8,
                            right: 8
                        }
                    },
                    this.state.charts.referrals !== false && _react2.default.createElement(
                        _ui.Container,
                        { width: 200 },
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Usuarios"
                        ),
                        this.state.charts.referrals
                    ),
                    this.state.charts.topups !== false && _react2.default.createElement(
                        _ui.Container,
                        { width: 200 },
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Recargas"
                        ),
                        this.state.charts.topups
                    ),
                    this.state.charts.profit !== false && _react2.default.createElement(
                        _ui.Container,
                        { width: 200 },
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Ganancias"
                        ),
                        this.state.charts.profit
                    )
                ),
                _react2.default.createElement(
                    _ui.Button,
                    {
                        color: "primary",
                        center: true,
                        margin: {
                            top: 8
                        },
                        onClick: this.props.onBack
                    },
                    _react2.default.createElement(this.props.icons.actions.back, null),
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Regresar"
                    )
                )
            );
        }
    }]);

    return ReportsBlock;
}(_react2.default.Component);

ReportsBlock.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onBack: _propTypes2.default.func.isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var PaymentsBlock = function (_React$Component6) {
    _inherits(PaymentsBlock, _React$Component6);

    function PaymentsBlock() {
        var _ref11;

        var _temp5, _this11, _ret5;

        _classCallCheck(this, PaymentsBlock);

        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        return _ret5 = (_temp5 = (_this11 = _possibleConstructorReturn(this, (_ref11 = PaymentsBlock.__proto__ || Object.getPrototypeOf(PaymentsBlock)).call.apply(_ref11, [this].concat(args))), _this11), _this11.state = {
            userland: {
                referral: {
                    user: null
                }
            }
        }, _this11._pickUser = function () {
            _this11.props.onProgress(true, function () {
                _this11.props.api.userland.referral.pickUser().then(function (user) {
                    _this11.setState({
                        userland: _extends({}, _this11.state.userland, {
                            referral: _extends({}, _this11.state.userland.referral, {
                                user: user
                            })
                        })
                    }, function () {
                        _this11.props.onProgress(false);
                    });
                }).catch(function (response) {
                    var code = response.code;


                    switch (code) {
                        case "userland.referral.nonexistent-user-exception":
                            _this11.setState({
                                userland: _extends({}, _this11.state.userland, {
                                    referral: {
                                        user: false
                                    }
                                })
                            }, function () {
                                _this11.props.onProgress(false);
                            });

                            break;
                        default:
                            _this11.props.onError(response);
                    }
                });
            });
        }, _temp5), _possibleConstructorReturn(_this11, _ret5);
    }

    _createClass(PaymentsBlock, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this._pickUser();
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.userland.referral.user === null) {
                return null;
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    _Subtitle2.default,
                    {
                        margin: {
                            top: 16
                        }
                    },
                    "Saldo actual"
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            justifyContent: "space-between",
                            alignItems: "center"
                        },
                        padding: 8,
                        border: {
                            bottom: {
                                width: 1,
                                color: "#ccc",
                                style: "solid"
                            }
                        },
                        width: _ui.Platform.select({
                            mobile: "100%"
                        })
                    },
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "subtitle2"
                        },
                        "Saldo de afiliado"
                    ),
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "subtitle2",
                            style: {
                                color: "green"
                            }
                        },
                        "$",
                        this.state.userland.referral.user.balance.toFixed(2)
                    )
                ),
                _react2.default.createElement(
                    _Subtitle2.default,
                    {
                        margin: {
                            top: 16
                        }
                    },
                    "\xDAltimos pagos"
                ),
                _react2.default.createElement(
                    _ui.Text,
                    {
                        padding: 8
                    },
                    "Los pagos ser\xE1n enviados por Paypal al final de cada mes."
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            justifyContent: "flex-start",
                            alignItems: "center"
                        },
                        padding: 8,
                        border: {
                            bottom: {
                                width: 1,
                                color: "#ccc",
                                style: "solid"
                            }
                        },
                        width: _ui.Platform.select({
                            mobile: "100%"
                        })
                    },
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Pago m\xEDnimo:"
                    ),
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            color: "primary",
                            margin: {
                                left: 8
                            }
                        },
                        "$100.00"
                    )
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            justifyContent: "space-between",
                            alignItems: "center"
                        },
                        padding: 8,
                        margin: {
                            top: 8
                        },
                        width: _ui.Platform.select({
                            mobile: "100%"
                        })
                    },
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "subtitle2"
                        },
                        "Pr\xF3ximo pago"
                    ),
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "subtitle2",
                            style: {
                                color: "green"
                            }
                        },
                        (0, _dayjs.format)((0, _dayjs.endOfMonth)(Date.now()), "MMMM D, YYYY")
                    )
                ),
                _react2.default.createElement(
                    _ui.Text,
                    {
                        margin: 8,
                        style: {
                            color: "red"
                        }
                    },
                    "Tu saldo actual es insuficiente para poder realizar un cobro."
                ),
                _react2.default.createElement(
                    _ui.Button,
                    {
                        color: "primary",
                        center: true,
                        margin: {
                            top: 8
                        },
                        onClick: this.props.onBack
                    },
                    _react2.default.createElement(this.props.icons.actions.back, null),
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Regresar"
                    )
                )
            );
        }
    }]);

    return PaymentsBlock;
}(_react2.default.Component);

PaymentsBlock.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onBack: _propTypes2.default.func.isRequired
};
exports.default = _ui.Platform.dimensions.withWidth()(_ui.Theme.withTheme()(ManageOptions));