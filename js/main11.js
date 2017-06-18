// Initialize object and props
let graph = {
  container: {
    svg: null,
    xOffset: 60,
    yOffset: 0,
    height: 600,
    width: 800
  },
  rects: null,
  xScale: null,
  yScale: null,
  xAxis: null,
  yAxis: null,
  metric: null,
  x: function (d) {
    return this.container.xOffset + graph.xScale(d['age']);
  },
  y: function (d) {
    return this.yScale(d[this.metric]);
  },
  height: function (d) {
    return (this.yScale(0) - this.yScale(d[this.metric]));
  }
};

// Draw new axes based on offsets
let drawAxis = function (d) {
  graph.container.svg.selectAll("g").remove();
  graph.container.svg.selectAll("g").data(d).enter()
    .append("g")
    .attr("transform", `translate(${graph.container.xOffset}, ${graph.container.yOffset})`)
    .call(graph.yAxis);

  graph.container.svg.append("g")
    .attr("transform", `translate(${graph.container.xOffset}, 275)`)
    .call(graph.xAxis);
}

// Display info about highlighted bar
let toolTip = function (d) {
  graph.container.svg.append("text")
    .attr("x", graph.xScale(d['age']))
    .attr("y", graph.yScale(d[graph.metric]))
    .attr("class", "tooltip")
    .text(`Age: ${d.age} Pop: ${d[graph.metric]}`);
}

// Remove tooltip on mouseout
let removeToolTip = function (d) {
  graph.container.svg.selectAll(".tooltip").remove();
}

// 
