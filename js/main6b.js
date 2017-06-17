// Example 6b

d3.json("data/age.json", function(d) {

  let scale = d3.scaleLinear()
    .domain([500000, 6000000])
    .range([25, 250])

  let svg = d3.select("#graph").append("svg")
    .attr("height", 600)
    .attr("width", 800);

  function render(data) {
    let i = 0;
    let rects = svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", 5)
      .attr("width", 3)
      .attr("height", function (d) {
        return scale(d["total"]);
      })
      .attr("x", function (d) {
        return i+= 4;
      })
      .attr("fill", "darkslateblue")
      .exit().remove();

  }

  render(d);
});
