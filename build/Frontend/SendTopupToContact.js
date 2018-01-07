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

var _Row = require("../Common/Row");

var _Row2 = _interopRequireDefault(_Row);

var _Subtitle = require("../Common/Subtitle");

var _Subtitle2 = _interopRequireDefault(_Subtitle);

var _SetProviderBlock = require("../Common/SendTopup/SetProviderBlock");

var _SetProviderBlock2 = _interopRequireDefault(_SetProviderBlock);

var _SetProductBlock = require("../Common/SendTopup/SetProductBlock");

var _SetProductBlock2 = _interopRequireDefault(_SetProductBlock);

var _SetPaymentBlock = require("../Common/SendTopup/SetPaymentBlock");

var _SetPaymentBlock2 = _interopRequireDefault(_SetPaymentBlock);

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

var SendTopupToContact = function (_React$Component) {
    _inherits(SendTopupToContact, _React$Component);

    function SendTopupToContact() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SendTopupToContact);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SendTopupToContact.__proto__ || Object.getPrototypeOf(SendTopupToContact)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            step: "product", // "product",, "payment", "execution", "finish"
            countries: null,
            contact: null,
            country: null,
            photo: null,
            provider: null,
            product: null,
            combination: null,
            promotion: null,
            card: null,
            paid: null,
            progress: 0
        }, _this._handleBack = function () {
            if (_this.state.step === "provider") {
                _this.props.onBack(_this.props.id);
            } else if (_this.state.step === "product") {
                _this.props.onBack(_this.props.id);
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

            return _react2.default.createElement(
                _LayoutBlock2.default,
                {
                    layout: _this.props.layout,
                    icons: _this.props.icons,
                    country: _this.state.country,
                    progress: _this.state.progress,
                    onBack: _this._handleBack
                },
                children
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SendTopupToContact, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            _ui.Platform.back.add(this._handleBack);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this._handleProgress(true, function () {
                _this2.props.api.pickContactAsClient(_this2.props.id).then(function (contact) {
                    _this2.setState({
                        contact: contact
                    }, function () {
                        Promise.all([_this2.props.api.pickCountry(contact.country), _this2.props.api.pickProvider(contact.provider, null)]).then(function (values) {
                            _this2.setState({
                                country: values[0],
                                provider: values[1]
                            }, function () {
                                _this2._handleProgress(false);
                            });
                        });
                    });
                }).catch(_this2.props.onError);
            });
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState, nextContext) {
            var _this3 = this;

            if (prevState.country !== this.state.country) {
                this._handleProgress(true, function () {
                    _this3.props.api.country.pickPhoto(_this3.state.country.iso).then(function (_ref3) {
                        var original = _ref3.original;

                        _this3.setState({
                            photo: original
                        }, function () {
                            _this3._handleProgress(false);
                        });
                    }).catch(function (response) {
                        var code = response.code;


                        switch (code) {
                            case "country.nonexistent-photo-exception":
                                _this3.setState({
                                    photo: require("../Common/city.jpg")
                                }, function () {
                                    _this3._handleProgress(false);
                                });

                                break;
                            default:
                                _this3.props.onError(response);
                        }
                    });
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
            var _this4 = this;

            var Layout = this._buildLayout;

            if (this.state.contact === null || this.state.country === null || this.state.provider === null) {
                return _react2.default.createElement(Layout, null);
            }

            return _react2.default.createElement(
                Layout,
                null,
                this.state.photo !== null && _react2.default.createElement(
                    _InnerLayoutBlock2.default,
                    {
                        photo: this.state.photo
                    },
                    (this.state.step === "provider" || this.state.step === "product" || this.state.step === "payment" || this.state.step === "execution") && _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        _react2.default.createElement(
                            _Subtitle2.default,
                            null,
                            "N\xFAmero de tel\xE9fono"
                        ),
                        _react2.default.createElement(_Row2.default, {
                            margin: {
                                top: 8
                            },
                            left: _react2.default.createElement(
                                _ui.Container,
                                null,
                                _react2.default.createElement(_ui.Flag, {
                                    iso: this.state.country.iso,
                                    size: "sm"
                                })
                            ),
                            body: _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "column",
                                    align: {
                                        justifyContent: "flex-start",
                                        alignItems: "flex-start"
                                    }
                                },
                                _react2.default.createElement(
                                    _ui.Text,
                                    null,
                                    this.state.contact.type === "phone" ? "+" + this.state.contact.prefix + "-" + this.state.contact.account : this.state.contact.account
                                ),
                                this.state.contact.name !== "" && _react2.default.createElement(
                                    _ui.Text,
                                    {
                                        variant: "caption"
                                    },
                                    this.state.contact.name
                                )
                            )
                        })
                    ),
                    (this.state.step === "provider" || this.state.step === "product" || this.state.step === "payment" || this.state.step === "execution") && _react2.default.createElement(_SetProviderBlock2.default, {
                        icons: this.props.icons,
                        api: this.props.api,
                        country: this.state.country,
                        account: this.state.contact.account,
                        type: this.state.contact.type,
                        provider: this.state.provider,
                        onSet: function onSet(provider) {
                            _this4.setState({
                                provider: provider,
                                step: "product"
                            });
                        },
                        onEdit: function onEdit() {
                            _this4.setState({
                                product: null,
                                step: "provider"
                            });
                        },
                        onProgress: this._handleProgress,
                        onError: this.props.onError
                    }),
                    (this.state.step === "product" || this.state.step === "payment" || this.state.step === "execution") && _react2.default.createElement(_SetProductBlock2.default, {
                        icons: this.props.icons,
                        api: {
                            collectPromotions: this.props.api.collectPromotions,
                            resolveProducts: this.props.api.resolveProducts
                        },
                        country: this.state.country,
                        account: this.state.contact.account,
                        provider: this.state.provider,
                        edit: this.state.step === "product",
                        onProgress: this._handleProgress,
                        onSet: function onSet(product, combination) {
                            _this4.setState({
                                product: product,
                                combination: combination,
                                step: "payment"
                            });
                        },
                        onEdit: function onEdit() {
                            _this4.setState({
                                step: "product"
                            });
                        },
                        onError: this.props.onError
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
                            _this4.setState({
                                card: card,
                                step: "execution"
                            });
                        },
                        onEdit: function onEdit() {
                            _this4.setState({
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
                        account: this.state.contact.account,
                        type: this.state.contact.type,
                        product: this.state.product,
                        combination: this.state.combination,
                        card: this.state.card,
                        onProgress: this._handleProgress,
                        onPaid: function onPaid(contact) {
                            _this4.setState({
                                paid: contact,
                                step: "finish"
                            });
                        },
                        onError: this.props.onError
                    }),
                    this.state.step === "finish" && _react2.default.createElement(_FinishBock2.default, {
                        icons: this.props.icons,
                        country: this.state.country,
                        account: this.state.contact.account,
                        type: this.state.contact.type,
                        name: this.state.contact.name,
                        onFinish: function onFinish() {
                            _this4.props.onFinish(_this4.state.paid);
                        },
                        onNavigateToAndroidApp: this.props.onNavigateToAndroidApp,
                        onNavigateToIosApp: this.props.onNavigateToIosApp,
                        onError: this.props.onError
                    })
                )
            );
        }
    }]);

    return SendTopupToContact;
}(_react2.default.Component);

SendTopupToContact.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    user: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    onFinish: _propTypes2.default.func.isRequired, // (contact)
    onBack: _propTypes2.default.func.isRequired, // (contact)
    onNavigateToAndroidApp: _propTypes2.default.func.isRequired, // ()
    onNavigateToIosApp: _propTypes2.default.func.isRequired, // ()
    onError: _propTypes2.default.func.isRequired
};
exports.default = _ui.Platform.dimensions.withWidth()(SendTopupToContact);