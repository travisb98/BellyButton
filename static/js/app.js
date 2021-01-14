
// selector for dropdown
var dropdown = d3.select("#selDataset");



/// this is the refined version of the function that will be triggered by the on change function

function dropdown_change(){
    console.log("dropdown changed");
    //// opens the json file


    d3.json("samples.json").then(function(d){

        ///// restyling and relayout the bar graph using the bar graph function
        Plotly.restyle(bar_graph(d)[0],bar_graph(d)[3]);
        Plotly.relayout(bar_graph(d)[0],bar_graph(d)[2]);


        ////// restyle and layout of the bubble chart
        Plotly.restyle(bubble_graph(d)[0],bubble_graph(d)[3]);
        Plotly.relayout(bubble_graph(d)[0],bubble_graph(d)[2]);


        // removes the old demographic data
        d3.select("#sample-metadata").selectAll("*").remove();
        
        /// populates the demographic data in the pane
        demographics(d);
        // updates the gauge graph
        gauge_graph(d);
    

    });



};



////// runs on start up
///// open the json file
d3.json("samples.json").then(function(d){

    // Populates the dropdown menu
    populate_dropdown(d);

    // creates a initial plot from the bar_graph function
    Plotly.newPlot(bar_graph(d)[0],bar_graph(d)[1],bar_graph(d)[2],{responsive: true}); /// i think i might be able to extract the variables from the graph function more cleanly

    // creates the initial buble plot using the bubblchart function
    Plotly.newPlot(bubble_graph(d)[0],bubble_graph(d)[1],bubble_graph(d)[2]);

    /// populates the demographic data in the pane
    demographics(d);

    // create the guage graph using the guage function
    gauge_graph(d);
    
});



function populate_dropdown(d){
    // adds the names(aka IDs) to the drop down list
    d3.select("#selDataset")
        .selectAll('option')
        .data(d.names)
        .enter()
        .append("option")
        .html(x => x);
};





function bar_graph(d){

    ///// define currention option selected by the test subject dropdown
    var cur_val = dropdown.property("value");
    // defines the sample for the selected id
    var cur_sample = d.samples.find(element=> element.id == cur_val);

    ///////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    ///////// these sorts dont make sense i need to sort the entire d.samples, then grab each list below. The way I have it set up now does not sort each list the same way, shuffling the data
    ///////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /// sorts and reduces the values for the graph
    var x_val = cur_sample.otu_ids.sort((a,b) => (b-a)).slice(0,10);

    //  sorts and reduces the list of labels. It also adds the OTU prefix
    var y_val=cur_sample.sample_values.sort((a,b) => (b-a)).slice(0,10).map(x => `OTU ${x}`);
    // sorts and reduces the labels
    var labels=cur_sample.otu_labels.sort((a,b) => (b-a)).slice(0,10);


    /// data for the bar graph
    var data = {
        x:x_val,
        y:y_val,
        type:"bar",
        orientation:'h',
        text:labels,
        
    };
    /// used for updating the plot on a change
    var dataupdate ={
        x:[x_val],
        y:[y_val]
    };

    var trace = [data];

    var layout1 = {
        title: `Top Ten Samples for Test Subject ${cur_val}`
        };



    return ["bar", trace, layout1, dataupdate];
    //////////////////////////////////////////////////////////////////
};




function bubble_graph(d){

     ///// define currention option selected by the test subject dropdown
    var cur_val = dropdown.property("value");

    /////getting the sample data for the current id
    var cur_sample = d.samples.find(element=> element.id == cur_val);


        //////////////////////////////////////////////////////////////////
    //// bubble chart
    var data={
        x:cur_sample.otu_ids,
        y:cur_sample.sample_values,
        text:cur_sample.otu_labels,
        mode:'markers',
        marker:{
            size:cur_sample.sample_values,
            color:cur_sample.otu_ids
        }

    };


    var trace = [data];

    var layout = {
        title: `Samples for Test Subject ${cur_val}`,
        showlegend: false,
        height: 600,
        width: 1200
    };

    var dataupdate = {
        x:[cur_sample.otu_ids],
        y:[cur_sample.sample_values]
    };
    return ['bubble',trace,layout,dataupdate];
 
};


function gauge_graph(d){

    ///// define currention option selected by the test subject dropdown
    var cur_val = dropdown.property("value");

    var cur_wf=d.metadata.find(element => element.id == cur_val).wfreq;

    /// finds the maximum wash frequency
    var max_wf = d3.max(d.metadata.map(element => element.wfreq));

    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: cur_wf,
            title: { text: "Speed" },
            title:"Daily Belly Button Baths",
            type: "indicator",
            mode: "gauge+number",
            gauge: { axis: { range: [null, max_wf] } }
            
        }
    ];
    
    var layout = { width: 1000, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);

};

function demographics(d){
    ///// define currention option selected by the test subject dropdown
    var cur_val = dropdown.property("value");
    
    //////// getting the demographics on the pange
    var cur_demo=d.metadata.find(element => element.id == cur_val);
    ////// get the panel body and add a list
    d3.select("#sample-metadata").append("ul").attr("style","overflow: auto")
        .selectAll('li')
        .data(Object.entries(cur_demo))
        .enter()
        .append("li")
        .html(x => x);
};



// event listener when  the test subject drop down changes
dropdown.on('change',dropdown_change);
