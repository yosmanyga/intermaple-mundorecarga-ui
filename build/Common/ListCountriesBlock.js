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

var _Subtitle = require("../Common/Subtitle");

var _Subtitle2 = _interopRequireDefault(_Subtitle);

var _arrow = require("./arrow.png");

var _arrow2 = _interopRequireDefault(_arrow);

var _logo_v = require("./logo_v.png");

var _logo_v2 = _interopRequireDefault(_logo_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListCountriesBlock = function (_React$Component) {
    _inherits(ListCountriesBlock, _React$Component);

    function ListCountriesBlock() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ListCountriesBlock);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListCountriesBlock.__proto__ || Object.getPrototypeOf(ListCountriesBlock)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            progress: 0,
            filter: ""
        }, _this._match = function (country, input) {
            return country.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u").replace("ñ", "n").toLowerCase().indexOf(input.toLowerCase()) > -1;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ListCountriesBlock, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var countries = this.props.countries.map(function (country) {
                var name = country.name;


                if (_this2.state.filter && !_this2._match(name, _this2.state.filter)) {
                    return null;
                }

                return _this2._renderCountry(country);
            }).filter(function (x) {
                return x;
            });

            return _react2.default.createElement(
                this.props.layout,
                null,
                this.state.filter === "" && _ui.Platform.select({
                    mobile: _react2.default.createElement(
                        _ui.Container,
                        {
                            flow: "column",
                            align: {
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }
                        },
                        _react2.default.createElement(_ui.Image, {
                            source: _logo_v2.default,
                            width: 200,
                            height: 200 * 1157 / 2362 // Using image dimensions
                        }),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                variant: "caption",
                                margin: {
                                    top: 8
                                }
                            },
                            "Recarga celulares hacia cualquier parte del mundo"
                        ),
                        _react2.default.createElement(
                            _ui.Text,
                            {
                                margin: {
                                    top: 4
                                }
                            },
                            "\xBFA qu\xE9 pa\xEDs quieres enviar una recarga?"
                        )
                    )
                }),
                _react2.default.createElement(_ui.Input, {
                    rounded: true,
                    placeholder: "Escribe un pa\xEDs",
                    value: this.state.filter,
                    onChange: function onChange(value) {
                        _this2.setState({
                            filter: value
                        });
                    },
                    onEnter: function onEnter() {
                        var countries = _this2.props.countries.filter(function (country) {
                            var name = country.name;


                            return !_this2.state.filter || _this2._match(name, _this2.state.filter);
                        });

                        if (countries.length === 1) {
                            _this2.props.onSelect(countries[0]);
                        }
                    },
                    width: 200,
                    center: true,
                    margin: {
                        top: 8
                    }
                }),
                countries.length > 0 && _react2.default.createElement(
                    _Subtitle2.default,
                    {
                        active: true,
                        margin: {
                            top: 24
                        }
                    },
                    "Selecciona un pa\xEDs de la lista"
                ),
                countries.length === 0 && _react2.default.createElement(
                    _ui.Error,
                    { margin: { top: 16 } },
                    "Escribe el nombre del pa\xEDs para comenzar a hacer la recarga"
                ),
                this.props.fav && this.state.filter === "" && _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row wrap",
                        align: {
                            alignItems: "flex-start"
                        },
                        margin: {
                            top: 24
                        }
                    },
                    this.props.countries.map(function (country) {
                        var favorite = country.favorite;


                        if (favorite === false) {
                            return null;
                        }

                        return _this2._renderCountry(country);
                    })
                ),
                this.props.fav && this.state.filter === "" && _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            justifyContent: "center",
                            alignItems: "center"
                        },
                        margin: {
                            top: 24
                        },
                        padding: {
                            bottom: _ui.Platform.select({
                                web: 24
                            })
                        },
                        style: _ui.Platform.select({
                            web: {
                                backgroundImage: "url(" + _arrow2.default + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center bottom"
                            }
                        })
                    },
                    _react2.default.createElement(
                        _ui.Text,
                        null,
                        "Todos los pa\xEDses"
                    )
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row wrap",
                        align: {
                            alignItems: "flex-start"
                        },
                        margin: {
                            top: 24
                        }
                    },
                    countries
                )
            );
        }
    }, {
        key: "_renderCountry",
        value: function _renderCountry(country) {
            var _this3 = this;

            var iso = country.iso,
                name = country.name;

            // Countries with no flag

            if (iso === 'AN' || iso === 'XK') {
                return null;
            }

            return _react2.default.createElement(
                _ui.Container,
                {
                    key: iso,
                    flow: "column",
                    align: {
                        alignItems: "center",
                        justifyContent: "flex-start"
                    },
                    margin: {
                        bottom: _ui.Platform.select({
                            web: 16,
                            android: 0,
                            ios: 0
                        })
                    },
                    padding: _ui.Platform.select({
                        web: 16,
                        android: 8,
                        ios: 8
                    }),
                    width: _ui.Platform.select({
                        web: 110,
                        mobile: _ui.Platform.dimensions.isXsDown(this.props.width) ? 90 : 110
                    }),
                    height: _ui.Platform.select({
                        web: 110,
                        mobile: _ui.Platform.dimensions.isXsDown(this.props.width) ? 90 : 110
                    }),
                    onClick: function onClick() {
                        _this3.props.onSelect(country);
                    },
                    style: _ui.Platform.select({
                        web: {
                            textAlign: "center"
                        }
                    })
                },
                _react2.default.createElement(_ui.Flag, {
                    iso: iso,
                    size: "lg"
                }),
                _react2.default.createElement(
                    _ui.Text,
                    {
                        center: true,
                        margin: {
                            top: 4
                        },
                        style: {
                            fontSize: _ui.Platform.select({
                                web: 14,
                                android: 10,
                                ios: 12
                            }),
                            textAlign: _ui.Platform.select({
                                web: "inherit",
                                android: "center",
                                ios: "center"
                            })
                        }
                    },
                    name
                )
            );
        }
    }]);

    return ListCountriesBlock;
}(_react2.default.Component);

ListCountriesBlock.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    countries: _propTypes2.default.array,
    fav: _propTypes2.default.bool, // Show favorite list?
    onSelect: _propTypes2.default.func.isRequired // (country)
};
exports.default = _ui.Platform.dimensions.withWidth()(ListCountriesBlock);