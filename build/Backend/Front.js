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

var _ManageCountry = require("./ManageCountry");

var _ManageCountry2 = _interopRequireDefault(_ManageCountry);

var _ListPromotions = require("./ListPromotions");

var _ListPromotions2 = _interopRequireDefault(_ListPromotions);

var _ListCountries = require("./ListCountries");

var _ListCountries2 = _interopRequireDefault(_ListCountries);

var _ListMetadatas = require("./ListMetadatas");

var _ListMetadatas2 = _interopRequireDefault(_ListMetadatas);

var _EditMetadata = require("./EditMetadata");

var _EditMetadata2 = _interopRequireDefault(_EditMetadata);

var _SearchTopups = require("./SearchTopups");

var _SearchTopups2 = _interopRequireDefault(_SearchTopups);

var _ViewUser = require("./ViewUser");

var _ViewUser2 = _interopRequireDefault(_ViewUser);

var _ShowLogin = require("../Common/ShowLogin");

var _ShowLogin2 = _interopRequireDefault(_ShowLogin);

var _SearchEvents = require("./SearchEvents");

var _SearchEvents2 = _interopRequireDefault(_SearchEvents);

var _Front = require("./Resell/Front");

var _Front2 = _interopRequireDefault(_Front);

var _ListUsers = require("./ListUsers");

var _ListUsers2 = _interopRequireDefault(_ListUsers);

var _ViewActivity = require("./ViewActivity");

var _ViewActivity2 = _interopRequireDefault(_ViewActivity);

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
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                align = _ref2.align,
                props = _objectWithoutProperties(_ref2, ["children", "align"]);

            return _react2.default.createElement(
                _this2.props.drawerLayout,
                _extends({}, props, {
                    align: _extends({
                        alignItems: "flex-start"
                    }, align),
                    padding: 8,
                    menu: {
                        logo: require("./logo_v.png"),
                        background: require("../Common/background.png"),
                        list: [{
                            header: "Venta",
                            items: [_this.props.user.roles && _this.props.user.roles.indexOf("admin") > -1 && {
                                key: "activity",
                                icon: _react2.default.createElement(_this2.props.icons.objects.activity, null),
                                text: "Actividad",
                                onClick: function onClick() {
                                    _this.props.navigation.onNavigate("/admin/actividad");
                                }
                            }, _this.props.user.roles && _this.props.user.roles.indexOf("operator") > -1 && {
                                key: "topups",
                                icon: _react2.default.createElement(_this2.props.icons.menu.topups, null),
                                text: "Recargas",
                                onClick: function onClick() {
                                    _this.props.navigation.onNavigate("/admin/recargas");
                                }
                            }, _this.props.user.roles && _this.props.user.roles.indexOf("admin") > -1 && {
                                key: "users",
                                icon: _react2.default.createElement(_this2.props.icons.menu.users, null),
                                text: "Usuarios",
                                onClick: function onClick() {
                                    _this.props.navigation.onNavigate("/admin/usuarios");
                                }
                            }, _this.props.user.roles && _this.props.user.roles.indexOf("admin") > -1 && {
                                key: "fraud",
                                icon: _react2.default.createElement(_this2.props.icons.menu.fraud, null),
                                text: "Fraude",
                                onClick: function onClick() {
                                    _this.props.navigation.onNavigate("/admin/fraude");
                                }
                            }, _this.props.user.roles && _this.props.user.roles.indexOf("admin") > -1 && {
                                key: "countries",
                                icon: _react2.default.createElement(_this2.props.icons.menu.countries, null),
                                text: "Países",
                                onClick: function onClick() {
                                    _this.props.navigation.onNavigate("/admin/paises");
                                }
                            }, _this.props.user.roles && _this.props.user.roles.indexOf("admin") > -1 && {
                                key: "promotions",
                                icon: _react2.default.createElement(_this2.props.icons.menu.promotions, null),
                                text: "Promociones",
                                onClick: function onClick() {
                                    _this.props.navigation.onNavigate("/admin/promociones");
                                }
                            }, _this.props.user.roles && _this.props.user.roles.indexOf("admin") > -1 && {
                                key: "metadatas",
                                icon: _react2.default.createElement(_this2.props.icons.menu.metadatas, null),
                                text: "Metadatos",
                                onClick: function onClick() {
                                    _this.props.navigation.onNavigate("/admin/metadatos");
                                }
                            }]
                        }, {
                            header: "Reventa",
                            items: [_this.props.user.roles && _this.props.user.roles.indexOf("operator") > -1 && {
                                key: "topups",
                                icon: _react2.default.createElement(_this2.props.icons.menu.topups, null),
                                text: "Recargas",
                                onClick: function onClick() {
                                    _this.props.navigation.onNavigate("/admin/reventa/recargas");
                                }
                            }, _this.props.user.roles && _this.props.user.roles.indexOf("admin") > -1 && {
                                key: "resellers",
                                icon: _react2.default.createElement(_this2.props.icons.menu.resellers, null),
                                text: "Revendedores",
                                onClick: function onClick() {
                                    _this.props.navigation.onNavigate("/admin/reventa/usuarios");
                                }
                            }]
                        }]
                    },
                    notification: {
                        message: _this.state.notification,
                        onClose: function onClose() {
                            _this.setState({
                                notification: null
                            });
                        }
                    }
                }),
                children
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Front, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                icons = _props.icons,
                navigation = _props.navigation,
                user = _props.user;


            if (user.token === null) {
                return _react2.default.createElement(_ShowLogin2.default, {
                    layout: this.props.blankLayout,
                    icons: icons,
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
                    referral: false,
                    onAuthenticated: this.props.onAuthenticated,
                    onError: this.props.onError
                });
            }

            if (!this.props.user.roles || this.props.user.roles.indexOf("admin") === -1 && this.props.user.roles.indexOf("operator") === -1) {
                return _react2.default.createElement(
                    this.props.blankLayout,
                    null,
                    _react2.default.createElement(
                        _ui.Error,
                        null,
                        "No tienes acceso a esta secci\xF3n"
                    )
                );
            }

            var Layout = this._buildLayout;

            return (0, _resolution.resolve)(navigation.location, [{
                location: /^\/admin\/recargas/,
                element: function element() {
                    return _react2.default.createElement(_SearchTopups2.default, {
                        icons: icons,
                        layout: function layout(_ref3) {
                            var children = _ref3.children,
                                props = _objectWithoutProperties(_ref3, ["children"]);

                            return _react2.default.createElement(
                                Layout,
                                props,
                                children
                            );
                        },
                        api: {
                            collectTopupsByDateAsOperator: function collectTopupsByDateAsOperator() {
                                var _props$api$calls;

                                for (var _len4 = arguments.length, props = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                                    props[_key4] = arguments[_key4];
                                }

                                return (_props$api$calls = _this3.props.api.calls).collectTopupsByDateAsOperator.apply(_props$api$calls, [_this3.props.api.base, user.token].concat(props));
                            },
                            collectTopupsByPhoneAsOperator: function collectTopupsByPhoneAsOperator() {
                                var _props$api$calls2;

                                for (var _len5 = arguments.length, props = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                                    props[_key5] = arguments[_key5];
                                }

                                return (_props$api$calls2 = _this3.props.api.calls).collectTopupsByPhoneAsOperator.apply(_props$api$calls2, [_this3.props.api.base, user.token].concat(props));
                            },
                            collectTopupsByStripeAsOperator: function collectTopupsByStripeAsOperator() {
                                var _props$api$calls3;

                                for (var _len6 = arguments.length, props = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                                    props[_key6] = arguments[_key6];
                                }

                                return (_props$api$calls3 = _this3.props.api.calls).collectTopupsByStripeAsOperator.apply(_props$api$calls3, [_this3.props.api.base, user.token].concat(props));
                            },
                            collectContactsAsOperator: function collectContactsAsOperator() {
                                var _props$api$calls4;

                                for (var _len7 = arguments.length, props = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                                    props[_key7] = arguments[_key7];
                                }

                                return (_props$api$calls4 = _this3.props.api.calls).collectContactsAsOperator.apply(_props$api$calls4, [_this3.props.api.base, user.token].concat(props));
                            },
                            topup: {
                                generateReceipt: function generateReceipt() {
                                    var _props$api$calls$topu;

                                    for (var _len8 = arguments.length, props = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                                        props[_key8] = arguments[_key8];
                                    }

                                    return (_props$api$calls$topu = _this3.props.api.calls.topup).generateReceipt.apply(_props$api$calls$topu, [_this3.props.api.base, user.token].concat(props));
                                }
                            },
                            userland: {
                                phone: {
                                    collectUsers: function collectUsers() {
                                        var _props$api$calls$user3;

                                        for (var _len9 = arguments.length, props = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                                            props[_key9] = arguments[_key9];
                                        }

                                        return (_props$api$calls$user3 = _this3.props.api.calls.userland.phone).collectUsers.apply(_props$api$calls$user3, [_this3.props.api.base, user.token].concat(props));
                                    }
                                }
                            },
                            collectCountries: function collectCountries() {
                                var _props$api$calls5;

                                for (var _len10 = arguments.length, props = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                                    props[_key10] = arguments[_key10];
                                }

                                return (_props$api$calls5 = _this3.props.api.calls).collectCountries.apply(_props$api$calls5, [_this3.props.api.base].concat(props));
                            },
                            collectProviders: function collectProviders() {
                                var _props$api$calls6;

                                for (var _len11 = arguments.length, props = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
                                    props[_key11] = arguments[_key11];
                                }

                                return (_props$api$calls6 = _this3.props.api.calls).collectProviders.apply(_props$api$calls6, [_this3.props.api.base].concat(props));
                            },
                            collectProducts: function collectProducts() {
                                var _props$api$calls7;

                                for (var _len12 = arguments.length, props = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
                                    props[_key12] = arguments[_key12];
                                }

                                return (_props$api$calls7 = _this3.props.api.calls).collectProducts.apply(_props$api$calls7, [_this3.props.api.base].concat(props));
                            },
                            trySendingTopupAgain: function trySendingTopupAgain() {
                                var _props$api$calls8;

                                for (var _len13 = arguments.length, props = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
                                    props[_key13] = arguments[_key13];
                                }

                                return (_props$api$calls8 = _this3.props.api.calls).trySendingTopupAgain.apply(_props$api$calls8, [_this3.props.api.base, user.token].concat(props));
                            },
                            sendDelayedTopup: function sendDelayedTopup() {
                                var _props$api$calls9;

                                for (var _len14 = arguments.length, props = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
                                    props[_key14] = arguments[_key14];
                                }

                                return (_props$api$calls9 = _this3.props.api.calls).sendDelayedTopup.apply(_props$api$calls9, [_this3.props.api.base, user.token].concat(props));
                            },
                            refundTopup: function refundTopup() {
                                var _props$api$calls10;

                                for (var _len15 = arguments.length, props = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
                                    props[_key15] = arguments[_key15];
                                }

                                return (_props$api$calls10 = _this3.props.api.calls).refundTopup.apply(_props$api$calls10, [_this3.props.api.base, user.token].concat(props));
                            }
                        },
                        onSelectUser: function onSelectUser(_ref4) {
                            var id = _ref4.id;

                            _this3.props.navigation.onNavigate("/admin/usuario", {
                                id: id,
                                target: 'blank'
                            });
                        },
                        onError: _this3.props.onError
                    });
                },
                default: true
            }, {
                location: /^\/admin\/actividad/,
                element: function element() {
                    return _react2.default.createElement(_ViewActivity2.default, {
                        icons: icons,
                        layout: function layout(_ref5) {
                            var children = _ref5.children,
                                props = _objectWithoutProperties(_ref5, ["children"]);

                            return _react2.default.createElement(
                                Layout,
                                props,
                                children
                            );
                        },
                        api: {
                            userland: {
                                phone: {
                                    collectUsers: function collectUsers() {
                                        var _props$api$calls$user4;

                                        for (var _len16 = arguments.length, props = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
                                            props[_key16] = arguments[_key16];
                                        }

                                        return (_props$api$calls$user4 = _this3.props.api.calls.userland.phone).collectUsers.apply(_props$api$calls$user4, [_this3.props.api.base, user.token].concat(props));
                                    }
                                },
                                stripe: {
                                    card: {
                                        collectErrors: function collectErrors() {
                                            var _props$api$calls$user5;

                                            for (var _len17 = arguments.length, props = Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
                                                props[_key17] = arguments[_key17];
                                            }

                                            return (_props$api$calls$user5 = _this3.props.api.calls.userland.stripe.card).collectErrors.apply(_props$api$calls$user5, [_this3.props.api.base, user.token].concat(props));
                                        }
                                    }
                                }
                            }
                        },
                        onSelectUser: function onSelectUser(_ref6) {
                            var id = _ref6.id;

                            _this3.props.navigation.onNavigate("/admin/usuario", {
                                id: id,
                                target: 'blank'
                            });
                        },
                        onError: _this3.props.onError
                    });
                }
            }, {
                location: /^\/admin\/paises/,
                element: function element() {
                    return _react2.default.createElement(_ListCountries2.default, {
                        icons: icons,
                        layout: function layout(_ref7) {
                            var children = _ref7.children,
                                props = _objectWithoutProperties(_ref7, ["children"]);

                            return _react2.default.createElement(
                                Layout,
                                props,
                                children
                            );
                        },
                        api: {
                            collectCountries: function collectCountries() {
                                var _props$api$calls11;

                                for (var _len18 = arguments.length, props = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
                                    props[_key18] = arguments[_key18];
                                }

                                return (_props$api$calls11 = _this3.props.api.calls).collectCountries.apply(_props$api$calls11, [_this3.props.api.base].concat(props));
                            }
                        },
                        onSelect: function onSelect(iso) {
                            _this3.props.navigation.onNavigate("/admin/pais", {
                                iso: iso
                            });
                        },
                        onError: _this3.props.onError
                    });
                }
            }, {
                location: /^\/admin\/pais/,
                element: function element() {
                    return _react2.default.createElement(_ManageCountry2.default, {
                        icons: icons,
                        layout: function layout(_ref8) {
                            var children = _ref8.children,
                                props = _objectWithoutProperties(_ref8, ["children"]);

                            return _react2.default.createElement(
                                Layout,
                                props,
                                children
                            );
                        },
                        api: {
                            pickCountry: function pickCountry() {
                                var _props$api$calls12;

                                for (var _len19 = arguments.length, props = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
                                    props[_key19] = arguments[_key19];
                                }

                                return (_props$api$calls12 = _this3.props.api.calls).pickCountry.apply(_props$api$calls12, [_this3.props.api.base].concat(props));
                            },
                            collectProviders: function collectProviders() {
                                var _props$api$calls13;

                                for (var _len20 = arguments.length, props = Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
                                    props[_key20] = arguments[_key20];
                                }

                                return (_props$api$calls13 = _this3.props.api.calls).collectProviders.apply(_props$api$calls13, [_this3.props.api.base].concat(props));
                            },
                            collectPromotions: function collectPromotions() {
                                var _props$api$calls14;

                                for (var _len21 = arguments.length, props = Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
                                    props[_key21] = arguments[_key21];
                                }

                                return (_props$api$calls14 = _this3.props.api.calls).collectPromotions.apply(_props$api$calls14, [_this3.props.api.base].concat(props));
                            },
                            promotion: {
                                updateTitle: function updateTitle() {
                                    var _props$api$calls$prom;

                                    for (var _len22 = arguments.length, props = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
                                        props[_key22] = arguments[_key22];
                                    }

                                    return (_props$api$calls$prom = _this3.props.api.calls.promotion).updateTitle.apply(_props$api$calls$prom, [_this3.props.api.base, user.token].concat(props));
                                }
                            },
                            country: {
                                collectPhotos: function collectPhotos() {
                                    var _props$api$calls$coun;

                                    for (var _len23 = arguments.length, props = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
                                        props[_key23] = arguments[_key23];
                                    }

                                    return (_props$api$calls$coun = _this3.props.api.calls.country).collectPhotos.apply(_props$api$calls$coun, [_this3.props.api.base].concat(props));
                                },
                                uploadPhoto: function uploadPhoto() {
                                    var _props$api$calls$coun2;

                                    for (var _len24 = arguments.length, props = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
                                        props[_key24] = arguments[_key24];
                                    }

                                    return (_props$api$calls$coun2 = _this3.props.api.calls.country).uploadPhoto.apply(_props$api$calls$coun2, [_this3.props.api.base, user.token].concat(props));
                                },
                                deletePhoto: function deletePhoto() {
                                    var _props$api$calls$coun3;

                                    for (var _len25 = arguments.length, props = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
                                        props[_key25] = arguments[_key25];
                                    }

                                    return (_props$api$calls$coun3 = _this3.props.api.calls.country).deletePhoto.apply(_props$api$calls$coun3, [_this3.props.api.base, user.token].concat(props));
                                }
                            }
                        },
                        iso: _this3.props.navigation.payload.iso,
                        onError: _this3.props.onError
                    });
                }
            }, {
                location: /^\/admin\/fraude/,
                element: function element() {
                    return _react2.default.createElement(_SearchEvents2.default, {
                        icons: icons,
                        layout: function layout(_ref9) {
                            var children = _ref9.children,
                                props = _objectWithoutProperties(_ref9, ["children"]);

                            return _react2.default.createElement(
                                Layout,
                                props,
                                children
                            );
                        },
                        api: {
                            blacklist: {
                                log: {
                                    collectEvents: function collectEvents() {
                                        var _props$api$calls$blac;

                                        for (var _len26 = arguments.length, props = Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
                                            props[_key26] = arguments[_key26];
                                        }

                                        return (_props$api$calls$blac = _this3.props.api.calls.blacklist.log).collectEvents.apply(_props$api$calls$blac, [_this3.props.api.base, user.token].concat(props));
                                    }
                                }
                            }
                        },
                        onError: _this3.props.onError
                    });
                }
            }, {
                location: /^\/admin\/promociones/,
                element: function element() {
                    return _react2.default.createElement(_ListPromotions2.default, {
                        icons: icons,
                        layout: function layout(_ref10) {
                            var children = _ref10.children,
                                props = _objectWithoutProperties(_ref10, ["children"]);

                            return _react2.default.createElement(
                                Layout,
                                props,
                                children
                            );
                        },
                        api: {
                            collectCountries: function collectCountries() {
                                var _props$api$calls15;

                                for (var _len27 = arguments.length, props = Array(_len27), _key27 = 0; _key27 < _len27; _key27++) {
                                    props[_key27] = arguments[_key27];
                                }

                                return (_props$api$calls15 = _this3.props.api.calls).collectCountries.apply(_props$api$calls15, [_this3.props.api.base].concat(props));
                            },
                            collectProviders: function collectProviders() {
                                var _props$api$calls16;

                                for (var _len28 = arguments.length, props = Array(_len28), _key28 = 0; _key28 < _len28; _key28++) {
                                    props[_key28] = arguments[_key28];
                                }

                                return (_props$api$calls16 = _this3.props.api.calls).collectProviders.apply(_props$api$calls16, [_this3.props.api.base].concat(props));
                            },
                            collectPromotions: function collectPromotions() {
                                var _props$api$calls17;

                                for (var _len29 = arguments.length, props = Array(_len29), _key29 = 0; _key29 < _len29; _key29++) {
                                    props[_key29] = arguments[_key29];
                                }

                                return (_props$api$calls17 = _this3.props.api.calls).collectPromotions.apply(_props$api$calls17, [_this3.props.api.base].concat(props));
                            },
                            promotion: {
                                updateTitle: function updateTitle() {
                                    var _props$api$calls$prom2;

                                    for (var _len30 = arguments.length, props = Array(_len30), _key30 = 0; _key30 < _len30; _key30++) {
                                        props[_key30] = arguments[_key30];
                                    }

                                    return (_props$api$calls$prom2 = _this3.props.api.calls.promotion).updateTitle.apply(_props$api$calls$prom2, [_this3.props.api.base, user.token].concat(props));
                                }
                            }

                        },
                        onError: _this3.props.onError
                    });
                }
            }, {
                location: /^\/admin\/metadatos/,
                element: function element() {
                    return _react2.default.createElement(_ListMetadatas2.default, {
                        icons: icons,
                        layout: function layout(_ref11) {
                            var children = _ref11.children,
                                props = _objectWithoutProperties(_ref11, ["children"]);

                            return _react2.default.createElement(
                                Layout,
                                props,
                                children
                            );
                        },
                        api: {
                            collectMetadatas: function collectMetadatas() {
                                var _props$api$calls18;

                                for (var _len31 = arguments.length, props = Array(_len31), _key31 = 0; _key31 < _len31; _key31++) {
                                    props[_key31] = arguments[_key31];
                                }

                                return (_props$api$calls18 = _this3.props.api.calls).collectMetadatas.apply(_props$api$calls18, [_this3.props.api.base, user.token].concat(props));
                            }
                        },
                        onSelect: function onSelect(id) {
                            _this3.props.navigation.onNavigate("/admin/metadato", {
                                id: id
                            });
                        },
                        onError: _this3.props.onError
                    });
                }
            }, {
                location: /^\/admin\/metadato/,
                element: function element() {
                    return _react2.default.createElement(_EditMetadata2.default, {
                        icons: icons,
                        layout: function layout(_ref12) {
                            var children = _ref12.children,
                                props = _objectWithoutProperties(_ref12, ["children"]);

                            return _react2.default.createElement(
                                Layout,
                                props,
                                children
                            );
                        },
                        api: {
                            pickMetadata: function pickMetadata() {
                                var _props$api$calls19;

                                for (var _len32 = arguments.length, props = Array(_len32), _key32 = 0; _key32 < _len32; _key32++) {
                                    props[_key32] = arguments[_key32];
                                }

                                return (_props$api$calls19 = _this3.props.api.calls).pickMetadata.apply(_props$api$calls19, [_this3.props.api.base].concat(props));
                            },
                            updateMetadata: function updateMetadata() {
                                var _props$api$calls20;

                                for (var _len33 = arguments.length, props = Array(_len33), _key33 = 0; _key33 < _len33; _key33++) {
                                    props[_key33] = arguments[_key33];
                                }

                                return (_props$api$calls20 = _this3.props.api.calls).updateMetadata.apply(_props$api$calls20, [_this3.props.api.base, user.token].concat(props));
                            }
                        },
                        id: _this3.props.navigation.payload.id,
                        onEdit: function onEdit() {
                            _this3.props.navigation.onNavigate("/admin/metadatos");
                        },
                        onCancel: function onCancel() {
                            _this3.props.navigation.onNavigate("/admin/metadatos");
                        },
                        onError: _this3.props.onError
                    });
                }
            }, {
                location: /^\/admin\/usuarios/,
                element: function element() {
                    return _react2.default.createElement(_ListUsers2.default, {
                        icons: icons,
                        layout: function layout(_ref13) {
                            var children = _ref13.children,
                                props = _objectWithoutProperties(_ref13, ["children"]);

                            return _react2.default.createElement(
                                Layout,
                                props,
                                children
                            );
                        },
                        api: {
                            userland: {
                                registration: {
                                    computeUsers: function computeUsers() {
                                        var _props$api$calls$user6;

                                        for (var _len34 = arguments.length, props = Array(_len34), _key34 = 0; _key34 < _len34; _key34++) {
                                            props[_key34] = arguments[_key34];
                                        }

                                        return (_props$api$calls$user6 = _this3.props.api.calls.userland.registration).computeUsers.apply(_props$api$calls$user6, [_this3.props.api.base, user.token].concat(props));
                                    }
                                }
                            }
                        },
                        onError: _this3.props.onError
                    });
                }
            }, {
                location: /^\/admin\/usuario/,
                element: function element() {
                    return _react2.default.createElement(_ViewUser2.default, {
                        icons: icons,
                        layout: function layout(_ref14) {
                            var children = _ref14.children,
                                props = _objectWithoutProperties(_ref14, ["children"]);

                            return _react2.default.createElement(
                                Layout,
                                props,
                                children
                            );
                        },
                        api: {
                            userland: {
                                log: {
                                    collectEvents: function collectEvents() {
                                        var _props$api$calls$user7;

                                        for (var _len35 = arguments.length, props = Array(_len35), _key35 = 0; _key35 < _len35; _key35++) {
                                            props[_key35] = arguments[_key35];
                                        }

                                        return (_props$api$calls$user7 = _this3.props.api.calls.userland.log).collectEvents.apply(_props$api$calls$user7, [_this3.props.api.base, user.token].concat(props));
                                    }
                                },
                                registration: {
                                    pickUserAsOperator: function pickUserAsOperator() {
                                        var _props$api$calls$user8;

                                        for (var _len36 = arguments.length, props = Array(_len36), _key36 = 0; _key36 < _len36; _key36++) {
                                            props[_key36] = arguments[_key36];
                                        }

                                        return (_props$api$calls$user8 = _this3.props.api.calls.userland.registration).pickUserAsOperator.apply(_props$api$calls$user8, [_this3.props.api.base, user.token].concat(props));
                                    }
                                },
                                phone: {
                                    pickUserAsOperator: function pickUserAsOperator() {
                                        var _props$api$calls$user9;

                                        for (var _len37 = arguments.length, props = Array(_len37), _key37 = 0; _key37 < _len37; _key37++) {
                                            props[_key37] = arguments[_key37];
                                        }

                                        return (_props$api$calls$user9 = _this3.props.api.calls.userland.phone).pickUserAsOperator.apply(_props$api$calls$user9, [_this3.props.api.base, user.token].concat(props));
                                    },
                                    collectUsers: function collectUsers() {
                                        var _props$api$calls$user10;

                                        for (var _len38 = arguments.length, props = Array(_len38), _key38 = 0; _key38 < _len38; _key38++) {
                                            props[_key38] = arguments[_key38];
                                        }

                                        return (_props$api$calls$user10 = _this3.props.api.calls.userland.phone).collectUsers.apply(_props$api$calls$user10, [_this3.props.api.base, user.token].concat(props));
                                    }
                                },
                                stripe: {
                                    pickUserAsOperator: function pickUserAsOperator() {
                                        var _props$api$calls$user11;

                                        for (var _len39 = arguments.length, props = Array(_len39), _key39 = 0; _key39 < _len39; _key39++) {
                                            props[_key39] = arguments[_key39];
                                        }

                                        return (_props$api$calls$user11 = _this3.props.api.calls.userland.stripe).pickUserAsOperator.apply(_props$api$calls$user11, [_this3.props.api.base, user.token].concat(props));
                                    },
                                    collectCardsAsOperator: function collectCardsAsOperator() {
                                        var _props$api$calls$user12;

                                        for (var _len40 = arguments.length, props = Array(_len40), _key40 = 0; _key40 < _len40; _key40++) {
                                            props[_key40] = arguments[_key40];
                                        }

                                        return (_props$api$calls$user12 = _this3.props.api.calls.userland.stripe).collectCardsAsOperator.apply(_props$api$calls$user12, [_this3.props.api.base, user.token].concat(props));
                                    },
                                    card: {
                                        collectErrors: function collectErrors() {
                                            var _props$api$calls$user13;

                                            for (var _len41 = arguments.length, props = Array(_len41), _key41 = 0; _key41 < _len41; _key41++) {
                                                props[_key41] = arguments[_key41];
                                            }

                                            return (_props$api$calls$user13 = _this3.props.api.calls.userland.stripe.card).collectErrors.apply(_props$api$calls$user13, [_this3.props.api.base, user.token].concat(props));
                                        }
                                    }
                                },
                                blacklist: {
                                    pickUserAsOperator: function pickUserAsOperator() {
                                        var _props$api$calls$user14;

                                        for (var _len42 = arguments.length, props = Array(_len42), _key42 = 0; _key42 < _len42; _key42++) {
                                            props[_key42] = arguments[_key42];
                                        }

                                        return (_props$api$calls$user14 = _this3.props.api.calls.userland.blacklist).pickUserAsOperator.apply(_props$api$calls$user14, [_this3.props.api.base, user.token].concat(props));
                                    },
                                    banUser: function banUser() {
                                        var _props$api$calls$user15;

                                        for (var _len43 = arguments.length, props = Array(_len43), _key43 = 0; _key43 < _len43; _key43++) {
                                            props[_key43] = arguments[_key43];
                                        }

                                        return (_props$api$calls$user15 = _this3.props.api.calls.userland.blacklist).banUser.apply(_props$api$calls$user15, [_this3.props.api.base, user.token].concat(props));
                                    }
                                }
                            },
                            collectTopupsByContactsAsOperator: function collectTopupsByContactsAsOperator() {
                                var _props$api$calls21;

                                for (var _len44 = arguments.length, props = Array(_len44), _key44 = 0; _key44 < _len44; _key44++) {
                                    props[_key44] = arguments[_key44];
                                }

                                return (_props$api$calls21 = _this3.props.api.calls).collectTopupsByContactsAsOperator.apply(_props$api$calls21, [_this3.props.api.base, user.token].concat(props));
                            },
                            collectContactsAsOperator: function collectContactsAsOperator() {
                                var _props$api$calls22;

                                for (var _len45 = arguments.length, props = Array(_len45), _key45 = 0; _key45 < _len45; _key45++) {
                                    props[_key45] = arguments[_key45];
                                }

                                return (_props$api$calls22 = _this3.props.api.calls).collectContactsAsOperator.apply(_props$api$calls22, [_this3.props.api.base, user.token].concat(props));
                            },
                            collectCountries: function collectCountries() {
                                var _props$api$calls23;

                                for (var _len46 = arguments.length, props = Array(_len46), _key46 = 0; _key46 < _len46; _key46++) {
                                    props[_key46] = arguments[_key46];
                                }

                                return (_props$api$calls23 = _this3.props.api.calls).collectCountries.apply(_props$api$calls23, [_this3.props.api.base].concat(props));
                            },
                            collectProviders: function collectProviders() {
                                var _props$api$calls24;

                                for (var _len47 = arguments.length, props = Array(_len47), _key47 = 0; _key47 < _len47; _key47++) {
                                    props[_key47] = arguments[_key47];
                                }

                                return (_props$api$calls24 = _this3.props.api.calls).collectProviders.apply(_props$api$calls24, [_this3.props.api.base].concat(props));
                            },
                            trySendingTopupAgain: function trySendingTopupAgain() {
                                var _props$api$calls25;

                                for (var _len48 = arguments.length, props = Array(_len48), _key48 = 0; _key48 < _len48; _key48++) {
                                    props[_key48] = arguments[_key48];
                                }

                                return (_props$api$calls25 = _this3.props.api.calls).trySendingTopupAgain.apply(_props$api$calls25, [_this3.props.api.base, user.token].concat(props));
                            },
                            sendDelayedTopup: function sendDelayedTopup() {
                                var _props$api$calls26;

                                for (var _len49 = arguments.length, props = Array(_len49), _key49 = 0; _key49 < _len49; _key49++) {
                                    props[_key49] = arguments[_key49];
                                }

                                return (_props$api$calls26 = _this3.props.api.calls).sendDelayedTopup.apply(_props$api$calls26, [_this3.props.api.base, user.token].concat(props));
                            },
                            refundTopup: function refundTopup() {
                                var _props$api$calls27;

                                for (var _len50 = arguments.length, props = Array(_len50), _key50 = 0; _key50 < _len50; _key50++) {
                                    props[_key50] = arguments[_key50];
                                }

                                return (_props$api$calls27 = _this3.props.api.calls).refundTopup.apply(_props$api$calls27, [_this3.props.api.base, user.token].concat(props));
                            }
                        },
                        id: _this3.props.navigation.payload.id,
                        onBack: function onBack() {
                            _this3.props.navigation.onNavigate("/admin/usuarios");
                        },
                        onError: _this3.props.onError
                    });
                },
                default: true
            }, {
                location: /^\/admin\/reventa/,
                element: function element() {
                    return _react2.default.createElement(_Front2.default, {
                        icons: _this3.props.icons,
                        layout: Layout,
                        user: _this3.props.user,
                        api: _this3.props.api,
                        navigation: _this3.props.navigation,
                        onError: _this3.props.onError
                    });
                }
            }]);
        }
    }]);

    return Front;
}(_react2.default.Component);

Front.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    blankLayout: _propTypes2.default.func.isRequired,
    drawerLayout: _propTypes2.default.func.isRequired,
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
    onAuthenticated: _propTypes2.default.func.isRequired, // (token)
    onError: _propTypes2.default.func.isRequired // ({code})
};
exports.default = Front;