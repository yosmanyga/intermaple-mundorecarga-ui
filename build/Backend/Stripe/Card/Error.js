"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dayjs = require("@yosmy/dayjs");

var _ui = require("@yosmy/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Error = function (_React$Component) {
    _inherits(Error, _React$Component);

    function Error() {
        _classCallCheck(this, Error);

        return _possibleConstructorReturn(this, (Error.__proto__ || Object.getPrototypeOf(Error)).apply(this, arguments));
    }

    _createClass(Error, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props$data = this.props.data,
                id = _props$data.id,
                user = _props$data.user,
                message = _props$data.message,
                payload = _props$data.payload,
                stripe = _props$data.stripe,
                date = _props$data.date;


            if (this.props.onSelectUser) {
                user = this.props.users.find(function (_ref) {
                    var id = _ref.id;

                    return id === user;
                });
            }

            return _react2.default.createElement(_ui.Card, {
                key: id,
                header: {
                    title: message,
                    subtitle: Date.now() - date * 1000 > 60 * 60 * 1000
                    // More than one hour ago
                    ? (0, _dayjs.format)(date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")
                    // Less than one hour
                    : (0, _dayjs.distance)(Date.now(), date * 1000)
                },
                content: _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "column",
                        align: {
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        }
                    },
                    this.props.onSelectUser && _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Usuario"
                        ),
                        _react2.default.createElement(_ui.Flag, {
                            iso: user.country,
                            size: "sm",
                            border: 0,
                            margin: {
                                left: 8
                            }
                        }),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: { left: 8 }
                            },
                            "+",
                            user.prefix,
                            "-",
                            user.number
                        ),
                        _react2.default.createElement(
                            _ui.Button,
                            {
                                variant: "outlined",
                                onClick: function onClick() {
                                    _this2.props.onSelectUser(user);
                                }
                            },
                            _react2.default.createElement(this.props.icons.actions.details, null)
                        )
                    ),
                    payload && _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "flex-start"
                            },
                            width: "auto"
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Datos de entrada"
                        ),
                        _react2.default.createElement(
                            _ui.Container,
                            {
                                margin: {
                                    left: 8
                                }
                            },
                            _react2.default.createElement(
                                _ui.Json,
                                {
                                    collapsed: true,
                                    margin: {}
                                },
                                payload
                            )
                        )
                    ),
                    stripe && _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "flex-start"
                            },
                            margin: {
                                top: 16
                            },
                            width: "auto"
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Error de Stripe"
                        ),
                        _react2.default.createElement(
                            _ui.Container,
                            {
                                margin: {
                                    left: 8
                                }
                            },
                            _react2.default.createElement(
                                _ui.Json,
                                {
                                    collapsed: true,
                                    margin: {}
                                },
                                stripe
                            )
                        )
                    )
                ),
                margin: {
                    top: 8
                }
            });
        }
    }]);

    return Error;
}(_react2.default.Component);

Error.propTypes = {
    data: _propTypes2.default.object.isRequired,
    icons: _propTypes2.default.object.isRequired,
    users: _propTypes2.default.array,
    onSelectUser: _propTypes2.default.func // (user)

};
exports.default = Error;