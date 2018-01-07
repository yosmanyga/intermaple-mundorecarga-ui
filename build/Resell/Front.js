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

var _resolution = require("@yosmy/resolution");

var _ui = require("@yosmy/ui");

var _ListCountries = require("./ListCountries");

var _ListCountries2 = _interopRequireDefault(_ListCountries);

var _SendTopupToUnknown = require("./SendTopupToUnknown");

var _SendTopupToUnknown2 = _interopRequireDefault(_SendTopupToUnknown);

var _ViewMyAccount = require("./ViewMyAccount");

var _ViewMyAccount2 = _interopRequireDefault(_ViewMyAccount);

var _SearchTopups = require("./SearchTopups");

var _SearchTopups2 = _interopRequireDefault(_SearchTopups);

var _ShowLogin = require("./ShowLogin");

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Front.__proto__ || Object.getPrototypeOf(Front)).call.apply(_ref, [this].concat(args))), _this), _this._buildFrontendLayout = function (_ref2) {
            var menu = _ref2.menu,
                children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["menu", "children"]);

            return _react2.default.createElement(
                _this2.props.frontendLayout,
                _extends({
                    menu: _extends({
                        logo: require("../Common/logo_h.png"),
                        items: [{
                            key: "my-account",
                            icon: _react2.default.createElement(_this2.props.icons.objects.reseller.user, null),
                            text: "Mi cuenta",
                            onClick: function onClick() {
                                _this.props.navigation.onNavigate("/reventa/mi-cuenta");
                            }
                        }, {
                            key: "topups",
                            icon: _react2.default.createElement(_this2.props.icons.objects.reseller.topup, null),
                            text: "Recargas",
                            onClick: function onClick() {
                                _this.props.navigation.onNavigate("/reventa/recargas");
                            }
                        }]
                    }, menu),
                    onNavigateToWelcome: function onNavigateToWelcome() {
                        _this.props.navigation.onNavigate("/reventa/paises");
                    }
                }, props),
                children
            );
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

            if (user.token === null) {
                return _react2.default.createElement(_ShowLogin2.default, {
                    layout: FrontendLayout,
                    icons: icons,
                    api: {
                        processResellerAuthentication: function processResellerAuthentication() {
                            var _props$api$calls$user;

                            for (var _len2 = arguments.length, props = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                props[_key2] = arguments[_key2];
                            }

                            return (_props$api$calls$user = _this3.props.api.calls.userland).processResellerAuthentication.apply(_props$api$calls$user, [_this3.props.api.base].concat(props));
                        }
                    },
                    user: this.props.user,
                    referral: false,
                    onAuthenticated: this.props.onAuthenticated,
                    onError: this.props.onError
                });
            }

            if (user.roles.indexOf("reseller") === -1) {
                return _react2.default.createElement(
                    FrontendLayout,
                    null,
                    _react2.default.createElement(
                        _ui.Error,
                        {
                            margin: {
                                top: 8
                            }
                        },
                        "No tienes acceso a esta secci\xF3n"
                    )
                );
            }

            var listCountriesElement = _react2.default.createElement(_ListCountries2.default, {
                layout: FrontendLayout,
                api: {
                    collectCountries: function collectCountries() {
                        var _props$api$calls;

                        for (var _len3 = arguments.length, props = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                            props[_key3] = arguments[_key3];
                        }

                        return (_props$api$calls = _this3.props.api.calls).collectCountries.apply(_props$api$calls, [_this3.props.api.base].concat(props));
                    },
                    collectProviders: function collectProviders() {
                        var _props$api$calls2;

                        for (var _len4 = arguments.length, props = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                            props[_key4] = arguments[_key4];
                        }

                        return (_props$api$calls2 = _this3.props.api.calls).collectProviders.apply(_props$api$calls2, [_this3.props.api.base].concat(props));
                    },
                    reseller: {
                        collectProviders: function collectProviders() {
                            var _props$api$calls$rese;

                            for (var _len5 = arguments.length, props = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                                props[_key5] = arguments[_key5];
                            }

                            return (_props$api$calls$rese = _this3.props.api.calls.reseller).collectProviders.apply(_props$api$calls$rese, [_this3.props.api.base, user.token].concat(props));
                        }
                    }
                },
                onSelect: function onSelect(_ref3) {
                    var slug = _ref3.slug;

                    navigation.onNavigate("/reventa/" + slug);
                },
                onError: this.props.onError
            });

            return (0, _resolution.resolve)(navigation.location, [{
                location: /^\/reventa\/paises/,
                element: function element() {
                    return listCountriesElement;
                }
            }, {
                location: /^\/reventa\/mi-cuenta/,
                element: function element() {
                    return _react2.default.createElement(_ViewMyAccount2.default, {
                        layout: FrontendLayout,
                        icons: _this3.props.icons,
                        api: {
                            collectCountries: function collectCountries() {
                                var _props$api$calls3;

                                for (var _len6 = arguments.length, props = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                                    props[_key6] = arguments[_key6];
                                }

                                return (_props$api$calls3 = _this3.props.api.calls).collectCountries.apply(_props$api$calls3, [_this3.props.api.base].concat(props));
                            },
                            collectProviders: function collectProviders() {
                                var _props$api$calls4;

                                for (var _len7 = arguments.length, props = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                                    props[_key7] = arguments[_key7];
                                }

                                return (_props$api$calls4 = _this3.props.api.calls).collectProviders.apply(_props$api$calls4, [_this3.props.api.base].concat(props));
                            },
                            collectProducts: function collectProducts() {
                                var _props$api$calls5;

                                for (var _len8 = arguments.length, props = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                                    props[_key8] = arguments[_key8];
                                }

                                return (_props$api$calls5 = _this3.props.api.calls).collectProducts.apply(_props$api$calls5, [_this3.props.api.base].concat(props));
                            },
                            reseller: {
                                pickUserAsReseller: function pickUserAsReseller() {
                                    var _props$api$calls$rese2;

                                    for (var _len9 = arguments.length, props = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                                        props[_key9] = arguments[_key9];
                                    }

                                    return (_props$api$calls$rese2 = _this3.props.api.calls.reseller).pickUserAsReseller.apply(_props$api$calls$rese2, [_this3.props.api.base, user.token].concat(props));
                                },
                                collectTransactionsAsReseller: function collectTransactionsAsReseller() {
                                    var _props$api$calls$rese3;

                                    for (var _len10 = arguments.length, props = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                                        props[_key10] = arguments[_key10];
                                    }

                                    return (_props$api$calls$rese3 = _this3.props.api.calls.reseller).collectTransactionsAsReseller.apply(_props$api$calls$rese3, [_this3.props.api.base, user.token].concat(props));
                                },
                                collectAgentsAsReseller: function collectAgentsAsReseller() {
                                    var _props$api$calls$rese4;

                                    for (var _len11 = arguments.length, props = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                                        props[_key11] = arguments[_key11];
                                    }

                                    return (_props$api$calls$rese4 = _this3.props.api.calls.reseller).collectAgentsAsReseller.apply(_props$api$calls$rese4, [_this3.props.api.base, user.token].concat(props));
                                },
                                addAgent: function addAgent() {
                                    var _props$api$calls$rese5;

                                    for (var _len12 = arguments.length, props = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                                        props[_key12] = arguments[_key12];
                                    }

                                    return (_props$api$calls$rese5 = _this3.props.api.calls.reseller).addAgent.apply(_props$api$calls$rese5, [_this3.props.api.base, user.token].concat(props));
                                },
                                updateAgent: function updateAgent() {
                                    var _props$api$calls$rese6;

                                    for (var _len13 = arguments.length, props = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
                                        props[_key13] = arguments[_key13];
                                    }

                                    return (_props$api$calls$rese6 = _this3.props.api.calls.reseller).updateAgent.apply(_props$api$calls$rese6, [_this3.props.api.base, user.token].concat(props));
                                },
                                collectProviders: function collectProviders() {
                                    var _props$api$calls$rese7;

                                    for (var _len14 = arguments.length, props = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
                                        props[_key14] = arguments[_key14];
                                    }

                                    return (_props$api$calls$rese7 = _this3.props.api.calls.reseller).collectProviders.apply(_props$api$calls$rese7, [_this3.props.api.base, user.token].concat(props));
                                }
                            }
                        },
                        onError: _this3.props.onError
                    });
                }
            }, {
                location: /^\/reventa\/recargas/,
                element: function element() {
                    return _react2.default.createElement(_SearchTopups2.default, {
                        layout: FrontendLayout,
                        icons: _this3.props.icons,
                        api: {
                            collectCountries: function collectCountries() {
                                var _props$api$calls6;

                                for (var _len15 = arguments.length, props = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
                                    props[_key15] = arguments[_key15];
                                }

                                return (_props$api$calls6 = _this3.props.api.calls).collectCountries.apply(_props$api$calls6, [_this3.props.api.base].concat(props));
                            },
                            collectProviders: function collectProviders() {
                                var _props$api$calls7;

                                for (var _len16 = arguments.length, props = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
                                    props[_key16] = arguments[_key16];
                                }

                                return (_props$api$calls7 = _this3.props.api.calls).collectProviders.apply(_props$api$calls7, [_this3.props.api.base].concat(props));
                            },
                            reseller: {
                                collectAgentsAsReseller: function collectAgentsAsReseller() {
                                    var _props$api$calls$rese8;

                                    for (var _len17 = arguments.length, props = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
                                        props[_key17] = arguments[_key17];
                                    }

                                    return (_props$api$calls$rese8 = _this3.props.api.calls.reseller).collectAgentsAsReseller.apply(_props$api$calls$rese8, [_this3.props.api.base, user.token].concat(props));
                                },
                                collectTopupsAsReseller: function collectTopupsAsReseller() {
                                    var _props$api$calls$rese9;

                                    for (var _len18 = arguments.length, props = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
                                        props[_key18] = arguments[_key18];
                                    }

                                    return (_props$api$calls$rese9 = _this3.props.api.calls.reseller).collectTopupsAsReseller.apply(_props$api$calls$rese9, [_this3.props.api.base, user.token].concat(props));
                                }
                            }
                        },
                        onError: _this3.props.onError
                    });
                }
            }, {
                location: /^\/reventa/,
                element: function element() {
                    var country = navigation.location.split("/")[2];

                    if (typeof country === 'undefined') {
                        return listCountriesElement;
                    }

                    return _react2.default.createElement(_SendTopupToUnknown2.default, {
                        icons: icons,
                        layout: FrontendLayout,
                        api: {
                            pickCountry: function pickCountry() {
                                var _props$api$calls8;

                                for (var _len19 = arguments.length, props = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
                                    props[_key19] = arguments[_key19];
                                }

                                return (_props$api$calls8 = _this3.props.api.calls).pickCountry.apply(_props$api$calls8, [_this3.props.api.base].concat(props));
                            },
                            collectCountries: function collectCountries() {
                                var _props$api$calls9;

                                for (var _len20 = arguments.length, props = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
                                    props[_key20] = arguments[_key20];
                                }

                                return (_props$api$calls9 = _this3.props.api.calls).collectCountries.apply(_props$api$calls9, [_this3.props.api.base].concat(props));
                            },
                            validateAccount: function validateAccount() {
                                var _props$api$calls10;

                                for (var _len21 = arguments.length, props = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
                                    props[_key21] = arguments[_key21];
                                }

                                return (_props$api$calls10 = _this3.props.api.calls).validateAccount.apply(_props$api$calls10, [_this3.props.api.base].concat(props));
                            },
                            country: {
                                pickPhoto: function pickPhoto() {
                                    var _props$api$calls$coun;

                                    for (var _len22 = arguments.length, props = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
                                        props[_key22] = arguments[_key22];
                                    }

                                    return (_props$api$calls$coun = _this3.props.api.calls.country).pickPhoto.apply(_props$api$calls$coun, [_this3.props.api.base].concat(props));
                                }
                            },
                            collectProviders: function collectProviders() {
                                var _props$api$calls11;

                                for (var _len23 = arguments.length, props = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
                                    props[_key23] = arguments[_key23];
                                }

                                return (_props$api$calls11 = _this3.props.api.calls).collectProviders.apply(_props$api$calls11, [_this3.props.api.base].concat(props));
                            },
                            findProviders: function findProviders() {
                                var _props$api$calls12;

                                for (var _len24 = arguments.length, props = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
                                    props[_key24] = arguments[_key24];
                                }

                                return (_props$api$calls12 = _this3.props.api.calls).findProviders.apply(_props$api$calls12, [_this3.props.api.base].concat(props));
                            },
                            detectProviders: function detectProviders() {
                                var _props$api$calls13;

                                for (var _len25 = arguments.length, props = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
                                    props[_key25] = arguments[_key25];
                                }

                                return (_props$api$calls13 = _this3.props.api.calls).detectProviders.apply(_props$api$calls13, [_this3.props.api.base].concat(props));
                            },
                            collectPromotions: function collectPromotions() {
                                var _props$api$calls14;

                                for (var _len26 = arguments.length, props = Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
                                    props[_key26] = arguments[_key26];
                                }

                                return (_props$api$calls14 = _this3.props.api.calls).collectPromotions.apply(_props$api$calls14, [_this3.props.api.base].concat(props));
                            },
                            resolvePromotions: function resolvePromotions() {
                                var _props$api$calls15;

                                for (var _len27 = arguments.length, props = Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
                                    props[_key27] = arguments[_key27];
                                }

                                return (_props$api$calls15 = _this3.props.api.calls).resolvePromotions.apply(_props$api$calls15, [_this3.props.api.base].concat(props));
                            },
                            resolveProducts: function resolveProducts() {
                                var _props$api$calls16;

                                for (var _len28 = arguments.length, props = Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
                                    props[_key28] = arguments[_key28];
                                }

                                return (_props$api$calls16 = _this3.props.api.calls).resolveProducts.apply(_props$api$calls16, [_this3.props.api.base].concat(props));
                            },
                            testTopup: function testTopup() {
                                var _props$api$calls17;

                                for (var _len29 = arguments.length, props = Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
                                    props[_key29] = arguments[_key29];
                                }

                                return (_props$api$calls17 = _this3.props.api.calls).testTopup.apply(_props$api$calls17, [_this3.props.api.base].concat(props));
                            },
                            reseller: {
                                collectAgentsAsReseller: function collectAgentsAsReseller() {
                                    var _props$api$calls$rese10;

                                    for (var _len30 = arguments.length, props = Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
                                        props[_key30] = arguments[_key30];
                                    }

                                    return (_props$api$calls$rese10 = _this3.props.api.calls.reseller).collectAgentsAsReseller.apply(_props$api$calls$rese10, [_this3.props.api.base, user.token].concat(props));
                                },
                                sendTopup: function sendTopup() {
                                    var _props$api$calls$rese11;

                                    for (var _len31 = arguments.length, props = Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
                                        props[_key31] = arguments[_key31];
                                    }

                                    return (_props$api$calls$rese11 = _this3.props.api.calls.reseller).sendTopup.apply(_props$api$calls$rese11, [_this3.props.api.base, user.token].concat(props));
                                }
                            },
                            userland: {
                                startAuthentication: function startAuthentication() {
                                    var _props$api$calls$user2;

                                    for (var _len32 = arguments.length, props = Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
                                        props[_key32] = arguments[_key32];
                                    }

                                    return (_props$api$calls$user2 = _this3.props.api.calls.userland).startAuthentication.apply(_props$api$calls$user2, [_this3.props.api.base].concat(props));
                                },
                                completeAuthentication: function completeAuthentication() {
                                    var _props$api$calls$user3;

                                    for (var _len33 = arguments.length, props = Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
                                        props[_key33] = arguments[_key33];
                                    }

                                    return (_props$api$calls$user3 = _this3.props.api.calls.userland).completeAuthentication.apply(_props$api$calls$user3, [_this3.props.api.base].concat(props));
                                },
                                stripe: {
                                    setupCard: function setupCard() {
                                        var _props$api$calls$user4;

                                        for (var _len34 = arguments.length, props = Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
                                            props[_key34] = arguments[_key34];
                                        }

                                        return (_props$api$calls$user4 = _this3.props.api.calls.userland.stripe).setupCard.apply(_props$api$calls$user4, [_this3.props.api.base, user.token].concat(props));
                                    },
                                    collectCardsAsClient: function collectCardsAsClient() {
                                        var _props$api$calls$user5;

                                        for (var _len35 = arguments.length, props = Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
                                            props[_key35] = arguments[_key35];
                                        }

                                        return (_props$api$calls$user5 = _this3.props.api.calls.userland.stripe).collectCardsAsClient.apply(_props$api$calls$user5, [_this3.props.api.base, user.token].concat(props));
                                    },
                                    deleteCard: function deleteCard() {
                                        var _props$api$calls$user6;

                                        for (var _len36 = arguments.length, props = Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
                                            props[_key36] = arguments[_key36];
                                        }

                                        return (_props$api$calls$user6 = _this3.props.api.calls.userland.stripe).deleteCard.apply(_props$api$calls$user6, [_this3.props.api.base, user.token].concat(props));
                                    }
                                }
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
                        onError: _this3.props.onError
                    });
                },
                default: true
            }]);
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