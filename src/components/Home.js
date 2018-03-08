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
      username: auth.username,
      name: auth.name,
      email: auth.email
    }
  }

  render() {
    return (
      <div>
        Welcome {this.state.name}
      </div>
    );
  }
}

export default Home;
