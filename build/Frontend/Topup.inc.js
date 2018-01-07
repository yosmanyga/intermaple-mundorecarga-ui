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

var _dayjs = require("@yosmy/dayjs");

var _ui = require("@yosmy/ui");

var _Row = require("../Common/Row");

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Topup = function (_React$Component) {
    _inherits(Topup, _React$Component);

    function Topup() {
        _classCallCheck(this, Topup);

        return _possibleConstructorReturn(this, (Topup.__proto__ || Object.getPrototypeOf(Topup)).apply(this, arguments));
    }

    _createClass(Topup, [{
        key: "render",
        value: function render() {
            var icon = void 0,
                status = void 0,
                color = void 0;

            var lastStep = this.props.data.steps[this.props.data.steps.length - 1];

            if (lastStep === "payment") {
                icon = _react2.default.createElement(this.props.icons.topup.steps.delay, null);
                status = "Pendiente";
                color = "#ffca28";
            } else if (lastStep === "transfer.exception") {
                icon = _react2.default.createElement(this.props.icons.topup.steps.transfer.exception, null);
                status = "Pendiente";
                color = "#ef5350";
            } else if (lastStep === "transfer.success") {
                icon = _react2.default.createElement(this.props.icons.topup.steps.transfer.success, null);
                status = "Enviada";
                color = "#66bb6a";
            } else if (lastStep === "refund") {
                icon = _react2.default.createElement(this.props.icons.topup.steps.refund, null);
                status = "Fallida. Pago devuelto";
                color = "#ef5350";
            } else {
                throw this.props.data.steps.join(", ");
            }

            return _react2.default.createElement(_Row2.default, {
                left: this.props.contact && _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "column",
                        align: {
                            justifyContent: "flex-start",
                            alignItems: "center"
                        },
                        margin: {
                            right: 8
                        },
                        width: 64
                    },
                    _react2.default.createElement(this.props.icons.objects.contact, {
                        style: {
                            fontSize: 56,
                            color: "#ccc"
                        }
                    })
                ),
                body: _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "column",
                        align: {
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        },
                        style: _ui.Platform.select({
                            web: undefined,
                            mobile: {
                                flex: 1
                            }
                        }),
                        padding: {
                            bottom: 16
                        }
                    },
                    this.props.contact && _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "body1"
                        },
                        this.props.contact.name ? this.props.contact.name : "Sin nombre"
                    ),
                    this.props.contact && _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            margin: {
                                top: 4
                            }
                        },
                        _react2.default.createElement(_ui.Flag, {
                            iso: this.props.contact.country,
                            size: "sm",
                            border: 0
                        }),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    left: 4
                                }
                            },
                            this.props.contact.type === "phone" ? "+" + this.props.contact.prefix + "-" + this.props.contact.account : _ui.Platform.dimensions.isSmDown(this.props.width) ? "" + this.props.contact.account.substring(0, 15) + (this.props.contact.account.length > 15 && "...") : "" + this.props.contact.account
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            align: {
                                justifyContent: "space-between",
                                alignItems: "center"
                            },
                            width: _ui.Platform.select({
                                web: undefined,
                                mobile: "100%"
                            }),
                            margin: {
                                top: 4
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                variant: "caption"
                                // size={Platform.dimensions.isSmDown(this.props.width) ? 12 : null}
                            },
                            Date.now() - this.props.data.date * 1000 > 60 * 60 * 1000
                            // More than one hour ago
                            ? (0, _dayjs.format)(this.props.data.date * 1000, "D [de] MMMM, YYYY")
                            // Less than one hour
                            : (0, _dayjs.distance)(Date.now(), this.props.date * 1000)
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "$",
                            this.props.data.sendValue.toFixed(2)
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            margin: {
                                top: 4
                            }
                        },
                        _react2.default.createElement(icon.type, _extends({}, icon.props, {
                            style: {
                                fontSize: 12,
                                color: color
                            }
                        })),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                variant: "caption",
                                margin: {
                                    left: 4
                                },
                                style: {
                                    color: color
                                }
                            },
                            status
                        )
                    )
                ),
                onClick: this.props.onClick,
                padding: _extends({}, this.props.padding, {
                    top: 16
                })
            });
        }
    }]);

    return Topup;
}(_react2.default.Component);

Topup.propTypes = {
    width: _propTypes2.default.string.isRequired,
    icons: _propTypes2.default.object.isRequired,
    data: _propTypes2.default.object.isRequired,
    contact: _propTypes2.default.object,
    onClick: _propTypes2.default.func
};
exports.default = Topup;
;