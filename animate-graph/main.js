// Data set
let arr = [4, 8, 15, 16, 23, 42, 25, 89, 45, 77, 23, 1, 47, 29, 56, 73, 99, 10];

// Initalize
let p = null;

let graph = d3.select("#graph").append("svg")
  .attr("width", 500)
  .attr("height", 300);

// Update
let update = function () {
  p = graph.selectAll("rect")
    .data(arr)
    .attr("width", 20)
    .attr("height", function (d) {return d * 2})
    .attr("x", function (d, i) {return i * 25})
    .attr("y", function (d) {return 250 - d * 2})
    .attr("fill", randomColor.picker());
}

// Enter
let enter = function () {
  p.enter()
    .append("rect")
    .attr("width", 20)
    .attr("height", function (d) {return d * 2})
    .attr("x", function (d, i) {return i * 25})
    .attr("y", function (d) {return 250 - d * 2})
    // .attr("fill", randomColor.picker());
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
  arr.push(Math.floor(Math.random() * 100));
  // Refresh graph with new Data
  refresh();
}, 1000);
