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

  infoTip: function (d) {
    this.container.svg.append("text")
      .attr("x", 10)
      .attr("y", 10)
      .attr("class", "infotip")
      .text(d.data["key"]);
  },
  removeInfoTip: function (d) {
    this.container.svg.selectAll(".infotip").remove()
  },

  init: function (d, m) {
    let _this = this;
    _this.metric = m;
    _this.pie = d3.pie()
      .sort(null)
      .value(function (d) { return d[_this.metric]; });

    _this.path = d3.arc()
      .outerRadius(_this.radius - 10)
      .innerRadius(25);
    _this.arc = _this.container.svg.selectAll(".arc")
      .data(_this.pie(d));
    _this.color = d3.scaleOrdinal()
      .range(["#C0D6CC", "#A3C2BA", "#7D9EA8", "#546A87", "#37386B", "5758AA"]);
  },

  enter: function (d) {
    let _this = this;

    _this.arc.enter().append("g")
      .attr("class", "arc")
      .attr("transform", `translate(${_this.container.width / 2}, ${_this.container.height / 2})`)
      .append("path")
      .attr("d", _this.path)
      .attr("fill", function (d) {
        return _this.color(d.data["key"]);
      })
      .on("mouseover", function (d) {
        _this.infoTip(d);
      })
      .on("mouseout", function (d) {
        _this.removeInfoTip(d);
      });
  },

  update: function (d) {
    let _this = this;

    _this.arc.transition().duration(750)
      .attr("d", _this.path)
      .attr("fill", function (d) {
        return _this.color(d.key);
      });
  },

  exit: function () {
    this.arc.exit().remove();
  },

  render: function (d, m) {
    this.init(d, m);
    this.enter(d);
    this.update(d);
    this.exit();
  }

};
