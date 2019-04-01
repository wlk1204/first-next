import * as d3 from 'd3'

const render: Irender = {}

render.draw = (id, data, oldData) => {

  const duration = 2500

  const update = d3.select(id).selectAll('text').data([data])
  const enter = update.enter()

  enter.append('text')
    .attr('style', `color: currentColor`)
    .transition()
    .duration(duration)
    .ease(d3.easeCubicInOut)
    .tween('text', enterTween)
  
  function enterTween() {
    const i = d3.interpolate(0, data)
    return t => {
      const a = Math.round(i(t))
      this.innerText = a
    }
  }

  update.transition()
    .duration(duration)
    .ease(d3.easeCubicInOut)
    .tween('text', updateTween)

  function updateTween() {
    const i = d3.interpolate(oldData, data)
    return t => {
      const a = Math.round(i(t))
      this.innerText = a
    }
  }
}

export default render