let barGraph = {
  container: {
    svg: null,
    height: 300,
    width: 650
  },
  rects: null,
  metric: null,

  init: function (d, m) {
    this.metric = m;

    this.rects = this.container.svg.selectAll("rect")
      .data(d);
    this.text = this.container.svg.selectAll("text")
      .data(d);
  },

  enter: function (d) {
    let _this = this;

    _this.rects.enter()
      .append("rect")
      .attr("width", function (d) { return d.value / 500000 })
      .attr("height", 18)
      .attr("x", 100)
      .attr("y", function (d, i) { return 20 * i });

    _this.text.enter()
      .append("text")
      .attr("x", 0)
      .attr("y", function (d, i) { return 20 * i + 16 })
      .attr("font-family", "sans-serif")
      .attr("font-size", "16px")
      .text(function (d) { return d.data.name });
  },

  update: function (d) {
    let _this = this;
  },

  exit: function () {
    this.rects.exit().remove();
  },

  render: function (d, m) {
    // Get regions for each level
    let heir = d3.hierarchy(d, function (d) {
      return d.regions;
    });
    // Rollup pop data
    let root = heir.sum(function (d) {
      return d.population;
    });

    let data = root.children[0].children[0].children;

    this.init(data, m);
    this.enter(data);
    this.update(data);
    this.exit();
  }
};
