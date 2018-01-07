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

var LayoutBlock = function (_React$Component) {
    _inherits(LayoutBlock, _React$Component);

    function LayoutBlock() {
        _classCallCheck(this, LayoutBlock);

        return _possibleConstructorReturn(this, (LayoutBlock.__proto__ || Object.getPrototypeOf(LayoutBlock)).apply(this, arguments));
    }

    _createClass(LayoutBlock, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                this.props.layout,
                {
                    site: this.props.country && "Recargas económicas a " + this.props.country.name,
                    title: "Nueva recarga",
                    meta: {
                        keywords: this.props.keywords
                    },
                    left: {
                        icon: _react2.default.createElement(this.props.icons.actions.back, null),
                        onClick: this.props.onBack
                    },
                    progress: this.props.progress > 0
                },
                this.props.children
            );
        }
    }]);

    return LayoutBlock;
}(_react2.default.Component);

LayoutBlock.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    keywords: _propTypes2.default.string,
    country: _propTypes2.default.object,
    progress: _propTypes2.default.number,
    onBack: _propTypes2.default.func.isRequired
};
exports.default = _ui.Platform.dimensions.withWidth()(LayoutBlock);