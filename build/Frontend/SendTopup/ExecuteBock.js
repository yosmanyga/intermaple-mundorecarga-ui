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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExecuteBock = function (_React$Component) {
    _inherits(ExecuteBock, _React$Component);

    function ExecuteBock() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ExecuteBock);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExecuteBock.__proto__ || Object.getPrototypeOf(ExecuteBock)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            busy: false,
            error: null
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ExecuteBock, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var amountWithFee = (this.props.combination.send.amount + 0.30) / (1 - 0.029);
            var fee = amountWithFee - this.props.combination.send.amount;

            return _react2.default.createElement(
                _ui.Container,
                {
                    center: true,
                    margin: {
                        top: 8
                    }
                },
                this.state.error === null ? _react2.default.createElement(
                    _ui.Button,
                    {
                        color: "primary",
                        disabled: this.state.busy,
                        onClick: function onClick() {
                            _this2.setState({
                                busy: true
                            }, function () {
                                _this2.props.onProgress(true, function () {
                                    _this2.props.api.sendTopup(_this2.props.country.iso, _this2.props.account, _this2.props.type, _this2.props.product.id, _this2.props.combination.send.amount, _this2.props.card).then(function (id) {
                                        _this2.setState({
                                            busy: false
                                        }, function () {
                                            _this2.props.onProgress(false, function () {
                                                _this2.props.onPaid(id);
                                            });
                                        });
                                    }).catch(function (response) {
                                        var code = response.code,
                                            payload = response.payload;


                                        switch (code) {
                                            case "topup.contact-exception":
                                                _this2.props.onProgress(false, function () {
                                                    _this2.setState({
                                                        error: payload.message
                                                    });
                                                });

                                                break;
                                            case "topup.payment-exception":
                                                _this2.props.onProgress(false, function () {
                                                    _this2.setState({
                                                        error: payload.message
                                                    });
                                                });

                                                break;
                                            case "unexpected-exception":
                                                _this2.props.onProgress(false, function () {
                                                    _this2.setState({
                                                        error: "Ocurrió un error con la recarga. Intentaremos hacer el envío manualmente. Sino el pago te será devuelto"
                                                    });
                                                });

                                                break;
                                            default:
                                                _this2.props.onError(response);
                                        }
                                    });
                                });
                            });
                        },
                        center: true,
                        margin: {
                            top: 8
                        }
                    },
                    _react2.default.createElement(this.props.icons.actions.topup, null),
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Pagar ",
                        (0, _round2.default)(this.props.combination.send.amount + fee, 2),
                        " ",
                        this.props.combination.send.currency
                    )
                ) : _react2.default.createElement(
                    _ui.Error,
                    {
                        margin: {
                            top: 8
                        },
                        padding: 4
                    },
                    this.state.error
                )
            );
        }
    }]);

    return ExecuteBock;
}(_react2.default.Component);

ExecuteBock.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.shape({
        sendTopup: _propTypes2.default.func.isRequired
    }).isRequired,
    country: _propTypes2.default.object,
    account: _propTypes2.default.string,
    type: _propTypes2.default.oneOf(["phone", "email"]),
    product: _propTypes2.default.object,
    combination: _propTypes2.default.object,
    card: _propTypes2.default.string,
    onProgress: _propTypes2.default.func.isRequired, // (progress, callback)
    onPaid: _propTypes2.default.func.isRequired, // (id)
    onError: _propTypes2.default.func.isRequired
};
exports.default = ExecuteBock;