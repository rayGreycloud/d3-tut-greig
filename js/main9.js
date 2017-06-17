// Example 7

d3.json("data/age.json", function(d) {

  let svg = d3.select("#graph").append("svg")
    .attr("height", 600)
    .attr("width", 800);

  function render(data, metric) {
    // init
    let yScale = d3.scaleLinear()
      .domain([500000, 6000000])
      .range([25, 250]);

    let xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 540]);

    let yAxis = d3.axisLeft().scale(yScale);
    let xAxis = d3.axisBottom().scale(xScale);

    let i = 60;
    let rects = svg.selectAll("rect")
      .data(data);

    // setup
    rects.enter()
      .append("rect")
      .attr("fill", "darkslateblue")
      .attr("y", 25)
      .attr("width", 3)
      .attr("height", function (d) {
        return yScale(d[metric]);
      })
      .attr("x", function (d) {
        // Move to right of y scale
        return xScale(d['age']) + 60;
      });

    svg.append("g")
      .attr("transform", "translate(60,0)")
      .call(yAxis);

    svg.append("g")
      .attr("transform", "translate(60,275)")
      .call(xAxis);
    // update
    rects.transition().duration(750)
        .attr("height", function (d) {
          return yScale(d[metric]);
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
