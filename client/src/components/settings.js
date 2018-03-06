import React, { Component } from 'react';
import AppConst from './AppConst';
import './settings.css';

class Settings extends Component {

  constructor() {
    super();

    this.state = {
      days: 30,
      type: '4PerDay'
    };

  }

  componentWillMount() {
    let days = localStorage.getItem('days');
    let type = localStorage.getItem('type');

    this.setState({days: days, type: type});
  }

  handleSubmit(event) {
    alert('Form Submit');
    event.preventDefault();
  }

  dayChange(days) {
    this.setState({days: days });
    console.log(days);
    localStorage.setItem("days", days);
  }

  typeChange(type) {
    this.setState({type: type});
    localStorage.setItem('type', type);
  }

  render() {
    return (
      <div className="container top-margin-1em">
        <form>
          <div className='row top-margin-1em'>
            <div className={AppConst.col6} >
              Number of Days to Report:
            </div>
            <div className={AppConst.col3}>
              <input
                value={this.state.days}
                type="number" name="Days"
                onChange={evt => {
                  this.dayChange(evt.target.value);
                }} />
            </div>
          </div>

          <div className='row top-margin-1em'>
            <div className={AppConst.col6} >
              Readings Per Day:
            </div>
            <div className={AppConst.col3}>
              <select value={this.state.type} onChange={ evt => {
                this.typeChange(evt.target.value); }
              }>
                <option value='4PerDay'>4</option>
                <option value='2PerDay'>2</option>
                <option value='1PerDay'>1</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Settings;

