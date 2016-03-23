'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rcAlign = require('rc-align');

var _rcAlign2 = _interopRequireDefault(_rcAlign);

var _rcUtilLibKeyCode = require('rc-util/lib/KeyCode');

var _rcUtilLibKeyCode2 = _interopRequireDefault(_rcUtilLibKeyCode);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _DOMWrap = require('./DOMWrap');

var _DOMWrap2 = _interopRequireDefault(_DOMWrap);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function noop() {}

function getScroll(w, top) {
  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  var method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
    var d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      ret = d.body[method];
    }
  }
  return ret;
}

function setTransformOrigin(node, value) {
  var style = node.style;
  ['Webkit', 'Moz', 'Ms', 'ms'].forEach(function (prefix) {
    style[prefix + 'TransformOrigin'] = value;
  });
  style['transformOrigin'] = value;
}

function offset(el) {
  var rect = el.getBoundingClientRect();
  var pos = {
    left: rect.left,
    top: rect.top
  };
  var doc = el.ownerDocument;
  var w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  pos.top += getScroll(w, 1);
  return pos;
}

var Dialog = _react2['default'].createClass({
  displayName: 'Dialog',

  propTypes: {
    onAfterClose: _react.PropTypes.func,
    onClose: _react.PropTypes.func,
    closable: _react.PropTypes.bool,
    maskClosable: _react.PropTypes.bool,
    visible: _react.PropTypes.bool,
    mousePosition: _react.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onAfterClose: noop,
      onClose: noop
    };
  },

  componentDidMount: function componentDidMount() {
    this.componentDidUpdate({});
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    var props = this.props;
    if (props.visible) {
      // first show
      if (!prevProps.visible) {
        this.lastOutSideFocusNode = document.activeElement;
        _reactDom2['default'].findDOMNode(this.refs.dialog).focus();
      }
    } else if (prevProps.visible) {
      if (props.mask && this.lastOutSideFocusNode) {
        try {
          this.lastOutSideFocusNode.focus();
        } catch (e) {
          this.lastOutSideFocusNode = null;
        }
        this.lastOutSideFocusNode = null;
      }
    }
  },

  onAnimateLeave: function onAnimateLeave() {
    this.props.onAfterClose();
  },

  onMaskClick: function onMaskClick(e) {
    if (this.props.closable && this.props.maskClosable) {
      this.close(e);
    }
    _reactDom2['default'].findDOMNode(this.refs.dialog).focus();
  },

  onKeyDown: function onKeyDown(e) {
    var props = this.props;
    if (props.closable) {
      if (e.keyCode === _rcUtilLibKeyCode2['default'].ESC) {
        this.close(e);
      }
    }
    // keep focus inside dialog
    if (props.visible) {
      if (e.keyCode === _rcUtilLibKeyCode2['default'].TAB) {
        var activeElement = document.activeElement;
        var dialogRoot = _reactDom2['default'].findDOMNode(this.refs.dialog);
        var sentinel = this.refs.sentinel;
        if (e.shiftKey) {
          if (activeElement === dialogRoot) {
            sentinel.focus();
          }
        } else if (activeElement === this.refs.sentinel) {
          dialogRoot.focus();
        }
      }
    }
  },

  onAlign: function onAlign(dialogNode) {
    var mousePosition = this.props.mousePosition;
    if (this.props.visible) {
      if (mousePosition) {
        var elOffset = offset(dialogNode);
        setTransformOrigin(dialogNode, mousePosition.x - elOffset.left + 'px ' + (mousePosition.y - elOffset.top) + 'px');
      } else {
        setTransformOrigin(dialogNode, '');
      }
    }
  },

  getDialogElement: function getDialogElement() {
    var props = this.props;
    var closable = props.closable;
    var prefixCls = props.prefixCls;
    var dest = {};
    if (props.width !== undefined) {
      dest.width = props.width;
    }
    if (props.height !== undefined) {
      dest.height = props.height;
    }
    if (props.zIndex !== undefined) {
      dest.zIndex = props.zIndex;
    }

    var footer = undefined;
    if (props.footer) {
      footer = _react2['default'].createElement(
        'div',
        { className: prefixCls + '-footer', ref: 'footer' },
        props.footer
      );
    }

    var header = undefined;
    if (props.title) {
      header = _react2['default'].createElement(
        'div',
        { className: prefixCls + '-header', ref: 'header' },
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-title' },
          props.title
        )
      );
    }

    var closer = undefined;
    if (closable) {
      closer = _react2['default'].createElement(
        'a',
        { tabIndex: '0', onClick: this.close, className: prefixCls + '-close' },
        _react2['default'].createElement('span', { className: prefixCls + '-close-x' })
      );
    }

    var style = _extends({}, props.style, dest);
    var dialogProps = {
      className: [props.prefixCls, props.className].join(' '),
      tabIndex: '0',
      role: 'dialog',
      ref: 'dialog',
      style: style,
      onKeyDown: this.onKeyDown
    };
    var transitionName = this.getTransitionName();
    var dialogElement = _react2['default'].createElement(
      _DOMWrap2['default'],
      _extends({}, dialogProps, {
        hiddenClassName: prefixCls + '-hidden' }),
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-content' },
        closer,
        header,
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-body', style: props.bodyStyle, ref: 'body' },
          props.children
        ),
        footer
      ),
      _react2['default'].createElement(
        'div',
        { tabIndex: '0', ref: 'sentinel', style: { width: 0, height: 0, overflow: 'hidden' } },
        'sentinel'
      )
    );
    // add key for align to keep animate children stable
    return _react2['default'].createElement(
      _rcAnimate2['default'],
      { key: 'dialog',
        showProp: 'dialogVisible',
        onLeave: this.onAnimateLeave,
        transitionName: transitionName,
        component: '',
        transitionAppear: true },
      _react2['default'].createElement(
        _rcAlign2['default'],
        { align: props.align,
          key: 'dialog',
          onAlign: this.onAlign,
          dialogVisible: props.visible,
          childrenProps: {
            visible: 'dialogVisible'
          },
          monitorBufferTime: 80,
          monitorWindowResize: true,
          disabled: !props.visible },
        dialogElement
      )
    );
  },

  getMaskElement: function getMaskElement() {
    var props = this.props;
    var maskProps = {
      onClick: this.onMaskClick
    };

    if (props.zIndex) {
      maskProps.style = { zIndex: props.zIndex };
    }
    var maskElement = undefined;
    if (props.mask) {
      var maskTransition = this.getMaskTransitionName();
      maskElement = _react2['default'].createElement(_DOMWrap2['default'], _extends({}, maskProps, { key: 'mask',
        className: props.prefixCls + '-mask',
        visible: props.visible,
        hiddenClassName: props.prefixCls + '-mask-hidden' }));
      if (maskTransition) {
        maskElement = _react2['default'].createElement(
          _rcAnimate2['default'],
          { key: 'mask', showProp: 'visible',
            transitionAppear: true, component: '',
            transitionName: maskTransition },
          maskElement
        );
      }
    }
    return maskElement;
  },

  getMaskTransitionName: function getMaskTransitionName() {
    var props = this.props;
    var transitionName = props.maskTransitionName;
    var animation = props.maskAnimation;
    if (!transitionName && animation) {
      transitionName = props.prefixCls + '-' + animation;
    }
    return transitionName;
  },

  getTransitionName: function getTransitionName() {
    var props = this.props;
    var transitionName = props.transitionName;
    var animation = props.animation;
    if (!transitionName && animation) {
      transitionName = props.prefixCls + '-' + animation;
    }
    return transitionName;
  },

  getElement: function getElement(part) {
    return this.refs[part];
  },

  close: function close(e) {
    this.props.onClose(e);
  },

  render: function render() {
    var props = this.props;
    var prefixCls = props.prefixCls;
    var className = _defineProperty({}, prefixCls + '-wrap', 1);

    return _react2['default'].createElement(
      'div',
      { className: (0, _classnames2['default'])(className), ref: 'root' },
      [this.getMaskElement(), this.getDialogElement()]
    );
  }
});

exports['default'] = Dialog;
module.exports = exports['default'];