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

var _Row = require("./Row");

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListPromotionsBlock = function (_React$Component) {
    _inherits(ListPromotionsBlock, _React$Component);

    function ListPromotionsBlock() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ListPromotionsBlock);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListPromotionsBlock.__proto__ || Object.getPrototypeOf(ListPromotionsBlock)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            promotion: null
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ListPromotionsBlock, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                _ui.Container,
                {
                    padding: this.props.padding,
                    background: "#fcf8e3"
                },
                this.props.promotions.map(function (promotion) {
                    var logo = void 0,
                        width = void 0,
                        height = void 0;

                    if (_this2.props.providers) {
                        var provider = _this2.props.providers.find(function (_ref2) {
                            var id = _ref2.id;

                            return id === promotion.provider;
                        });

                        if (provider.logo !== null) {
                            logo = provider.logo;
                            width = provider.width;
                            height = provider.height;
                        } else {
                            logo = require("./provider.png");
                            width = 24;
                            height = 24;
                        }

                        // Trick to put the logo inside a box

                        if (width >= 24) {
                            height = height * 24 / width;
                            width = 24;
                        } else if (height >= 24) {
                            width = width * 24 / height;
                            height = 24;
                        }
                    } else {
                        logo = require("../Frontend/gift.png");
                        width = 24;
                        height = 24;
                    }

                    return _react2.default.createElement(_Row2.default, {
                        key: promotion.id,
                        left: _react2.default.createElement(
                            _ui.Container,
                            {
                                width: 24,
                                height: 24
                            },
                            _react2.default.createElement(_ui.Image, {
                                source: logo,
                                width: width,
                                height: height,
                                margin: {
                                    top: 4
                                }
                            })
                        ),
                        body: _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "column",
                                margin: {
                                    left: 8,
                                    bottom: 0
                                }
                            },
                            _react2.default.createElement(
                                _ui.Text,
                                {
                                    variant: "subtitle2"
                                },
                                promotion.title || promotion.type
                            ),
                            _react2.default.createElement(
                                _ui.Text,
                                {
                                    style: {
                                        color: "#883A3E"
                                    }
                                },
                                "Del ",
                                (0, _dayjs.format)(promotion.start * 1000, "D"),
                                (0, _dayjs.format)(promotion.start * 1000, "MMMM") !== (0, _dayjs.format)(promotion.end * 1000, "MMMM") ? " " + (0, _dayjs.format)(promotion.start * 1000, "MMMM") : null,
                                " al ",
                                (0, _dayjs.format)(promotion.end * 1000, "D"),
                                " ",
                                (0, _dayjs.format)(promotion.end * 1000, "MMMM"),
                                ", ",
                                (0, _dayjs.format)(promotion.end * 1000, "YYYY")
                            ),
                            promotion === _this2.state.promotion ? _react2.default.createElement(
                                _react2.default.Fragment,
                                null,
                                _react2.default.createElement(
                                    _ui.Text,
                                    {
                                        margin: {
                                            top: 8,
                                            right: 8
                                        }
                                    },
                                    promotion.validity
                                ),
                                _react2.default.createElement(
                                    _ui.Text,
                                    {
                                        margin: {
                                            top: 8,
                                            right: 8
                                        }
                                    },
                                    promotion.terms
                                ),
                                _react2.default.createElement(
                                    _ui.Button,
                                    {
                                        variant: "text",
                                        size: "small",
                                        onClick: function onClick() {
                                            _this2.setState({
                                                promotion: null
                                            });
                                        },
                                        margin: _ui.Platform.select({
                                            web: {
                                                top: 8,
                                                right: 0,
                                                bottom: 0,
                                                left: 0
                                            },
                                            mobile: 0
                                        }),
                                        padding: 0
                                    },
                                    _react2.default.createElement(
                                        _ui.Text,
                                        {
                                            margin: _ui.Platform.select({
                                                mobile: 0
                                            }),
                                            padding: 0
                                        },
                                        "Ocultar detalles"
                                    )
                                )
                            ) : _react2.default.createElement(
                                _ui.Button,
                                {
                                    variant: "text",
                                    color: "primary",
                                    size: "small",
                                    onClick: function onClick() {
                                        _this2.setState({
                                            promotion: promotion
                                        });
                                    },
                                    margin: _ui.Platform.select({
                                        web: 0
                                    }),
                                    padding: 0
                                },
                                _react2.default.createElement(
                                    _ui.Text,
                                    {
                                        margin: _ui.Platform.select({
                                            web: 0
                                        }),
                                        padding: 0
                                    },
                                    "Mostrar detalles"
                                )
                            )
                        ),
                        padding: {
                            top: 8,
                            bottom: 8
                        },
                        underline: false
                    });
                })
            );
        }
    }]);

    return ListPromotionsBlock;
}(_react2.default.Component);

ListPromotionsBlock.propTypes = {
    providers: _propTypes2.default.array,
    promotions: _propTypes2.default.array
};
exports.default = _ui.Platform.dimensions.withWidth()(ListPromotionsBlock);