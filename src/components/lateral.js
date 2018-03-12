import React, {Component} from "react";
import axios from "axios";
import AppConst from "./AppConst";
import Events from "../Events";
import LatChart from "./latchart";
import Auth from "./Auth";

class Lateral extends Component {
  baseURL = '';
  api = '/api/lateral';
  url = '';

  constructor(props) {
    super(props);
    let auth = new Auth();
    if ( !auth.authenticated ) {
      this.props.history.push('/login');
    }

    this.constants = new AppConst();
    this.baseURL = this.constants.baseURL;
    this.url = this.baseURL + this.api;

    this.state = {
      lateral: "",
      data: [],
      days: 30,
      type: '4PerDay',
      loadingData: false,
      width: window.innerWidth,
      height: window.innerHeight,
      userinfo: auth.userInfo()
    };

  }

  loadLateral(selectedLateral) {

    this.setState({loadingData: true});

    axios
      .post(this.url,
        {
          'SiteName': selectedLateral,
          'CSV': 'No',
          'Days': this.state.days,
          'Type': this.state.type,
          'userinfo': this.state.userinfo
        }, { } )
      .then(response => {
        let data = response.data.value;

        this.setState({
          loadingData: false,
          data: data
        });
      })
      .catch((err) => {
        console.log(err)
      });

  }

  componentDidMount() {
    let thisClass = this;

    let days = localStorage.getItem('days');
    if (days === undefined) {
      days = 30;
    }
    if ( days === null ) {
      days = 30;
      localStorage.setItem('days', days);
    }

    let type = localStorage.getItem('type');
    if (type === undefined) {
      type = '1PerDay';
    }
    if ( type === null ) {
      type = '1PerDay';
      localStorage.setItem('type', type);
    }

    this.setState({days: days, type: type});

    Events.subscribe(this.constants.MSGLatSel, data => {
      thisClass.setState({
        lateral: data.id,
        width: data.width,
        height: data.height
      });
      this.loadLateral(data.id);
    });
  }

  // componentDidUnMount() {
  //   Events.unsubscribe(this.constants.MSGLatSel);
  // }

  componentDidUpdate() {
    let chartdata = this.state.data;
    Events.notify(this.constants.MsgUpdateChart, {
      data: chartdata,
      width: this.state.width,
      height: this.state.height
    });
  }

  render() {
    let title = '';
    if (this.state.lateral.trim().length > 0) {
      title = 'Lateral: ' + this.state.lateral + ', ' + this.state.days + ' days, ' + this.state.type;
    } else {
      title = '';
    }

    return (
      <div>
        <div className='row'>
          {title}
        </div>
        <hr/>

        <div className="container">
          {this.chartComponent()}
          {this.datatable(this.state.data)}
        </div>
      </div>
    );
  }

  chartComponent() {
    if ( this.state.loadingData ) {
      return null;
    } else {
      return <LatChart/>;
    }
  }

  datatable(data) {
    let result = {};

    if ( this.state.loadingData ) {
      result = <div><i className='fa fa-circle-notch fa-spin largespinner'/></div>;
    } else if (data.length > 1) {
      result = (
        <table className="table mytable">
          {Lateral.headerrow()}
          {Lateral.datarows(data)}
        </table>
      )
    } else {
      result = (
        <p align="center"><h4>Please select Lateral</h4></p>
      )
    }
    return result;
  }

  static headerrow() {
    return (
      <thead>
      <tr>
        <th scope="col">
          Channel
        </th>
        <th scope="col">
          Date
        </th>
        <th scope="col">
          Time
        </th>
        <th scope="col" className="reading">
          Reading
        </th>
        <th scope="col">
          Consumption <br/>(ACFT)
        </th>
        <th scope="col">
          Flow <br/>(CFS)
        </th>
      </tr>
      </thead>
    );
  }

  static datarows(data) {
    function myTrim(s) {
      let result = s;
      if (s.length > 1) {
        result = s.substr(0, 1);
      }
      return result;
    }

    let i = 0;

    let result = data.map((elm) => {
      i = i + 1;
      let id = elm.row + elm.chname;
      let color = "lateral-white";
      if (i % 2 === 0) {
        color = "lateral-grey";
      }
      let classes = "cell " + color;

      return (
        <tr className={classes} key={id}>
          <td>
            {myTrim(elm.chname)}
          </td>
          <td>
            {elm.readingdate}
          </td>
          <td>
            {elm.readingtime}
          </td>
          <td className="reading">
            {elm.reading}
          </td>
          <td>
            {elm.consumption}
          </td>
          <td>
            {elm.averagecfs}
          </td>
        </tr>
      )
    });

    return (
      <tbody>
      {result}
      </tbody>
    );
  }

  // loadingMsg() {
  //   return (
  //     <div className="row">
  //       <div className={this.constants.col3}>
  //         ---
  //       </div>
  //       <div className={this.constants.col3}>
  //         ---
  //       </div>
  //       <div className={this.constants.col3}>
  //         ---
  //       </div>
  //       <div className={this.constants.col2}>
  //         ---
  //       </div>
  //     </div>
  //   );
  // }
}

export default Lateral;
