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

var _dayjs = require("@yosmy/dayjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewUser = function (_React$Component) {
    _inherits(ViewUser, _React$Component);

    function ViewUser() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, ViewUser);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ViewUser.__proto__ || Object.getPrototypeOf(ViewUser)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            user: null,
            transactions: null,
            action: null, // "add-balance"
            progress: 0
        }, _this._collectData = function () {
            _this._handleProgress(true, function () {
                Promise.all([_this.props.api.reseller.pickUserAsAdmin(_this.props.id), _this.props.api.reseller.collectTransactionsAsAdmin(_this.props.id)]).then(function (values) {
                    _this.setState({
                        user: values[0],
                        transactions: values[1]
                    }, function () {
                        _this._handleProgress(false);
                    });
                }).catch(_this.props.onError);
            });
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["children"]);

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({
                    title: "Revendedor",
                    progress: _this.state.progress > 0
                }, props),
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

    _createClass(ViewUser, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this._collectData();
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var Layout = this._buildLayout;

            if (this.state.user === null || this.state.transactions === null) {
                return _react2.default.createElement(Layout, null);
            }

            if (this.state.action === "add-balance") {
                return _react2.default.createElement(
                    Layout,
                    {
                        title: "Poner saldo a revendedor",
                        padding: 8
                    },
                    _react2.default.createElement(AddTransaction, {
                        icons: this.props.icons,
                        api: this.props.api,
                        user: this.state.user,
                        onAdd: function onAdd() {
                            _this3.setState({
                                action: null,
                                user: null,
                                transactions: null
                            }, function () {
                                _this3._collectData();
                            });
                        },
                        onCancel: function onCancel() {
                            _this3.setState({
                                action: null
                            });
                        },
                        onProgress: this._handleProgress,
                        onError: this.props.onError
                    })
                );
            }

            return _react2.default.createElement(
                Layout,
                {
                    padding: 8
                },
                _react2.default.createElement(_ui.Card, {
                    header: {
                        title: "Principal"
                    },
                    content: _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Nombre: ",
                            this.state.user.name
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    top: 8
                                }
                            },
                            "Saldo: $",
                            this.state.user.balance
                        )
                    ),
                    actions: _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        _react2.default.createElement(
                            _ui.Button,
                            {
                                variant: "outlined",
                                tooltip: "Ponerle saldo",
                                onClick: function onClick() {
                                    _this3.setState({
                                        action: "add-balance"
                                    });
                                }
                            },
                            _react2.default.createElement(this.props.icons.actions.add, null)
                        )
                    )
                }),
                _react2.default.createElement(_ui.Card, {
                    header: {
                        title: "Transacciones",
                        subtitle: "Son las transacciones que hace el usuario a nuestra cuenta de banco, para poner saldo"
                    },
                    content: _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        this.state.transactions.length > 0 ? _react2.default.createElement(
                            _ui.List,
                            null,
                            this.state.transactions.map(function (_ref3) {
                                var id = _ref3.id,
                                    reference = _ref3.reference,
                                    amount = _ref3.amount,
                                    date = _ref3.date;

                                return _react2.default.createElement(_ui.ListItem, {
                                    key: id,
                                    text: "$" + amount + " - " + reference,
                                    note: (0, _dayjs.format)(date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")
                                });
                            })
                        ) : _react2.default.createElement(
                            _ui.Text,
                            null,
                            "No hay transacciones a\xFAn para este usuario"
                        )
                    ),
                    margin: {
                        top: 8
                    }
                })
            );
        }
    }]);

    return ViewUser;
}(_react2.default.Component);

ViewUser.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    onError: _propTypes2.default.func.isRequired
};
exports.default = ViewUser;

var AddTransaction = function (_React$Component2) {
    _inherits(AddTransaction, _React$Component2);

    function AddTransaction() {
        var _ref4;

        var _temp2, _this4, _ret2;

        _classCallCheck(this, AddTransaction);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref4 = AddTransaction.__proto__ || Object.getPrototypeOf(AddTransaction)).call.apply(_ref4, [this].concat(args))), _this4), _this4.state = {
            input: {
                amount: null,
                reference: null
            }
        }, _temp2), _possibleConstructorReturn(_this4, _ret2);
    }

    _createClass(AddTransaction, [{
        key: "render",
        value: function render() {
            var _this5 = this;

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    _ui.Container,
                    null,
                    _react2.default.createElement(_ui.Input, {
                        label: "Cantidad",
                        value: this.state.input.amount,
                        focus: true,
                        onChange: function onChange(value) {
                            _this5.setState({
                                input: _extends({}, _this5.state.input, {
                                    amount: value
                                })
                            });
                        }
                    }),
                    _react2.default.createElement(_ui.Input, {
                        label: "Id de transacci\xF3n",
                        value: this.state.input.reference,
                        help: "Id de transacci\xF3n del banco",
                        onChange: function onChange(value) {
                            _this5.setState({
                                input: _extends({}, _this5.state.input, {
                                    reference: value
                                })
                            });
                        }
                    })
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
                            disabled: !this.state.input.amount || !this.state.input.reference,
                            margin: {
                                left: 8
                            },
                            onClick: function onClick() {
                                _this5.props.onProgress(true, function () {
                                    _this5.props.api.reseller.executeTransaction(_this5.props.user.id, _this5.state.input.amount, _this5.state.input.reference).then(function () {
                                        _this5.props.onProgress(false, _this5.props.onAdd);
                                    });
                                });
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            null,
                            "Poner saldo"
                        ),
                        _react2.default.createElement(this.props.icons.actions.ok, null)
                    )
                )
            );
        }
    }]);

    return AddTransaction;
}(_react2.default.Component);

AddTransaction.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    user: _propTypes2.default.object.isRequired,
    onAdd: _propTypes2.default.func.isRequired,
    onCancel: _propTypes2.default.func.isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onError: _propTypes2.default.func.isRequired
};