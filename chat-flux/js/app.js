
var ChatApp = require('./components/ChatApp.react');

var React = require('react');

window.React = React; // export for http://fb.me/react-devtools

React.render(
    <ChatApp />,
    document.getElementById('react')
);
