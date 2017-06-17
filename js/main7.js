// Example 7

d3.json("data/age.json", function(d) {

  let scale = d3.scaleLinear()
    .domain([500000, 6000000])
    .range([25, 250])

  let svg = d3.select("#graph").append("svg")
    .attr("height", 600)
    .attr("width", 800);

  function render(data, metric) {
    // init
    let i = 0;
    let rects = svg.selectAll("rect")
      .data(data);

    // setup
    rects.enter()
      .append("rect")
      .attr("fill", "darkslateblue")
      .attr("y", 5)
      .attr("width", 3)
      .attr("height", function (d) {
        return scale(d[metric]);
      })
      .attr("x", function (d) {
        return i+= 4;
      });
    // update
    rects.transition().duration(750)
        .attr("height", function (d) {
          return scale(d[metric]);
        });
    // exit
    rects.exit().remove();

  }

  render(d, "females");

  // After delay, call render with update to metric
  setTimeout(function () {
    render(d, "males");
  }, 1000);
  setTimeout(function () {
    render(d, "total");
  }, 2000);
});
