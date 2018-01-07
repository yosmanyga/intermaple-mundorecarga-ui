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

var InnerLayoutBlock = function (_React$Component) {
    _inherits(InnerLayoutBlock, _React$Component);

    function InnerLayoutBlock() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, InnerLayoutBlock);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InnerLayoutBlock.__proto__ || Object.getPrototypeOf(InnerLayoutBlock)).call.apply(_ref, [this].concat(args))), _this), _this._buildWebInnerLayout = function (_ref2) {
            var photo = _ref2.photo,
                children = _ref2.children;

            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "column",
                    align: {
                        justifyContent: "flex-start"
                    },
                    background: {
                        image: photo,
                        size: [_ui.Platform.dimensions.get("window").width, _ui.Platform.dimensions.get("window").width / 2]
                    },
                    style: {
                        minHeight: _ui.Platform.dimensions.get("window").width / 2
                    }
                },
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "column",
                        width: _ui.Platform.select({
                            web: _ui.Platform.dimensions.isSmDown(_this.props.width) ? "80%" : "60%",
                            android: "80%",
                            ios: "80%"
                        }),
                        margin: {
                            top: 48
                        },
                        padding: {
                            bottom: 8
                        },
                        style: {
                            backgroundColor: "rgba(255, 255, 255, 0.95)"
                        }
                    },
                    children
                )
            );
        }, _this._buildMobileInnerLayout = function (_ref3) {
            var children = _ref3.children;

            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "column",
                    padding: {
                        bottom: 8
                    }
                },
                children
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(InnerLayoutBlock, [{
        key: "render",
        value: function render() {
            var Component = _ui.Platform.select({
                web: this._buildWebInnerLayout,
                mobile: this._buildMobileInnerLayout
            });

            return _react2.default.createElement(Component, this.props);
        }
    }]);

    return InnerLayoutBlock;
}(_react2.default.Component);

InnerLayoutBlock.propTypes = {
    photo: _propTypes2.default.string
};
exports.default = _ui.Platform.dimensions.withWidth()(InnerLayoutBlock);