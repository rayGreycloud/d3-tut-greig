// Create object with properties and methods
let barGraph = {
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
    return this.container.xOffset + this.xScale(d['age']);
  },
  y: function (d) {
    return this.yScale(d[this.metric]);
  },
  height: function (d) {
    return (this.yScale(0) - this.yScale(d[this.metric]));
  },

  drawAxis: function (d) {
    let _this = this;
    _this.container.svg.selectAll("g").remove();
    _this.container.svg.selectAll("g").data(d).enter()
      .append("g")
      .attr("transform", `translate(${_this.container.xOffset}, ${_this.container.yOffset})`)
      .call(_this.yAxis);

    _this.container.svg.append("g")
      .attr("transform", `translate(${_this.container.xOffset}, 275)`)
      .call(_this.xAxis);
  },

  infoTip: function (d) {
    this.container.svg.append("text")
      .attr("x", this.xScale(d['age']))
      .attr("y", this.yScale(d[this.metric]))
      .attr("class", "infotip")
      .text(`Age: ${d.age} Pop: ${d[this.metric]}`);
  },
  removeInfoTip: function (d) {
    this.container.svg.selectAll(".infotip").remove();
  },

  init: function (d, m) {
    this.metric = m;
    this.xScale = d3.scaleLinear()
      .domain([
        d3.min(d, function (d) { return d.age; }),
        d3.max(d, function (d) { return d.age; })
      ])
      .range([0, 540]);

    this.yScale = d3.scaleLinear()
      .domain([500000, 5000000])
      .range([250, 25]);

    this.yAxis = d3.axisLeft().scale(this.yScale);
    this.xAxis = d3.axisBottom().scale(this.xScale);

    this.rects = this.container.svg.selectAll("rect")
      .data(d);
  },

  enter: function (d) {
    let _this = this;
    let w = (480 / d.length);

    _this.rects.enter().append("rect")
      .attr("class", "bar")
      .attr("width", w)
      .attr("x", (d) => _this.x(d))
      .attr("y", (d) => _this.y(d))
      .attr("height", (d) => _this.height(d))
      .on("mouseover", function (d) {
        _this.infoTip(d);
      })
      .on("mouseout", function (d) {
        _this.removeInfoTip(d);
      });

    _this.drawAxis(d);
  },

  update: function (d) {
    let _this = this;
    let w = Math.floor(540 / d.length);

    _this.rects.transition().duration(750)
    .attr("width", w)
    .attr("x", function (d) {
      return _this.x(d);
    })
    .attr("y", function (d) {
      return _this.y(d);
    })
    .attr("height", function (d) {
      return _this.height(d);
    });
  },

  exit: function () {
    this.rects.exit().remove();
  },

  render: function (d, m) {
    this.init(d, m);
    this.enter(d);
    this.update(d);
    this.exit();
  }
};
