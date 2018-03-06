import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div>
        <div>
            This site was developed by WWD to provide a way for users
            to inspect ABB Paperless Recorder logged data.  A typical
            recorder is a model similar to the ABB SM500F series.  This recorder series
          </div>
        <hr />
        <div>
          <img src={require('../images/sm500.jpg')} alt='' /><hr />
          <a href='http://new.abb.com/products/measurement-products/recorders-controllers/process-recorders/paperless-recorders/sm500f-field-mount-paperless-recorder' target='blank' >Product Information Link</a>
        </div>
      </div>
    );
  }
}

export default About;
