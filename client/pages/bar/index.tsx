import React from 'react';
import render from './render';
import styles from './style.scss';

class Bar extends React.Component<any, any> {
  oldData: any;
  barChart: any;
  option: any;
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        "name": "A",
        "value": 35
      }, {
        "name": "B",
        "value": 64
      }, {
        "name": "C",
        "value": 80
      }, {
        "name": "D",
        "value": 100
      }, {
        "name": "C",
        "value": 120
      }, {
        "name": "E",
        "value": 70
      }, {
        "name": "F",
        "value": 50
      }]
    };
    this.oldData = [];
  }

  componentDidMount() {
    render.drawChart(this.barChart, this.state.data, this.option);
    render.animate(this.barChart, this.oldData, this.state.data, this.option);
    this.oldData = this.state.data || [];
  }

  componentDidUpdate() {
    render.animate(this.barChart, this.oldData, this.state.data, this.option);
    this.oldData = this.state.data || [];
  }

  add = () => {
    const newData = this.state.data;
    const index = Math.floor(Math.random() * 7);
    const words = ['G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
    newData.push({
      "name": words[index],
      "value": 200 * Math.random()
    })
    this.setState({
      data: newData
    })
  }

  remove = () => {
    const newData = this.state.data;
    newData.pop();
    this.setState({
      data: newData
    })
  }

  render() {
    this.option = { width: 600, height: 400, colors: ['#8686d2', '#91c7a0'] };
    return (
      <div className={styles.demo}>
        <div className={styles.pie} ref={(node) => { this.barChart = node; }} />
        <button className={styles.addBtn} onClick={this.add}>增加</button>
        <button className={styles.removeBtn} onClick={this.remove}>删除</button>
      </div>
    );
  }
}

export default Bar;
