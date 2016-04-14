
var ThreadStore = require('../stores/ThreadStore');

var React = require('react');

var MessageSendSection = React.createClass({

  componentDidMount: function () {
    ThreadStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ThreadStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <div className="row">
        <div className="col-xs-9 message-send-block-left">
          <input ref="messageInput" className="form-control" type="text" placeholder="Enter you message..." />
        </div>
        <div className="col-xs-3 message-send-block-right">
          <button className="form-control btn btn-primary" type="submit">Button</button>
        </div>
      </div>
    );
  },

  _onChange: function () {
    this.refs.messageInput.getDOMNode().focus();
  }

});

module.exports = MessageSendSection;
