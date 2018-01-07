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

var _paymentUi = require("@yosmy/payment-ui");

var _Subtitle = require("../Subtitle");

var _Subtitle2 = _interopRequireDefault(_Subtitle);

var _Row = require("../Row");

var _Row2 = _interopRequireDefault(_Row);

var _Preview = require("../Preview");

var _Preview2 = _interopRequireDefault(_Preview);

var _cards = require("./cards.png");

var _cards2 = _interopRequireDefault(_cards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SetPaymentBlock = function (_React$Component) {
    _inherits(SetPaymentBlock, _React$Component);

    function SetPaymentBlock() {
        _classCallCheck(this, SetPaymentBlock);

        return _possibleConstructorReturn(this, (SetPaymentBlock.__proto__ || Object.getPrototypeOf(SetPaymentBlock)).apply(this, arguments));
    }

    _createClass(SetPaymentBlock, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(_paymentUi.Payment, {
                layout: function layout(_ref) {
                    var children = _ref.children;

                    return _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            margin: {
                                top: 1
                            }
                        },
                        children,
                        _react2.default.createElement(_ui.Image, {
                            source: _cards2.default,
                            margin: {
                                top: 8
                            },
                            style: {
                                width: 200,
                                height: 200 * 110 / 549
                            }
                        }),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                center: true,
                                padding: 8,
                                margin: {
                                    top: 4
                                },
                                style: _ui.Platform.select({
                                    mobile: {
                                        textAlign: "center"
                                    }
                                })
                            },
                            "Todos los pagos son procesados de forma segura por medio de nuestro proveedor de pago confiable Stripe. Para m\xE1s informaci\xF3n leer nuestra Pol\xEDtica de Privacidad."
                        )
                    );
                },
                previewCardLayout: function previewCardLayout(Card, onEdit) {
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
                            "M\xE9todo de pago"
                        ),
                        _react2.default.createElement(_Preview2.default, {
                            icons: {
                                close: _this2.props.icons.actions.close
                            },
                            margin: {
                                top: 1
                            },
                            left: _react2.default.createElement(_ui.Container, null),
                            body: _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "column",
                                    align: {
                                        justifyContent: "flex-start",
                                        alignItems: "flex-start"
                                    }
                                },
                                _react2.default.createElement(Card, null)
                            ),
                            onUndo: function onUndo() {
                                onEdit(_this2.props.onEdit);
                            }
                        })
                    );
                },
                listCardsLayout: function listCardsLayout(Cards) {
                    return _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        _react2.default.createElement(
                            _Subtitle2.default,
                            {
                                active: true,
                                margin: {
                                    top: 8
                                }
                            },
                            "Forma de pago"
                        ),
                        _react2.default.createElement(Cards, null)
                    );
                },
                newCardLayout: function newCardLayout(NewCard) {
                    return _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        _react2.default.createElement(
                            _Subtitle2.default,
                            {
                                active: true,
                                margin: {
                                    top: 8,
                                    bottom: 8
                                }
                            },
                            "M\xE9todo de pago"
                        ),
                        _react2.default.createElement(NewCard, null)
                    );
                },
                cardInputsLayout: function cardInputsLayout(NumberInput, NameInput, ExpiryInput, CvcInput, ZipInput, SaveInput) {
                    return _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        _react2.default.createElement(_Row2.default, {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            margin: {
                                top: 1
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
                                _react2.default.createElement(_this2.props.icons.card.number, null)
                            ),
                            body: _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "row",
                                    align: {
                                        justifyContent: "flex-start",
                                        alignItems: "center"
                                    },
                                    padding: {
                                        right: 8
                                    }
                                },
                                _react2.default.createElement(NumberInput, null)
                            ),
                            underline: false
                        }),
                        _react2.default.createElement(_Row2.default, {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            margin: {
                                top: 1
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
                                _react2.default.createElement(_this2.props.icons.card.name, null)
                            ),
                            body: _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "row",
                                    align: {
                                        justifyContent: "flex-start",
                                        alignItems: "center"
                                    },
                                    padding: {
                                        right: 8
                                    }
                                },
                                _react2.default.createElement(NameInput, null)
                            ),
                            underline: false
                        }),
                        _react2.default.createElement(_Row2.default, {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            margin: {
                                top: 1
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
                                _react2.default.createElement(_this2.props.icons.card.expiry, null)
                            ),
                            body: _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "row",
                                    align: {
                                        justifyContent: "flex-start",
                                        alignItems: "center"
                                    },
                                    padding: {
                                        right: 8
                                    }
                                },
                                _react2.default.createElement(ExpiryInput, null)
                            ),
                            underline: false
                        }),
                        _react2.default.createElement(_Row2.default, {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            margin: {
                                top: 1
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
                                _react2.default.createElement(_this2.props.icons.card.cvc, null)
                            ),
                            body: _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "row",
                                    align: {
                                        justifyContent: "flex-start",
                                        alignItems: "center"
                                    },
                                    padding: {
                                        right: 8
                                    }
                                },
                                _react2.default.createElement(CvcInput, null)
                            ),
                            underline: false
                        }),
                        _this2.props.phone.country === "US" && _react2.default.createElement(_Row2.default, {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            margin: {
                                top: 1
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
                                _react2.default.createElement(_this2.props.icons.card.zip, null)
                            ),
                            body: _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "row",
                                    align: {
                                        justifyContent: "flex-start",
                                        alignItems: "center"
                                    },
                                    padding: {
                                        right: 8
                                    }
                                },
                                _react2.default.createElement(ZipInput, null)
                            ),
                            underline: false
                        }),
                        _react2.default.createElement(_Row2.default, {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            margin: {
                                top: _ui.Platform.select({
                                    web: 1,
                                    android: 8,
                                    ios: 8
                                })
                            },
                            left: _react2.default.createElement(_ui.Container, null),
                            body: _react2.default.createElement(
                                _ui.Container,
                                {
                                    flow: "row",
                                    align: {
                                        justifyContent: "flex-start",
                                        alignItems: "center"
                                    }
                                },
                                _react2.default.createElement(SaveInput, null)
                            ),
                            underline: false
                        })
                    );
                },
                cardListItemLayout: function cardListItemLayout(_ref2) {
                    var select = _ref2.select,
                        body = _ref2.body,
                        action = _ref2.action,
                        props = _objectWithoutProperties(_ref2, ["select", "body", "action"]);

                    return _react2.default.createElement(_Row2.default, _extends({
                        left: select,
                        body: body,
                        right: action
                    }, props));
                },
                messages: {
                    save: "Guardar método de pago"
                },
                icons: {
                    actions: {
                        add: this.props.icons.actions.add,
                        delete: this.props.icons.actions.delete,
                        forward: this.props.icons.actions.forward,
                        back: this.props.icons.actions.back,
                        close: this.props.icons.actions.close
                    },
                    selected: this.props.icons.objects.selected,
                    unselected: this.props.icons.objects.unselected
                },
                api: this.props.api,
                edit: this.props.edit,
                onProgress: this.props.onProgress,
                onSet: this.props.onSet,
                onEdit: this.props.onEdit
            });
        }
    }]);

    return SetPaymentBlock;
}(_react2.default.Component);

SetPaymentBlock.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    phone: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    edit: _propTypes2.default.bool,
    onSet: _propTypes2.default.func.isRequired, // (card)
    onEdit: _propTypes2.default.func.isRequired, // ()
    onProgress: _propTypes2.default.func.isRequired // (progress, callback)
};
exports.default = SetPaymentBlock;