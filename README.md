# Belly Button



- ## Overview
  - define starting point and end goal
  - The goal of this project is to build an interactive dashboard to analyze and explore a dataset microbes in the human navel. This interactive design will include a bar chart that toggles on the participant's ID, a bubble chart displaying each sample, an info card with demographic data, and a gauge chart displaying hygine info.
  

- ## Programs, Languages and Tools
  - Javascript
  - D3
  - HTML
 

- ## File overview
  - ### samples.json
    ##### *original data set*
  - ### index.html
    ##### *main page structure*
  - ### app.js
    ##### *main application that loads the json file and creates the interactive dashboard* 
  - ### bonus.js
    ##### *this was meant to contain the bonus problem but we'll probably just put it in app.js, I'll likely delete this file* 



- ## Steps deployed to reach goal
    - Step 1 : Populate the dropdown selector with the test subject's ids using d3 data binding
    - Step 2 : Create functions for each graph and info panel
      - Bar Graph:
          - ##### *original data set*
      - Gauge Graph:
        ##### *original data set*
      - Bubble Chart:
      - Demographics Panel:
    - Step 3: Open json on page load and run the graph and info panel functions using the initial drop down value
    - Step 4: Create the "dropdown_change" function that updates data for the graph based on the new value in the dropdown selector using Plotly.restyle and Plotly.relayout
    - Step 5: Create event handler that runs the "dropdown_change" function when the drop down selection changes



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





