
// selector for dropdown
var dropdown = d3.select("#selDataset");

function dropdown_change(){
    console.log(dropdown.property("value"));


    //// updating the graph
    //opens the json file
    d3.json("samples.json").then(function(d){

            ///// define currention option selected by the test subject dropdown
            var cur_val = dropdown.property("value");
            // defines the sample for the selected id
            var cur_sample = d.samples.find(element=> element.id == cur_val);

            /// defining the data and layout to update
            var dataupdate ={
                x:[cur_sample.otu_ids],
                y:[cur_sample.sample_values]
            };
            var layoutupdate = {
                title:`result for ${cur_val}`
            };
            // updating the style and data for the graph
            Plotly.restyle("bar", dataupdate);
            Plotly.relayout("bar", layoutupdate);

    });

}






//opens the json file
d3.json("samples.json").then(function(d){


    // adds the names(aka IDs) to the drop down list
    d3.select("#selDataset")
        .selectAll('option')
        .data(d.names)
        .enter()
        .append("option")
        .html(x => x);

        ///// define currention option selected by the test subject dropdown
        var cur_val = dropdown.property("value");
        // defines the sample for the selected id
        var cur_sample = d.samples.find(element=> element.id == cur_val);

        var tracedata = [{
            x:cur_sample.otu_ids,
            y:cur_sample.sample_values,
            type:"bar"
        }];

        var layout = {
            title: `results for ${cur_val}`
          };

        Plotly.newPlot("bar", tracedata, layout);


});



// event listener when  the test subject drop down changes
dropdown.on('change',dropdown_change);


