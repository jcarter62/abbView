import React, { Component } from 'react';
import './Top.css';
import { Link } from 'react-router-dom';
import Auth from './Auth';

class Top extends Component {

  constructor(props) {
    super(props);


    this.state = {
      menu: []
    };
  }

  componentDidMount() {
    this.setState({menu: this.buildMenu() });
    let auth = new Auth();

    this.setState({username: auth.username});
  }

  prepData() {
    let result =
      this.state.menu.map(item => {
        return (
          <li className="nav-item" key={item.name} >
            <Link to={item.url} className="nav-link">{item.name}</Link>
          </li>
      )}
    );
    return result;
  }

  render() {
    return (
      <div className="no-print" >
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <a className="navbar-brand" href="/"><img
            src={require('../images/abbhome.png')} height='35px'
            alt='Home' /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample03">
            <ul className="navbar-nav mr-auto">
             {this.prepData()}
            </ul>
          </div>
        </nav>
        <div className='spacer'>
        </div>
      </div>
    );
  }

  buildMenu() {
    function addMenu(name, url) {
      let result = {
        name: name,
        url: url
      }
      return result;
    }

    let auth = new Auth();

    let isAuthenticated = auth.authenticated;

    let m = [];
    m.push(addMenu('Home', '/'));
    m.push(addMenu('About', '/about'));
    m.push(addMenu('Laterals', '/laterals'));
    m.push(addMenu('Settings', '/settings'));
    if ( isAuthenticated ) {
      m.push(addMenu('Logout', '/logout'));
    } else {
      m.push(addMenu('Login', '/login'));
    }
    return m;
  }
}

export default Top;
