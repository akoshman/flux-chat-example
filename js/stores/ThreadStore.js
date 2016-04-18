
var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ChatConstants = require('../constants/ChatConstants');
var assign = require('object-assign');

var ActionTypes = ChatConstants.ActionTypes;

var CHANGE_EVENT = 'change';

var _threads = [];
var _currentThreadId = -1;

function putMessageToThread(message, thread) {
  thread.messages.push(message);
  if (thread.id !== ThreadStore.getCurrentThreadId()) thread.unreadMessagesCount++;
}

/**
 * Thread's format:
    {
      "id": 1,
      "user": "Alice",
      "messages": [
        {
          "id": 1,
          "user": "Alice",
          "userId": 1,
          "isOutgoing": false,
          "time": 1460665778235,
          "text": "Hi there!"
        }
      ],
      "isActive": true,
      "unreadMessagesCount": 0
    }
 */
var ThreadStore = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllThreads: function () {
    return _threads;
  },

  getCurrentThreadId: function () {
    return _currentThreadId;
  },

  /**
   * @param {number} id
   */
  getThreadById: function (id) {
    if (id) {
      for (var i = 0; i < _threads.length; i++) {
        if (_threads[i].id == id) {
          return _threads[i];
        }
      }
    }
    return null;
  },

  getCurrentThread: function () {
    return this.getThreadById(this.getCurrentThreadId());
  },

  putMessage: function (message) {
    return this.putMessages([message]);
  },

  putMessages: function (messages) {
    messages.forEach(function (message) {
      var userId = message.userId;
      var thread = this.getThreadById(message.userId);
      if (!thread) {
        thread = {
          id: userId,
          user: message.user,
          messages: [],
          isActive: false,
          unreadMessagesCount: 0
        };
        _threads.push(thread);
      }
      putMessageToThread(message, thread);
    }, this)
  }
});

ThreadStore.dispatchToken = ChatAppDispatcher.register(function (action) {

  switch (action.type) {

    case ActionTypes.SELECT_THREAD:
      (ThreadStore.getThreadById(_currentThreadId) || {}).isActive = false;
      _currentThreadId = action.threadId;
      var currentThread = ThreadStore.getThreadById(_currentThreadId);
      currentThread.isActive = true;
      currentThread.unreadMessagesCount = 0;
      ThreadStore.emitChange();
      break;

    // TODO
    case ActionTypes.RECEIVE_MESSAGES:
      debugger;
      break;

    case ActionTypes.SEND_MESSAGE:
      var thread = ThreadStore.getCurrentThread();
      var message = {
        id: +new Date(),
        user: thread.user,
        userId: thread.id,
        isOutgoing: true,
        time: +new Date(),
        text: action.text
      };
      ThreadStore.putMessage(message);
      ThreadStore.emitChange();
      break;

    default:
    // do nothing
  }

});

// TODO Remove test data from here
var messages = [
  {
    id: 1,
    user: 'Alice',
    userId: 1,
    time: +new Date(),
    text: 'Hi there!'
  },
  {
    id: 11,
    user: 'Alice',
    userId: 1,
    time: +new Date(),
    text: 'How are you?'
  },
  {
    id: 2,
    user: 'Bob',
    userId: 2,
    time: +new Date(),
    text: 'Hello'
  },
  {
    id: 3,
    user: 'Carl',
    userId: 3,
    time: +new Date(),
    text: 'Good day'
  }
];
ThreadStore.putMessages(messages);

module.exports = ThreadStore;

window.ThreadStore = ThreadStore;
