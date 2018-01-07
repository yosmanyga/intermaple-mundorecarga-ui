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

var Search = function (_React$Component) {
    _inherits(Search, _React$Component);

    function Search() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Search);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            from: null,
            to: null
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Search, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var now = new Date();

            this.setState({
                from: (0, _dayjs.startOfDay)(now),
                to: (0, _dayjs.endOfDay)(now)
            }, function () {
                _this2.props.onBegin(_this2.state.from, _this2.state.to);
            });
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return this.state !== nextState;
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "row"
                },
                _react2.default.createElement(_ui.DatePicker, {
                    margin: {
                        left: 4
                    },
                    value: this.state.from,
                    placeholder: "Desde",
                    onChange: function onChange(date) {
                        _this3.setState({
                            from: (0, _dayjs.startOfDay)(date)
                        });
                    }
                }),
                _react2.default.createElement(_ui.DatePicker, {
                    margin: {
                        left: 4
                    },
                    value: this.state.to,
                    placeholder: "Hasta",
                    onChange: function onChange(date) {
                        _this3.setState({
                            to: (0, _dayjs.endOfDay)(date)
                        });
                    }
                }),
                _react2.default.createElement(
                    _ui.Button,
                    {
                        color: "primary",
                        margin: {
                            left: 4
                        },
                        onClick: function onClick() {
                            _this3.props.onSet(_this3.state.from, _this3.state.to);
                        }
                    },
                    _react2.default.createElement(this.props.icons.actions.search, null),
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Buscar"
                    )
                )
            );
        }
    }]);

    return Search;
}(_react2.default.Component);

Search.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    onBegin: _propTypes2.default.func.isRequired, // (from, to)
    onSet: _propTypes2.default.func.isRequired // (from, to)
};
exports.default = Search;