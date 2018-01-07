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

var EditMetadata = function (_React$Component) {
    _inherits(EditMetadata, _React$Component);

    function EditMetadata() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, EditMetadata);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditMetadata.__proto__ || Object.getPrototypeOf(EditMetadata)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            metadata: null,
            progress: 0
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["children"]);

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
                    title: "Editar metadato",
                    progress: _this.state.progress > 0,
                    right: {
                        icon: _react2.default.createElement(_this2.props.icons.menu.help, null),
                        tooltip: "Ayuda",
                        onClick: "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
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
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(EditMetadata, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            this._handleProgress(true, function () {
                _this3.props.api.pickMetadata(_this3.props.id).then(function (metadata) {
                    _this3._handleProgress(false, function () {
                        _this3.setState({
                            metadata: metadata
                        });
                    });
                }).catch(_this3.props.onError);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var Layout = this._buildLayout;

            if (this.state.metadata === null) {
                return _react2.default.createElement(Layout, null);
            }

            return _react2.default.createElement(
                Layout,
                null,
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        }
                    },
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "flex-start"
                            },
                            width: "50%"
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                type: "h6"
                            },
                            this.state.metadata.description
                        ),
                        _react2.default.createElement(_ui.Input, {
                            label: "Valor",
                            value: this.state.metadata.value,
                            focus: true,
                            margin: { top: 1 },
                            rows: 20,
                            width: "full",
                            onChange: function onChange(value) {
                                _this4.setState({
                                    metadata: _extends({}, _this4.state.metadata, {
                                        value: value
                                    })
                                });
                            }
                        })
                    ),
                    _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "flex-start"
                            },
                            width: "50%"
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                type: "h6"
                            },
                            "Vista previa"
                        ),
                        _react2.default.createElement(
                            _ui.Markdown,
                            {
                                align: {
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start"
                                }
                            },
                            this.state.metadata.value
                        )
                    )
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        margin: {
                            top: 8
                        }
                    },
                    _react2.default.createElement(
                        _ui.Button,
                        {
                            onClick: this.props.onCancel,
                            margin: { right: 1 }
                        },
                        _react2.default.createElement(this.props.icons.actions.back, null),
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Cancelar"
                        )
                    ),
                    _react2.default.createElement(
                        _ui.Button,
                        {
                            color: "primary",
                            disabled: this.state.metadata.value === "",
                            margin: {
                                left: 8
                            },
                            onClick: function onClick() {
                                _this4._handleProgress(true, function () {
                                    _this4.props.api.updateMetadata(_this4.state.metadata.id, _this4.state.metadata.value).then(function () {
                                        _this4._handleProgress(false, _this4.props.onEdit);
                                    }).catch(_this4.props.onError);
                                });
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Actualizar"
                        ),
                        _react2.default.createElement(this.props.icons.actions.ok, null)
                    )
                )
            );
        }
    }]);

    return EditMetadata;
}(_react2.default.Component);

EditMetadata.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    onEdit: _propTypes2.default.func.isRequired, // ()
    onCancel: _propTypes2.default.func.isRequired, // ()
    onError: _propTypes2.default.func.isRequired
};
exports.default = EditMetadata;