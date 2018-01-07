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

var _resolution = require("@yosmy/resolution");

var _ui = require("@yosmy/ui");

var _Front = require("./Frontend/Front");

var _Front2 = _interopRequireDefault(_Front);

var _Front3 = require("./Backend/Front");

var _Front4 = _interopRequireDefault(_Front3);

var _Front5 = require("./Resell/Front");

var _Front6 = _interopRequireDefault(_Front5);

var _Api = require("./Api");

var _Api2 = _interopRequireDefault(_Api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Front = function (_React$Component) {
    _inherits(Front, _React$Component);

    function Front() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, Front);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Front.__proto__ || Object.getPrototypeOf(Front)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            user: null
        }, _this._handleAuthenticated = function (authentication) {
            var session = authentication.session,
                token = authentication.token,
                phone = authentication.phone,
                roles = authentication.roles;


            var resolvePush = _ui.Platform.select({
                web: function web() {
                    return new Promise(function (resolve) {
                        resolve(null);
                    });
                },
                mobile: function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                        var _ref3, existingStatus, finalStatus, _ref4, status;

                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.next = 2;
                                        return _ui.Platform.permissions.get(_ui.Platform.permissions.NOTIFICATIONS);

                                    case 2:
                                        _ref3 = _context.sent;
                                        existingStatus = _ref3.status;
                                        finalStatus = existingStatus;

                                        // Only ask if permissions have not already been determined, because
                                        // iOS won't necessarily prompt the user a second time.

                                        if (!(existingStatus !== 'granted')) {
                                            _context.next = 11;
                                            break;
                                        }

                                        _context.next = 8;
                                        return _ui.Platform.permissions.ask(_ui.Platform.permissions.NOTIFICATIONS);

                                    case 8:
                                        _ref4 = _context.sent;
                                        status = _ref4.status;

                                        finalStatus = status;

                                    case 11:
                                        if (!(finalStatus !== 'granted')) {
                                            _context.next = 13;
                                            break;
                                        }

                                        return _context.abrupt("return");

                                    case 13:
                                        _context.next = 15;
                                        return _ui.Platform.notifications.getToken();

                                    case 15:
                                        return _context.abrupt("return", _context.sent);

                                    case 16:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee, _this2);
                    }));

                    function mobile() {
                        return _ref2.apply(this, arguments);
                    }

                    return mobile;
                }()
            });

            var finish = function finish() {
                _this.setState({
                    user: {
                        time: Date.now(),
                        session: session,
                        token: token,
                        phone: phone,
                        roles: roles
                    }
                }, function () {
                    _ui.Platform.secure.set('user', _this.state.user);
                });
            };

            resolvePush().then(function (push) {
                if (!push) {
                    finish();

                    return;
                }

                _Api2.default.userland.push.assignUser(_this.props.api.base, token, push).then(function () {
                    finish();
                }).catch(_this.props.onError);
            }).catch(function () {
                finish();
            });
        }, _this._handleLogout = function () {
            _this.setState({
                user: _extends({}, _this.state.user, { // Keep session
                    referral: null,
                    token: null,
                    phone: null,
                    roles: null,
                    time: null
                })
            }, function () {
                _ui.Platform.secure.set('user', _this.state.user);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Front, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this3 = this;

            /* User */

            // Platform.secure.delete('user');

            _ui.Platform.secure.get('user').then(function (user) {
                if (typeof user === 'undefined') {
                    user = {
                        session: null,
                        token: null,
                        phone: null,
                        roles: null,
                        time: null
                    };

                    /* Referral */

                    var referral = typeof _this3.props.navigation.payload.ref !== 'undefined' ? _this3.props.navigation.payload.ref : null;

                    user = _extends({}, user, {
                        referral: referral
                    });
                }

                // Force users who don't have phone stored to logout
                if (typeof user.phone === "undefined") {
                    user = {
                        session: null,
                        token: null,
                        phone: null,
                        roles: null,
                        time: null
                    };
                }

                // TODO: Temporal patch
                if (typeof user.token === "undefined") {
                    user = _extends({}, user, {
                        token: null
                    });
                }

                _this3.setState({
                    user: user
                });
            });
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return this.state.user !== nextState.user || this.props.navigation.location !== nextProps.navigation.location;
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            if (this.state.user === null) {
                return _react2.default.createElement(this.props.blankLayout, null);
            }

            var api = _extends({}, this.props.api, {
                calls: _Api2.default
            });

            try {
                return (0, _resolution.resolve)(this.props.navigation.location, [{
                    location: /^\/admin/,
                    element: function element() {
                        return _react2.default.createElement(_Front4.default, {
                            icons: _this4.props.icons,
                            blankLayout: _this4.props.blankLayout,
                            drawerLayout: _this4.props.drawerLayout,
                            user: _this4.state.user,
                            api: api,
                            navigation: _this4.props.navigation,
                            onAuthenticated: _this4._handleAuthenticated,
                            onError: _this4.props.onError
                        });
                    }
                }, {
                    location: /^\/reventa/,
                    element: function element() {
                        return _react2.default.createElement(_Front6.default, {
                            icons: _this4.props.icons,
                            blankLayout: _this4.props.blankLayout,
                            frontendLayout: _this4.props.frontendLayout,
                            user: _this4.state.user,
                            api: api,
                            navigation: _this4.props.navigation,
                            onAuthenticated: _this4._handleAuthenticated,
                            onLogout: _this4._handleLogout,
                            onError: _this4.props.onError
                        });
                    }
                },
                // Last, because it will match everything
                {
                    location: /^\//,
                    element: function element() {
                        return _react2.default.createElement(_Front2.default, {
                            icons: _this4.props.icons,
                            blankLayout: _this4.props.blankLayout,
                            frontendLayout: _this4.props.frontendLayout,
                            user: _this4.state.user,
                            api: api,
                            navigation: _this4.props.navigation,
                            onAuthenticated: _this4._handleAuthenticated,
                            onLogout: _this4._handleLogout,
                            onError: _this4.props.onError
                        });
                    },
                    default: true
                }]);
            } catch (e) {
                console.error(this.props.navigation);

                throw e;
            }
        }
    }]);

    return Front;
}(_react2.default.Component);

Front.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    blankLayout: _propTypes2.default.func.isRequired,
    frontendLayout: _propTypes2.default.func.isRequired,
    drawerLayout: _propTypes2.default.func.isRequired,
    api: _propTypes2.default.shape({
        base: _propTypes2.default.string
    }),
    navigation: _propTypes2.default.shape({
        location: _propTypes2.default.string.isRequired,
        payload: _propTypes2.default.object,
        onNavigate: _propTypes2.default.func.isRequired // (location, callback)
    }).isRequired,
    onError: _propTypes2.default.func.isRequired // ()
};
exports.default = Front;