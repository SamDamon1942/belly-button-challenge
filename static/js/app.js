let dropdownMenu = d3.select("#selDataset");

// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadataField = data.metadata;

    //use the lines below to verify what I expect to happen with the code
    //console.log(metadataField);
    //console.log(sample);
    
    //note: the sample shown in the dropdown menu is of type text. Need to convert it to a number
    let newSample = parseInt(sample);
    
    //console.log(newSample);

    // Filter the metadata for the object with the desired sample number
    let filteredMetaData = metadataField.filter(obj => obj.id === newSample);
    //console.log(filteredMetaData);

    let arr_filtered = filteredMetaData[0];

    //console.log(arr_filtered);
    
    // Use d3 to select the panel with id of `#sample-metadata`
    let metadataPanel = d3.select("#sample-metadata");

    //let metadataPanel = d3.select(".card-body");
    // Use `.html("") to clear any existing metadata
     metadataPanel.html("");

     for (let key in arr_filtered) {
      metadataPanel.append("h6").text(`${key.toUpperCase()}: ${arr_filtered[key]}`);
     }
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
   let traceBubble = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
          marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
      }
    }];
    let layoutBubble = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria' },
      margin: {t:50},
      hovermode: "closest",
    }; 

      // Render the Bubble Chart
      Plotly.newPlot('bubble', traceBubble, layoutBubble);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yTicks = otu_ids.map(id => `OTU ${id}`);
    let yTicksSlice = yTicks.slice(0,10)
    let yTicksReverse = yTicksSlice.reverse()
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
        
    //let traceData = sample_values;
    let slicedData =  sample_values.slice(0,10);
    let reversedData = slicedData.reverse();
    
    let traceData = reversedData;
        
    let traceBar = [{
      x: traceData,
      y: yTicksReverse,
      orientation: 'h',
      text: otu_labels,
      type: 'bar'
    }];

    let layoutBar = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' } 
    };
    
    // Render the Bar Chart
    Plotly.newPlot('bar',traceBar, layoutBar);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames = data.names;
    
    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < sampleNames.length; i++){
      dropdownMenu
        .append("option")
        .text(sampleNames[i])
        .property("value",sampleNames[i]);
    };

    // Get the first sample from the list
      let firstSampleName = sampleNames[0];
          
     // Build charts and metadata panel with the first sample
     buildCharts(firstSampleName);
     buildMetadata(firstSampleName);
  });
}

// Function for event listener
function optionChanged(newSample) {
  
  // Build charts and metadata panel each time a new sample is selected
    let newSampleName = dropdownMenu.property("value");
     
    buildCharts(newSampleName);
    buildMetadata(newSampleName);
};

dropdownMenu.on("change",optionChanged);

// Initialize the dashboard
init();
