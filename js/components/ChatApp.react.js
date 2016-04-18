
var ThreadsList = require('./ThreadsList.react');
var ChatSection = require('./ChatSection.react');
var MessageSendSection = require('./MessageSendSection.react');
var Action = require('../dispatcher/Action.js');
var MessagesData = require('../data/MessagesData.js');

var React = require('react');

var ChatApp = React.createClass({

  componentDidMount: function () {
    Action.retrieveMessages(MessagesData);
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4 chat-block">
            <ThreadsList  />
          </div>
          <div className="col-xs-8 chat-block">
            <ChatSection />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <MessageSendSection />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ChatApp;
