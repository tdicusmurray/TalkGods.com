import React, { Component } from 'react';
export default class WebRTCPeer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      <div>
      
        <div id="msg_box" className="relative">

        <div className="left relative" id="video-container">
          <div id="google_translate_element"></div>
            <video id="their-video" className='left' autoPlay></video>
            <video id="my-video" className='right' muted={true} autoPlay></video>
              <div id="step1">
                <p>Please allow Camera & Microphone.<a href="#" className="pure-button pure-button-error" id="step1-retry">Try again</a></p>
              </div>
              <br />
              <div id='message_container'>
                  <form id="send_form">
                    <input type="text" id="message_text" className="form-control" placeholder="Enter message" /><input className="button" type="submit" value="Send" />
                  </form>

                <ul className='messages left'>
                </ul>
                <ul className='translated_messages right'>
                </ul>
              </div>
              <div id="step3">
                    <p><button className='btn btn-block btn-lg btn-warning' id="end_call">End call</button></p>
              </div>
          </div>
        </div>
    </div>

      );
  }
}
