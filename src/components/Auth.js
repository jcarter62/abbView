import { Component } from 'react';

class Auth extends Component {
  authenticated = false;
  username = '';

  constructor() {
    super();

    this.loggedIn();
  }

  loggedIn() {

    // function randomstring(len) {
    //   let r1 = Math.random().toString(35);
    //   let r2 = Math.random().toString(35);
    //   let r3 = (r1 + r2).substr(2,len);
    //   return r3;
    // }

    let token = JSON.parse( localStorage.getItem('token') );
    this.username = localStorage.getItem('username');


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
