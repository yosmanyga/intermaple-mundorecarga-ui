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

var _Search = require("./Search.inc");

var _Search2 = _interopRequireDefault(_Search);

var _Error = require("./Stripe/Card/Error");

var _Error2 = _interopRequireDefault(_Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewActivity = function (_React$Component) {
    _inherits(ViewActivity, _React$Component);

    function ViewActivity() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, ViewActivity);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ViewActivity.__proto__ || Object.getPrototypeOf(ViewActivity)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            progress: 0,
            search: null
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["children"]);

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
                    title: "Actividad",
                    progress: _this.state.progress > 0
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

    _createClass(ViewActivity, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            var Layout = this._buildLayout;

            return _react2.default.createElement(
                Layout,
                null,
                _react2.default.createElement(_Search2.default, {
                    icons: this.props.icons,
                    onBegin: function onBegin(from, to) {
                        _this3.setState({
                            search: {
                                from: from,
                                to: to
                            }
                        });
                    },
                    onSet: function onSet(from, to) {
                        _this3.setState({
                            search: {
                                from: from,
                                to: to
                            }
                        });
                    }
                }),
                this.state.search && _react2.default.createElement(ListCardErrors, {
                    layout: function layout(_ref3) {
                        var children = _ref3.children;

                        return _react2.default.createElement(_ui.Card, {
                            header: {
                                title: "Errores en la entrada de tarjetas"
                            },
                            content: children
                        });
                    },
                    icons: this.props.icons,
                    api: this.props.api,
                    search: this.state.search,
                    onSelectUser: this.props.onSelectUser,
                    onProgress: this._handleProgress,
                    onError: this.props.onError
                })
            );
        }
    }]);

    return ViewActivity;
}(_react2.default.Component);

ViewActivity.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onSelectUser: _propTypes2.default.func.isRequired, // (user)
    onError: _propTypes2.default.func.isRequired
};

var ListCardErrors = function (_React$Component2) {
    _inherits(ListCardErrors, _React$Component2);

    function ListCardErrors() {
        var _ref4;

        var _temp2, _this4, _ret2;

        _classCallCheck(this, ListCardErrors);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref4 = ListCardErrors.__proto__ || Object.getPrototypeOf(ListCardErrors)).call.apply(_ref4, [this].concat(args))), _this4), _this4.state = {
            errors: null,
            userland: {
                phone: {
                    users: null
                }
            }
        }, _temp2), _possibleConstructorReturn(_this4, _ret2);
    }

    _createClass(ListCardErrors, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return nextProps.search !== this.props.search || nextState !== this.state;
        }
    }, {
        key: "componentWillMount",
        value: function componentWillMount() {
            this._collectErrors(this.props.search.from, this.props.search.to);
        }
    }, {
        key: "componentWillUpdate",
        value: function componentWillUpdate(nextProps, nextState, nextContext) {
            if (nextProps.search !== this.props.search) {
                this._collectErrors(nextProps.search.from, nextProps.search.to);
            }
        }
    }, {
        key: "_collectErrors",
        value: function _collectErrors(from, to) {
            var _this5 = this;

            this.setState({
                errors: null,
                userland: {
                    phone: {
                        users: null
                    }
                }
            }, function () {
                _this5.props.onProgress(true, function () {
                    _this5.props.api.userland.stripe.card.collectErrors(null, from / 1000, to / 1000).then(function (errors) {
                        _this5.setState({
                            errors: errors
                        }, function () {
                            var ids = _this5.state.errors.map(function (_ref5) {
                                var user = _ref5.user;

                                return user;
                            });

                            _this5.props.api.userland.phone.collectUsers(ids).then(function (users) {
                                _this5.setState({
                                    userland: {
                                        phone: {
                                            users: users
                                        }
                                    }
                                });
                            }).catch(_this5.props.onError);

                            _this5.props.onProgress(false);
                        });
                    }).catch(_this5.props.onError);
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            if (this.state.errors === null || this.state.userland.phone.users === null) {
                return _react2.default.createElement(this.props.layout, null);
            }

            if (this.state.errors.length === 0) {
                return _react2.default.createElement(
                    this.props.layout,
                    null,
                    _react2.default.createElement(
                        _ui.Text,
                        {
                            center: true
                        },
                        "No se encontraron errores."
                    )
                );
            }

            return _react2.default.createElement(
                this.props.layout,
                null,
                _react2.default.createElement(
                    _ui.Text,
                    null,
                    "Se encontraron ",
                    this.state.errors.length,
                    " errores"
                ),
                this.state.errors.map(function (error) {
                    var id = error.id;


                    return _react2.default.createElement(_Error2.default, {
                        key: id,
                        data: error,
                        icons: _this6.props.icons,
                        users: _this6.state.userland.phone.users,
                        onSelectUser: _this6.props.onSelectUser
                    });
                })
            );
        }
    }]);

    return ListCardErrors;
}(_react2.default.Component);

ListCardErrors.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    search: _propTypes2.default.shape({
        from: _propTypes2.default.number.isRequired,
        to: _propTypes2.default.number.isRequired
    }).isRequired,
    onSelectUser: _propTypes2.default.func.isRequired, // (user)
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};
exports.default = ViewActivity;