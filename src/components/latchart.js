import React, {Component} from "react";
import {Line} from 'react-chartjs-2';
import Events from '../Events';
import AppConst from "./AppConst";
import './latchart.css';

class LatChart extends Component {
  constants = new AppConst();

  constructor(props) {
    super(props);

    this.state = {
      loadingData: false,
      chart: {}
    };
  }

  componentDidMount() {
    Events.subscribe(this.constants.MsgUpdateChart, (data) => {
      this.updateChart(data);
    });
  }

  componentWillUnmount() {
    Events.unsubscribe(this.constants.MsgUpdateChart);
  }

  updateChart(param) {
//    console.log('LatChart, notified... ');
    this.setState({loadingData: true});

    let data = param.data.sort(function (a, b) {
      let akey = a.chname + a.readingdate + a.readingtime;
      let bkey = b.chname + b.readingdate + b.readingtime;
      if (akey < bkey) {
        return -1;
      } else if (akey > bkey) {
        return 1;
      } else {
        return 0;
      }
    });

    if ( data.length > 0 ) {
      let lbls = this.makelabels(data);
      let a = this.prepdata('A BRL', data);
      let b = this.prepdata('B BRL', data);
      let c = this.prepdata('C BRL', data);
      let d = this.prepdata('D BRL', data);

      let shortlbls = [];
      for ( let i = 0; i < lbls.length; i++ ) {
        shortlbls[i] = '';
      }

      let combined = {};

      // If window is too small, then don't display labels.
      if ( param.width < 1100 ) {

        combined = {
          labels: shortlbls,
          datasets: [],
          empty: false
        }
      } else {
        combined = {
          labels: lbls,
          datasets: [],
          empty: false
        }
      }

      if (!a.empty) {
        a.backgroundColor =  this.constants.color1;
        combined.datasets.push(a);
      }

      if (!b.empty) {
        b.backgroundColor = this.constants.color2;
        combined.datasets.push(b);
      }

      if (!c.empty) {
        c.backgroundColor = this.constants.color3;
        combined.datasets.push(c);
      }

      if (!d.empty) {
        d.backgroundColor = this.constants.color4;
        combined.datasets.push(d);
      }

      this.setState({
        loadingData: false,
        chart: combined
      });
    }

  }

  makelabels(dat) {
    let lbls = [];
    dat.forEach(elmt => {
      if (elmt.chname.substr(0, 1) === 'A') {
        let lbl = elmt.readingdate + ' ' + elmt.readingtime;
        lbls.push(lbl);
      }
    });
    return lbls;
  }

  prepdata(abcdBRL, dat) {
    let num = 0;

    function one(abcd, src) {
      let data = [];
      let brl = abcd.trim();
      src.forEach(elmt => {
        if (elmt.chname.trim() === brl) {
          let val = elmt.consumption;
          data.push(val);
          num = num + 1;
        }
      });
      return {label: abcd, data: data}
    }

    let result = one(abcdBRL, dat);


    result.empty = num <= 0;

    return result;
  }

  static oneChart(data) {
    return (
      <div>
        <Line data={data} width={300} height={150} options={{maintainAspectRatio: true}}/>
        <hr/>
      </div>
    )
  }

  render() {
    if ( this.state.loadingData ) {
      return null;
    } else if (this.state.chart.datasets === undefined) {
      return null;
    } else {
      return (
        <div className='ChartDiv'>
          {LatChart.oneChart(this.state.chart)}
       </div>
      );
    }
  }
}

export default LatChart;
