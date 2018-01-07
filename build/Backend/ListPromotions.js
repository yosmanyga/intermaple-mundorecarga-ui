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

var _PromotionCard = require("./PromotionCard");

var _PromotionCard2 = _interopRequireDefault(_PromotionCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListPromotions = function (_React$Component) {
    _inherits(ListPromotions, _React$Component);

    function ListPromotions() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, ListPromotions);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListPromotions.__proto__ || Object.getPrototypeOf(ListPromotions)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            filter: {
                favorites: true,
                new: false
            },
            countries: null,
            providers: null,
            promotions: null,
            progress: 0
        }, _this._collectPromotions = function () {
            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            _this._handleProgress(true, function () {
                _this.props.api.collectPromotions(null, null).then(function (promotions) {
                    _this._handleProgress(false, function () {
                        _this.setState({
                            promotions: promotions
                        }, callback);
                    });
                }).catch(_this.props.onError);
            });
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["children"]);

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
                    title: "Pa\xEDses",
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

    _createClass(ListPromotions, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            this._handleProgress(true, function () {
                _this3.props.api.collectCountries(null).then(function (countries) {
                    _this3._handleProgress(false, function () {
                        _this3.setState({
                            countries: countries
                        });
                    });
                }).catch(_this3.props.onError);
            });

            this._handleProgress(true, function () {
                _this3.props.api.collectProviders(null, null).then(function (providers) {
                    _this3._handleProgress(false, function () {
                        _this3.setState({
                            providers: providers
                        });
                    });
                }).catch(_this3.props.onError);
            });

            this._collectPromotions();
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var Layout = this._buildLayout;

            if (this.state.countries === null || this.state.providers === null || this.state.promotions === null) {
                return _react2.default.createElement(Layout, null);
            }

            return _react2.default.createElement(
                Layout,
                null,
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }
                    },
                    _react2.default.createElement(_ui.Checkbox, {
                        label: "Pa\xEDses favoritos",
                        checked: this.state.filter.favorites,
                        onChange: function onChange(value) {
                            _this4.setState({
                                filter: _extends({}, _this4.state.filter, {
                                    favorites: value
                                })
                            });
                        }
                    }),
                    _react2.default.createElement(_ui.Checkbox, {
                        label: "Promociones nuevas",
                        checked: this.state.filter.new,
                        margin: {
                            left: 8
                        },
                        onChange: function onChange(value) {
                            _this4.setState({
                                filter: _extends({}, _this4.state.filter, {
                                    new: value
                                })
                            });
                        }
                    })
                ),
                this.state.countries
                // Just leave countries with promotions
                .filter(function (_ref3) {
                    var iso = _ref3.iso,
                        favorite = _ref3.favorite;

                    // Apply favorites filter
                    if (_this4.state.filter.favorites === true && favorite === false) {
                        return false;
                    }

                    var count = 0;

                    _this4.state.providers.filter(function (_ref4) {
                        var country = _ref4.country;

                        return country === iso;
                    }).forEach(function (_ref5) {
                        var id = _ref5.id;

                        var promotions = _this4.state.promotions.filter(function (_ref6) {
                            var provider = _ref6.provider;

                            return provider === id;
                        }).filter(function (_ref7) {
                            var title = _ref7.title;

                            // Apply new filter (promotions with title are not new)
                            return _this4.state.filter.new === false || !title;
                        });

                        count += promotions.length;
                    });

                    return count > 0;
                }).map(function (_ref8) {
                    var iso = _ref8.iso,
                        name = _ref8.name;

                    var count = 0;

                    _this4.state.providers.filter(function (_ref9) {
                        var country = _ref9.country;

                        return country === iso;
                    }).forEach(function (_ref10) {
                        var id = _ref10.id;

                        var promotions = _this4.state.promotions.filter(function (_ref11) {
                            var provider = _ref11.provider;

                            return provider === id;
                        });

                        count += promotions.length;
                    });

                    var providers = _this4.state.providers.filter(function (_ref12) {
                        var country = _ref12.country;

                        return country === iso;
                    }).map(function (_ref13) {
                        var id = _ref13.id,
                            name = _ref13.name,
                            logo = _ref13.logo;

                        var promotions = _this4.state.promotions.filter(function (_ref14) {
                            var provider = _ref14.provider;

                            return provider === id;
                        }).map(function (promotion) {
                            return _react2.default.createElement(_PromotionCard2.default, {
                                key: id,
                                icons: _this4.props.icons,
                                api: {
                                    updateTitle: _this4.props.api.promotion.updateTitle
                                },
                                promotion: promotion,
                                onProgress: _this4._handleProgress,
                                onUpdate: function onUpdate(callback) {
                                    _this4._collectPromotions(callback);
                                }
                            });
                        });

                        if (promotions.length === 0) {
                            return null;
                        }

                        return _react2.default.createElement(_ui.Card, {
                            key: id,
                            header: {
                                avatar: _react2.default.createElement(_ui.Image, {
                                    source: logo,
                                    width: 24
                                }),
                                title: name
                            },
                            content: promotions,
                            margin: {
                                bottom: 8
                            }
                        });
                    });

                    return _react2.default.createElement(_ui.Card, {
                        key: iso,
                        header: {
                            avatar: _react2.default.createElement(_ui.Flag, {
                                iso: iso,
                                name: name,
                                size: "sm",
                                margin: { right: 1 }
                            }),
                            title: _react2.default.createElement(
                                _ui.Text,
                                {
                                    type: "h6",
                                    margin: { left: 1 }
                                },
                                name,
                                " (",
                                count === 1 ? "1 promoción" : count + " promociones",
                                ")"
                            )
                        },
                        content: providers,
                        margin: {
                            bottom: 8
                        }
                    });
                })
            );
        }
    }]);

    return ListPromotions;
}(_react2.default.Component);

ListPromotions.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.shape({
        collectCountries: _propTypes2.default.func.isRequired,
        collectProviders: _propTypes2.default.func.isRequired,
        collectPromotions: _propTypes2.default.func.isRequired,
        promotion: _propTypes2.default.shape({
            updateTitle: _propTypes2.default.func.isRequired
        }).isRequired
    }).isRequired,
    onError: _propTypes2.default.func.isRequired
};
exports.default = ListPromotions;