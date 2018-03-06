import React, { Component } from 'react';
import Auth from './Auth';

class Home extends Component {

  constructor(props) {
    super(props);
    let auth = new Auth();

    if ( !auth.authenticated ) {
      this.props.history.push('/login');
    }

    this.state = {
      username: auth.username
    }
  }

  render() {
    return (
      <div>
        User Logged In : {this.state.username}
      </div>
    );
  }
}

export default Home;
