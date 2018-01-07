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

var ManageCountry = function (_React$Component) {
    _inherits(ManageCountry, _React$Component);

    function ManageCountry() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, ManageCountry);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ManageCountry.__proto__ || Object.getPrototypeOf(ManageCountry)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            country: null,
            tab: 0,
            progress: 0
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["children"]);

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
                    title: "Gestionar pa\xEDs",
                    progress: _this.state.progress > 0
                }),
                children
            );
        }, _this._handleChangeTab = function (value) {
            _this.setState({
                tab: value
            });
        }, _this._handleProgress = function (progress) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            _this.setState(function (prevState) {
                return {
                    progress: prevState.progress + (progress === true ? 1 : -1)
                };
            }, callback);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ManageCountry, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            this._handleProgress(true, function () {
                _this3.props.api.pickCountry(_this3.props.iso).then(function (country) {
                    _this3._handleProgress(false, function () {
                        _this3.setState({
                            country: country
                        });
                    });
                }).catch(_this3.props.onError);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var Layout = this._buildLayout;

            if (this.state.country === null || this.state.providers === null || this.state.promotions === null) {
                return _react2.default.createElement(Layout, null);
            }

            return _react2.default.createElement(
                Layout,
                null,
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row"
                    },
                    _react2.default.createElement(_ui.Flag, {
                        iso: this.state.country.iso,
                        name: this.state.country.name,
                        size: "sm"
                    }),
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            margin: {
                                left: 8
                            }
                        },
                        this.state.country.name
                    )
                ),
                _react2.default.createElement(
                    _ui.Container,
                    null,
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            margin: {
                                top: 8
                            }
                        },
                        "https://mundorecarga.com/",
                        this.state.country.slug
                    )
                ),
                _react2.default.createElement(
                    _ui.Tabs,
                    {
                        value: this.state.tab,
                        margin: {
                            top: 8
                        },
                        onChange: this._handleChangeTab
                    },
                    _react2.default.createElement(_ui.Tab, { heading: "Fotos" }),
                    _react2.default.createElement(_ui.Tab, { heading: "Proveedores" })
                ),
                this.state.tab === 0 && _react2.default.createElement(ManagePhotos, {
                    layout: function layout(_ref3) {
                        var children = _ref3.children,
                            props = _objectWithoutProperties(_ref3, ["children"]);

                        return _react2.default.createElement(
                            _ui.Container,
                            _extends({
                                flow: "column",
                                align: {
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start"
                                },
                                padding: 8
                            }, props),
                            children
                        );
                    },
                    theme: this.props.theme,
                    icons: this.props.icons,
                    api: {
                        collectPhotos: this.props.api.country.collectPhotos,
                        uploadPhoto: this.props.api.country.uploadPhoto,
                        deletePhoto: this.props.api.country.deletePhoto
                    },
                    iso: this.props.iso,
                    onProgress: this._handleProgress,
                    onError: this.props.onError
                }),
                this.state.tab === 1 && _react2.default.createElement(ListProviders, {
                    layout: function layout(_ref4) {
                        var children = _ref4.children,
                            props = _objectWithoutProperties(_ref4, ["children"]);

                        return _react2.default.createElement(
                            _ui.Container,
                            _extends({
                                flow: "column",
                                align: {
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start"
                                },
                                padding: 8
                            }, props),
                            children
                        );
                    },
                    theme: this.props.theme,
                    icons: this.props.icons,
                    api: {
                        collectProviders: this.props.api.collectProviders,
                        collectPromotions: this.props.api.collectPromotions,
                        promotion: {
                            updateTitle: this.props.api.promotion.updateTitle
                        }
                    },
                    iso: this.props.iso,
                    onProgress: this._handleProgress
                })
            );
        }
    }]);

    return ManageCountry;
}(_react2.default.Component);

ManageCountry.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.shape({
        pickCountry: _propTypes2.default.func.isRequired,
        collectProviders: _propTypes2.default.func.isRequired,
        collectPromotions: _propTypes2.default.func.isRequired,
        promotion: _propTypes2.default.shape({
            updateTitle: _propTypes2.default.func.isRequired
        }).isRequired,
        country: _propTypes2.default.shape({
            collectPhotos: _propTypes2.default.func.isRequired,
            uploadPhoto: _propTypes2.default.func.isRequired,
            deletePhoto: _propTypes2.default.func.isRequired
        }).isRequired
    }).isRequired,
    iso: _propTypes2.default.string.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var ManagePhotos = function (_React$Component2) {
    _inherits(ManagePhotos, _React$Component2);

    function ManagePhotos() {
        var _ref5;

        var _temp2, _this4, _ret2;

        _classCallCheck(this, ManagePhotos);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref5 = ManagePhotos.__proto__ || Object.getPrototypeOf(ManagePhotos)).call.apply(_ref5, [this].concat(args))), _this4), _this4.state = {
            photos: null
        }, _this4._collectPhotos = function () {
            _this4.props.onProgress(true, function () {
                _this4.props.api.collectPhotos(_this4.props.iso).then(function (photos) {
                    _this4.setState({
                        photos: photos
                    }, function () {
                        _this4.props.onProgress(false);
                    });
                }).catch(_this4.props.onError);
            });
        }, _temp2), _possibleConstructorReturn(_this4, _ret2);
    }

    _createClass(ManagePhotos, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this._collectPhotos();
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            if (this.state.photos === null) {
                return _react2.default.createElement(this.props.layout, null);
            }

            return _react2.default.createElement(
                this.props.layout,
                null,
                _react2.default.createElement(
                    _ui.Upload,
                    {
                        variant: "outlined",
                        margin: {
                            top: 8
                        },
                        accept: "image/*",
                        onChange: function onChange(file) {
                            _this5.props.onProgress(true, function () {
                                _this5.props.api.uploadPhoto(_this5.props.iso, file).then(function () {
                                    _this5.props.onProgress(false, function () {
                                        _this5._collectPhotos();
                                    });
                                }).catch(function (response) {
                                    var code = response.code;


                                    switch (code) {
                                        case "unexpected-exception":
                                            _this5.props.onProgress(false, function () {
                                                _this5.props.onError("Ocurrió un error al subir la imagen");
                                            });

                                            break;
                                        default:
                                            _this5.props.onError(response);
                                    }
                                });
                            });
                        }
                    },
                    _react2.default.createElement(this.props.icons.actions.upload, null),
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Subir foto"
                    )
                ),
                this.state.photos.length > 0 ? _react2.default.createElement(
                    _ui.List,
                    null,
                    this.state.photos.map(function (_ref6) {
                        var id = _ref6.id,
                            country = _ref6.country,
                            original = _ref6.original;

                        return _react2.default.createElement(_ui.ListItem, {
                            key: id,
                            text: _react2.default.createElement(_ui.Image, {
                                source: original,
                                width: 400
                            }),
                            action: _react2.default.createElement(
                                _ui.Button,
                                {
                                    onClick: function onClick() {
                                        _this5.props.onProgress(true, function () {
                                            _this5.props.api.deletePhoto(id).then(function () {
                                                _this5.setState({
                                                    edit: false
                                                }, function () {
                                                    _this5.props.onProgress(false, function () {
                                                        _this5._collectPhotos(_this5.props.onDelete);
                                                    });
                                                });
                                            }).catch(_this5.props.onError);
                                        });
                                    }
                                },
                                _react2.default.createElement(_this5.props.icons.actions.delete, null),
                                _react2.default.createElement(
                                    _ui.Text,
                                    null,
                                    "Borrar"
                                )
                            )
                        });
                    })
                ) : _react2.default.createElement(
                    _ui.Text,
                    {
                        margin: {
                            top: 8
                        }
                    },
                    "No hay fotos"
                )
            );
        }
    }]);

    return ManagePhotos;
}(_react2.default.Component);

ManagePhotos.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    theme: _propTypes2.default.object.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.shape({
        collectPhotos: _propTypes2.default.func.isRequired,
        uploadPhoto: _propTypes2.default.func.isRequired,
        deletePhoto: _propTypes2.default.func.isRequired
    }).isRequired,
    iso: _propTypes2.default.string.isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var ListProviders = function (_React$Component3) {
    _inherits(ListProviders, _React$Component3);

    function ListProviders() {
        var _ref7;

        var _temp3, _this6, _ret3;

        _classCallCheck(this, ListProviders);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return _ret3 = (_temp3 = (_this6 = _possibleConstructorReturn(this, (_ref7 = ListProviders.__proto__ || Object.getPrototypeOf(ListProviders)).call.apply(_ref7, [this].concat(args))), _this6), _this6.state = {
            providers: null,
            promotions: null
        }, _this6._collectPromotions = function () {
            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            _this6.props.onProgress(true, function () {
                _this6.props.api.collectPromotions(null, null).then(function (promotions) {
                    _this6.props.onProgress(false, function () {
                        _this6.setState({
                            promotions: promotions
                        }, callback);
                    });
                }).catch(_this6.props.onError);
            });
        }, _temp3), _possibleConstructorReturn(_this6, _ret3);
    }

    _createClass(ListProviders, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this7 = this;

            this.props.onProgress(true, function () {
                _this7.props.api.collectProviders(null, _this7.props.iso).then(function (providers) {
                    _this7.setState({
                        providers: providers
                    }, function () {
                        _this7.props.onProgress(false);
                    });
                }).catch(_this7.props.onError);
            });

            this._collectPromotions();
        }
    }, {
        key: "render",
        value: function render() {
            var _this8 = this;

            if (this.state.providers === null || this.state.promotions === null) {
                return _react2.default.createElement(this.props.layout, null);
            }

            return _react2.default.createElement(
                this.props.layout,
                null,
                this.state.providers.map(function (_ref8) {
                    var id = _ref8.id,
                        name = _ref8.name,
                        logo = _ref8.logo,
                        width = _ref8.width,
                        height = _ref8.height,
                        products = _ref8.products;

                    var promotions = _this8.state.promotions.filter(function (_ref9) {
                        var provider = _ref9.provider;

                        return provider === id;
                    }).map(function (promotion) {
                        return _react2.default.createElement(_PromotionCard2.default, {
                            key: promotion.id,
                            icons: _this8.props.icons,
                            api: {
                                updateTitle: _this8.props.api.promotion.updateTitle
                            },
                            promotion: promotion,
                            onProgress: _this8.props.onProgress,
                            onUpdate: function onUpdate(callback) {
                                _this8._collectPromotions(callback);
                            }
                        });
                    });

                    if (promotions.length === 0) {
                        promotions = _react2.default.createElement(
                            _ui.Text,
                            null,
                            "No hay promociones"
                        );
                    }

                    products = products.map(function (_ref10) {
                        var id = _ref10.id,
                            name = _ref10.name,
                            min = _ref10.min,
                            max = _ref10.max,
                            amounts = _ref10.amounts;

                        amounts = amounts.map(function (amount) {
                            return _react2.default.createElement(
                                _ui.Text,
                                {
                                    key: amount,
                                    margin: {
                                        left: 8
                                    }
                                },
                                amount
                            );
                        });

                        return _react2.default.createElement(_ui.Card, {
                            key: id,
                            header: {
                                title: name,
                                subtitle: id
                            },
                            content: _react2.default.createElement(
                                _react2.default.Fragment,
                                null,
                                _react2.default.createElement(
                                    _ui.Container,
                                    {
                                        flow: "row",
                                        align: {
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start'
                                        }
                                    },
                                    _react2.default.createElement(
                                        _ui.Text,
                                        null,
                                        "M\xEDnimo:"
                                    ),
                                    _react2.default.createElement(
                                        _ui.Text,
                                        { margin: { left: 8 } },
                                        min.amount,
                                        " ",
                                        min.currency
                                    )
                                ),
                                _react2.default.createElement(
                                    _ui.Container,
                                    {
                                        flow: "row",
                                        align: {
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start'
                                        }
                                    },
                                    _react2.default.createElement(
                                        _ui.Text,
                                        null,
                                        "M\xE1ximo:"
                                    ),
                                    _react2.default.createElement(
                                        _ui.Text,
                                        { margin: { left: 8 } },
                                        max.amount,
                                        " ",
                                        max.currency
                                    )
                                ),
                                _react2.default.createElement(
                                    _ui.Container,
                                    {
                                        flow: "row",
                                        align: {
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start'
                                        }
                                    },
                                    _react2.default.createElement(
                                        _ui.Text,
                                        null,
                                        "Cantidades creadas: "
                                    ),
                                    amounts
                                )
                            ),
                            margin: {
                                top: 8
                            }
                        });
                    });

                    if (products.length === 0) {
                        products = _react2.default.createElement(
                            _ui.Text,
                            null,
                            "No hay productos"
                        );
                    }

                    // Trick to put the logo inside a box

                    if (width >= 24) {
                        height = height * 24 / width;
                        width = 24;
                    } else if (height >= 24) {
                        width = width * 24 / height;
                        height = 24;
                    }

                    return _react2.default.createElement(_ui.Card, {
                        key: id,
                        header: {
                            avatar: _react2.default.createElement(_ui.Image, {
                                source: logo !== null ? logo : require("../Common/provider.png"),
                                width: logo !== null ? width : 24,
                                height: logo !== null ? height : 24
                            }),
                            title: name,
                            subtitle: id
                        },
                        content: _react2.default.createElement(
                            _react2.default.Fragment,
                            null,
                            _react2.default.createElement(
                                _ui.Text,
                                {
                                    variant: "h6"
                                },
                                "Promociones"
                            ),
                            promotions,
                            _react2.default.createElement(
                                _ui.Text,
                                {
                                    variant: "h6",
                                    margin: {
                                        top: 8
                                    }
                                },
                                "Productos"
                            ),
                            products
                        ),
                        margin: {
                            bottom: 8
                        }
                    });
                })
            );
        }
    }]);

    return ListProviders;
}(_react2.default.Component);

ListProviders.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    theme: _propTypes2.default.object.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.shape({
        collectProviders: _propTypes2.default.func.isRequired,
        collectPromotions: _propTypes2.default.func.isRequired,
        promotion: _propTypes2.default.shape({
            updateTitle: _propTypes2.default.func.isRequired
        }).isRequired
    }).isRequired,
    iso: _propTypes2.default.string.isRequired,
    onProgress: _propTypes2.default.func.isRequired
};
exports.default = _ui.Theme.withTheme()(ManageCountry);