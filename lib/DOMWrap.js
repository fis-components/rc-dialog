'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

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
    var props = (0, _objectAssign2['default'])({}, this.props);
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