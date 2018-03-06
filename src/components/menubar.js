import React, { Component } from 'react';

class Menubar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: [
        {name: 'Home', url: '/'},
        {name: 'About', url: '/about'},
        {name: 'Laterals', url: '/laterals'}
      ]
    }
  }

  render() {
    return (
      <div>        
        {this.prepData()}
      </div>
    );
  }
}

export default Menubar;
