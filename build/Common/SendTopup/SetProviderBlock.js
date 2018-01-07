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

var _Subtitle = require("../Subtitle");

var _Subtitle2 = _interopRequireDefault(_Subtitle);

var _Row = require("../Row");

var _Row2 = _interopRequireDefault(_Row);

var _Preview = require("../Preview");

var _Preview2 = _interopRequireDefault(_Preview);

var _gift = require("../../Frontend/gift.png");

var _gift2 = _interopRequireDefault(_gift);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SetProviderBlock = function (_React$Component) {
    _inherits(SetProviderBlock, _React$Component);

    function SetProviderBlock() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SetProviderBlock);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SetProviderBlock.__proto__ || Object.getPrototypeOf(SetProviderBlock)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            detected: true, // Determines whether to show detected providers or all providers
            provider: null,
            error: null
        }, _this._handleSelect = function (provider) {
            _this.setState({
                provider: provider
            }, function () {
                _this.props.onProgress(true, function () {
                    _this.props.api.testTopup(_this.props.country.prefix, _this.props.account, _this.state.provider.id).then(function () {
                        _this.props.onProgress(false, function () {
                            _this.props.onSet(provider);
                        });
                    }).catch(function (response) {
                        var code = response.code;


                        switch (code) {
                            case "topup.account-exception":
                                _this.setState({
                                    error: "Se ha producido un error de validación. Por favor, verifica que el número y la operadora sean correctos"
                                }, function () {
                                    _this.props.onProgress(false);
                                });

                                break;
                            case "topup.provider-exception":
                                var error = void 0;

                                // Is Cuba Nauta?
                                if (_this.state.provider.id === "NUCU") {
                                    error = "Se recibió un error desde Etecsa. Por favor revisa que ese correo nauta esté bien";
                                } else {
                                    error = "En estos momentos no es posible enviar una recarga a esa operadora. Por favor intenta más tarde";
                                }

                                _this.setState({
                                    error: error
                                }, function () {
                                    _this.props.onProgress(false);
                                });

                                break;
                            case "unexpected-exception":
                                _this.setState({
                                    error: "En estos momentos no es posible enviar una recarga a esa operadora. Por favor intenta más tarde"
                                }, function () {
                                    _this.props.onProgress(false);
                                });

                                break;
                            default:
                                _this.props.onProgress(false, function () {
                                    _this.props.onError(response);
                                });
                        }
                    });
                });
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SetProviderBlock, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.setState({
                provider: this.props.provider ? this.props.provider : false
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
            var _this2 = this;

            if (this.state.provider === null) {
                return null;
            }

            if (this.state.provider) {
                var _state$provider = this.state.provider,
                    name = _state$provider.name,
                    logo = _state$provider.logo,
                    width = _state$provider.width,
                    height = _state$provider.height,
                    detected = _state$provider.detected;

                // Trick to put the logo inside a box

                if (width >= 24) {
                    height = height * 24 / width;
                    width = 24;
                } else if (height >= 24) {
                    width = width * 24 / height;
                    height = 24;
                }

                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        _Subtitle2.default,
                        {
                            margin: {
                                top: 8
                            }
                        },
                        "Operadora"
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
                            {
                                flow: "column",
                                align: {
                                    justifyContent: "center",
                                    alignItems: "center"
                                }
                            },
                            _react2.default.createElement(_ui.Image, {
                                source: logo !== null ? logo : require("../provider.png"),
                                margin: {
                                    top: 2
                                },
                                width: logo !== null ? width : 24,
                                height: logo !== null ? height : 24
                            })
                        ),
                        body: _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "column",
                                align: {
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start"
                                }
                            },
                            _react2.default.createElement(
                                _ui.Text,
                                null,
                                name
                            ),
                            detected && _react2.default.createElement(
                                _ui.Text,
                                {
                                    variant: "caption"
                                },
                                "Operadora detectada"
                            )
                        ),
                        onUndo: function onUndo() {
                            _this2.setState({
                                detected: false,
                                provider: false,
                                error: null
                            }, _this2.props.onEdit);
                        }
                    }),
                    this.state.error !== null && _react2.default.createElement(
                        _ui.Error,
                        {
                            center: true,
                            margin: {
                                top: 8,
                                bottom: 8
                            }
                        },
                        this.state.error
                    )
                );
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.state.detected ? _react2.default.createElement(ListDetectedProviders, {
                    layout: function layout(_ref2) {
                        var children = _ref2.children;

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
                                _Subtitle2.default,
                                {
                                    active: true,
                                    margin: {
                                        top: 8
                                    }
                                },
                                "Selecciona la operadora"
                            ),
                            children,
                            _react2.default.createElement(
                                _ui.Button,
                                {
                                    variant: "outlined",
                                    margin: {
                                        top: 8
                                    },
                                    center: _ui.Platform.select({
                                        web: undefined,
                                        mobile: true
                                    }),
                                    onClick: function onClick() {
                                        _this2.setState({
                                            detected: false
                                        });
                                    }
                                },
                                _react2.default.createElement(
                                    _ui.Text,
                                    null,
                                    "Ver todas las operadoras"
                                )
                            )
                        );
                    },
                    icons: this.props.icons,
                    api: this.props.api,
                    country: this.props.country,
                    account: this.props.account,
                    type: this.props.type,
                    onSelect: this._handleSelect,
                    onEmpty: function onEmpty() {
                        _this2.setState({
                            detected: false
                        });
                    },
                    onProgress: this.props.onProgress,
                    onError: this.props.onError
                }) : _react2.default.createElement(ListAllProviders, {
                    layout: function layout(_ref3) {
                        var children = _ref3.children;

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
                                _Subtitle2.default,
                                {
                                    active: true,
                                    margin: {
                                        top: 8
                                    }
                                },
                                "Selecciona la operadora"
                            ),
                            _this2.props.provider && _react2.default.createElement(
                                _ui.Error,
                                {
                                    center: true,
                                    margin: {
                                        top: 8,
                                        bottom: 8
                                    }
                                },
                                "Solo cambiar la operadora si est\xE1s seguro que tu contacto la cambi\xF3 en su pa\xEDs."
                            ),
                            children
                        );
                    },
                    icons: this.props.icons,
                    api: this.props.api,
                    country: this.props.country,
                    account: this.props.account,
                    type: this.props.type,
                    onSelect: this._handleSelect,
                    onProgress: this.props.onProgress,
                    onError: this.props.onError
                })
            );
        }
    }]);

    return SetProviderBlock;
}(_react2.default.Component);

SetProviderBlock.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    country: _propTypes2.default.object.isRequired,
    account: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.oneOf(["phone", "email"]),
    provider: _propTypes2.default.object,
    onSet: _propTypes2.default.func.isRequired, // (provider)
    onEdit: _propTypes2.default.func.isRequired, // ()
    onProgress: _propTypes2.default.func.isRequired, // (progress, callback)
    onError: _propTypes2.default.func.isRequired
};

var ListDetectedProviders = function (_React$Component2) {
    _inherits(ListDetectedProviders, _React$Component2);

    function ListDetectedProviders() {
        var _ref4;

        var _temp2, _this3, _ret2;

        _classCallCheck(this, ListDetectedProviders);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref4 = ListDetectedProviders.__proto__ || Object.getPrototypeOf(ListDetectedProviders)).call.apply(_ref4, [this].concat(args))), _this3), _this3.state = {
            providers: null,
            promotions: null
        }, _temp2), _possibleConstructorReturn(_this3, _ret2);
    }

    _createClass(ListDetectedProviders, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this4 = this;

            this.props.onProgress(true, function () {
                _this4.props.api.detectProviders(_this4.props.country.prefix, _this4.props.account, _this4.props.type).then(function (providers) {
                    if (providers.length === 1) {
                        var provider = _extends({}, providers[0], {
                            detected: true
                        });

                        _this4.props.onProgress(false, function () {
                            _this4.props.onSelect(provider);
                        });
                    } else if (providers.length > 1) {
                        _this4.setState({
                            providers: providers
                        }, function () {
                            _this4.props.api.collectPromotions(null, Date.now() / 1000).then(function (promotions) {
                                _this4.setState({
                                    promotions: promotions
                                }, function () {
                                    _this4.props.onProgress(false);
                                });
                            }).catch(_this4.props.onError);
                        });
                    } else {
                        _this4.props.onProgress(false, function () {
                            _this4.props.onEmpty();
                        });
                    }
                }).catch(function (response) {
                    var code = response.code;


                    switch (code) {
                        case "invalid-account-exception":
                            _this4.props.onProgress(false, function () {
                                _this4.props.onEmpty();
                            });

                            break;
                        default:
                            _this4.props.onProgress(false, function () {
                                _this4.props.onError(response);
                            });

                    }
                });
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
            if (this.state.providers === null || this.state.promotions === null) {
                return null;
            }

            return _react2.default.createElement(
                this.props.layout,
                null,
                _react2.default.createElement(Providers, {
                    width: this.props.width,
                    icons: this.props.icons,
                    list: this.state.providers,
                    promotions: this.state.promotions,
                    onSelect: this.props.onSelect
                })
            );
        }
    }]);

    return ListDetectedProviders;
}(_react2.default.Component);

ListDetectedProviders.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    country: _propTypes2.default.object.isRequired,
    account: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.oneOf(["phone", "email"]),
    onSelect: _propTypes2.default.func.isRequired, // (provider)
    onEmpty: _propTypes2.default.func.isRequired, // ()
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var ListAllProviders = function (_React$Component3) {
    _inherits(ListAllProviders, _React$Component3);

    function ListAllProviders() {
        var _ref5;

        var _temp3, _this5, _ret3;

        _classCallCheck(this, ListAllProviders);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return _ret3 = (_temp3 = (_this5 = _possibleConstructorReturn(this, (_ref5 = ListAllProviders.__proto__ || Object.getPrototypeOf(ListAllProviders)).call.apply(_ref5, [this].concat(args))), _this5), _this5.state = {
            providers: null
        }, _temp3), _possibleConstructorReturn(_this5, _ret3);
    }

    _createClass(ListAllProviders, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this6 = this;

            this.props.onProgress(true, function () {
                _this6.props.api.findProviders(_this6.props.country.iso, _this6.props.country.prefix, _this6.props.account, _this6.props.type).then(function (providers) {
                    _this6.setState({
                        providers: providers
                    }, function () {
                        _this6.props.onProgress(false);
                    });
                }).catch(_this6.props.onError);
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
            if (this.state.providers === null) {
                return null;
            }

            if (this.state.providers.length === 0) {
                return _react2.default.createElement(
                    this.props.layout,
                    null,
                    _react2.default.createElement(
                        _ui.Error,
                        null,
                        "No encontramos operadoras. Por favor verifica que el n\xFAmero es correcto."
                    )
                );
            }

            return _react2.default.createElement(
                this.props.layout,
                null,
                _react2.default.createElement(Providers, {
                    width: this.props.width,
                    icons: this.props.icons,
                    list: this.state.providers,
                    onSelect: this.props.onSelect
                })
            );
        }
    }]);

    return ListAllProviders;
}(_react2.default.Component);

ListAllProviders.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    country: _propTypes2.default.object.isRequired,
    account: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.oneOf(["phone", "email"]),
    onSelect: _propTypes2.default.func.isRequired, // (provider)
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var Providers = function (_React$Component4) {
    _inherits(Providers, _React$Component4);

    function Providers() {
        _classCallCheck(this, Providers);

        return _possibleConstructorReturn(this, (Providers.__proto__ || Object.getPrototypeOf(Providers)).apply(this, arguments));
    }

    _createClass(Providers, [{
        key: "render",
        value: function render() {
            var _this8 = this;

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.props.list.map(function (provider) {
                    var id = provider.id,
                        name = provider.name,
                        logo = provider.logo,
                        width = provider.width,
                        height = provider.height;


                    if (logo) {
                        // Trick to put the logo inside a box

                        if (width >= 24) {
                            height = height * 24 / width;
                            width = 24;
                        } else if (height >= 24) {
                            width = width * 24 / height;
                            height = 24;
                        }
                    } else {
                        logo = require("../provider.png");
                        width = 24;
                        height = 24;
                    }

                    var promotions = _this8.props.promotions && _this8.props.promotions.filter(function (promotion) {
                        return promotion.provider === id;
                    }).map(function (_ref6) {
                        var id = _ref6.id,
                            headline = _ref6.headline;

                        return _react2.default.createElement(_Row2.default, {
                            key: id,
                            body: _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "row",
                                    align: {
                                        justifyContent: "flex-start",
                                        alignItems: "center"
                                    },
                                    margin: {
                                        left: 24 + 8,
                                        bottom: 4
                                    }
                                },
                                _react2.default.createElement(_ui.Image, {
                                    source: _gift2.default,
                                    style: {
                                        width: 16,
                                        height: 16
                                    }
                                }),
                                _react2.default.createElement(
                                    _ui.Text,
                                    {
                                        size: _ui.Platform.dimensions.isSmDown(_this8.props.width) ? 12 : null,
                                        margin: {
                                            left: 8
                                        }
                                    },
                                    headline
                                )
                            ),
                            underline: false,
                            margin: {
                                top: 4
                            }
                        });
                    });

                    return _react2.default.createElement(_Row2.default, {
                        key: id,
                        align: {
                            justifyContent: "center",
                            alignItems: "center"
                        },
                        left: _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "column",
                                align: {
                                    justifyContent: "center",
                                    alignItems: "center"
                                },
                                margin: {
                                    bottom: 8
                                }
                            },
                            _this8.props.selected && id === _this8.props.selected.id ? _react2.default.createElement(_this8.props.icons.objects.selected, null) : _react2.default.createElement(_this8.props.icons.objects.unselected, null)
                        ),
                        body: _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "column",
                                align: {
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start"
                                },
                                margin: {
                                    bottom: 8
                                }
                            },
                            _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "row",
                                    align: {
                                        justifyContent: "flex-start",
                                        alignItems: "center"
                                    }
                                },
                                _react2.default.createElement(
                                    _ui.Container,
                                    {
                                        width: 24,
                                        height: 24
                                    },
                                    _react2.default.createElement(_ui.Image, {
                                        source: logo,
                                        width: width,
                                        height: height
                                    })
                                ),
                                _react2.default.createElement(
                                    _ui.Text
                                    // Size is needed as a workaround for small devices, because text won"t wrap
                                    // https://github.com/facebook/react-native/issues/901
                                    // https://github.com/facebook/react-native/issues/5361
                                    // https://react-native.canny.io/feature-requests/p/flexdirection-row-breaks-wrap-and-forces-content-off-screen
                                    ,
                                    { size: _ui.Platform.dimensions.isSmDown(_this8.props.width) ? 12 : null,
                                        margin: {
                                            left: 8
                                        }
                                    },
                                    name
                                )
                            ),
                            promotions
                        ),
                        padding: {
                            top: 8
                        },
                        onClick: function onClick() {
                            _this8.props.onSelect(provider);
                        }
                    });
                })
            );
        }
    }]);

    return Providers;
}(_react2.default.Component);

Providers.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    list: _propTypes2.default.array,
    promotions: _propTypes2.default.array,
    selected: _propTypes2.default.object,
    onSelect: _propTypes2.default.func.isRequired // (provider)
};
exports.default = _ui.Platform.dimensions.withWidth()(SetProviderBlock);