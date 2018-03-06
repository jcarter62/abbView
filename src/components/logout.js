import React, { Component } from 'react';
import './login.css';

class Logout extends Component {

  constructor() {
    super();

    localStorage.removeItem('token');
    localStorage.removeItem('username');

    this.state = {};

  }

  render() {
    return (
      <div className={'container top-margin-1em text-center'}>
        <form className={'form-signin'}
              onSubmit={ event =>  { }} >
          <h1 className={'h3 mb-3 font-weight-normal'}>Logged Out</h1>
          <br />
        </form>
      </div>
    );
  }
}

export default Logout;

