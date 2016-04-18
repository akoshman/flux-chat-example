
var ThreadStore = require('../stores/ThreadStore');
var Action = require('../dispatcher/Action');

var React = require('react');

function getStateFromStores() {
  return {
    currentThreadId: ThreadStore.getCurrentThreadId()
  };
}

var MessageSendSection = React.createClass({

  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function () {
    ThreadStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    ThreadStore.removeChangeListener(this._onChange);
  },

  render: function () {
    if (this.state.currentThreadId < 0) return (<div />);

    return (
      <div className="row">
        <div className="col-xs-9 message-send-block-left">
          <input onKeyDown={this._onMessageKeyDown} ref="messageInput" className="form-control" type="text" placeholder="Enter you message..." />
        </div>
        <div className="col-xs-3 message-send-block-right">
          <button onClick={this._onSendMessageClick}
            className="form-control btn btn-primary"
            type="submit">Button</button>
        </div>
      </div>
    );
  },

  _onChange: function () {
    this.setState(getStateFromStores());
  },

  componentDidUpdate: function () {
    if (this.state.currentThreadId < 0) return;

    this.refs.messageInput.getDOMNode().focus();
  },

  _onMessageKeyDown: function (event) {
    if (event.eventCode == 13) this._sendMessage();
  },

  _onSendMessageClick: function () {
    this._sendMessage();
  },

  _sendMessage: function (text) {
    var text = this.refs.messageInput.getDOMNode().value;
    this.refs.messageInput.getDOMNode().value = '';
    Action.sendMessage(text);
  }

});

module.exports = MessageSendSection;
