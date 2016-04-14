
var ThreadStore = require('../stores/ThreadStore');
var ThreadListItem = require('./ThreadListItem.react');

var React = require('react');

function getStateFromStores() {
  return {
    threads: ThreadStore.getAllThreads()
  };
}

var ThreadsList = React.createClass({

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
    var items = this.state.threads.map(function (thread) {
      return (
        <ThreadListItem key={thread.id} thread={thread}/>
      )
    }, this);
    return (
      <div className="">

        <div className="row">
          <div className="col-xs-12"><div className="title">Conversations</div></div>
        </div>

        {items}
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function () {
    this.setState(getStateFromStores());
  }

});

module.exports = ThreadsList;
