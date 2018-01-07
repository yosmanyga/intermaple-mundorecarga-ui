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

var ViewPrivacyPolicy = function (_React$Component) {
    _inherits(ViewPrivacyPolicy, _React$Component);

    function ViewPrivacyPolicy() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, ViewPrivacyPolicy);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ViewPrivacyPolicy.__proto__ || Object.getPrototypeOf(ViewPrivacyPolicy)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            text: null,
            progress: 0
        }, _this.componentWillMount = function () {
            _ui.Platform.back.add(_this._handleBack);
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["children"]);

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
                    title: "Pol\xEDtica de privacidad",
                    progress: _this.state.progress > 0,
                    align: {
                        alignItems: "flex-start"
                    }
                }),
                children
            );
        }, _this._handleProgress = function (progress) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            _this.setState(function (prevState) {
                return {
                    progress: prevState.progress + (progress === true ? 1 : -1)
                };
            }, callback);
        }, _this._handleBack = function () {
            _this.props.onBack();

            return true;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ViewPrivacyPolicy, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            this._handleProgress(true, function () {
                _this3.props.api.pickMetadata("privacy-policy-text").then(function (_ref3) {
                    var value = _ref3.value;

                    _this3.setState({
                        text: value
                    }, function () {
                        _this3._handleProgress(false);
                    });
                }).catch(_this3.props.onError);
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _ui.Platform.back.remove(this._handleBack);
        }
    }, {
        key: "render",
        value: function render() {
            var Layout = this._buildLayout;

            if (this.state.text === null) {
                return _react2.default.createElement(Layout, null);
            }

            return _react2.default.createElement(
                Layout,
                null,
                _react2.default.createElement(
                    _ui.Markdown,
                    {
                        margin: 8
                    },
                    this.state.text
                ),
                _react2.default.createElement(
                    _ui.Button,
                    {
                        color: "primary",
                        center: true,
                        onClick: this.props.onBack
                    },
                    _react2.default.createElement(this.props.icons.actions.back, null),
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Regresar"
                    )
                )
            );
        }
    }]);

    return ViewPrivacyPolicy;
}(_react2.default.Component);

ViewPrivacyPolicy.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onBack: _propTypes2.default.func.isRequired, // ()
    onError: _propTypes2.default.func.isRequired
};
exports.default = ViewPrivacyPolicy;
;