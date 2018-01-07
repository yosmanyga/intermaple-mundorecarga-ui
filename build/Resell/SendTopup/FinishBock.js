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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FinishBock = function (_React$Component) {
    _inherits(FinishBock, _React$Component);

    function FinishBock() {
        _classCallCheck(this, FinishBock);

        return _possibleConstructorReturn(this, (FinishBock.__proto__ || Object.getPrototypeOf(FinishBock)).apply(this, arguments));
    }

    _createClass(FinishBock, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _ui.Container,
                {
                    margin: {
                        top: 8
                    },
                    style: {
                        alignItems: "center"
                    }
                },
                _react2.default.createElement(this.props.icons.objects.check, {
                    style: {
                        color: "green",
                        fontSize: 108
                    }
                }),
                _react2.default.createElement(
                    _ui.Text,
                    null,
                    "La recarga se ha realizado exitosamente"
                ),
                _react2.default.createElement(_ui.Flag, {
                    iso: this.props.country.iso,
                    size: "sm",
                    margin: {
                        top: 8
                    }
                }),
                _react2.default.createElement(
                    _ui.Text,
                    {
                        margin: {
                            top: 4
                        }
                    },
                    this.props.type === "phone" ? this.props.country.prefix + "-" + this.props.account : this.props.account
                ),
                _react2.default.createElement(
                    _ui.Button,
                    {
                        color: "primary",
                        onClick: this.props.onNew,
                        margin: {
                            top: 8
                        }
                    },
                    _react2.default.createElement(this.props.icons.actions.back, null),
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Enviar otra recarga"
                    )
                )
            );
        }
    }]);

    return FinishBock;
}(_react2.default.Component);

FinishBock.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    country: _propTypes2.default.object.isRequired,
    account: _propTypes2.default.string.isRequired,
    onNew: _propTypes2.default.func.isRequired // ()
};
exports.default = FinishBock;