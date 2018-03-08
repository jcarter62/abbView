import { Component } from 'react';

class Auth extends Component {
  authenticated = false;
  username = '';
  name = '';
  email = '';

  constructor() {
    super();

    this.loggedIn();
  }

  loggedIn() {

    let token = JSON.parse( localStorage.getItem('token') );
    this.username = localStorage.getItem('username');
    this.name = localStorage.getItem('Name');
    this.email = localStorage.getItem('Email');

    if ( token === null ) {
      this.authenticated = false;
    }
    else {
      let tsExpire = Date.parse( token.ts );
      let tsNow = new Date( Date.now() );

      this.authenticated = tsNow < tsExpire ? true : false;
    }
  }

  render() {
    return null;
  }

}

export default Auth;
