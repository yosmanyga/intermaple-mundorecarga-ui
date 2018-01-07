"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectionErrorMessage = exports.ServerErrorMessage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ui = require("@yosmy/ui");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServerErrorMessage = exports.ServerErrorMessage = function (_React$Component) {
    _inherits(ServerErrorMessage, _React$Component);

    function ServerErrorMessage() {
        _classCallCheck(this, ServerErrorMessage);

        return _possibleConstructorReturn(this, (ServerErrorMessage.__proto__ || Object.getPrototypeOf(ServerErrorMessage)).apply(this, arguments));
    }

    _createClass(ServerErrorMessage, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(Message, {
                message: ["Se ha producido un error interno", "Nuestro equipo trabajará para solucionarlo", "Por favor intenta más tarde"]
            });
        }
    }]);

    return ServerErrorMessage;
}(_react2.default.Component);

var ConnectionErrorMessage = exports.ConnectionErrorMessage = function (_React$Component2) {
    _inherits(ConnectionErrorMessage, _React$Component2);

    function ConnectionErrorMessage() {
        _classCallCheck(this, ConnectionErrorMessage);

        return _possibleConstructorReturn(this, (ConnectionErrorMessage.__proto__ || Object.getPrototypeOf(ConnectionErrorMessage)).apply(this, arguments));
    }

    _createClass(ConnectionErrorMessage, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(Message, {
                icons: this.props.icons,
                message: ["Se ha producido un problema con la red", "Por favor comprueba tu conexión a internet"],
                onRetry: this.props.onRetry
            });
        }
    }]);

    return ConnectionErrorMessage;
}(_react2.default.Component);

ConnectionErrorMessage.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    onRetry: _propTypes2.default.func.isRequired
};

var Message = function (_React$Component3) {
    _inherits(Message, _React$Component3);

    function Message() {
        _classCallCheck(this, Message);

        return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
    }

    _createClass(Message, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "column",
                    align: {
                        justifyContent: "flex-start",
                        alignItems: "center"
                    },
                    margin: {
                        top: 64
                    }
                },
                this.props.message.map(function (message, i) {
                    return _react2.default.createElement(
                        _ui.Error,
                        {
                            key: i,
                            margin: {
                                top: 1
                            }
                        },
                        message
                    );
                }),
                this.props.onRetry && _react2.default.createElement(
                    _ui.Button,
                    {
                        color: "primary",
                        margin: { top: 8 },
                        center: true,
                        onClick: this.props.onRetry
                    },
                    _react2.default.createElement(this.props.icons.actions.retry, null),
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Reintentar"
                    )
                )
            );
        }
    }]);

    return Message;
}(_react2.default.Component);

Message.propTypes = {
    icons: _propTypes2.default.object,
    message: _propTypes2.default.array.isRequired,
    onRetry: _propTypes2.default.func
};