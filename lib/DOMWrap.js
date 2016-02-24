'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var DOMWrap = _react2['default'].createClass({
  displayName: 'DOMWrap',

  propTypes: {
    tag: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      tag: 'div'
    };
  },

  render: function render() {
    var props = _extends({}, this.props);
    if (!props.visible) {
      props.className = props.className || '';
      props.className += ' ' + props.hiddenClassName;
    }
    var Tag = props.tag;
    return _react2['default'].createElement(Tag, props);
  }
});

exports['default'] = DOMWrap;
module.exports = exports['default'];