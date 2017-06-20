// create random data set
let arr = [];

for (let i = 0; i <= 20; i++) {
  arr.push(Math.floor(Math.random() * 147));
}

// Initalize
let p = null;

let graph = d3.select("#graph").append("svg")
  .attr("width", 500)
  .attr("height", 500);

// Update
let update = function () {
  p = graph.selectAll("rect")
    .data(arr)
    .attr("width", 20)
    .attr("height", function (d) {return d * 2})
    .attr("x", function (d, i) {return i * 25})
    .attr("y", function (d) {return 250 - d * 2})
    .attr("fill", function (d) { return colors[d] });
}

// Enter
let enter = function () {
  p.enter()
    .append("rect")
    .attr("width", 20)
    .attr("height", function (d) {return d * 2})
    .attr("x", function (d, i) {return i * 25})
    .attr("y", function (d) {return 250 - d * 2})
    .attr("fill", function (d) { return colors[d] });
}

// Exit
let exit = function () {
  p.exit().remove();
}

// Refresh
let refresh = function () {
  update();
  enter();
  exit();
}

setInterval(function () {
  // Remove first number
  arr.shift();
  // Add random number to end
  arr.push(Math.floor(Math.random() * 147));
  // Refresh graph with new Data
  refresh();
}, 1000);
