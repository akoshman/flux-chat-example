
var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  selectThread: function (threadId) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.SELECT_THREAD,
      threadId: threadId
    });
  }

};
