import React from 'react';
import render from './render';
import './index.scss';

class Pie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: '',
      b: '',
      data: [{
        "name": "A",
        "num": 35
      },
      {
        "name": "B",
        "num": 64
      }]
    };
    this.oldData = [];
  }

  componentDidMount() {
    render.drawChart(this.pieChart, this.state.data, this.option);
    render.animate(this.pieChart, this.oldData, this.state.data, this.option);
    this.oldData = this.state.data || [];
  }

  componentDidUpdate() {
    render.animate(this.pieChart, this.oldData, this.state.data, this.option);
    this.oldData = this.state.data || [];
  }

  changeA = (e) => {
    this.setState({
      a: e.target.value
    })
  }

  changeB = (e) => {
    this.setState({
      b: e.target.value
    })
  }

  submit = () => {
    this.setState({
      data: [{
        "name": "A",
        "num": this.state.a,
      },
      {
        "name": "B",
        "num": this.state.b,
      }]
    })
  }

  render() {
    this.option = { width: 200, height: 200, colors: ['#4AE0FF', '#4A7BFF'] };
    return (
      <div>
        <div className="pie" style={{width: '200px', height: '200px'}} ref={(node) => { this.pieChart = node; }} />
        <input value={this.state.a} onChange={this.changeA} />
        <input value={this.state.b} onChange={this.changeB} />
        <button id="we" onClick={this.submit}>提交</button>
      </div>
    );
  }
}

export default Pie;
