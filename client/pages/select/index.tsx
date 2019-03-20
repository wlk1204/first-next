import React from 'react';
import * as d3 from 'd3';
import styles from './style.scss';

class Select extends React.Component {
  div: any;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    d3.select(this.div).select('p')
    d3.select(this.div).selectAll('p')
  }

  change = () => {
   d3.select(this.div)
      .selectAll('p')
      .data(['A', 'B', 'C'])
      // .enter()
      // .append('p')
      .text((d) => {
        return d;
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
        <button onClick={this.change}>change</button>
      </div>
    );
  }
}

export default Select;