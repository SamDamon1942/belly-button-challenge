// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadataField = data.metadata;

    // Assign the value of the dropdown menu option to a variable
    let dropdownMenu = d3.select("#selDataset");
    let sampleNumber =dropdownMenu.value;
   
    // Filter the metadata for the object with the desired sample number
    let filteredMetaData = metadataField.filter(obj => obj.id === sample);
    let arr_filtered = filteredMetaData[0];

    console.log(arr_filtered);

    // Use d3 to select the panel with id of `#sample-metadata`
     let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

      Object.entries(arr_filtered).forEach(([key, value]) => {
      
        // Append a new tag for each key-value pair
      PANEL.append("p").text(`${key}: ${arr_filtered[value]}`);
      });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samplesData = data.samples;

    // Filter the samples for the object with the desired sample number
    let filteredSample = samplesData.filter(obj=> obj.id === sample);
    let arr_filtered_sample = filteredSample[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = arr_filtered_sample.otu_ids;
    let otu_labels = arr_filtered_sample.otu_labels;
    let sample_values = arr_filtered_sample.sample_values;

    // Build a Bubble Chart
   let traceBubble = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
          marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
      }
    };

    let layoutBubble = {
      title: 'Bubble Chart',
      xaxis: { title: 'OTU IDs' },
      yaxis: { title: 'Sample Values' }
    }; 

      // Render the Bubble Chart
      Plotly.newPlot('bubble', traceBubble, layoutBubble);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yTicks = otu_ids.map(id => `OTU ${id}`);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let traceBar = {
      x: sample_values,
      y: yTicks,
      orientation: 'h'
    };

    let layoutBar = {
      title: 'Bar Chart',
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU IDs' }
    };
    
    // Render the Bar Chart
    Plotly.newPlot(bar, traceBar, layoutBar);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames = data.names;
    let samplesData = data.samples;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    sampleNames.forEach(name => {
      dropdownMenu.append("option").text(name).property("value",sampleNames[0]);
    });

    // Get the first sample from the list
      let selectedSampleName = dropdownMenu.property("value");
      //console.log(selectedSampleName);
      
    // Use the selected sample name to access the corresponding data

      //let samplesData = data.samples;
      //let selectedSampleData = samplesData.filter(obj => obj.id === selectedSampleName);
    
      let firstSample = samplesData.filter(obj=> obj.id === selectedSampleName);
      let arr_first_sample = firstSample[0];
    
    // Build charts and metadata panel with the first sample
     buildCharts(firstSample);
     buildMetadata(arr_first_sample);
  });
}

  // Function for event listener
  function optionChanged(newSample) {
    // Build charts and metadata panel each time a new sample is selected
    let dropdown = d3.select("#selDataset");

    //set up an event listener on the dropdown list to detect changes
    dropdown.on("change", function() {
    
      // Retrieve the selected sample name from the dropdown list
      let selectedSampleName = d3.select(this).property("value");

      // Retrieve the selected sample data based on the chosen sample name
      let selectedSampleData = sampleData[selectedSampleName];
  
      // Update and redraw the charts with the new sample data
      buildCharts(selectedSampleName);
      buildMetadata(selectedSampleData);
  });
}

// Initialize the dashboard
init();
