import React from 'react'
import render from './render'

class Number extends React.Component<any, any> {
  chart = null
  num = 0
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
  }
  
  componentDidMount() {
    render.draw(this.chart, this.state.value, this.num)
    this.num = this.state.value
  }

  change = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  onClick = () => {
    render.draw(this.chart, this.state.value, this.num)
    this.num = this.state.value
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.change} />
        <button onClick={this.onClick}>提交</button>
        <div ref={node => this.chart = node} />
      </div>
    );
  }
}

export default Number