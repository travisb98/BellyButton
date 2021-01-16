# Belly Button



- ## Overview

  - The goal of this project is to build an interactive dashboard to analyze and explore a dataset microbes in the human navel. This interactive design will include a bar chart that toggles on the participant's ID, a bubble chart displaying each sample, an info card with demographic data, and a gauge chart displaying hygine info.
  

- ## Programs, Languages and Tools
  - Javascript
  - D3
  - HTML
 

- ## File overview
  - ### [samples.json](samples.json)
    ##### *original data set*
  - ### [index.html](index.html)
    ##### *main page structure*
  - ### [app.js](static/js/app.js)
    ##### *main application that loads the json file and creates the interactive dashboard* 
 



- ## Steps deployed to reach goal
    - Step 1 : Create function that will populate the dropdown selector with the test subjects' ids using d3 data binding
    ```javascript
      function populate_dropdown(d){
      d3.select("#selDataset")
          .selectAll('option')
          .data(d.names)
          .enter()
          .append("option")
          .html(x => x);
      };
    ```
    - Step 2 : Create functions for each graph and info panel: Bar Graph, Bubble Chart, Gauge Chart and Demographic Info Panel

    - Step 3: Open json on page load and run the graph and info panel functions using the initial drop down value
        ```javascript
      ////// runs on start up
      ///// open the json file
      d3.json("samples.json").then(function(d){

          // Populates the dropdown menu
          populate_dropdown(d);

          ///// extract variables from bar graph function
          var [bar_type, bar_trace, bar_layout, bar_dataupdate] = bar_graph(d);

          // creates a initial plot from the bar_graph function's variables
          Plotly.newPlot(bar_type,bar_trace,bar_layout,{responsive: true}); /// i think i might be able to extract the variables from the graph function more cleanly

          //// extract variables from bubble  graph functions's variables
          var [bubble_type,bubble_trace, bubble_layout, bubble_dataupdate] = bubble_graph(d);

          // creates the initial buble plot using the bubblchart function
          Plotly.newPlot(bubble_type,bubble_trace,bubble_layout,{responsive: true});

          /// populates the demographic data in the pane
          demographics(d);

          // create the guage graph using the guage function
          gauge_graph(d);
          
      });
        ```
    - Step 4: Create the "dropdown_change" function that updates data for the graph based on the new value in the dropdown selector using Plotly.restyle and Plotly.relayout
        ```javascript
      function dropdown_change(){
          console.log("dropdown changed");

          //// opens the json file
          d3.json("samples.json").then(function(d){

              ///// extract variables from bar graph function
              var [bar_type, bar_trace, bar_layout, bar_dataupdate] = bar_graph(d);
              
              ///// restyling and relayout the bar graph using variables from the bar graph function
              Plotly.restyle(bar_type,bar_dataupdate);
              Plotly.relayout(bar_type,bar_layout);

              //// extract variables from bubble  graph functions
              var [bubble_type,bubble_trace, bubble_layout, bubble_dataupdate] = bubble_graph(d);

              /// use variables from bubble graph functions to restyle and relayout bubble chart
              Plotly.restyle(bubble_type,bubble_dataupdate);
              Plotly.relayout(bubble_type,bubble_layout);

              // removes the old demographic data
              d3.select("#sample-metadata").selectAll("*").remove();
              
              /// populates the demographic data in the pane
              demographics(d);
              // updates the gauge graph
              gauge_graph(d);

          });

      };
        ```    
    - Step 5: Create event handler that runs the "dropdown_change" function when the drop down selection changes
        ```javascript
        dropdown.on('change',dropdown_change);
        ```      



- ## How to use the program
  - Since the page is deployed on my github account, simply navigate to https://travisb98.github.io/BellyButton/ 
  - If you're deploying the program on your local machine, you will need to deploy a python server using this command:
  
  ```python
  python -m http.server
  ```
  - Once deployed, simply select a test subject ID to review the graphs of that test subject's results.

 - ## Preview

 ![preview](page_snip.jpg)




