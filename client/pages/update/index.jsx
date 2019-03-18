import React from 'react';
import * as d3 from 'd3';
import styles from './index.scss';

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '' || []
    };
  }

  componentDidMount() {
    d3.select(this.div).select('p')
    d3.select(this.div).selectAll('p')
  }

  change = () => {
    const update = d3.select(this.div)
      .selectAll('p')
      .data(this.state.value);

    const enter = update.enter();
    const exit = update.exit();

    update.text((d, i) => {
        return `update ${d}`
      })
      .style('color', '#000')

    enter.append('p')
      .text((d, i) => {
        return `enter ${d}`;
      })
      .style('color', '#fff')
      .transition()
      .duration(1000)
      .style('color', 'red')

    exit.text((d, i) => 'exit')
      .transition()
      .duration(1000)
      .style('color', '#fff')
      .remove();
  }

  arrChange = (e) => {
    this.setState({
      value: e.target.value || []
    })
  }

  render() {
    return (
      <div className={styles.demo}>
        <div ref={node => this.div = node}>
          <p>第一个p标签</p>
          <p>第二个p标签</p>
          <p>第三个p标签</p>
        </div>
        <div>数组: <input value={this.state.value} onChange={this.arrChange} /></div>
        <button style={{ margin: 10 }} onClick={this.change}>change</button>
      </div>
    );
  }
}

export default Select;