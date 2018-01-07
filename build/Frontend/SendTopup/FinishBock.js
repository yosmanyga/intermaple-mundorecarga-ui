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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FinishBock = function (_React$Component) {
    _inherits(FinishBock, _React$Component);

    function FinishBock() {
        _classCallCheck(this, FinishBock);

        return _possibleConstructorReturn(this, (FinishBock.__proto__ || Object.getPrototypeOf(FinishBock)).apply(this, arguments));
    }

    _createClass(FinishBock, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                _ui.Container,
                {
                    margin: {
                        top: 8
                    },
                    style: {
                        alignItems: "center"
                    }
                },
                _react2.default.createElement(this.props.icons.objects.check, {
                    style: {
                        color: "green",
                        fontSize: 108
                    }
                }),
                _react2.default.createElement(
                    _ui.Text,
                    null,
                    "La recarga se ha realizado exitosamente"
                ),
                _react2.default.createElement(_ui.Flag, {
                    iso: this.props.country.iso,
                    size: "sm",
                    margin: {
                        top: 8
                    }
                }),
                _react2.default.createElement(
                    _ui.Text,
                    {
                        margin: {
                            top: 4
                        }
                    },
                    this.props.type === "phone" ? this.props.country.prefix + "-" + this.props.account : this.props.account
                ),
                this.props.name ? _react2.default.createElement(
                    _ui.Text,
                    {
                        variant: "caption",
                        margin: {
                            top: 4
                        }
                    },
                    this.props.name
                ) : null,
                _ui.Platform.select({
                    web: _react2.default.createElement(
                        _ui.Container,
                        {
                            margin: {
                                top: 32
                            }
                        },
                        _react2.default.createElement(
                            _ui.Text,
                            { variant: "body1" },
                            "Haz tu pr\xF3xima recarga desde el App!"
                        ),
                        _react2.default.createElement(
                            _ui.Container,
                            {
                                flow: "row wrap",
                                align: {
                                    justifyContent: "center",
                                    alignItems: "center"
                                }
                            },
                            _react2.default.createElement(_ui.Image, {
                                source: require("../google.png"),
                                onClick: this.props.onNavigateToAndroidApp,
                                margin: 24
                            }),
                            _react2.default.createElement(_ui.Image, {
                                source: require("../apple.png"),
                                onClick: this.props.onNavigateToIosApp,
                                margin: 24
                            })
                        )
                    )
                }),
                _react2.default.createElement(
                    _ui.Button,
                    {
                        variant: "text",
                        onClick: this.props.onFinish,
                        center: true,
                        margin: {
                            top: 32
                        }
                    },
                    _react2.default.createElement(this.props.icons.actions.search, null),
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Ver historial"
                    )
                ),
                _ui.Platform.select({
                    mobile: _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            },
                            margin: {
                                top: 32,
                                bottom: 8
                            },
                            padding: 32,
                            border: {
                                top: {
                                    width: 1,
                                    color: "#ccc",
                                    style: "solid"
                                }
                            }
                        },
                        _react2.default.createElement(_ui.Image, {
                            source: require("../../Common/logo_v.png"),
                            width: 200,
                            height: 1157 * 200 / 2362
                        }),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    top: 8
                                },
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            "R\xE1pido y econ\xF3mico"
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    top: 16
                                },
                                style: {
                                    textAlign: 'center'
                                }
                            },
                            "Ayuda a tus amigos a ahorrar dinero compartiendo el App"
                        ),
                        _react2.default.createElement(
                            _ui.Button,
                            {
                                color: "primary",
                                margin: {
                                    top: 16
                                },
                                center: true,
                                onClick: function onClick() {
                                    _ui.Platform.share("Prueba MundoRecarga para enviar recargas", "En estos momentos usé MundoRecarga, es la aplicación más fácil y económica para enviar las recargas. Te la recomiendo! www.mundorecarga.com").then(function () {}).catch(_this2.props.onError);
                                }
                            },
                            _react2.default.createElement(
                                _ui.Text,
                                null,
                                "Compartir MundoRecarga"
                            )
                        )
                    )
                })
            );
        }
    }]);

    return FinishBock;
}(_react2.default.Component);

FinishBock.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    country: _propTypes2.default.object.isRequired,
    account: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.oneOf(["phone", "email"]),
    name: _propTypes2.default.string,
    onFinish: _propTypes2.default.func.isRequired, // ()
    onNavigateToAndroidApp: _propTypes2.default.func.isRequired, // ()
    onNavigateToIosApp: _propTypes2.default.func.isRequired, // ()
    onError: _propTypes2.default.func.isRequired // ()
};
exports.default = FinishBock;