import React, { Component } from 'react';
class SubmitFormButton extends Component {
  login() {
    window.connection.send(document.getElementById("email").value);
    return false;
  }
  render() {
    return (
      <div>
        <input type='submit' value='Login' onClick={this.login} /> 
       </div>
      );
  }
}
export default SubmitFormButton;