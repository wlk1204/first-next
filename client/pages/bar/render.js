import * as d3 from 'd3';
import styles from './index.scss';

const render = {};
let color = '';

render.drawChart = (id, data, options) => {
  d3.select(id).selectAll('.barchart').remove();
  const { width = 0, height = 0 } = options || {};
  if (!data) {
    return null;
  }
  d3.select(id).append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'barchart');
};

render.animate = (id, oldData, data, options) => {
  const { width = 0, height = 0, colors } = options || {};
  d3.select(id).select('.barchart')
    .attr('width', width)
    .attr('height', height);
  const svg = d3.select(id).select('.barchart');
  const update = svg.selectAll('.gRect').data(data);
  const enter = update.enter();
  const exit = update.exit();

  const updateX = svg.selectAll('.gXAxis').data([1]);
  const enterX = updateX.enter();

  const updateY = svg.selectAll('.gYAxis').data([1]);
  const enterY = updateY.enter();

  const duration = 800;
  const rectWidth = width / data.length / 3;
  const Max = d3.max(data.map((item) => item.value));
  const name = data.map((item) => item.name);
  const chartHeight = height * 0.8;
  const chartWidth = width * 0.7;
  const len = data.length;
  const paddingTop = 20;

  const xScale = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([0, chartWidth])

  const Yscale = d3.scaleLinear()
    .domain([0, Max])
    .range([0, chartHeight]);

  enter.append('g')
    .attr('class', 'gRect')
    .append('rect')
    .attr('width', rectWidth)
    .attr('height', 0)
    .attr('y', chartHeight)
    .attr('transform', (d, i) => `translate(${xScale(i + 1)}, ${paddingTop})`)
    .attr('fill', colors[0])
    .transition()
    .duration(duration)
    .attr('height', d => Yscale(d.value))
    .attr('y', d => chartHeight - Yscale(d.value))

  // 事件监听
  svg.selectAll('.gRect')
    .select('rect')
    .on('mouseover', function() {
      color = d3.select(this).attr('fill');
      d3.select(this)
        .attr('fill', 'orange')
    })
    .on('mouseout', function() {
      d3.select(this)
        .attr('fill', color)
    })
  
  update.select('rect')
    .transition()
    .duration(duration)
    .attr('transform', (d, i) => `translate(${xScale(i + 1)}, ${paddingTop})`)
    .attr('fill', colors[1])
    .attr('width', rectWidth)
    .attr('height', d => Yscale(d.value))
    .attr('y', d => chartHeight - Yscale(d.value))

  exit.select('rect')
    .transition()
    .duration(duration)
    .attr('height', 0)
    .attr('y', d => chartHeight)
    .remove()

  exit.transition()
    .delay(duration)
    .remove()
    
  const Xaxis = d3.axisBottom()
    .scale(xScale)
    .ticks(len - 1)
    .tickFormat(d => name[d]);

  const Yaxis = d3.axisLeft()
    .scale(Yscale.range([chartHeight, 0]))
    .ticks(5);

  // x 轴
  enterX.append('g')
    .attr('class', 'gXAxis')
    .attr('transform', d => `translate(${xScale(1) + rectWidth / 2}, ${chartHeight + paddingTop})`)
    .call(Xaxis)

  updateX
    .transition()
    .duration(duration)
    .attr('transform', d => `translate(${xScale(1) + rectWidth / 2}, ${chartHeight + paddingTop})`)
    .call(Xaxis)
  
  // y 轴
  enterY.append('g')
    .attr('class', 'gYAxis')
    .attr('transform', d => `translate(${xScale(1)}, ${paddingTop})`)
    .call(Yaxis)

  updateY
    .transition()
    .duration(duration)
    .attr('transform', d => `translate(${xScale(1)}, ${paddingTop})`)
    .call(Yaxis)
}

export default render;
