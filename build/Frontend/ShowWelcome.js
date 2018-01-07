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

var _arrow = require("../Common/arrow.png");

var _arrow2 = _interopRequireDefault(_arrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowWelcome = function (_React$Component) {
    _inherits(ShowWelcome, _React$Component);

    function ShowWelcome() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, ShowWelcome);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShowWelcome.__proto__ || Object.getPrototypeOf(ShowWelcome)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            progress: 0,
            countries: null,
            providers: null,
            promotions: null
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["children"]);

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
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

    _createClass(ShowWelcome, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            this._handleProgress(true, function () {
                Promise.all([_this3.props.api.collectCountries(null), _this3.props.api.collectProviders(null, null), _this3.props.api.collectPromotions(null, Date.now() / 1000)]).then(function (values) {
                    _this3.setState({
                        countries: values[0],
                        providers: values[1],
                        promotions: values[2]
                    }, function () {
                        _this3._handleProgress(false);
                    });
                }).catch(_this3.props.onError);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var Layout = this._buildLayout;

            if (this.state.countries === null || this.state.providers === null || this.state.promotions === null) {
                return _react2.default.createElement(Layout, null);
            }

            var countries = this.state.countries.filter(function (_ref3) {
                var favorite = _ref3.favorite;

                return favorite === true;
            }).map(function (country) {
                return _this4._renderCountry(country);
            }).filter(function (x) {
                return x;
            });

            return _react2.default.createElement(
                Layout,
                {
                    style: {
                        backgroundColor: "#fff"
                    }
                },
                _react2.default.createElement(
                    _ui.Container,
                    {
                        center: true,
                        padding: {
                            top: 90,
                            bottom: 30
                        },
                        background: {
                            image: require("../Common/city.jpg"),
                            size: "cover"
                        }
                    },
                    _react2.default.createElement(
                        _ui.Container,
                        null,
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                center: true,
                                margin: {
                                    bottom: 30
                                },
                                style: {
                                    fontSize: _ui.Platform.dimensions.isSmDown(this.props.width) ? "20px" : "50px",
                                    color: "white",
                                    textAlign: "center"
                                }
                            },
                            "Recargas a m\xF3viles de todo el mundo"
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        null,
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    bottom: 30
                                },
                                style: {
                                    color: "white",
                                    fontSize: _ui.Platform.dimensions.isSmDown(this.props.width) ? "14px" : "20px",
                                    textAlign: "center"
                                }
                            },
                            "Enviamos recargas a cualquier tel\xE9fono de manera instant\xE1nea"
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            padding: 24
                        },
                        _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "row wrap",
                                padding: {
                                    top: 16,
                                    right: 8,
                                    bottom: 16,
                                    left: 8
                                },
                                background: "#fff",
                                style: {
                                    opacity: "0.9"
                                }
                            },
                            countries
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            margin: {
                                top: 30
                            }
                        },
                        _react2.default.createElement(
                            _ui.Button,
                            {
                                color: "primary",
                                onClick: this.props.onBegin,
                                style: {
                                    backgroundColor: "#00CC33"
                                }
                            },
                            _react2.default.createElement(
                                _ui.Text,
                                null,
                                "Ver todos los pa\xEDses"
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _ui.Container,
                    null,
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            align: {
                                justifyContent: "center",
                                alignItems: "center"
                            },
                            margin: {
                                top: 32,
                                bottom: 24
                            },
                            padding: {
                                bottom: 24
                            },
                            style: {
                                backgroundImage: "url(" + _arrow2.default + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center bottom"
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                variant: "body2",
                                margin: {
                                    right: 4
                                }
                            },
                            "\xBFCu\xE1les son las ventajas de"
                        ),
                        _react2.default.createElement(_ui.Image, {
                            source: require("../Common/logo_h.png"),
                            width: 100
                        }),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                variant: "body2",
                                margin: {
                                    left: 4
                                }
                            },
                            "?"
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: _ui.Platform.dimensions.isSmDown(this.props.width) ? "column" : "row",
                            align: _ui.Platform.dimensions.isSmDown(this.props.width) ? {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            } : {
                                justifyContent: "center",
                                alignItems: "flex-start"
                            }
                        },
                        _react2.default.createElement(
                            _ui.Container,
                            {
                                width: _ui.Platform.dimensions.isSmDown(this.props.width) ? "100%" : "25%"
                            },
                            _react2.default.createElement(Info, {
                                theme: this.props.theme,
                                icon: this.props.icons.welcome.global,
                                title: "Es global",
                                text: "Puedes enviar recargas a cualquier persona que la necesite, no importa donde se encuentre"
                            })
                        ),
                        _react2.default.createElement(
                            _ui.Container,
                            {
                                width: _ui.Platform.dimensions.isSmDown(this.props.width) ? "100%" : "25%"
                            },
                            _react2.default.createElement(Info, {
                                theme: this.props.theme,
                                icon: this.props.icons.welcome.fast,
                                title: "Es f\xE1cil y r\xE1pido",
                                text: "Con sencillos pasos tus familiares y amigos recibir\xE1n la recarga en su tel\xE9fono al momento"
                            })
                        ),
                        _react2.default.createElement(
                            _ui.Container,
                            {
                                width: _ui.Platform.dimensions.isSmDown(this.props.width) ? "100%" : "25%"
                            },
                            _react2.default.createElement(Info, {
                                theme: this.props.theme,
                                icon: this.props.icons.welcome.cheap,
                                title: "Es econ\xF3mico",
                                text: "Sabemos lo importante que es la comunicaci\xF3n para ti, as\xED que ofrecemos m\xE1s minutos por tu dinero que nadie m\xE1s"
                            })
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            margin: {
                                top: 24,
                                bottom: 24
                            },
                            padding: {
                                bottom: 24
                            },
                            style: {
                                backgroundImage: "url(" + _arrow2.default + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center bottom"
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                variant: "body2"
                            },
                            "Descarga nuestra App!"
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: _ui.Platform.dimensions.isSmDown(this.props.width) ? "column" : "row",
                            align: _ui.Platform.dimensions.isSmDown(this.props.width) ? {
                                justifyContent: "center",
                                alignItems: "center"
                            } : {
                                justifyContent: "center",
                                alignItems: "flex-start"
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
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            margin: {
                                top: 64,
                                bottom: 24
                            },
                            padding: {
                                bottom: 24
                            },
                            style: {
                                backgroundImage: "url(" + _arrow2.default + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center bottom"
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                variant: "body2"
                            },
                            "Nuestra cobertura es mundial"
                        )
                    ),
                    _react2.default.createElement(_ui.Image, {
                        source: require("./coverage.png"),
                        title: "Cobertura",
                        onClick: this.props.onBegin,
                        style: {
                            width: "100%"
                        }
                    }),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            margin: {
                                top: 16
                            },
                            align: {
                                justifyContent: "flex-end"
                            }
                        },
                        _react2.default.createElement(_ui.Image, {
                            source: require("./facebook.png"),
                            title: "S\xEDguenos en Facebook",
                            onClick: this.props.onNavigateToFacebookPage,
                            width: 150
                        }),
                        _react2.default.createElement(
                            _ui.Button,
                            {
                                variant: "text",
                                onClick: this.props.onNavigateToPrivacyPolicy,
                                margin: {
                                    left: 8,
                                    right: 8
                                }
                            },
                            _react2.default.createElement(this.props.icons.objects.page, null),
                            _react2.default.createElement(
                                _ui.Text,
                                null,
                                "Pol\xEDtica de Privacidad"
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "_renderCountry",
        value: function _renderCountry(country) {
            var _this5 = this;

            var iso = country.iso,
                name = country.name;

            // Countries with no flag

            if (iso === 'AN' || iso === 'XK') {
                return null;
            }

            var providers = this.state.providers.filter(function (provider) {
                return provider.country === iso;
            }).map(function (_ref4) {
                var id = _ref4.id;

                return id;
            });

            var promotions = this.state.promotions.filter(function (promotion) {
                return providers.indexOf(promotion.provider) > -1;
            });

            var flag = _react2.default.createElement(_ui.Flag, {
                iso: iso,
                size: "lg"
            });

            if (promotions.length > 0) {
                flag = _react2.default.createElement(
                    _ui.Badge,
                    {
                        content: promotions.length,
                        color: "secondary"
                    },
                    flag
                );
            }

            return _react2.default.createElement(
                _ui.Container,
                {
                    key: iso,
                    flow: "column",
                    align: {
                        alignItems: "center",
                        justifyContent: "flex-start"
                    },
                    margin: {
                        bottom: _ui.Platform.select({
                            web: 16,
                            android: 0,
                            ios: 0
                        })
                    },
                    padding: _ui.Platform.select({
                        web: 16,
                        android: 8,
                        ios: 8
                    }),
                    width: _ui.Platform.select({
                        web: 110,
                        mobile: _ui.Platform.dimensions.isXsDown(this.props.width) ? 90 : 110
                    }),
                    height: _ui.Platform.select({
                        web: 110,
                        mobile: _ui.Platform.dimensions.isXsDown(this.props.width) ? 90 : 110
                    }),
                    onClick: function onClick() {
                        _this5.props.onSelect(country);
                    },
                    style: _ui.Platform.select({
                        web: {
                            textAlign: "center"
                        }
                    })
                },
                flag,
                _react2.default.createElement(
                    _ui.Text,
                    {
                        center: true,
                        margin: {
                            top: 4
                        },
                        style: {
                            fontSize: _ui.Platform.select({
                                web: 14,
                                android: 10,
                                ios: 12
                            }),
                            textAlign: _ui.Platform.select({
                                web: "inherit",
                                android: "center",
                                ios: "center"
                            })
                        }
                    },
                    name
                )
            );
        }
    }]);

    return ShowWelcome;
}(_react2.default.Component);

ShowWelcome.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.shape({
        collectCountries: _propTypes2.default.func.isRequired,
        collectProviders: _propTypes2.default.func.isRequired,
        collectPromotions: _propTypes2.default.func.isRequired
    }),
    onSelect: _propTypes2.default.func.isRequired, // (country)
    onBegin: _propTypes2.default.func.isRequired, // ()
    onNavigateToAboutUs: _propTypes2.default.func.isRequired, // ()
    onNavigateToTermsAndConditions: _propTypes2.default.func.isRequired, // ()
    onNavigateToPrivacyPolicy: _propTypes2.default.func.isRequired, // ()
    onNavigateToAndroidApp: _propTypes2.default.func.isRequired, // ()
    onNavigateToIosApp: _propTypes2.default.func.isRequired, // ()
    onNavigateToFacebookPage: _propTypes2.default.func.isRequired, // ()
    onError: _propTypes2.default.func.isRequired
};

var Info = function (_React$Component2) {
    _inherits(Info, _React$Component2);

    function Info() {
        _classCallCheck(this, Info);

        return _possibleConstructorReturn(this, (Info.__proto__ || Object.getPrototypeOf(Info)).apply(this, arguments));
    }

    _createClass(Info, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                icon = _props.icon,
                title = _props.title,
                text = _props.text,
                props = _objectWithoutProperties(_props, ["icon", "title", "text"]);

            var Icon = icon;

            return _react2.default.createElement(
                _ui.Container,
                _extends({
                    flow: "row",
                    align: {
                        alignItems: "flex-start"
                    },
                    margin: {
                        bottom: 24
                    }
                }, props),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "column",
                        align: {
                            justifyContent: "flex-start",
                            alignItems: "flex-end"
                        },
                        width: 72,
                        height: 72
                    },
                    _react2.default.createElement(Icon, {
                        style: {
                            fontSize: 60,
                            color: "#1A7BBD"
                        }
                    })
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        align: {
                            alignItems: "flex-start"
                        },
                        margin: {
                            left: 8
                        }
                    },
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "body2",
                            margin: {
                                bottom: 1
                            }
                        },
                        title
                    ),
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        text
                    )
                )
            );
        }
    }]);

    return Info;
}(_react2.default.Component);

Info.propTypes = {
    theme: _propTypes2.default.object.isRequired,
    icon: _propTypes2.default.func.isRequired,
    title: _propTypes2.default.string.isRequired,
    text: _propTypes2.default.string.isRequired
};
exports.default = _ui.Platform.dimensions.withWidth()(_ui.Theme.withTheme()(ShowWelcome));