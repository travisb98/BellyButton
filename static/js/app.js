
// selector for dropdown
var dropdown = d3.select("#selDataset");

function dropdown_change(){
    // console.log(dropdown.property("value"));


    //// updating the graph
    //opens the json file
    d3.json("samples.json").then(function(d){

            ///// define currention option selected by the test subject dropdown
            var cur_val = dropdown.property("value");

            // defines the sample for the selected id
            
            var cur_sample = d.samples.find(element=> element.id == cur_val);

            //////////////// need to sort cur_sample.otu_ids and cur_sample.sample_values together greatest to least based on the sample_value, then eliminate 

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







///// as it sits now, this all happens upon startup
//opens the json file
d3.json("samples.json").then(function(d){


    //// maybe make this a seperate function?
    // adds the names(aka IDs) to the drop down list
    d3.select("#selDataset")
        .selectAll('option')
        .data(d.names)
        .enter()
        .append("option")
        .html(x => x);

    
    //////////////////////////////////////////////////////////////////
    //// getting the data for the bar graph and
    ///// define currention option selected by the test subject dropdown
    var cur_val = dropdown.property("value");
    // defines the sample for the selected id
    var cur_sample = d.samples.find(element=> element.id == cur_val);

    ///// need to sort cur_sample.otu_ids and cur_sample.sample_values together greatest to least based on the sample_value, then eliminate 


    var tracedata1 = [{
        x:cur_sample.otu_ids,
        y:cur_sample.sample_values,
        type:"bar",
        orientation:'h'
    }];

    var layout1 = {
        title: `results for ${cur_val}`
        };

    Plotly.newPlot("bar", tracedata1, layout1);
    //////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////
    //// bubble chart
    var tracedata2=[{
        x:cur_sample.otu_ids,
        y:cur_sample.sample_values,
        // text:cur_sample.otu_labels,
        mode:'markers',
        marker:{
            size:cur_sample.sample_values,
            color:cur_sample.otu_ids
        }

    }];

    var layout2 = {
        title: `Bubble Chart for ${cur_val}`,
        showlegend: false,
        height: 600,
        width: 600
    };

    Plotly.newPlot('bubble',tracedata2,layout2);
    //////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////
    //////// getting the demographics on the pange
    var cur_demo=d.metadata.find(element => element.id == cur_val);
    //////// get the panel body and add a list
    //ugly but it works for now
    d3.select("#sample-metadata").append("ul") 
        .selectAll('li')
        .data(Object.entries(cur_demo))
        .enter()
        .append("li")
        .html(x => x);
    

    /////////////////////////////////////////////////////////////






});






// event listener when  the test subject drop down changes
dropdown.on('change',dropdown_change);


