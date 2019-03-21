import React, { Component } from 'react';
export default class WebSocket extends Component {

  componentDidMount() {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    window.connection = new WebSocket('ws://talkgods.com:1337');

    window.connection.onopen = function () {
      // connection is opened and ready to use
      window.connection.send('test');
    }

    window.connection.onerror = function (error) {
      // an error occurred when sending/receiving data
    }

    window.connection.onmessage = function (message) {
      try {
        var json = JSON.parse(message.data);
        console.log(json);
        
      } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ',
            message.data);
        return;
      }
      // handle incoming message
    }
  }
  render() {
    return (
      <div>
       </div>
      );
  }
}