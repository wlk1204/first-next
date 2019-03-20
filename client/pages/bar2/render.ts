import * as d3 from 'd3';

const render: any = {};
let dom: any = null;

render.drawChart = (id, data, options) => {
  d3.select(id).selectAll('#canvas').remove();
  const { width = 0, height = 0 } = options || {};
  if (!data) {
    return null;
  }
  d3.select(id).append('canvas')
    .attr('width', width)
    .attr('height', height)
    .attr('id', 'canvas');

  dom = document.createElement('custom')

  // dom = d3.select(id).append('custom').node()
};

render.animate = (id, oldData, data, options) => {
  const { width = 0, height = 0, colors = [] } = options || {};
  const canvas = d3.select(id).select('#canvas')
    .attr('width', width)
    .attr('height', height)

  const c = canvas.node().getContext('2d');

  const dataContainer = d3.select(dom);

  const duration = 600;
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

  function draw() {
    c.fillStyle = '#fff';
    c.rect(0, 0, canvas.attr('width'), canvas.attr('height'))
    c.fill();

    const rect = dataContainer.selectAll('.gRect').select('rect');

    rect.each(function(d, i) {
      const node = d3.select(this);

      // 矩形
      c.beginPath();
      c.fillStyle = node.attr('fill');
      c.rect(node.attr('x'), node.attr('y'), node.attr('width'), node.attr('height'));
      c.fill();
      c.closePath();

      // x轴文字
      c.beginPath();
      c.fillStyle = '#000';
      c.fillText(d.name, +node.attr('x') + rectWidth / 2, chartHeight + 20 + paddingTop);
      c.closePath();

      // x轴
      c.beginPath();
      c.moveTo(xScale(1), chartHeight + paddingTop);
      c.lineTo(chartWidth + xScale(1) + rectWidth, chartHeight + paddingTop);
      c.stroke();
      c.closePath();

      // y 轴
      c.beginPath();
      c.moveTo(xScale(1), paddingTop);
      c.lineTo(xScale(1), chartHeight + paddingTop);
      c.stroke();
      c.closePath();
    })

    // x 轴文字
    // const xText = dataContainer.select('.gXAxis').selectAll('g').data(data);
    // xText.each(function(d, i) {
    //   const node = d3.select(this);
    //   const a = node.attr('transform');
    //   const arr = a.match(/(\d+((\.)?\d+)?)/g);
    //   c.beginPath();
    //   c.fillStyle = '#000';
    //   c.fillText(d.name, +arr[0] + xScale(1) + rectWidth / 2, chartHeight + paddingTop * 2);
    //   c.closePath();
    // })

    // y 轴文字
    const yText = dataContainer.select('.gYAxis').selectAll('g');
    yText.each(function(d, i) {
      const node = d3.select(this);
      const a = node.attr('transform');
      const arr = a.match(/(\d+((\.)?\d+)?)/g);
      c.beginPath();
      c.fillStyle = '#000';
      c.fillText(d, arr[0] + rectWidth, +arr[1] + paddingTop);
      c.closePath();
    })
  }

  function drawCustom(data) {
    const dataBind = dataContainer.selectAll('.gRect').data(data);
    const enter = dataBind.enter();
    const exit = dataBind.exit();

    // 矩形
    dataBind.select('rect').transition()
      .duration(duration)
      .attr('fill', colors[1])
      .attr('width', rectWidth)
      .attr('height', d => Yscale(d.value))
      .attr('x', (d, i) => xScale(i + 1))
      .attr('y', d => chartHeight - Yscale(d.value) + paddingTop)

    enter.append('g')
      .attr('class', 'gRect')
      .append('rect')
      .attr('x', (d, i) => xScale(i + 1))
      .attr('y', chartHeight + paddingTop)
      .attr('width', rectWidth)
      .attr('height', 0)
      .attr('fill', colors[0])
      .transition()
      .duration(duration)
      .attr('height', d => Yscale(d.value))
      .attr('y', d => chartHeight - Yscale(d.value) + paddingTop)

    exit.select('rect').transition()
      .duration(duration / 2)
      .attr('height', 0)
      .attr('y', chartHeight + paddingTop)
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

    const updateX = dataContainer.selectAll('.gXAxis').data([1]);
    const enterX = updateX.enter();

    const updateY = dataContainer.selectAll('.gYAxis').data([1]);
    const enterY = updateY.enter();

    // x 轴
    enterX.append('g')
      .attr('class', 'gXAxis')
      .attr('transform', `translate(${xScale(1) + rectWidth / 2}, ${chartHeight + paddingTop})`)
      .call(Xaxis)

    updateX
      .transition()
      .duration(duration)
      .attr('transform', `translate(${xScale(1) + rectWidth / 2}, ${chartHeight + paddingTop})`)
      .call(Xaxis)

     // y 轴
    enterY.append('g')
      .attr('class', 'gYAxis')
      .attr('transform', `translate(${xScale(1)}, ${paddingTop})`)
      .call(Yaxis)

    updateY
      .transition()
      .duration(duration)
      .attr('transform', `translate(${xScale(1)}, ${paddingTop})`)
      .call(Yaxis)
  }

  d3.timer(draw)
  drawCustom(data);
}

export default render;
