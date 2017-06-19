// Wait for dataset loading
d3.queue()
  .defer(d3.json("data/age.json"))
  .defer(d3.json("data/generation.json"))
  .await(function (error, ageData, genData) {

    // Create svg elements
    barGraph.container.svg = d3.select("#graph").append("svg")
      .attr("height", barGraph.container.height)
      .attr("width", barGraph.container.width);

    pieChart.container.svg = d3.select("#graph").append("svg")
      .attr("height", pieChart.container.height)
      .attr("width", pieChart.container.width);

    // Combine data
    let dataGroup = ageData.map(function (age) {
      let title = "";
      genData.forEach(function (gen) {
        // Match age range to generation
        if (age.age >= gen.min && age.age <= gen.max) {
          title = gen.title;
        }
      });
      // Return object with generation attribute
      return {
        "generation": title,
        "total": age.total,
        "males": age.males,
        "females": age.females
      };
    });

    // Reduce data for each generation
    let genGroup = d3.nest()
      // Value to group by
      .key(function (ageData) {
        return ageData.generation;
      })
      // Aggregate totals
      .rollup(function (value) {
        return d3.sum(value, function (ageData) {
          return ageData.total;
        });
      })
      // Specify dataset to use
      .entries(dataGroup);

    barGraph.render(ageData, "total");
    pieChart.render(genGroup, "value");

    // Event listeners for buttons
    document.getElementById("total")
      .addEventListener('click', () => render(d, "total"));
    document.getElementById("male")
      .addEventListener('click', () => render(d, "males"));
    document.getElementById("female")
      .addEventListener('click', () => render(d, "females"));
    document.getElementById("allAges")
      .addEventListener('click', () => render(d, "total"));
    document.getElementById("over50").addEventListener('click', () => {
      render(d.filter(function (a) {
        return a.age >= 50;
      }), "total");
    });
    document.getElementById("under50").addEventListener('click', () => {
      render(d.filter(function (a) {
        return a.age < 50;
      }), "total");
    });

  });
