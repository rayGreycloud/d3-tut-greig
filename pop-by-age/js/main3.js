// Example 3

d3.json("data/age.json", function(d) {

  let scale = d3.scaleLinear()
    .domain([500000, 6000000])
    .range([50, 500])

  let svg = d3.select("#graph").append("svg")
    .attr("height", 300)
    .attr("width", 300)
    .attr("style", "background: darksalmon");

});
