
var Action = require('../dispatcher/Action');

var React = require('react');

var ThreadListItem = React.createClass({

  render: function () {
    var thread = this.props.thread;
    return (
      <div onClick={this._onClick} className={"row thread-item" + (thread.isActive ? " active" : "") }>
        <div className="col-xs-10">
          {thread.user}
        </div>
        <div className="col-xs-2">
          {thread.unreadMessagesCount ? <span className="badge">{thread.unreadMessagesCount}</span> : ''}
        </div>
      </div>
    );
  },

  _onClick: function () {
    Action.selectThread(this.props.thread.id);
  }

});

module.exports = ThreadListItem;
