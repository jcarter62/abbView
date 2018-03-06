import React, { Component } from 'react';
import './App.css';
import Top from './components/Top';
import Home from './components/Home';
import About from './components/About';
import Laterals from './components/laterals';
import Settings from './components/settings';
import Login from './components/login';
import Logout from './components/logout';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <Router>
      <div className="container" >
      <Top />
      <div className="container-fluid">
      <Route exact path='/' component={Home} />
    <Route path='/laterals' component={Laterals} />
    <Route path='/about' component={About} />
    <Route path='/settings' component={Settings} />
    <Route path='/login' component={Login} />
    <Route path={'/logout'} component={Logout} />
    </div>
    </div>
    </Router>
  );
  }
}

export default App;
