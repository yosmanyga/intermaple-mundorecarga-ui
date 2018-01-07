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

var _dayjs = require("@yosmy/dayjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PromotionCard = function (_React$Component) {
    _inherits(PromotionCard, _React$Component);

    function PromotionCard() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PromotionCard);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PromotionCard.__proto__ || Object.getPrototypeOf(PromotionCard)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            edit: false,
            title: null
        }, _this._handleUpdate = function () {
            _this.props.onProgress(true, function () {
                _this.props.api.updateTitle(_this.props.promotion.id, _this.state.title).then(function () {
                    _this.props.onProgress(false, function () {
                        _this.props.onUpdate(function () {
                            _this.setState({
                                edit: false
                            });
                        });
                    });
                }).catch(_this.props.onError);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PromotionCard, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.setState({
                title: this.props.promotion.title
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props$promotion = this.props.promotion,
                id = _props$promotion.id,
                title = _props$promotion.title,
                headline = _props$promotion.headline,
                type = _props$promotion.type,
                minimum = _props$promotion.minimum,
                currency = _props$promotion.currency,
                validity = _props$promotion.validity,
                terms = _props$promotion.terms,
                start = _props$promotion.start,
                end = _props$promotion.end;


            return _react2.default.createElement(_ui.Card, {
                key: id,
                margin: {
                    top: 8
                },
                content: _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "column",
                        align: {
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        },
                        margin: {
                            bottom: 8
                        }
                    },
                    this.state.edit === false ? _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }
                        },
                        this.state.title ? _react2.default.createElement(
                            _react2.default.Fragment,
                            null,
                            _react2.default.createElement(
                                _ui.Text,
                                {
                                    variant: "body2"
                                },
                                "T\xEDtulo personalizado:"
                            ),
                            _react2.default.createElement(
                                _ui.Text,
                                {
                                    margin: {
                                        left: 8
                                    }
                                },
                                title
                            ),
                            _react2.default.createElement(
                                _ui.Button,
                                {
                                    variant: "outlined",
                                    margin: {
                                        left: 8
                                    },
                                    onClick: function onClick() {
                                        _this2.setState({
                                            edit: true
                                        });
                                    }
                                },
                                _react2.default.createElement(this.props.icons.actions.edit, null),
                                _react2.default.createElement(
                                    _ui.Text,
                                    null,
                                    "Editar"
                                )
                            )
                        ) : _react2.default.createElement(
                            _react2.default.Fragment,
                            null,
                            _react2.default.createElement(
                                _ui.Button,
                                {
                                    variant: "outlined",
                                    onClick: function onClick() {
                                        _this2.setState({
                                            edit: true
                                        });
                                    }
                                },
                                _react2.default.createElement(this.props.icons.actions.edit, null),
                                _react2.default.createElement(
                                    _ui.Text,
                                    null,
                                    "Asignar t\xEDtulo personalizado"
                                )
                            )
                        )
                    ) : _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "row",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }
                        },
                        _react2.default.createElement(_ui.Input, {
                            label: "T\xEDtulo personalizado",
                            value: this.state.title,
                            width: "full",
                            focus: true,
                            onChange: function onChange(value) {
                                _this2.setState({
                                    title: value
                                });
                            },
                            onEnter: this._handleUpdate
                        }),
                        _react2.default.createElement(
                            _ui.Button,
                            {
                                variant: "outlined",
                                margin: {
                                    left: 8
                                },
                                onClick: function onClick() {
                                    _this2.setState({
                                        edit: false
                                    });
                                }
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
                                margin: {
                                    left: 8
                                },
                                onClick: this._handleUpdate
                            },
                            _react2.default.createElement(this.props.icons.actions.ok, null),
                            _react2.default.createElement(
                                _ui.Text,
                                null,
                                "Guardar"
                            )
                        )
                    ),
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
                            _ui.Text,
                            {
                                variant: "body2"
                            },
                            "M\xEDnimo:"
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    left: 8
                                }
                            },
                            minimum,
                            " ",
                            currency
                        )
                    ),
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
                            _ui.Text,
                            {
                                variant: "body2"
                            },
                            "Comienzo:"
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    left: 8
                                }
                            },
                            (0, _dayjs.format)(start * 1000, "D [de] MMMM, YYYY - h:mm:ss A")
                        )
                    ),
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
                            _ui.Text,
                            {
                                variant: "body2"
                            },
                            "Final:"
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    left: 8
                                }
                            },
                            (0, _dayjs.format)(end * 1000, "D [de] MMMM, YYYY - h:mm:ss A")
                        )
                    ),
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
                            _ui.Text,
                            {
                                variant: "body2"
                            },
                            "T\xEDtular:"
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    left: 8
                                }
                            },
                            headline
                        )
                    ),
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
                            _ui.Text,
                            {
                                variant: "body2"
                            },
                            "Tipo:"
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    left: 8
                                }
                            },
                            type
                        )
                    ),
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
                            _ui.Text,
                            {
                                variant: "body2"
                            },
                            "Validez:"
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    left: 8
                                }
                            },
                            validity
                        )
                    ),
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
                            _ui.Text,
                            {
                                variant: "body2"
                            },
                            "T\xE9rminos:"
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    left: 8
                                }
                            },
                            terms
                        )
                    )
                )
            });
        }
    }]);

    return PromotionCard;
}(_react2.default.Component);

PromotionCard.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.shape({
        updateTitle: _propTypes2.default.func.isRequired
    }).isRequired,
    promotion: _propTypes2.default.object.isRequired,
    onProgress: _propTypes2.default.func.isRequired,
    onUpdate: _propTypes2.default.func.isRequired // (callback),
};
exports.default = PromotionCard;