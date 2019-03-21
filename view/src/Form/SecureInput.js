import React, { Component } from 'react';
class SecureInput extends Component {
constructor(props) {
      super(props);
   }
  render() {
    return (
      <div>
        <input type='password' name='password' id='password' placeholder={this.props.placeholder} />
       </div>
      );
  }
}
export default SecureInput;