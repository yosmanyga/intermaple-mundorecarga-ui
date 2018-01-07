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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Row);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Row.__proto__ || Object.getPrototypeOf(Row)).call.apply(_ref, [this].concat(args))), _this), _this._renderLeft = function (left, underline) {
            var _left$props = left.props,
                flow = _left$props.flow,
                align = _left$props.align,
                onClick = _left$props.onClick,
                children = _left$props.children,
                props = _objectWithoutProperties(_left$props, ["flow", "align", "onClick", "children"]);

            return _react2.default.createElement(
                left.type,
                _extends({
                    flow: flow,
                    width: 64,
                    align: _extends({
                        justifyContent: "center",
                        alignItems: "center"
                    }, align),
                    padding: {
                        bottom: underline ? 8 : 0
                    },
                    onClick: onClick
                }, props),
                children
            );
        }, _this._renderBody = function (body) {
            var _body$props = body.props,
                flow = _body$props.flow,
                align = _body$props.align,
                padding = _body$props.padding,
                onClick = _body$props.onClick,
                style = _body$props.style,
                children = _body$props.children,
                props = _objectWithoutProperties(_body$props, ["flow", "align", "padding", "onClick", "style", "children"]);

            return _react2.default.createElement(
                _ui.Container,
                _extends({
                    flow: flow,
                    align: _extends({
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }, align),
                    padding: padding,
                    onClick: onClick,
                    style: _extends({}, style)
                }, props),
                children
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Row, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                left = _props.left,
                body = _props.body,
                right = _props.right,
                align = _props.align,
                padding = _props.padding,
                underline = _props.underline,
                onClick = _props.onClick,
                props = _objectWithoutProperties(_props, ["left", "body", "right", "align", "padding", "underline", "onClick"]);

            var flex = _ui.Platform.select({
                web: {},
                android: {
                    flex: 1
                },
                ios: {
                    flex: 1
                }
            });

            return _react2.default.createElement(
                _ui.Container,
                _extends({
                    flow: "row",
                    align: _extends({
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }, align),
                    padding: padding,
                    onClick: onClick
                }, props),
                left && this._renderLeft(left, underline),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            alignItems: "flex-start",
                            justifyContent: "space-between"
                        },
                        border: typeof underline === "undefined" || underline === true ? {
                            bottom: {
                                width: 1,
                                color: "#ccc",
                                style: "solid"
                            }
                        } : {},
                        style: _extends({}, flex)
                    },
                    this._renderBody(body),
                    right
                )
            );
        }
    }]);

    return Row;
}(_react2.default.Component);

Row.propTypes = {
    left: _propTypes2.default.element, // Container
    body: _propTypes2.default.element.isRequired, // Container
    right: _propTypes2.default.oneOfType([_propTypes2.default.element, // Container
    _propTypes2.default.bool]),
    underline: _propTypes2.default.bool,
    onClick: _propTypes2.default.func
};
exports.default = Row;