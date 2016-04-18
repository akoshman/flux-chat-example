
var Action = require('../dispatcher/Action');
var React = require('react');
var moment = require('moment');

var ChatMessageItem = React.createClass({

  render: function () {
    var message = this.props.message;
    return (
      <div className="col-xs-12 message-item">
        <div className="col-xs-6">
          {message.isOutgoing ? 'You' : message.user}
        </div>
        <div className="col-xs-6">
          <span className="pull-right">
            {moment(message.time).format("HH:mm:ss") }
          </span>
        </div>
        <div className="col-xs-12">
          {message.text}
        </div>
      </div>
    );
  }

});

module.exports = ChatMessageItem;
