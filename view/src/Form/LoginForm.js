import React, { Component } from 'react';
import Input from '/var/www/view/src/Form/Input.js';
import SecureInput from '/var/www/view/src/Form/SecureInput';
import SubmitFormButton from '/var/www/view/src/Form/SubmitFormButton';
export default class LoginForm extends Component {

  render() {
    return (
      <form id='login_form'>
        <Input placeholder="Email" />
        <SecureInput placeholder="Password" />
        <SubmitFormButton />
      </form>
      );
  }
}