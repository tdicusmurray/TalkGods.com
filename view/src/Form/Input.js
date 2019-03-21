
import React, { Component } from 'react';
export default class Input extends Component {
  constructor(props) {
      super(props);
   }
  render() {
    return (
      <div>
        <input type='text' name='email' id='email' placeholder={this.props.placeholder} />
      </div>
      );
  }
}