import React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component<any, any> {

  add = () => {
    this.props.dispatch({
      type: 'INCREMENT'
    })
  }

  del = () => {
    this.props.dispatch({
      type: 'DECREMENT'
    })
  }

  render() {
    return (
      <div>
        当前数字{this.props.counter}
        <button onClick={this.add}>+</button>
        <button onClick={this.del}>-</button>
      </div>
    );
  }
}

export default connect(state => state)(Counter);
