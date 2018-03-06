import React, {Component} from "react";
import axios from "axios";
import AppConst from "./AppConst";
import Events from "../Events";
import LatChart from "./latchart";

class Lateral extends Component {
  baseURL = '';
  api = '/api/lateral';
  url = '';

  constructor(props) {
    super(props);

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
      height: window.innerHeight
    };

  }

  loadLateral(selectedLateral) {

    function revA2D(x) {
      let result = '';
      switch (x.substr(0, 1)) {
        case 'A':
          result = '4';
          break;
        case 'B':
          result = '3';
          break;
        case 'C':
          result = '2';
          break;
        case 'D':
          result = '1';
          break;
        default:
          result = '0';
          break;
      }
      return result;
    }

    axios
      .post(this.url,
        {
          'SiteName': selectedLateral,
          'CSV': 'No',
          'Days': this.state.days,
          'Type': this.state.type
        }, { } )
      .then(response => {
        let data = response.data.value;

        // data = response.data.value.sort(function (a, b) {
        //
        //   let akey = a.readingdate + a.readingtime + revA2D(a.chname) + a.chname;
        //   let bkey = b.readingdate + b.readingtime + revA2D(b.chname) + b.chname;
        //
        //   if (akey < bkey) {
        //     return 1;
        //   } else if (akey > bkey) {
        //     return -1;
        //   } else {
        //     return 0;
        //   }
        // });
        this.setState({
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

    let type = localStorage.getItem('type');
    if (days === undefined) {
      type = '4PerDay';
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

  componentDidUnMount() {
    Events.unsubscribe(this.constants.MSGLatSel);
  }

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

    let result = (
      <div>
        <div className='row'>
          {title}
        </div>
        <hr/>

        <div className="container">
          <LatChart/>
          {this.datatable(this.state.data)}
        </div>
      </div>
    );
    return result;
  }

  datatable(data) {
    let result = {};

    if (data.length > 1) {
      result = (
        <table className="table mytable">
          {this.headerrow()}
          {this.datarows(data)}
        </table>
      )
    } else {
      result = (
        <h1>Please select Lateral</h1>
      )
    }
    return result;
  }

  headerrow() {
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

  datarows(data) {
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

  loadingMsg() {
    return (
      <div className="row">
        <div className={this.constants.col3}>
          ---
        </div>
        <div className={this.constants.col3}>
          ---
        </div>
        <div className={this.constants.col3}>
          ---
        </div>
        <div className={this.constants.col2}>
          ---
        </div>
      </div>
    );
  }
}

export default Lateral;
