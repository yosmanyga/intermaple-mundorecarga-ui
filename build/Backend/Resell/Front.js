"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _resolution = require("@yosmy/resolution");

var _ListUsers = require("./ListUsers");

var _ListUsers2 = _interopRequireDefault(_ListUsers);

var _ViewUser = require("./ViewUser");

var _ViewUser2 = _interopRequireDefault(_ViewUser);

var _SearchTopups = require("./SearchTopups");

var _SearchTopups2 = _interopRequireDefault(_SearchTopups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Front = function (_React$Component) {
    _inherits(Front, _React$Component);

    function Front() {
        _classCallCheck(this, Front);

        return _possibleConstructorReturn(this, (Front.__proto__ || Object.getPrototypeOf(Front)).apply(this, arguments));
    }

    _createClass(Front, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return (0, _resolution.resolve)(this.props.navigation.location, [{
                location: /^\/admin\/reventa\/recargas/,
                element: function element() {
                    return _react2.default.createElement(_SearchTopups2.default, {
                        icons: _this2.props.icons,
                        layout: _this2.props.layout,
                        api: {
                            reseller: {
                                collectAgentsAsAdmin: function collectAgentsAsAdmin() {
                                    var _props$api$calls$rese;

                                    for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                                        props[_key] = arguments[_key];
                                    }

                                    return (_props$api$calls$rese = _this2.props.api.calls.reseller).collectAgentsAsAdmin.apply(_props$api$calls$rese, [_this2.props.api.base, _this2.props.user.token].concat(props));
                                },
                                collectUsers: function collectUsers() {
                                    var _props$api$calls$rese2;

                                    for (var _len2 = arguments.length, props = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                        props[_key2] = arguments[_key2];
                                    }

                                    return (_props$api$calls$rese2 = _this2.props.api.calls.reseller).collectUsers.apply(_props$api$calls$rese2, [_this2.props.api.base, _this2.props.user.token].concat(props));
                                },
                                collectTopupsAsAdmin: function collectTopupsAsAdmin() {
                                    var _props$api$calls$rese3;

                                    for (var _len3 = arguments.length, props = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                                        props[_key3] = arguments[_key3];
                                    }

                                    return (_props$api$calls$rese3 = _this2.props.api.calls.reseller).collectTopupsAsAdmin.apply(_props$api$calls$rese3, [_this2.props.api.base, _this2.props.user.token].concat(props));
                                }
                            }
                        },
                        onError: _this2.props.onError
                    });
                },
                default: true
            }, {
                location: /^\/admin\/reventa\/usuarios/,
                element: function element() {
                    return _react2.default.createElement(_ListUsers2.default, {
                        icons: _this2.props.icons,
                        layout: _this2.props.layout,
                        api: {
                            reseller: {
                                collectUsers: function collectUsers() {
                                    var _props$api$calls$rese4;

                                    for (var _len4 = arguments.length, props = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                                        props[_key4] = arguments[_key4];
                                    }

                                    return (_props$api$calls$rese4 = _this2.props.api.calls.reseller).collectUsers.apply(_props$api$calls$rese4, [_this2.props.api.base, _this2.props.user.token].concat(props));
                                }
                            }
                        },
                        onSelect: function onSelect(_ref) {
                            var id = _ref.id;

                            _this2.props.navigation.onNavigate("/admin/reventa/usuario", {
                                id: id
                            });
                        },
                        onError: _this2.props.onError
                    });
                }
            }, {
                location: /^\/admin\/reventa\/usuario/,
                element: function element() {
                    return _react2.default.createElement(_ViewUser2.default, {
                        icons: _this2.props.icons,
                        layout: _this2.props.layout,
                        api: {
                            reseller: {
                                pickUserAsAdmin: function pickUserAsAdmin() {
                                    var _props$api$calls$rese5;

                                    for (var _len5 = arguments.length, props = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                                        props[_key5] = arguments[_key5];
                                    }

                                    return (_props$api$calls$rese5 = _this2.props.api.calls.reseller).pickUserAsAdmin.apply(_props$api$calls$rese5, [_this2.props.api.base, _this2.props.user.token].concat(props));
                                },
                                collectTransactionsAsAdmin: function collectTransactionsAsAdmin() {
                                    var _props$api$calls$rese6;

                                    for (var _len6 = arguments.length, props = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                                        props[_key6] = arguments[_key6];
                                    }

                                    return (_props$api$calls$rese6 = _this2.props.api.calls.reseller).collectTransactionsAsAdmin.apply(_props$api$calls$rese6, [_this2.props.api.base, _this2.props.user.token].concat(props));
                                },
                                executeTransaction: function executeTransaction() {
                                    var _props$api$calls$rese7;

                                    for (var _len7 = arguments.length, props = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                                        props[_key7] = arguments[_key7];
                                    }

                                    return (_props$api$calls$rese7 = _this2.props.api.calls.reseller).executeTransaction.apply(_props$api$calls$rese7, [_this2.props.api.base, _this2.props.user.token].concat(props));
                                }
                            }
                        },
                        id: _this2.props.navigation.payload.id,
                        onBack: function onBack() {
                            _this2.props.navigation.onNavigate("/admin/reventa/usuarios");
                        },
                        onError: _this2.props.onError
                    });
                }
            }]);
        }
    }]);

    return Front;
}(_react2.default.Component);

Front.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    layout: _propTypes2.default.func.isRequired,
    user: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.shape({
        base: _propTypes2.default.string.isRequired,
        calls: _propTypes2.default.object.isRequired
    }),
    navigation: _propTypes2.default.object.isRequired,
    onError: _propTypes2.default.func.isRequired // ({code})
};
exports.default = Front;