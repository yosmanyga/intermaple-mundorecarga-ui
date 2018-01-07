"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ui = require("@yosmy/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Subtitle = function (_React$Component) {
    _inherits(Subtitle, _React$Component);

    function Subtitle() {
        _classCallCheck(this, Subtitle);

        return _possibleConstructorReturn(this, (Subtitle.__proto__ || Object.getPrototypeOf(Subtitle)).apply(this, arguments));
    }

    _createClass(Subtitle, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                theme = _props.theme,
                margin = _props.margin,
                active = _props.active,
                style = _props.style,
                children = _props.children,
                props = _objectWithoutProperties(_props, ["theme", "margin", "active", "style", "children"]);

            return _react2.default.createElement(
                _ui.Container,
                _extends({
                    flow: "column",
                    align: {
                        justifyContent: "center",
                        alignItems: "center"
                    },
                    margin: margin,
                    padding: {
                        top: 16
                    },
                    border: active && {
                        top: {
                            width: 1,
                            style: "solid",
                            color: "#faf2cc"
                        },
                        bottom: {
                            width: 1,
                            style: "solid",
                            color: "#faf2cc"
                        }
                    },
                    background: active ? "#fcf8e3" : theme.palette.primary.main,
                    style: _extends({
                        alignSelf: "stretch"
                    }, style)
                }, props),
                _react2.default.createElement(
                    _ui.Text,
                    {
                        center: true,
                        padding: {
                            top: 2,
                            bottom: 2
                        },
                        style: {
                            color: !active ? "#fff" : null
                        }
                    },
                    children
                )
            );
        }
    }]);

    return Subtitle;
}(_react2.default.Component);

exports.default = _ui.Theme.withTheme()(Subtitle);