let pieChart = {
  container: {
    svg: null,
    xOffset: 60,
    yOffset: 0,
    height: 200,
    width: 300
  },
  radius: 100,
  arc: null,
  pie: null,
  path: null,
  metric: null,
  color: null,

  infoTip: (d) => {
    this.container.svg.append("text")
      .attr("x", 10)
      .attr("y", 10)
      .attr("class", "infotip")
      .text(d.data["key"]);
  },
  removeInfoTip: (d) => this.container.svg.selectAll(".infotip").remove(),

  init: (d, m) => {
    let _this = this;
    _this.metric = m;
    _this.pie = d3.pie()
      .sort(null)
      .value((d) => d[_this.metric]);

    _this.path = d3.arc()
      .outerRadius(_this.radius - 10)
      .innerRadius(25);
    _this.arc = _this.container.svg.selectAll(".arc")
      .data(_this.pie(d));
    _this.color = d3.scaleOrdinal(d3.schemeCategory20b);
  },

  enter: (d) => {
    let _this = this;

    _this.arc.enter().append("g")
      .attr("class", "arc")
      .attr("transform", `translate(${_this.container.width / 2}, ${_this.container.height / 2})`)
      .append("path")
      .attr("d", _this.path)
      .attr("fill", (d) => _this.color(d.data.name))
      .on("mouseover", (d) => _this.infotip(d))
      .on("mouseout", (d) => _this.removeInfoTip(d));
  },

  update: (d) => {
    let _this = this;

    _this.arc.transition().duration(750)
      .attr("d", _this.path)
      .attr("fill", (d) => _this.color(d.data.name))
  },

  exit: () => this.arc.exit().remove(),

  render: (d, m) => {
    this.init(d, m);
    this.enter(d);
    this.update(d);
    this.exit();
  }
  
};
