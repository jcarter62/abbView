import React, { Component } from 'react';
import Laterals from './laterals';

class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
        <div class="row">
        <div class="col-2">
        <hr />
        <Laterals />
        </div>
        <div class="col-10">
        <hr />
        This is the right side of the row.
        </div>
        </div>
    );
  }
}

export default MainContainer;
