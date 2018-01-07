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

var _LoginBlock = require("../Common/LoginBlock");

var _LoginBlock2 = _interopRequireDefault(_LoginBlock);

var _SetAccountBlock = require("../Common/SendTopup/SetAccountBlock");

var _SetAccountBlock2 = _interopRequireDefault(_SetAccountBlock);

var _SetProviderBlock = require("../Common/SendTopup/SetProviderBlock");

var _SetProviderBlock2 = _interopRequireDefault(_SetProviderBlock);

var _SetProductBlock = require("../Common/SendTopup/SetProductBlock");

var _SetProductBlock2 = _interopRequireDefault(_SetProductBlock);

var _SetPaymentBlock = require("../Common/SendTopup/SetPaymentBlock");

var _SetPaymentBlock2 = _interopRequireDefault(_SetPaymentBlock);

var _PreRegistrationBock = require("../Common/SendTopup/PreRegistrationBock");

var _PreRegistrationBock2 = _interopRequireDefault(_PreRegistrationBock);

var _ExecuteBock = require("./SendTopup/ExecuteBock");

var _ExecuteBock2 = _interopRequireDefault(_ExecuteBock);

var _FinishBock = require("./SendTopup/FinishBock");

var _FinishBock2 = _interopRequireDefault(_FinishBock);

var _InnerLayoutBlock = require("../Common/InnerLayoutBlock");

var _InnerLayoutBlock2 = _interopRequireDefault(_InnerLayoutBlock);

var _LayoutBlock = require("../Common/SendTopup/LayoutBlock");

var _LayoutBlock2 = _interopRequireDefault(_LayoutBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SendTopupToUnknown = function (_React$Component) {
    _inherits(SendTopupToUnknown, _React$Component);

    function SendTopupToUnknown() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SendTopupToUnknown);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SendTopupToUnknown.__proto__ || Object.getPrototypeOf(SendTopupToUnknown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            step: "account", // "account", "provider", "product", "pre-registration", "registration", "payment", "execution", "finish"
            country: null,
            providers: null,
            promotions: null,
            photo: null,
            account: null,
            type: null,
            provider: null,
            product: null,
            combination: null,
            card: null,
            paid: null,
            progress: 0
        }, _this._handleBack = function () {
            if (_this.state.step === "account") {
                _this.props.onBack();
            } else if (_this.state.step === "provider") {
                _this.setState({
                    progress: 0,
                    step: "account",
                    provider: null
                });
            } else if (_this.state.step === "product") {
                _this.setState({
                    progress: 0,
                    step: "provider",
                    product: null
                });
            } else if (_this.state.step === "pre-registration") {
                _this.setState({
                    step: "product"
                });
            } else if (_this.state.step === "registration") {
                _this.setState({
                    step: "product"
                });
            } else if (_this.state.step === "payment") {
                _this.setState({
                    progress: 0,
                    step: "product"
                });
            } else if (_this.state.step === "execution") {
                // Is not executing?
                if (_this.state.progress === 0) {
                    _this.setState({
                        step: "payment"
                    });
                }
            } else if (_this.state.step === "finish") {
                _this.props.onFinish(_this.props.id);
            }

            return true;
        }, _this._handleProgress = function (progress) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            _this.setState(function (prevState) {
                return {
                    progress: prevState.progress + (progress === true ? 1 : -1)
                };
            }, callback);
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children;

            var keywords = void 0;

            if (_this.state.providers !== null && _this.state.promotions !== null) {
                var providers = _this.state.providers.map(function (_ref3) {
                    var name = _ref3.name;

                    return name;
                });

                var promotions = _this.state.promotions.map(function (_ref4) {
                    var title = _ref4.title,
                        headline = _ref4.headline,
                        type = _ref4.type,
                        validity = _ref4.validity;

                    return [title, headline, type, validity].filter(function (x) {
                        return x;
                    }).join(" , ");
                });

                keywords = providers.concat(promotions).filter(function (x) {
                    return x;
                }).join(" , ");
            }

            return _react2.default.createElement(
                _LayoutBlock2.default,
                {
                    layout: _this.props.layout,
                    icons: _this.props.icons,
                    country: _this.state.country,
                    keywords: keywords,
                    progress: _this.state.progress,
                    onBack: _this._handleBack
                },
                children
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SendTopupToUnknown, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            _ui.Platform.back.add(this._handleBack);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this._handleProgress(true, function () {
                _this2.props.api.pickCountry(_this2.props.country).then(function (country) {
                    _this2.setState({
                        country: country,
                        step: "account"
                    }, function () {
                        _this2._handleProgress(false, function () {
                            _this2._handleProgress(true, function () {
                                _this2.props.api.collectProviders(null, _this2.state.country.iso).then(function (providers) {
                                    _this2.setState({
                                        providers: providers
                                    }, function () {
                                        providers = _this2.state.providers.map(function (_ref5) {
                                            var id = _ref5.id;

                                            return id;
                                        });

                                        _this2.props.api.collectPromotions(providers, Date.now() / 1000).then(function (promotions) {
                                            _this2.setState({
                                                promotions: promotions
                                            }, function () {
                                                _this2._handleProgress(false);
                                            });
                                        }).catch(_this2.props.onError);
                                    });
                                }).catch(_this2.props.onError);
                            });

                            _this2._handleProgress(true, function () {
                                _this2.props.api.country.pickPhoto(_this2.state.country.iso).then(function (_ref6) {
                                    var original = _ref6.original;

                                    _this2.setState({
                                        photo: original
                                    }, function () {
                                        _this2._handleProgress(false);
                                    });
                                }).catch(function (response) {
                                    var code = response.code;


                                    switch (code) {
                                        case "country.nonexistent-photo-exception":
                                            _this2.setState({
                                                photo: require("../Common/city.jpg")
                                            }, function () {
                                                _this2._handleProgress(false);
                                            });

                                            break;
                                        default:
                                            _this2.props.onError(response);
                                    }
                                });
                            });
                        });
                    });
                }).catch(function (response) {
                    _this2._handleProgress(false, function () {
                        var code = response.code;


                        switch (code) {
                            case "nonexistent-country-exception":
                                _this2.props.onNonexistentCountry();

                                break;
                            default:
                                _this2.props.onError(response);
                        }
                    });
                });
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps, nextContext) {
            if (
            // Did the user registered?
            this.props.user !== nextProps.user && nextProps.user
            // And it's still on registration?
            && this.state.step === "registration") {
                // Change step to payment
                this.setState({
                    step: "payment"
                });
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _ui.Platform.back.remove(this._handleBack);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var Layout = this._buildLayout;

            if (this.state.providers === null || this.state.promotions === null || this.state.photo === null) {
                return _react2.default.createElement(Layout, null);
            }

            return _react2.default.createElement(
                Layout,
                null,
                _react2.default.createElement(
                    _InnerLayoutBlock2.default,
                    {
                        photo: this.state.photo
                    },
                    (this.state.step === "account" || this.state.step === "provider" || this.state.step === "product" || this.state.step === "pre-registration" || this.state.step === "registration" || this.state.step === "payment" || this.state.step === "execution") && _react2.default.createElement(_SetAccountBlock2.default, {
                        width: this.props.width,
                        icons: this.props.icons,
                        api: this.props.api,
                        providers: this.state.providers,
                        promotions: this.state.promotions,
                        country: this.state.country,
                        account: this.state.account,
                        photo: this.state.photo,
                        edit: this.state.step === "account",
                        onProgress: this._handleProgress,
                        onSet: function onSet(account, type) {
                            _this3.setState({
                                account: account,
                                type: type,
                                step: "provider"
                            });
                        },
                        onEdit: function onEdit() {
                            _this3.setState({
                                provider: null,
                                product: null,
                                step: "account"
                            });
                        },
                        onBack: this.props.onBack,
                        onError: this.props.onError
                    }),
                    (this.state.step === "provider" || this.state.step === "product" || this.state.step === "pre-registration" || this.state.step === "registration" || this.state.step === "payment" || this.state.step === "execution") && _react2.default.createElement(_SetProviderBlock2.default, {
                        icons: this.props.icons,
                        api: this.props.api,
                        country: this.state.country,
                        account: this.state.account,
                        type: this.state.type,
                        onSet: function onSet(provider) {
                            _this3.setState({
                                provider: provider,
                                step: "product"
                            });
                        },
                        onEdit: function onEdit() {
                            _this3.setState({
                                product: null,
                                step: "provider"
                            });
                        },
                        onProgress: this._handleProgress,
                        onError: this.props.onError
                    }),
                    (this.state.step === "product" || this.state.step === "pre-registration" || this.state.step === "registration" || this.state.step === "payment" || this.state.step === "execution") && _react2.default.createElement(_SetProductBlock2.default, {
                        icons: this.props.icons,
                        api: {
                            collectPromotions: this.props.api.collectPromotions,
                            resolveProducts: this.props.api.resolveProducts
                        },
                        country: this.state.country,
                        account: this.state.account,
                        provider: this.state.provider,
                        edit: this.state.step === "product",
                        onProgress: this._handleProgress,
                        onSet: function onSet(product, combination) {
                            _this3.setState({
                                product: product,
                                combination: combination,
                                step: _this3.props.user.token === null ? "pre-registration" : "payment"
                            });
                        },
                        onEdit: function onEdit() {
                            _this3.setState({
                                step: "product"
                            });
                        },
                        onError: this.props.onError
                    }),
                    this.state.step === "pre-registration" && _react2.default.createElement(_PreRegistrationBock2.default, {
                        icons: this.props.icons,
                        onContinue: function onContinue() {
                            _this3.setState({
                                step: "registration"
                            });
                        }
                    }),
                    this.state.step === "registration" && _react2.default.createElement(_LoginBlock2.default, {
                        icons: this.props.icons,
                        user: this.props.user,
                        api: {
                            startAuthentication: this.props.api.userland.startAuthentication,
                            completeAuthentication: this.props.api.userland.completeAuthentication
                        },
                        onProgress: this._handleProgress,
                        onAuthenticated: this.props.onAuthenticated
                    }),
                    (this.state.step === "payment" || this.state.step === "execution") && _react2.default.createElement(_SetPaymentBlock2.default, {
                        icons: this.props.icons,
                        phone: this.props.user.phone,
                        api: {
                            setupCard: this.props.api.userland.stripe.setupCard,
                            collectCards: this.props.api.userland.stripe.collectCardsAsClient,
                            deleteCard: this.props.api.userland.stripe.deleteCard
                        },
                        onSet: function onSet(card) {
                            _this3.setState({
                                card: card,
                                step: "execution"
                            });
                        },
                        onEdit: function onEdit() {
                            _this3.setState({
                                step: "payment"
                            });
                        },
                        onProgress: this._handleProgress
                    }),
                    this.state.step === "execution" && _react2.default.createElement(_ExecuteBock2.default, {
                        icons: this.props.icons,
                        api: {
                            sendTopup: this.props.api.sendTopup
                        },
                        country: this.state.country,
                        account: this.state.account,
                        type: this.state.type,
                        product: this.state.product,
                        combination: this.state.combination,
                        card: this.state.card,
                        onProgress: this._handleProgress,
                        onPaid: function onPaid(contact) {
                            _this3.setState({
                                paid: contact,
                                step: "finish"
                            });
                        },
                        onError: this.props.onError,
                        errors: this.props.errors
                    }),
                    this.state.step === "finish" && _react2.default.createElement(_FinishBock2.default, {
                        icons: this.props.icons,
                        country: this.state.country,
                        account: this.state.account,
                        type: this.state.type,
                        onFinish: function onFinish() {
                            _this3.props.onFinish(_this3.state.paid);
                        },
                        onNavigateToAndroidApp: this.props.onNavigateToAndroidApp,
                        onNavigateToIosApp: this.props.onNavigateToIosApp,
                        onError: this.props.onError
                    })
                )
            );
        }
    }]);

    return SendTopupToUnknown;
}(_react2.default.Component);

SendTopupToUnknown.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    user: _propTypes2.default.object.isRequired,
    country: _propTypes2.default.string.isRequired, // iso
    onAuthenticated: _propTypes2.default.func.isRequired, // (authentication)
    onFinish: _propTypes2.default.func.isRequired, // (contact)
    onBack: _propTypes2.default.func.isRequired, // ()
    onNonexistentCountry: _propTypes2.default.func.isRequired, // ()
    onNavigateToAndroidApp: _propTypes2.default.func.isRequired, // ()
    onNavigateToIosApp: _propTypes2.default.func.isRequired, // ()
    onError: _propTypes2.default.func.isRequired
};
exports.default = _ui.Platform.dimensions.withWidth()(SendTopupToUnknown);