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
    ```python
    function populate_dropdown(d){
    d3.select("#selDataset")
        .selectAll('option')
        .data(d.names)
        .enter()
        .append("option")
        .html(x => x);
  };
    ```
    - Step 2 : Create functions for each graph and info panel.
      
      Bar Graph:
        ```python
        codehere
        ```
      Bubble Chart:
        ```python
        codehere
        ```
      Gauge Graph:
        ```python
        codehere
        ```
      Bubble Chart:
        ```python
        codehere
        ```
      Demographics Panel:
        ```python
        codehere
        ```
    - Step 3: Open json on page load and run the graph and info panel functions using the initial drop down value
        ```python
          codehere
        ```
    - Step 4: Create the "dropdown_change" function that updates data for the graph based on the new value in the dropdown selector using Plotly.restyle and Plotly.relayout
        ```python
          codehere
        ```    
    - Step 5: Create event handler that runs the "dropdown_change" function when the drop down selection changes
        ```python
          codehere
        ```      



- ## How to use the program
  - Since the page is deployed on my github account, simply navigate to https://travisb98.github.io/BellyButton/ 
  - If you're deploying the program on your local machine, you will need to deploy a python server using this command: 
  
  ```python
  python -m http.server
  ```

- ## Findings and Conclusion
    - note 1
    - note 2
    - note 3





