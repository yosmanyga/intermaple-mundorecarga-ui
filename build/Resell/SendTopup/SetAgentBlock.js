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

var _Subtitle = require("../../Common/Subtitle");

var _Subtitle2 = _interopRequireDefault(_Subtitle);

var _Row = require("../../Common/Row");

var _Row2 = _interopRequireDefault(_Row);

var _Preview = require("../../Common/Preview");

var _Preview2 = _interopRequireDefault(_Preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SetAgentBlock = function (_React$Component) {
    _inherits(SetAgentBlock, _React$Component);

    function SetAgentBlock() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SetAgentBlock);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SetAgentBlock.__proto__ || Object.getPrototypeOf(SetAgentBlock)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            edit: true,
            error: null,
            agent: null,
            agents: null
        }, _this._handleSelect = function (agent) {
            _this.setState({
                error: null,
                agent: agent,
                edit: false
            }, function () {
                _this.props.onSet(agent);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SetAgentBlock, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.props.onProgress(true, function () {
                _this2.props.api.reseller.collectAgentsAsReseller().then(function (agents) {
                    _this2.setState({
                        agents: agents
                    }, function () {
                        _this2.props.onProgress(false, function () {
                            // Just one agent? Select it by default
                            if (agents.length === 1) {
                                _this2._handleSelect(agents[0]);
                            }
                        });
                    });
                }).catch(_this2.props.onError);
            });
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.props.edit !== nextProps.edit || this.state !== nextState;
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState, prevContext) {
            if (this.props.edit === true) {
                if (prevProps.edit === this.props.edit) {
                    // Avoid recursion
                    return;
                }

                this.setState({
                    edit: true
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.edit === false) {
                var name = this.state.agent.name;


                return _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(
                        _Subtitle2.default,
                        {
                            margin: {
                                top: 8
                            }
                        },
                        "Agente"
                    ),
                    _react2.default.createElement(_Preview2.default, {
                        icons: {
                            close: this.props.icons.actions.close
                        },
                        margin: {
                            top: 8,
                            bottom: 8
                        },
                        left: _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "column",
                                align: {
                                    justifyContent: "center",
                                    alignItems: "center"
                                }
                            },
                            _react2.default.createElement(this.props.icons.objects.reseller.agent, null)
                        ),
                        body: _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "column",
                                align: {
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start"
                                }
                            },
                            _react2.default.createElement(
                                _ui.Text,
                                null,
                                name
                            )
                        ),
                        onUndo: function onUndo() {
                            _this3.setState({
                                edit: true
                            }, _this3.props.onEdit);
                        }
                    })
                );
            }

            if (this.state.agents === null) {
                return null;
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    _Subtitle2.default,
                    {
                        active: true,
                        margin: {
                            top: 8
                        }
                    },
                    "Selecciona el agente"
                ),
                this.state.agents.map(function (agent) {
                    var id = agent.id,
                        name = agent.name;


                    return _react2.default.createElement(_Row2.default, {
                        key: id,
                        align: {
                            justifyContent: "center",
                            alignItems: "center"
                        },
                        left: _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "column",
                                align: {
                                    justifyContent: "center",
                                    alignItems: "center"
                                }
                            },
                            _this3.state.agent && _this3.state.agent.id === id ? _react2.default.createElement(_this3.props.icons.objects.selected, null) : _react2.default.createElement(_this3.props.icons.objects.unselected, null)
                        ),
                        body: _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "row",
                                align: {
                                    justifyContent: "flex-start",
                                    alignItems: "center"
                                }
                            },
                            name
                        ),
                        onClick: function onClick() {
                            _this3._handleSelect(agent);
                        }
                    });
                })
            );
        }
    }]);

    return SetAgentBlock;
}(_react2.default.Component);

SetAgentBlock.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    edit: _propTypes2.default.bool,
    onProgress: _propTypes2.default.func.isRequired, // (progress, callback)
    onSet: _propTypes2.default.func.isRequired, // (agent)
    onEdit: _propTypes2.default.func.isRequired, // ()
    onError: _propTypes2.default.func.isRequired
};
exports.default = _ui.Platform.dimensions.withWidth()(SetAgentBlock);