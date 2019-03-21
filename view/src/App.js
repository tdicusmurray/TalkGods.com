import React, { Component } from 'react';
import Script from 'react-load-script';
import './App.css';
import Header from '/var/www/view/src/Template/Header.js';
import Footer from '/var/www/view/src/Template/Footer.js';
import Content from '/var/www/view/src/Template/Content.js';
import WebSocket from '/var/www/view/src/WebSocket/WebSocket.js';
import P2PCDN from '/var/www/view/src/WebRTC/P2PCDN.js';

class App extends Component {
  componentDidMount() {
    document.title = "TalkGods";
  }
  render() {
    return (
      <div className="App">
            <Header />
            <WebSocket />
            <P2PCDN />
            <Content />
          <Footer />
      </div>
    );
  }
  handleScriptCreate() {this.setState({ scriptLoaded: false });}
 
  handleScriptError() {this.setState({ scriptError: true });}
 
  handleScriptLoad() {this.setState({ scriptLoaded: true });}
}


export default App;