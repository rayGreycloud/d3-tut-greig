// Example 5

d3.json("data/age.json", function(d) {

  let scale = d3.scaleLinear()
    .domain([500000, 6000000])
    .range([50, 500])

  let svg = d3.select("#graph").append("svg")
    .attr("height", 300)
    .attr("width", 800);

  function render(data) {
    let i = 0;
    let rects = svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", 5)
      .attr("width", 7)
      .attr("height", 100)
      .attr("x", function (d) {
        return i+= 10;
      })
      .exit().remove();

  }

  render(d);
});
