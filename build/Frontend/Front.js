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

var _resolution = require("@yosmy/resolution");

var _ListCountries = require("./ListCountries");

var _ListCountries2 = _interopRequireDefault(_ListCountries);

var _SendTopupToUnknown = require("./SendTopupToUnknown");

var _SendTopupToUnknown2 = _interopRequireDefault(_SendTopupToUnknown);

var _SendTopupToContact = require("./SendTopupToContact");

var _SendTopupToContact2 = _interopRequireDefault(_SendTopupToContact);

var _ListContacts = require("./ListContacts");

var _ListContacts2 = _interopRequireDefault(_ListContacts);

var _ViewContact = require("./ViewContact");

var _ViewContact2 = _interopRequireDefault(_ViewContact);

var _ManageOptions = require("./ManageOptions");

var _ManageOptions2 = _interopRequireDefault(_ManageOptions);

var _ShowWelcome = require("./ShowWelcome");

var _ShowWelcome2 = _interopRequireDefault(_ShowWelcome);

var _ViewPrivacyPolicy = require("./ViewPrivacyPolicy");

var _ViewPrivacyPolicy2 = _interopRequireDefault(_ViewPrivacyPolicy);

var _ViewHelp = require("./ViewHelp");

var _ViewHelp2 = _interopRequireDefault(_ViewHelp);

var _ShowLogin = require("../Common/ShowLogin");

var _ShowLogin2 = _interopRequireDefault(_ShowLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Front = function (_React$Component) {
    _inherits(Front, _React$Component);

    function Front() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, Front);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Front.__proto__ || Object.getPrototypeOf(Front)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            notification: null
        }, _this._buildFrontendLayout = function (_ref2) {
            var menu = _ref2.menu,
                children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["menu", "children"]);

            return _react2.default.createElement(
                _this2.props.frontendLayout,
                _extends({
                    menu: _extends({
                        logo: require("../Common/logo_h.png"),
                        items: [{
                            key: "topup",
                            icon: _react2.default.createElement(_this2.props.icons.menu.home, null),
                            text: "Inicio",
                            onClick: function onClick() {
                                _this.props.navigation.onNavigate("/listar-paises");
                            }
                        }, {
                            key: "contacts",
                            icon: _react2.default.createElement(_this2.props.icons.menu.contacts, null),
                            text: "Contactos",
                            onClick: function onClick() {
                                _this.props.navigation.onNavigate("/contactos");
                            }
                        }, {
                            key: "options",
                            icon: _react2.default.createElement(_this2.props.icons.menu.options, null),
                            text: "Opciones",
                            onClick: function onClick() {
                                _this.props.navigation.onNavigate("/opciones");
                            }
                        }, _ui.Platform.select({
                            web: _this.props.user && _this.props.user.roles && _this.props.user.roles.indexOf("admin") > -1 && {
                                key: "admin",
                                icon: _react2.default.createElement(_this2.props.icons.menu.admin, null),
                                text: "Admin",
                                onClick: function onClick() {
                                    _this.props.navigation.onNavigate("/admin");
                                }
                            }
                        })]
                    }, menu),
                    notification: {
                        message: _this.state.notification,
                        onClose: function onClose(callback) {
                            _this.setState({
                                notification: null
                            }, callback);
                        }
                    },
                    onNavigateToWelcome: function onNavigateToWelcome() {
                        _this.props.navigation.onNavigate("/bienvenida");
                    }
                }, props),
                children
            );
        }, _this._handleNotify = function (notification) {
            _this.setState({
                notification: notification
            });
        }, _this._buildListCountriesLayout = function (_ref3) {
            var children = _ref3.children,
                props = _objectWithoutProperties(_ref3, ["children"]);

            var FrontendLayout = _this._buildFrontendLayout;

            return _react2.default.createElement(
                FrontendLayout,
                _extends({}, props, {
                    menu: {
                        active: "topup"
                    }
                }),
                children
            );
        }, _this._buildSendTopupToUnknownLayout = function (_ref4) {
            var children = _ref4.children,
                props = _objectWithoutProperties(_ref4, ["children"]);

            var FrontendLayout = _this._buildFrontendLayout;

            return _react2.default.createElement(
                FrontendLayout,
                _extends({}, props, {
                    menu: {
                        hidden: true
                    }
                }),
                children
            );
        }, _this._buildSendTopupToContactLayout = function (_ref5) {
            var children = _ref5.children,
                props = _objectWithoutProperties(_ref5, ["children"]);

            var FrontendLayout = _this._buildFrontendLayout;

            return _react2.default.createElement(
                FrontendLayout,
                _extends({}, props, {
                    menu: {
                        hidden: true
                    }
                }),
                children
            );
        }, _this._buildListContactsLayout = function (_ref6) {
            var children = _ref6.children,
                props = _objectWithoutProperties(_ref6, ["children"]);

            var FrontendLayout = _this._buildFrontendLayout;

            return _react2.default.createElement(
                FrontendLayout,
                _extends({}, props, {
                    menu: _extends({}, props.menu, {
                        active: "contacts"
                    })
                }),
                children
            );
        }, _this._buildViewContactLayout = function (_ref7) {
            var children = _ref7.children,
                props = _objectWithoutProperties(_ref7, ["children"]);

            var FrontendLayout = _this._buildFrontendLayout;

            return _react2.default.createElement(
                FrontendLayout,
                _extends({}, props, {
                    menu: {
                        hidden: true
                    }
                }),
                children
            );
        }, _this._buildManageOptionsLayout = function (_ref8) {
            var children = _ref8.children,
                props = _objectWithoutProperties(_ref8, ["children"]);

            var FrontendLayout = _this._buildFrontendLayout;

            return _react2.default.createElement(
                FrontendLayout,
                _extends({}, props, {
                    menu: _extends({}, props.menu, {
                        active: "options"
                    })
                }),
                children
            );
        }, _this._handleNavigateToApp = function (navigation, platform) {
            switch (platform) {
                case "android":
                    navigation.onNavigate("https://play.google.com/store/apps/details?id=com.intermaple.mundorecarga");

                    break;
                case "ios":
                    navigation.onNavigate("https://itunes.apple.com/es/app/mundorecarga/id1437067665?mt=8");

                    break;
                default:
                    throw platform;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Front, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return this.props.user !== nextProps.user || this.props.navigation.location !== nextProps.navigation.location || this.state !== nextState;
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                icons = _props.icons,
                navigation = _props.navigation,
                user = _props.user,
                props = _objectWithoutProperties(_props, ["icons", "navigation", "user"]);

            var FrontendLayout = this._buildFrontendLayout;

            if ((navigation.location === "/contactos" || navigation.location === "/contacto" || navigation.location === "/enviar-recarga-a-contacto") && user.token === null) {
                return _react2.default.createElement(_ShowLogin2.default, {
                    layout: FrontendLayout,
                    icons: this.props.icons,
                    api: {
                        startAuthentication: function startAuthentication() {
                            var _props$api$calls$user;

                            for (var _len2 = arguments.length, props = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                props[_key2] = arguments[_key2];
                            }

                            return (_props$api$calls$user = _this3.props.api.calls.userland).startAuthentication.apply(_props$api$calls$user, [_this3.props.api.base].concat(props));
                        },
                        completeAuthentication: function completeAuthentication() {
                            var _props$api$calls$user2;

                            for (var _len3 = arguments.length, props = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                                props[_key3] = arguments[_key3];
                            }

                            return (_props$api$calls$user2 = _this3.props.api.calls.userland).completeAuthentication.apply(_props$api$calls$user2, [_this3.props.api.base].concat(props));
                        }
                    },
                    user: this.props.user,
                    onAuthenticated: this.props.onAuthenticated,
                    onError: this.props.onError
                });
            }

            try {
                return (0, _resolution.resolve)(navigation.location, [{
                    location: _ui.Platform.select({
                        android: /^\/bienvenida/,
                        ios: /^\/bienvenida/,
                        web: ["/", // exact match
                        /^\/bienvenida/]
                    }),
                    element: function element() {
                        return _react2.default.createElement(_ShowWelcome2.default, {
                            icons: icons,
                            layout: FrontendLayout,
                            api: {
                                collectCountries: function collectCountries() {
                                    var _props$api$calls;

                                    for (var _len4 = arguments.length, props = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                                        props[_key4] = arguments[_key4];
                                    }

                                    return (_props$api$calls = _this3.props.api.calls).collectCountries.apply(_props$api$calls, [_this3.props.api.base].concat(props));
                                },
                                collectProviders: function collectProviders() {
                                    var _props$api$calls2;

                                    for (var _len5 = arguments.length, props = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                                        props[_key5] = arguments[_key5];
                                    }

                                    return (_props$api$calls2 = _this3.props.api.calls).collectProviders.apply(_props$api$calls2, [_this3.props.api.base].concat(props));
                                },
                                collectPromotions: function collectPromotions() {
                                    var _props$api$calls3;

                                    for (var _len6 = arguments.length, props = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                                        props[_key6] = arguments[_key6];
                                    }

                                    return (_props$api$calls3 = _this3.props.api.calls).collectPromotions.apply(_props$api$calls3, [_this3.props.api.base].concat(props));
                                }
                            },
                            onSelect: function onSelect(_ref9) {
                                var slug = _ref9.slug;

                                navigation.onNavigate("/" + slug);
                            },
                            onBegin: function onBegin() {
                                navigation.onNavigate("/listar-paises");
                            },
                            onNavigateToAboutUs: function onNavigateToAboutUs() {
                                navigation.onNavigate("/acerca-de-nosotros");
                            },
                            onNavigateToTermsAndConditions: function onNavigateToTermsAndConditions() {
                                navigation.onNavigate("/terminos-y-condiciones");
                            },
                            onNavigateToPrivacyPolicy: function onNavigateToPrivacyPolicy() {
                                navigation.onNavigate("/politica-de-privacidad");
                            },
                            onNavigateToAndroidApp: function onNavigateToAndroidApp() {
                                _this3._handleNavigateToApp(navigation, "android");
                            },
                            onNavigateToIosApp: function onNavigateToIosApp() {
                                _this3._handleNavigateToApp(navigation, "ios");
                            },
                            onNavigateToFacebookPage: function onNavigateToFacebookPage() {
                                navigation.onNavigate("https://facebook.com/mundorecargacom");
                            },
                            onError: _this3.props.onError
                        });
                    }
                }, {
                    location: _ui.Platform.select({
                        android: ["/", // exact match
                        /^\/listar-paises/],
                        ios: ["/", // exact match
                        /^\/listar-paises/],
                        web: /^\/listar-paises/
                    }),
                    element: function element() {
                        return _react2.default.createElement(_ListCountries2.default, {
                            layout: _this3._buildListCountriesLayout,
                            api: {
                                collectCountries: function collectCountries() {
                                    var _props$api$calls4;

                                    for (var _len7 = arguments.length, props = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                                        props[_key7] = arguments[_key7];
                                    }

                                    return (_props$api$calls4 = _this3.props.api.calls).collectCountries.apply(_props$api$calls4, [_this3.props.api.base].concat(props));
                                }
                            },
                            onSelect: function onSelect(_ref10) {
                                var slug = _ref10.slug;

                                navigation.onNavigate("/" + slug);
                            },
                            onError: _this3.props.onError
                        });
                    }
                }, {
                    location: /^\/enviar-recarga-a-nueva-persona/,
                    element: function element() {
                        var country = navigation.location.split("/")[1];

                        return _react2.default.createElement(_SendTopupToUnknown2.default, {
                            icons: icons,
                            layout: _this3._buildSendTopupToUnknownLayout,
                            api: {
                                pickCountry: function pickCountry() {
                                    var _props$api$calls5;

                                    for (var _len8 = arguments.length, props = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                                        props[_key8] = arguments[_key8];
                                    }

                                    return (_props$api$calls5 = _this3.props.api.calls).pickCountry.apply(_props$api$calls5, [_this3.props.api.base].concat(props));
                                },
                                collectCountries: function collectCountries() {
                                    var _props$api$calls6;

                                    for (var _len9 = arguments.length, props = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                                        props[_key9] = arguments[_key9];
                                    }

                                    return (_props$api$calls6 = _this3.props.api.calls).collectCountries.apply(_props$api$calls6, [_this3.props.api.base].concat(props));
                                },
                                validateAccount: function validateAccount() {
                                    var _props$api$calls7;

                                    for (var _len10 = arguments.length, props = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                                        props[_key10] = arguments[_key10];
                                    }

                                    return (_props$api$calls7 = _this3.props.api.calls).validateAccount.apply(_props$api$calls7, [_this3.props.api.base].concat(props));
                                },
                                country: {
                                    pickPhoto: function pickPhoto() {
                                        var _props$api$calls$coun;

                                        for (var _len11 = arguments.length, props = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                                            props[_key11] = arguments[_key11];
                                        }

                                        return (_props$api$calls$coun = _this3.props.api.calls.country).pickPhoto.apply(_props$api$calls$coun, [_this3.props.api.base].concat(props));
                                    }
                                },
                                collectProviders: function collectProviders() {
                                    var _props$api$calls8;

                                    for (var _len12 = arguments.length, props = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                                        props[_key12] = arguments[_key12];
                                    }

                                    return (_props$api$calls8 = _this3.props.api.calls).collectProviders.apply(_props$api$calls8, [_this3.props.api.base].concat(props));
                                },
                                findProviders: function findProviders() {
                                    var _props$api$calls9;

                                    for (var _len13 = arguments.length, props = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
                                        props[_key13] = arguments[_key13];
                                    }

                                    return (_props$api$calls9 = _this3.props.api.calls).findProviders.apply(_props$api$calls9, [_this3.props.api.base].concat(props));
                                },
                                detectProviders: function detectProviders() {
                                    var _props$api$calls10;

                                    for (var _len14 = arguments.length, props = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
                                        props[_key14] = arguments[_key14];
                                    }

                                    return (_props$api$calls10 = _this3.props.api.calls).detectProviders.apply(_props$api$calls10, [_this3.props.api.base].concat(props));
                                },
                                testTopup: function testTopup() {
                                    var _props$api$calls11;

                                    for (var _len15 = arguments.length, props = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
                                        props[_key15] = arguments[_key15];
                                    }

                                    return (_props$api$calls11 = _this3.props.api.calls).testTopup.apply(_props$api$calls11, [_this3.props.api.base].concat(props));
                                },
                                collectPromotions: function collectPromotions() {
                                    var _props$api$calls12;

                                    for (var _len16 = arguments.length, props = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
                                        props[_key16] = arguments[_key16];
                                    }

                                    return (_props$api$calls12 = _this3.props.api.calls).collectPromotions.apply(_props$api$calls12, [_this3.props.api.base].concat(props));
                                },
                                resolvePromotions: function resolvePromotions() {
                                    var _props$api$calls13;

                                    for (var _len17 = arguments.length, props = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
                                        props[_key17] = arguments[_key17];
                                    }

                                    return (_props$api$calls13 = _this3.props.api.calls).resolvePromotions.apply(_props$api$calls13, [_this3.props.api.base].concat(props));
                                },
                                resolveProducts: function resolveProducts() {
                                    var _props$api$calls14;

                                    for (var _len18 = arguments.length, props = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
                                        props[_key18] = arguments[_key18];
                                    }

                                    return (_props$api$calls14 = _this3.props.api.calls).resolveProducts.apply(_props$api$calls14, [_this3.props.api.base].concat(props));
                                },
                                userland: {
                                    startAuthentication: function startAuthentication() {
                                        var _props$api$calls$user3;

                                        for (var _len19 = arguments.length, props = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
                                            props[_key19] = arguments[_key19];
                                        }

                                        return (_props$api$calls$user3 = _this3.props.api.calls.userland).startAuthentication.apply(_props$api$calls$user3, [_this3.props.api.base].concat(props));
                                    },
                                    completeAuthentication: function completeAuthentication() {
                                        var _props$api$calls$user4;

                                        for (var _len20 = arguments.length, props = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
                                            props[_key20] = arguments[_key20];
                                        }

                                        return (_props$api$calls$user4 = _this3.props.api.calls.userland).completeAuthentication.apply(_props$api$calls$user4, [_this3.props.api.base].concat(props));
                                    },
                                    stripe: {
                                        setupCard: function setupCard() {
                                            var _props$api$calls$user5;

                                            for (var _len21 = arguments.length, props = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
                                                props[_key21] = arguments[_key21];
                                            }

                                            return (_props$api$calls$user5 = _this3.props.api.calls.userland.stripe).setupCard.apply(_props$api$calls$user5, [_this3.props.api.base, user.token].concat(props));
                                        },
                                        collectCardsAsClient: function collectCardsAsClient() {
                                            var _props$api$calls$user6;

                                            for (var _len22 = arguments.length, props = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
                                                props[_key22] = arguments[_key22];
                                            }

                                            return (_props$api$calls$user6 = _this3.props.api.calls.userland.stripe).collectCardsAsClient.apply(_props$api$calls$user6, [_this3.props.api.base, user.token].concat(props));
                                        },
                                        deleteCard: function deleteCard() {
                                            var _props$api$calls$user7;

                                            for (var _len23 = arguments.length, props = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
                                                props[_key23] = arguments[_key23];
                                            }

                                            return (_props$api$calls$user7 = _this3.props.api.calls.userland.stripe).deleteCard.apply(_props$api$calls$user7, [_this3.props.api.base, user.token].concat(props));
                                        }
                                    }
                                },
                                sendTopup: function sendTopup() {
                                    var _props$api$calls15;

                                    for (var _len24 = arguments.length, props = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
                                        props[_key24] = arguments[_key24];
                                    }

                                    return (_props$api$calls15 = _this3.props.api.calls).sendTopup.apply(_props$api$calls15, [_this3.props.api.base, user.token].concat(props));
                                }
                            },
                            user: user,
                            country: country,
                            onAuthenticated: props.onAuthenticated,
                            onFinish: function onFinish(id) {
                                navigation.onNavigate("/contacto", { id: id });
                            },
                            onBack: function onBack() {
                                navigation.onNavigate("/listar-paises");
                            },
                            onNonexistentCountry: function onNonexistentCountry() {
                                _this3.props.navigation.onNavigate("/bienvenida");
                            },
                            onNavigateToAndroidApp: function onNavigateToAndroidApp() {
                                _this3._handleNavigateToApp(navigation, "android");
                            },
                            onNavigateToIosApp: function onNavigateToIosApp() {
                                _this3._handleNavigateToApp(navigation, "ios");
                            },
                            onError: _this3.props.onError
                        });
                    },
                    default: true
                }, {
                    location: /^\/enviar-recarga-a-contacto/,
                    element: function element() {
                        return _react2.default.createElement(_SendTopupToContact2.default, {
                            icons: icons,
                            layout: _this3._buildSendTopupToContactLayout,
                            api: {
                                pickContactAsClient: function pickContactAsClient() {
                                    var _props$api$calls16;

                                    for (var _len25 = arguments.length, props = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
                                        props[_key25] = arguments[_key25];
                                    }

                                    return (_props$api$calls16 = _this3.props.api.calls).pickContactAsClient.apply(_props$api$calls16, [_this3.props.api.base, user.token].concat(props));
                                },
                                pickCountry: function pickCountry() {
                                    var _props$api$calls17;

                                    for (var _len26 = arguments.length, props = Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
                                        props[_key26] = arguments[_key26];
                                    }

                                    return (_props$api$calls17 = _this3.props.api.calls).pickCountry.apply(_props$api$calls17, [_this3.props.api.base].concat(props));
                                },
                                country: {
                                    pickPhoto: function pickPhoto() {
                                        var _props$api$calls$coun2;

                                        for (var _len27 = arguments.length, props = Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
                                            props[_key27] = arguments[_key27];
                                        }

                                        return (_props$api$calls$coun2 = _this3.props.api.calls.country).pickPhoto.apply(_props$api$calls$coun2, [_this3.props.api.base].concat(props));
                                    }
                                },
                                pickProvider: function pickProvider() {
                                    var _props$api$calls18;

                                    for (var _len28 = arguments.length, props = Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
                                        props[_key28] = arguments[_key28];
                                    }

                                    return (_props$api$calls18 = _this3.props.api.calls).pickProvider.apply(_props$api$calls18, [_this3.props.api.base].concat(props));
                                },
                                testTopup: function testTopup() {
                                    var _props$api$calls19;

                                    for (var _len29 = arguments.length, props = Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
                                        props[_key29] = arguments[_key29];
                                    }

                                    return (_props$api$calls19 = _this3.props.api.calls).testTopup.apply(_props$api$calls19, [_this3.props.api.base].concat(props));
                                },
                                sendTopup: function sendTopup() {
                                    var _props$api$calls20;

                                    for (var _len30 = arguments.length, props = Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
                                        props[_key30] = arguments[_key30];
                                    }

                                    return (_props$api$calls20 = _this3.props.api.calls).sendTopup.apply(_props$api$calls20, [_this3.props.api.base, user.token].concat(props));
                                },
                                collectProviders: function collectProviders() {
                                    var _props$api$calls21;

                                    for (var _len31 = arguments.length, props = Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
                                        props[_key31] = arguments[_key31];
                                    }

                                    return (_props$api$calls21 = _this3.props.api.calls).collectProviders.apply(_props$api$calls21, [_this3.props.api.base].concat(props));
                                },
                                detectProviders: function detectProviders() {
                                    var _props$api$calls22;

                                    for (var _len32 = arguments.length, props = Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
                                        props[_key32] = arguments[_key32];
                                    }

                                    return (_props$api$calls22 = _this3.props.api.calls).detectProviders.apply(_props$api$calls22, [_this3.props.api.base].concat(props));
                                },
                                findProviders: function findProviders() {
                                    var _props$api$calls23;

                                    for (var _len33 = arguments.length, props = Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
                                        props[_key33] = arguments[_key33];
                                    }

                                    return (_props$api$calls23 = _this3.props.api.calls).findProviders.apply(_props$api$calls23, [_this3.props.api.base].concat(props));
                                },
                                collectPromotions: function collectPromotions() {
                                    var _props$api$calls24;

                                    for (var _len34 = arguments.length, props = Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
                                        props[_key34] = arguments[_key34];
                                    }

                                    return (_props$api$calls24 = _this3.props.api.calls).collectPromotions.apply(_props$api$calls24, [_this3.props.api.base].concat(props));
                                },
                                resolvePromotions: function resolvePromotions() {
                                    var _props$api$calls25;

                                    for (var _len35 = arguments.length, props = Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
                                        props[_key35] = arguments[_key35];
                                    }

                                    return (_props$api$calls25 = _this3.props.api.calls).resolvePromotions.apply(_props$api$calls25, [_this3.props.api.base].concat(props));
                                },
                                resolveProducts: function resolveProducts() {
                                    var _props$api$calls26;

                                    for (var _len36 = arguments.length, props = Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
                                        props[_key36] = arguments[_key36];
                                    }

                                    return (_props$api$calls26 = _this3.props.api.calls).resolveProducts.apply(_props$api$calls26, [_this3.props.api.base].concat(props));
                                },
                                userland: {
                                    stripe: {
                                        setupCard: function setupCard() {
                                            var _props$api$calls$user8;

                                            for (var _len37 = arguments.length, props = Array(_len37), _key37 = 0; _key37 < _len37; _key37++) {
                                                props[_key37] = arguments[_key37];
                                            }

                                            return (_props$api$calls$user8 = _this3.props.api.calls.userland.stripe).setupCard.apply(_props$api$calls$user8, [_this3.props.api.base, user.token].concat(props));
                                        },
                                        collectCardsAsClient: function collectCardsAsClient() {
                                            var _props$api$calls$user9;

                                            for (var _len38 = arguments.length, props = Array(_len38), _key38 = 0; _key38 < _len38; _key38++) {
                                                props[_key38] = arguments[_key38];
                                            }

                                            return (_props$api$calls$user9 = _this3.props.api.calls.userland.stripe).collectCardsAsClient.apply(_props$api$calls$user9, [_this3.props.api.base, user.token].concat(props));
                                        },
                                        deleteCard: function deleteCard() {
                                            var _props$api$calls$user10;

                                            for (var _len39 = arguments.length, props = Array(_len39), _key39 = 0; _key39 < _len39; _key39++) {
                                                props[_key39] = arguments[_key39];
                                            }

                                            return (_props$api$calls$user10 = _this3.props.api.calls.userland.stripe).deleteCard.apply(_props$api$calls$user10, [_this3.props.api.base, user.token].concat(props));
                                        }
                                    }
                                }
                            },
                            user: user,
                            id: navigation.payload.id,
                            onFinish: function onFinish(id) {
                                navigation.onNavigate("/contacto", { id: id });
                            },
                            onBack: function onBack(id) {
                                navigation.onNavigate("/contacto", { id: id });
                            },
                            onNavigateToAndroidApp: function onNavigateToAndroidApp() {
                                _this3._handleNavigateToApp(navigation, "android");
                            },
                            onNavigateToIosApp: function onNavigateToIosApp() {
                                _this3._handleNavigateToApp(navigation, "ios");
                            },
                            onError: _this3.props.onError
                        });
                    },
                    enabled: navigation.payload !== null && typeof navigation.payload.id !== 'undefined'
                }, {
                    location: /^\/contactos/,
                    element: function element() {
                        return _react2.default.createElement(_ListContacts2.default, {
                            icons: icons,
                            layout: _this3._buildListContactsLayout,
                            api: {
                                collectContactsAsClient: function collectContactsAsClient() {
                                    var _props$api$calls27;

                                    for (var _len40 = arguments.length, props = Array(_len40), _key40 = 0; _key40 < _len40; _key40++) {
                                        props[_key40] = arguments[_key40];
                                    }

                                    return (_props$api$calls27 = _this3.props.api.calls).collectContactsAsClient.apply(_props$api$calls27, [_this3.props.api.base, user.token].concat(props));
                                },
                                collectTopupsAsClient: function collectTopupsAsClient() {
                                    var _props$api$calls28;

                                    for (var _len41 = arguments.length, props = Array(_len41), _key41 = 0; _key41 < _len41; _key41++) {
                                        props[_key41] = arguments[_key41];
                                    }

                                    return (_props$api$calls28 = _this3.props.api.calls).collectTopupsAsClient.apply(_props$api$calls28, [_this3.props.api.base, user.token].concat(props));
                                }
                            },
                            onReTopup: function onReTopup(_ref11) {
                                var contact = _ref11.contact;

                                navigation.onNavigate("/enviar-recarga-a-contacto", { id: contact });
                            },
                            onNewTopup: function onNewTopup() {
                                navigation.onNavigate("/listar-paises");
                            },
                            onSelect: function onSelect(_ref12) {
                                var id = _ref12.id;

                                navigation.onNavigate("/contacto", { id: id });
                            },
                            onBack: function onBack() {
                                navigation.onNavigate("/listar-paises");
                            },
                            onError: _this3.props.onError
                        });
                    },
                    default: user.from !== "topup"
                }, {
                    location: /^\/contacto/,
                    element: function element() {
                        return _react2.default.createElement(_ViewContact2.default, {
                            icons: icons,
                            layout: _this3._buildViewContactLayout,
                            api: {
                                pickContactAsClient: function pickContactAsClient() {
                                    var _props$api$calls29;

                                    for (var _len42 = arguments.length, props = Array(_len42), _key42 = 0; _key42 < _len42; _key42++) {
                                        props[_key42] = arguments[_key42];
                                    }

                                    return (_props$api$calls29 = _this3.props.api.calls).pickContactAsClient.apply(_props$api$calls29, [_this3.props.api.base, user.token].concat(props));
                                },
                                collectTopupsAsClient: function collectTopupsAsClient() {
                                    var _props$api$calls30;

                                    for (var _len43 = arguments.length, props = Array(_len43), _key43 = 0; _key43 < _len43; _key43++) {
                                        props[_key43] = arguments[_key43];
                                    }

                                    return (_props$api$calls30 = _this3.props.api.calls).collectTopupsAsClient.apply(_props$api$calls30, [_this3.props.api.base, user.token].concat(props));
                                },
                                updateContact: function updateContact() {
                                    var _props$api$calls31;

                                    for (var _len44 = arguments.length, props = Array(_len44), _key44 = 0; _key44 < _len44; _key44++) {
                                        props[_key44] = arguments[_key44];
                                    }

                                    return (_props$api$calls31 = _this3.props.api.calls).updateContact.apply(_props$api$calls31, [_this3.props.api.base, user.token].concat(props));
                                }
                            },
                            id: navigation.payload.id,
                            onTopup: function onTopup(_ref13) {
                                var id = _ref13.id;

                                navigation.onNavigate("/enviar-recarga-a-contacto", { id: id });
                            },
                            onUpdate: function onUpdate() {
                                // this._handleNotify("El contacto se ha actualizado");
                            },
                            onBack: function onBack() {
                                navigation.onNavigate("/contactos");
                            },
                            onError: _this3.props.onError
                        });
                    },
                    enabled: navigation.payload !== null && typeof navigation.payload.id !== 'undefined'
                }, {
                    location: /^\/opciones/,
                    element: function element() {
                        return _react2.default.createElement(_ManageOptions2.default, {
                            icons: icons,
                            layout: _this3._buildManageOptionsLayout,
                            api: {
                                pickMetadata: function pickMetadata() {
                                    var _props$api$calls32;

                                    for (var _len45 = arguments.length, props = Array(_len45), _key45 = 0; _key45 < _len45; _key45++) {
                                        props[_key45] = arguments[_key45];
                                    }

                                    return (_props$api$calls32 = _this3.props.api.calls).pickMetadata.apply(_props$api$calls32, [_this3.props.api.base].concat(props));
                                },
                                userland: {
                                    startAuthentication: function startAuthentication() {
                                        var _props$api$calls$user11;

                                        for (var _len46 = arguments.length, props = Array(_len46), _key46 = 0; _key46 < _len46; _key46++) {
                                            props[_key46] = arguments[_key46];
                                        }

                                        return (_props$api$calls$user11 = _this3.props.api.calls.userland).startAuthentication.apply(_props$api$calls$user11, [_this3.props.api.base].concat(props));
                                    },
                                    completeAuthentication: function completeAuthentication() {
                                        var _props$api$calls$user12;

                                        for (var _len47 = arguments.length, props = Array(_len47), _key47 = 0; _key47 < _len47; _key47++) {
                                            props[_key47] = arguments[_key47];
                                        }

                                        return (_props$api$calls$user12 = _this3.props.api.calls.userland).completeAuthentication.apply(_props$api$calls$user12, [_this3.props.api.base].concat(props));
                                    },
                                    phone: {
                                        pickUserAsClient: function pickUserAsClient() {
                                            var _props$api$calls$user13;

                                            for (var _len48 = arguments.length, props = Array(_len48), _key48 = 0; _key48 < _len48; _key48++) {
                                                props[_key48] = arguments[_key48];
                                            }

                                            return (_props$api$calls$user13 = _this3.props.api.calls.userland.phone).pickUserAsClient.apply(_props$api$calls$user13, [_this3.props.api.base, user.token].concat(props));
                                        }
                                    },
                                    referral: {
                                        user: {
                                            addReferral: function addReferral() {
                                                var _props$api$calls$user14;

                                                for (var _len49 = arguments.length, props = Array(_len49), _key49 = 0; _key49 < _len49; _key49++) {
                                                    props[_key49] = arguments[_key49];
                                                }

                                                return (_props$api$calls$user14 = _this3.props.api.calls.userland.referral.user).addReferral.apply(_props$api$calls$user14, [_this3.props.api.base, user.token].concat(props));
                                            }
                                        },
                                        addUser: function addUser() {
                                            var _props$api$calls$user15;

                                            for (var _len50 = arguments.length, props = Array(_len50), _key50 = 0; _key50 < _len50; _key50++) {
                                                props[_key50] = arguments[_key50];
                                            }

                                            return (_props$api$calls$user15 = _this3.props.api.calls.userland.referral).addUser.apply(_props$api$calls$user15, [_this3.props.api.base, user.token].concat(props));
                                        },
                                        pickUser: function pickUser() {
                                            var _props$api$calls$user16;

                                            for (var _len51 = arguments.length, props = Array(_len51), _key51 = 0; _key51 < _len51; _key51++) {
                                                props[_key51] = arguments[_key51];
                                            }

                                            return (_props$api$calls$user16 = _this3.props.api.calls.userland.referral).pickUser.apply(_props$api$calls$user16, [_this3.props.api.base, user.token].concat(props));
                                        },
                                        countUsers: function countUsers() {
                                            var _props$api$calls$user17;

                                            for (var _len52 = arguments.length, props = Array(_len52), _key52 = 0; _key52 < _len52; _key52++) {
                                                props[_key52] = arguments[_key52];
                                            }

                                            return (_props$api$calls$user17 = _this3.props.api.calls.userland.referral).countUsers.apply(_props$api$calls$user17, [_this3.props.api.base, user.token].concat(props));
                                        },
                                        computeReferrals: function computeReferrals() {
                                            var _props$api$calls$user18;

                                            for (var _len53 = arguments.length, props = Array(_len53), _key53 = 0; _key53 < _len53; _key53++) {
                                                props[_key53] = arguments[_key53];
                                            }

                                            return (_props$api$calls$user18 = _this3.props.api.calls.userland.referral).computeReferrals.apply(_props$api$calls$user18, [_this3.props.api.base, user.token].concat(props));
                                        },
                                        computeTopups: function computeTopups() {
                                            var _props$api$calls$user19;

                                            for (var _len54 = arguments.length, props = Array(_len54), _key54 = 0; _key54 < _len54; _key54++) {
                                                props[_key54] = arguments[_key54];
                                            }

                                            return (_props$api$calls$user19 = _this3.props.api.calls.userland.referral).computeTopups.apply(_props$api$calls$user19, [_this3.props.api.base, user.token].concat(props));
                                        }
                                    }
                                }
                            },
                            user: user,
                            onAuthenticated: props.onAuthenticated,
                            onNavigateToHelp: function onNavigateToHelp() {
                                navigation.onNavigate("/ayuda");
                            },
                            onNavigateToPrivacyPolicy: function onNavigateToPrivacyPolicy() {
                                navigation.onNavigate("/politica-de-privacidad");
                            },
                            onNavigateToAndroidApp: function onNavigateToAndroidApp() {
                                navigation.onNavigate("https://play.google.com/store/apps/details?id=com.intermaple.mundorecarga");
                            },
                            onNavigateToIosApp: function onNavigateToIosApp() {
                                navigation.onNavigate("https://itunes.apple.com/es/app/mundorecarga/id1437067665?mt=8");
                            },
                            onLogout: function onLogout() {
                                navigation.onNavigate("/listar-paises", {}, function () {
                                    _this3.props.onLogout();
                                });
                            },
                            onBack: function onBack() {
                                navigation.onNavigate("/listar-paises");
                            },
                            onError: _this3.props.onError
                        });
                    }
                }, {
                    location: /^\/ayuda/,
                    element: function element() {
                        return _react2.default.createElement(_ViewHelp2.default, {
                            icons: icons,
                            layout: FrontendLayout,
                            api: {
                                pickMetadata: function pickMetadata() {
                                    var _props$api$calls33;

                                    for (var _len55 = arguments.length, props = Array(_len55), _key55 = 0; _key55 < _len55; _key55++) {
                                        props[_key55] = arguments[_key55];
                                    }

                                    return (_props$api$calls33 = _this3.props.api.calls).pickMetadata.apply(_props$api$calls33, [_this3.props.api.base].concat(props));
                                }
                            },
                            onBack: function onBack() {
                                navigation.onNavigate("/opciones");
                            },
                            onError: _this3.props.onError
                        });
                    }
                }, {
                    location: /^\/politica-de-privacidad/,
                    element: function element() {
                        return _react2.default.createElement(_ViewPrivacyPolicy2.default, {
                            icons: icons,
                            layout: FrontendLayout,
                            api: {
                                pickMetadata: function pickMetadata() {
                                    var _props$api$calls34;

                                    for (var _len56 = arguments.length, props = Array(_len56), _key56 = 0; _key56 < _len56; _key56++) {
                                        props[_key56] = arguments[_key56];
                                    }

                                    return (_props$api$calls34 = _this3.props.api.calls).pickMetadata.apply(_props$api$calls34, [_this3.props.api.base].concat(props));
                                }
                            },
                            onBack: function onBack() {
                                navigation.onNavigate("/opciones");
                            },
                            onError: _this3.props.onError
                        });
                    }
                }]);
            } catch (e) {
                console.error(this.props.navigation);

                throw e;
            }
        }
    }]);

    return Front;
}(_react2.default.Component);

Front.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    blankLayout: _propTypes2.default.func.isRequired,
    frontendLayout: _propTypes2.default.func.isRequired,
    user: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.shape({
        base: _propTypes2.default.string.isRequired,
        calls: _propTypes2.default.object.isRequired
    }),
    navigation: _propTypes2.default.shape({
        location: _propTypes2.default.string.isRequired,
        payload: _propTypes2.default.object,
        onNavigate: _propTypes2.default.func.isRequired // (location, callback)
    }).isRequired,
    onAuthenticated: _propTypes2.default.func.isRequired,
    onLogout: _propTypes2.default.func.isRequired, // ()
    onError: _propTypes2.default.func.isRequired // ({code})
};
exports.default = Front;