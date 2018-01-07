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

var _dayjs = require("@yosmy/dayjs");

var _ui = require("@yosmy/ui");

var _Search = require("./Search.inc");

var _Search2 = _interopRequireDefault(_Search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchEvents = function (_React$Component) {
    _inherits(SearchEvents, _React$Component);

    function SearchEvents() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, SearchEvents);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchEvents.__proto__ || Object.getPrototypeOf(SearchEvents)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            events: null,
            progress: 0
        }, _this._collectEvents = function (from, to) {
            _this.setState({
                events: null
            }, function () {
                _this._handleProgress(true, function () {
                    _this.props.api.blacklist.log.collectEvents(from / 1000, to / 1000).then(function (events) {
                        _this.setState({
                            events: events
                        }, function () {
                            _this._handleProgress(false);
                        });
                    }).catch(_this.props.onError);
                });
            });
        }, _this._buildLayout = function (_ref2) {
            var children = _ref2.children,
                props = _objectWithoutProperties(_ref2, ["children"]);

            return _react2.default.createElement(
                _this2.props.layout,
                _extends({}, props, {
                    title: "Fraude",
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

    _createClass(SearchEvents, [{
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
                        _this3._collectEvents(from, to);
                    },
                    onSet: function onSet(from, to) {
                        _this3._collectEvents(from, to);
                    }
                }),
                this.state.events !== null ? this.state.events.length > 0 ? this.state.events.map(function (_ref3) {
                    var id = _ref3.id,
                        labels = _ref3.labels,
                        contents = _ref3.contents,
                        date = _ref3.date;

                    return _react2.default.createElement(Event, {
                        key: id,
                        icons: _this3.props.icons,
                        id: id,
                        labels: labels,
                        contents: contents,
                        date: date
                    });
                }) : _react2.default.createElement(
                    _ui.Text,
                    {
                        center: true,
                        margin: {
                            top: 1
                        }
                    },
                    "No se encontraron logs."
                ) : null
            );
        }
    }]);

    return SearchEvents;
}(_react2.default.Component);

SearchEvents.propTypes = {
    layout: _propTypes2.default.func.isRequired,
    icons: _propTypes2.default.object.isRequired,
    api: _propTypes2.default.object.isRequired,
    onError: _propTypes2.default.func.isRequired
};

var Event = function (_React$Component2) {
    _inherits(Event, _React$Component2);

    function Event() {
        var _ref4,
            _this5 = this;

        var _temp2, _this4, _ret2;

        _classCallCheck(this, Event);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref4 = Event.__proto__ || Object.getPrototypeOf(Event)).call.apply(_ref4, [this].concat(args))), _this4), _this4._buildCharacter = function (labels) {
            var type = labels.find(function (_ref5) {
                var key = _ref5.key;

                return key === 'type';
            }).value;

            var icon = void 0,
                character = void 0,
                value = void 0,
                ban = void 0;

            switch (type) {
                case "yosmy.userland.blacklist.ban_session":
                    icon = _react2.default.createElement(_this5.props.icons.objects.session, null);

                    value = labels.find(function (_ref6) {
                        var key = _ref6.key;

                        return key === 'session';
                    }).value;

                    value = _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "subtitle2",
                            margin: { left: 4 }
                        },
                        value
                    );

                    character = "Sesión";

                    ban = "baneada";

                    break;
                case "yosmy.userland.blacklist.ban_user":
                    icon = _react2.default.createElement(_this5.props.icons.objects.user, null);

                    value = labels.find(function (_ref7) {
                        var key = _ref7.key;

                        return key === 'user';
                    }).value;

                    value = _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "subtitle2",
                            margin: { left: 4 }
                        },
                        value
                    );

                    // value = <Button
                    //     variant="outlined"
                    //     margin={{left: 4}}
                    //     onClick={() => {}}
                    // >
                    //     <this.props.icons.actions.details />
                    //     <Text
                    //         variant="subtitle2"
                    //     >
                    //         {value}
                    //     </Text>
                    // </Button>;

                    character = "Usuario";

                    ban = "baneado";

                    break;
                case "yosmy.userland.stripe.blacklist.ban_card":
                    icon = _react2.default.createElement(_this5.props.icons.objects.card, null);

                    value = labels.find(function (_ref8) {
                        var key = _ref8.key;

                        return key === 'card';
                    }).value;

                    value = _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "subtitle2",
                            margin: { left: 4 }
                        },
                        value
                    );

                    character = "Tarjeta";

                    ban = "baneada";

                    break;
                case "blacklist.ban_contact":
                    icon = _react2.default.createElement(_this5.props.icons.objects.contact, null);

                    value = labels.find(function (_ref9) {
                        var key = _ref9.key;

                        return key === 'contact';
                    }).value;

                    value = _react2.default.createElement(
                        _ui.Text,
                        {
                            variant: "subtitle2",
                            margin: { left: 4 }
                        },
                        value
                    );

                    character = "Contacto";

                    ban = "baneado";

                    break;
                default:
                    throw new Error(type);
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                icon,
                _react2.default.createElement(
                    _ui.Text,
                    {
                        margin: { left: 4 }
                    },
                    character
                ),
                value,
                _react2.default.createElement(
                    _ui.Text,
                    {
                        margin: { left: 4 }
                    },
                    ban
                )
            );
        }, _this4._buildTrace = function (contents) {
            var trace = contents.find(function (_ref10) {
                var key = _ref10.key;

                return key === 'trace';
            }).value;

            if (trace.length === 0) {
                return null;
            }

            var type = trace.type,
                value = trace.value;


            var icon = void 0,
                reason = void 0;

            switch (type) {
                case 'session-banned':
                    icon = _react2.default.createElement(_this5.props.icons.objects.session, null);
                    reason = 'Sesión baneada';

                    break;
                case 'user-banned':
                    icon = _react2.default.createElement(_this5.props.icons.objects.user, null);
                    reason = 'Usuario baneado';

                    break;
                case 'card-banned':
                    icon = _react2.default.createElement(_this5.props.icons.objects.card, null);
                    reason = 'Tarjeta baneada';

                    break;
                case 'charge-blocked':
                    icon = _react2.default.createElement(_this5.props.icons.objects.charge, null);
                    reason = 'Pago bloqueado por Stripe';

                    break;
                case 'charge-risked':
                    icon = _react2.default.createElement(_this5.props.icons.objects.charge, null);
                    reason = 'Pago riesgoso para Stripe';

                    break;
                case 'card-blocked':
                    icon = _react2.default.createElement(_this5.props.icons.objects.card, null);
                    reason = 'Tarjeta bloqueada por Stripe';

                    break;
                case 'country-different':
                    icon = _react2.default.createElement(_this5.props.icons.objects.country, null);
                    reason = 'País distinto al del usuario';

                    break;
                case 'contact-banned':
                    icon = _react2.default.createElement(_this5.props.icons.objects.contact, null);
                    reason = 'Contacto baneado';

                    break;
                case 'dispute-imported':
                    icon = _react2.default.createElement(_this5.props.icons.objects.dispute, null);
                    reason = 'Disputa creada';

                    break;
                case 'errors-surpassed':
                    icon = _react2.default.createElement(_this5.props.icons.objects.card, null);
                    reason = 'Demasiados intentos de introducir tarjetas';

                    break;
                case 'hand':
                    icon = _react2.default.createElement(_this5.props.icons.objects.hand, null);
                    reason = 'Bloqueado manualmente';

                    break;
                default:
                    throw type;
            }

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    _ui.Text,
                    {
                        margin: {
                            left: 4,
                            right: 4
                        }
                    },
                    "debido a"
                ),
                icon,
                _react2.default.createElement(
                    _ui.Text,
                    {
                        margin: { left: 4 }
                    },
                    reason
                ),
                value && _react2.default.createElement(
                    _ui.Text,
                    {
                        variant: "subtitle2",
                        margin: { left: 4 }
                    },
                    value
                )
            );
        }, _temp2), _possibleConstructorReturn(_this4, _ret2);
    }

    _createClass(Event, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                labels = _props.labels,
                contents = _props.contents,
                date = _props.date;


            return _react2.default.createElement(
                _ui.Container,
                {
                    flow: "column",
                    align: {
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                    },
                    margin: {
                        top: 8
                    },
                    padding: 8,
                    elevation: 1
                },
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        },
                        margin: {
                            top: 8
                        }
                    },
                    _react2.default.createElement(
                        _ui.Text,
                        { variant: "caption" },
                        (0, _dayjs.format)(date * 1000, "D [de] MMMM, YYYY - h:mm:ss A")
                    )
                ),
                _react2.default.createElement(
                    _ui.Container,
                    {
                        flow: "row",
                        align: {
                            justifyContent: "flex-start",
                            alignItems: "center"
                        },
                        margin: {
                            top: 8
                        }
                    },
                    this._buildCharacter(labels),
                    this._buildTrace(contents)
                )
            );
        }
    }]);

    return Event;
}(_react2.default.Component);

Event.propTypes = {
    icons: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    labels: _propTypes2.default.array.isRequired,
    contents: _propTypes2.default.array.isRequired,
    date: _propTypes2.default.number.isRequired
};
exports.default = SearchEvents;