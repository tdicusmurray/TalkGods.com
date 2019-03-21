import React, { Component } from 'react';
import WebRTCPeer from '/var/www/view/src/WebRTC/WebRTCPeer.js';
import LoginForm from '/var/www/view/src/Form/LoginForm.js';
import Person from '/var/www/view/src/WebRTC/Person.js';
export default class Content extends Component {
  render() {
    return (
      <div>
        <LoginForm />
<Person />
        <WebRTCPeer />
      </div>
    );
  }
}