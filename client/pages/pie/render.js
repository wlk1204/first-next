import * as d3 from 'd3';

const render = {};

render.drawChart = (id, data, options) => {
  d3.select(id).selectAll('.piechart').remove();
  const { width = 0, height = 0 } = options || {};
  if (!data) {
    return null;
  }
  d3.select(id).append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'piechart');
};

render.animate = (id, oldData, data, options) => {
  const { width = 0, height = 0, colors } = options || {};
  d3.select(id).select('.piechart')
    .attr('width', width)
    .attr('height', height);
  const pie = d3.pie()
    .sort(null)
    .value(d => d.num);
  
  const update = d3.select(id).select('.piechart').selectAll('g').data(pie(data));
  const enter = update.enter();

  const duration = 2000;
  const radius = Math.min(width, height) / 2;

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius - radius * 0.1);

  update.select('path')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
    .transition()
    .duration(duration)
    .attrTween('d', (d, i) => {
      const j = d3.interpolate(pie(oldData)[i], d);
      return t => arc(j(t));
    });

  enter.append('g')
    .data(pie(data))
    .append('path')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
    .style('fill', (d, i) => colors[i])
    .transition()
    .ease(d3.easeCubicInOut)
    .duration(duration)
    .attrTween('d', tweenPie);

  function tweenPie(d) {
    const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d); // 弧度差值
    const k = d3.interpolate(0, radius - radius * 0.1); // 半径差值
    return (t) => {
      const arc2 = d3.arc()
        .innerRadius(0)
        .outerRadius(k(t));
      return arc2(i(t));
    };
  }
}

export default render;
