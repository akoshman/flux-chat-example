
var ThreadStore = require('../stores/ThreadStore');
var ChatMessageItem = require('./ChatMessageItem.react');

var React = require('react');

function getStateFromStores() {
  return {
    thread: ThreadStore.getCurrentThread()
  };
}

var ChatSection = React.createClass({

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
    var thread = this.state.thread;
    var title = thread ? 'Chatting with ' + thread.user : 'Select a conversation leftward';
    var messages = [];
    if (thread) {
      messages = thread.messages.map(function (message) {
        return (
          <ChatMessageItem message={message} />
        )
      })
    }
    return (
      <div>
        <div className="title-wrapper">
          <div className="title">
            {title}
          </div>
        </div>
        <div className="list-group messages-list">
          {messages}
        </div>
      </div>
    );
  },

  _onChange: function () {
    this.setState(getStateFromStores());
  }

});

module.exports = ChatSection;
