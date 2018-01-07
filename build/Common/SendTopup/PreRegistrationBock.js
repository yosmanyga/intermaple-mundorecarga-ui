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

var _Row = require("../Row");

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreRegistrationBock = function (_React$Component) {
    _inherits(PreRegistrationBock, _React$Component);

    function PreRegistrationBock() {
        _classCallCheck(this, PreRegistrationBock);

        return _possibleConstructorReturn(this, (PreRegistrationBock.__proto__ || Object.getPrototypeOf(PreRegistrationBock)).apply(this, arguments));
    }

    _createClass(PreRegistrationBock, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(_Row2.default, {
                    left: _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        },
                        _react2.default.createElement(this.props.icons.objects.check, {
                            style: {
                                color: "green",
                                fontSize: 40
                            }
                        })
                    ),
                    body: _react2.default.createElement(
                        _ui.Container,
                        null,
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Tu recarga est\xE1 lista para ser enviada"
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Ahora procederemos al registro de tu n\xFAmero de tel\xE9fono para realizar el pago"
                        )
                    ),
                    underline: false,
                    margin: {
                        top: 8,
                        bottom: 8
                    }
                }),
                _react2.default.createElement(
                    _ui.Button,
                    {
                        color: "primary",
                        onClick: this.props.onContinue,
                        center: true,
                        margin: {
                            top: 8
                        }
                    },
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Continuar"
                    ),
                    _react2.default.createElement(this.props.icons.actions.forward, null)
                )
            );
        }
    }]);

    return PreRegistrationBock;
}(_react2.default.Component);

PreRegistrationBock.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    onContinue: _propTypes2.default.func.isRequired // ()
};
exports.default = PreRegistrationBock;