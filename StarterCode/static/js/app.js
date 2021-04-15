// Write a function that will build the metadata for a single sample. It should do the following:
// - loop over the samples.json file with d3.json().then()
// - extract the metadata from the json
// - filter the metadata for the sample id
// - update the metadata html elements
// - clear any existing metadata in the metadata html elements
// - append hew header tags for each key-value pair in the filtered metadata

// Write a function that will build the charts for a single sample. It should do the following:
// - loop over the samples.json file with d3.json().then()
// - extract the samples from the json
// - filter the samples for the sample id
// - extract the ids, labels, and values from the filtered result
// - build a bubble chart and plot with Plotly.newPlot()
// - build a bar chart and plot with Plotly.newPlot()

var createChart = function(x_data, y_data, hoverText, metadata)  {

    var metadataPanel = d3.select("#sample-metadata");
    metadataPanel.html("");
    Object.entries(metadata).forEach(([key,value]) => {
        metadataPanel.append("p").text(`${key}: ${value}`);
    })

    var trace = {
        x: x_data,
        y: y_data,
        text: hoverText,
        type: "bar",
        orientation: "h"
    };

    var data = [trace];

    Plotly.newPlot('bar', data)
// 
    var trace2 = {
        x: x_data,
        y: y_data,
        text: hoverText,
        mode: 'markers', 
        marker: {
            size: y_data,
            color: x_data
        }
    };

    var data2 = [trace2];

    Plotly.newPlot('bubble', data2);
};

var createDropdown = function(names)  {
    var selectTag = d3.select("#selDataset");
    var options = selectTag.selectAll("option").data(names);
    options.enter()
        .append('option')
        .attr('value', function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        })
};

// Write a function called optionChanged() that takes a new sample as an argument. It should do the following:
// - call your two functions to build the metadata and build the charts on the new sample
// Look at line 30 of index.html: that is the event listener that will call this function when someone selects something on the dropdown

var optionChanged = function(newValue)  {
    d3.json("../data/samples.json").then(function(data) {
    newSample = data['samples'].filter(function(sample) {
        return sample.id == newValue
    });

newMetadata = data['metadata'].filter(function(metadata) {
    return metadata.id == newValue
});

x_data = newSample[0]['otu_ids']
y_data = newSample[0]['sample_values']
hoverText = newSample[0]['otu_labels']

console.log(x_data);
console.log(y_data);
console.log(hoverText);

// Initialize the dashboard by calling your init() function

createChart(x_data, y_data, hoverText, newMetadata[0])
});
}

d3.json("../data/samples.json").then(function(data) {
    createDropdown(data['names']);
    x_data = data['samples'][0]['otu_ids']
    y_data = data['samples'][0]['sample_values']
    hoverText = data['samples'][0]['otu_labels']
})









