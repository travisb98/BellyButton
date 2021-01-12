


//opens the json file
d3.json("samples.json").then(function(d){

    // adds the names(aka IDs) to the drop down list
    d3.select("#selDataset")
        .selectAll('option')
        .data(d.names)
        .enter()
        .append("option")
        .html(x => x);

   


});


// d3.select("#selDataset").selectAll("option").data(names).enter().append("option");

// d3.select("#selDataset").selectAll("option").data(names).enter().append("option");

// var dropdown=d3.select("#selDataset");

// console.log(dropdown);

// console.log(names);


