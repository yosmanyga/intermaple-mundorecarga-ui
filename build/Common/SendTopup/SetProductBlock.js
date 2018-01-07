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

var _round = require("lodash/round");

var _round2 = _interopRequireDefault(_round);

var _Preview = require("../Preview");

var _Preview2 = _interopRequireDefault(_Preview);

var _Row = require("../Row");

var _Row2 = _interopRequireDefault(_Row);

var _Subtitle = require("../Subtitle");

var _Subtitle2 = _interopRequireDefault(_Subtitle);

var _gift = require("../../Frontend/gift.png");

var _gift2 = _interopRequireDefault(_gift);

var _ListPromotionsBlock = require("../ListPromotionsBlock");

var _ListPromotionsBlock2 = _interopRequireDefault(_ListPromotionsBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SetProductBlock = function (_React$Component) {
    _inherits(SetProductBlock, _React$Component);

    function SetProductBlock() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SetProductBlock);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SetProductBlock.__proto__ || Object.getPrototypeOf(SetProductBlock)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            edit: true,
            promotions: null,
            products: null,
            product: null,
            combination: null
        }, _this._handleSelect = function (product, combination) {
            _this.setState({
                product: product,
                combination: combination,
                edit: false
            }, function () {
                _this.props.onSet(product, combination);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SetProductBlock, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.props.onProgress(true, function () {
                Promise.all([_this2.props.api.collectPromotions([_this2.props.provider.id], Date.now() / 1000), _this2.props.api.resolveProducts(_this2.props.provider.id)]).then(function (values) {
                    _this2.setState({
                        promotions: values[0],
                        products: values[1]
                    }, function () {
                        _this2.props.onProgress(false);
                    });
                }).catch(_this2.props.onError);
            });
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.props.edit !== nextProps.edit || this.state !== nextState;
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState, prevContext) {
            if (this.props.edit === true) {
                if (prevProps.edit === this.props.edit) {
                    // Avoid recursion
                    return;
                }

                this.setState({
                    edit: true
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.promotions === null || this.state.products === null) {
                return null;
            }

            if (this.state.edit === false) {
                var name = this.state.product.name;
                var _state$combination = this.state.combination,
                    send = _state$combination.send,
                    receive = _state$combination.receive;

                // Stripe fee

                var amountWithFee = (send.amount + 0.30) / (1 - 0.029);
                var fee = amountWithFee - send.amount;

                // Find products with same send amount
                var repeated = this.state.products.filter(function (_ref2) {
                    var combinations = _ref2.combinations;

                    return combinations.filter(function (_ref3) {
                        var send = _ref3.send;

                        return send.amount === _this3.state.combination.send.amount;
                    });
                });

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
                        "Cantidad"
                    ),
                    _react2.default.createElement(_Preview2.default, {
                        icons: {
                            close: this.props.icons.actions.close
                        },
                        margin: {
                            top: 8,
                            bottom: 8
                        },
                        left: _react2.default.createElement(_ui.Container, null),
                        body: _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "column"
                            },
                            _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "row",
                                    align: {
                                        alignItems: "flex-start"
                                    }
                                },
                                _react2.default.createElement(
                                    _ui.Container,
                                    {
                                        align: {
                                            alignItems: "flex-start"
                                        }
                                    },
                                    _react2.default.createElement(
                                        _ui.Text,
                                        null,
                                        "Env\xEDa"
                                    ),
                                    _react2.default.createElement(
                                        _ui.Text,
                                        {
                                            style: {
                                                color: "#999"
                                            }
                                        },
                                        "Cargo"
                                    ),
                                    _react2.default.createElement(
                                        _ui.Text,
                                        null,
                                        "Total"
                                    )
                                ),
                                _react2.default.createElement(
                                    _ui.Container,
                                    {
                                        align: {
                                            alignItems: "flex-end"
                                        },
                                        margin: {
                                            left: 32,
                                            right: 32
                                        }
                                    },
                                    _react2.default.createElement(
                                        _ui.Text,
                                        null,
                                        send.amount.toFixed(2),
                                        " ",
                                        send.currency
                                    ),
                                    _react2.default.createElement(
                                        _ui.Text,
                                        {
                                            style: {
                                                color: "#999"
                                            }
                                        },
                                        (0, _round2.default)(fee, 2).toFixed(2),
                                        " ",
                                        send.currency
                                    ),
                                    _react2.default.createElement(
                                        _ui.Text,
                                        null,
                                        (0, _round2.default)(send.amount + fee, 2).toFixed(2),
                                        " ",
                                        send.currency
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "row",
                                    align: {
                                        justifyContent: "flex-start"
                                    },
                                    margin: {
                                        top: 8,
                                        bottom: 4
                                    }
                                },
                                _react2.default.createElement(
                                    _ui.Text,
                                    {
                                        style: {
                                            color: "#999"
                                        }
                                    },
                                    "Recibe ",
                                    receive.amount,
                                    " ",
                                    receive.currency,
                                    " ",
                                    repeated.length > 1 && "(" + name + ")"
                                ),
                                this.state.promotions.length > 0 && send.amount >= this.state.promotions[0].minimum && _react2.default.createElement(
                                    _react2.default.Fragment,
                                    null,
                                    _react2.default.createElement(
                                        _ui.Text,
                                        {
                                            margin: {
                                                left: 4
                                            },
                                            style: {
                                                color: "#999"
                                            }
                                        },
                                        "+"
                                    ),
                                    _react2.default.createElement(_ui.Image, {
                                        source: _gift2.default,
                                        margin: {
                                            left: 4
                                        },
                                        style: {
                                            width: 16,
                                            height: 16
                                        }
                                    }),
                                    _react2.default.createElement(
                                        _ui.Text,
                                        {
                                            margin: {
                                                left: 4
                                            },
                                            style: {
                                                color: "#999"
                                            }
                                        },
                                        "Promoci\xF3n"
                                    )
                                )
                            )
                        ),
                        onUndo: function onUndo() {
                            _this3.setState({
                                product: null,
                                combination: null,
                                edit: true
                            }, _this3.props.onEdit);
                        }
                    })
                );
            }

            if (this.state.products.length === 0) {
                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            center: true,
                            style: {
                                textAlign: 'center'
                            }
                        },
                        "En estos momentos este proveedor no acepta recargas para ese n\xFAmero."
                    ),
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            center: true,
                            margin: {
                                top: 4
                            },
                            style: {
                                textAlign: 'center'
                            }
                        },
                        "Por favor compruebe el n\xFAmero y el proveedor"
                    )
                );
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.state.promotions.length > 0 && _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        _Subtitle2.default,
                        {
                            margin: {
                                top: 8
                            }
                        },
                        "Promoci\xF3n"
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        null,
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                color: "primary",
                                center: true,
                                margin: {
                                    top: 2
                                },
                                padding: {
                                    top: 2,
                                    bottom: 8
                                },
                                style: {
                                    textAlign: "center"
                                }
                            },
                            "Tu recarga de hoy va a ser beneficiada por ",
                            this.state.promotions.length > 1 ? "las siguientes promociones vigentes" : "la siguiente promoción vigente"
                        ),
                        _react2.default.createElement(_ListPromotionsBlock2.default, {
                            promotions: this.state.promotions,
                            padding: 8
                        })
                    )
                ),
                _react2.default.createElement(
                    _Subtitle2.default,
                    {
                        active: true,
                        margin: {
                            top: 8
                        }
                    },
                    "Selecciona la cantidad"
                ),
                this.state.products.map(function (product) {
                    var id = product.id,
                        name = product.name;


                    return product.combinations.map(function (combination) {
                        var send = combination.send,
                            receive = combination.receive;

                        // Find products with same send amount

                        var repeated = _this3.state.products.filter(function (_ref4) {
                            var combinations = _ref4.combinations;

                            return combinations.filter(function (_ref5) {
                                var send = _ref5.send;

                                return send.amount === combination.send.amount;
                            });
                        });

                        return _react2.default.createElement(_Row2.default, {
                            key: id + "-" + send.amount,
                            left: _react2.default.createElement(
                                _ui.Container,
                                {
                                    padding: {
                                        top: 4
                                    }
                                },
                                _this3.state.product === product && _this3.state.combination === combination ? _react2.default.createElement(_this3.props.icons.objects.selected, null) : _react2.default.createElement(_this3.props.icons.objects.unselected, null)
                            ),
                            body: _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "column",
                                    padding: {
                                        top: 4,
                                        bottom: 4
                                    }
                                },
                                _react2.default.createElement(
                                    _ui.Text,
                                    null,
                                    "Env\xEDa ",
                                    send.amount,
                                    " ",
                                    send.currency
                                ),
                                _react2.default.createElement(
                                    _ui.Text,
                                    {
                                        style: {
                                            color: "#848484"
                                        }
                                    },
                                    "Recibe ",
                                    receive.amount,
                                    " ",
                                    receive.currency,
                                    " ",
                                    repeated.length > 1 && "(" + name + ")",
                                    _this3.state.promotions.length > 0 && send.amount >= _this3.state.promotions[0].minimum && " + Promoción"
                                )
                            ),
                            right: _this3.state.promotions.length > 0 && send.amount >= _this3.state.promotions[0].minimum && _react2.default.createElement(_ui.Image, {
                                source: _gift2.default,
                                margin: {
                                    top: 4,
                                    right: 8
                                },
                                width: 20,
                                height: 20
                            }),
                            onClick: function onClick() {
                                _this3._handleSelect(product, combination);
                            }
                        });
                    });
                })
            );
        }
    }]);

    return SetProductBlock;
}(_react2.default.Component);

SetProductBlock.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.shape({
        collectPromotions: _propTypes2.default.func.isRequired,
        resolveProducts: _propTypes2.default.func.isRequired
    }).isRequired,
    country: _propTypes2.default.object.isRequired,
    account: _propTypes2.default.string.isRequired,
    provider: _propTypes2.default.object.isRequired,
    edit: _propTypes2.default.bool,
    onProgress: _propTypes2.default.func.isRequired, // (progress, callback)
    onSet: _propTypes2.default.func.isRequired, // (product, combination)
    onEdit: _propTypes2.default.func.isRequired, // ()
    onError: _propTypes2.default.func.isRequired
};
exports.default = _ui.Platform.dimensions.withWidth()(SetProductBlock);