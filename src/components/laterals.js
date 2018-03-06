import React, { Component } from "react";
import axios from "axios";
import Lateral from "./lateral";
import "./laterals.css";
import AppConst from "./AppConst";
import Events from "../Events";
import Auth from "./Auth";

class Laterals extends Component {
  baseURL = '';
  api = '/api/laterals';
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
      data: [],
      searchTerm: "",
      selectedLateral: "",
      loading: false,
      username: auth.username,
      width: this.getwidth(),
      height: this.getheight()
    };
  }

  getwidth() {
    return window.visualViewport.width;
  }

  getheight() {
    return window.visualViewport.height;
  }

  componentDidMount() {
    this.setState({
      loading: true,
      width: this.getwidth(),
      height: this.getheight()
    });

    axios
      .post(this.url, { })
      .then(response => {
        this.setState({
          loading: false,
          data: response.data.value
        });
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err);
      });
  }

  componentWillMount() {
    let searchVal = localStorage.getItem("searchVal");
    let selectLat = localStorage.getItem("selectedLateral");

    if (typeof searchVal === "string") {
      this.setState({
        searchTerm: searchVal
      });
    }
    if (typeof selectLat === "string") {
      this.setState({
        selectedLateral: selectLat
      });
    }
  }

  isMatch(Lat) {
    let st = this.state.searchTerm.toLowerCase();
//    console.log(Lat.SiteName + " contains:" + st);
    return Lat.SiteName.toLowerCase().includes(st);
  }

  prepData() {
    let i = 0;
    let st = this.state.searchTerm.toLowerCase();
    let result = <div>Loading...</div>

    if ( this.state.loading ) {
      result = (
        <div>
          <i className='fa fa-spinner fa-spin largespinner'></i>
        </div>
      )

    } else {
      result = this.state.data
        .filter(Lat => {
          return Lat.SiteName.toLowerCase().includes(st);
        })
        .map(lat => {
          let name = lat.SiteName.trim();
          let id = lat.SiteName;
          i = i + 1;
          let color = "lateral-white";
          let fontClass = "";
          if (i % 2 === 0) {
            color = "lateral-grey";
          }
          if (name === this.state.selectedLateral) {
            fontClass = "lateral-selected";
          }
          let classes = (color + " " + fontClass).trim();

          return (
            <div
              className={classes}
              key={id}
              onClick={evt => {
                this.lateralClick(name);
              }}
            >
              {name}
            </div>
          );
        });
    }

    return result;
  }

  onChangeSearch(val) {
    this.setState({ searchTerm: val });
    localStorage.setItem("searchVal", val);
  }

  lateralClick(val) {
    localStorage.setItem("lateral", val);
    this.setState({ selectedLateral: val });
    Events.notify(this.constants.MSGLatSel, {
      id: val,
      width: this.getwidth(),
      height: this.getheight()
    });
  }

  render() {
    return (
      <div className="row" >
        <div className={this.constants.col2 + " no-print"}>
          <section>
            <input className={'myInput'}
              value={this.state.searchTerm}
              onChange={evt => {
                this.onChangeSearch(evt.target.value);
              }}
              type="Text"
              placeholder="Lateral"
            />
          </section>
          <hr />
          <div className='scrollDiv'>
          {this.prepData()}
          </div>
        </div>
        <div className={this.constants.col1} />
        <div className={this.constants.col8}>
          <Lateral id={this.state.selectedLateral} />
        </div>
      </div>
    );
  }
}

export default Laterals;
