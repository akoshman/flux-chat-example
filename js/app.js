
var ChatApp = require('./components/ChatApp.react');

var React = require('react');
var ReactDOM = require('react-dom');

window.React = React; // export for http://fb.me/react-devtools

ReactDOM.render(
    <ChatApp />,
    document.getElementById('react')
);
