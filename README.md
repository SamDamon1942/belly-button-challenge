************************************************
**                   Module 14 Challenge      **
************************************************

In this challenge I will build an interactive dashboard to explore the Belly Button Biodiversity dataset.
This dataset catalogs the microbes that colonize human navels. The dataset reveals that a small handful of
microbial species ("operational taxonomic units", OTUs) were present in more than 70% of people, while the
rest were relatively rare.

There are three files associated with this challenge:
1. index.html
2. samples.json
3. apps.js (this is within the "static" folder

The process:
1. I'll use the D3 library to read in the samples.json data
2. I'll create a horizonal bar chart with a dropdown menu to display the top 10 OTUs found in a particular indvidual.
3. I'll create a bubble chart that displays each sample.
	The OTU ids are the x-values
	The sample_values are the y-values
	The sample_values will be used to vary the marker size
	The OTU ids are used to determine the marker colors
	The OTU labels will be used for the text values.

4. The individual's demographic information will be displayed in a container to the left of the bubble chart.
5. If my code works as it should, all plots and demographic data will update when a new sample is selected.

Lastly, my app is deployed to a GitHub Pages page.
    