// importing data.js reference
var ufoData = data;

// selecting the html reference for the ufo table
var tableBody = d3.select("tbody");

// populating the hmtl table with values from data.js
function popTable(data) {

    // need to clear table of previous data (reseting from previous filter parameters)
    tableBody.html("");

    // looping through each object in data.js appending row for each value 
    data.forEach((dataRow) => {

        // append a row to the html table
        var tableRow = tableBody.append("tr");

        // add value for each element in dataRow
        Object.values(dataRow).forEach((value) => {
        var element = tableRow.append("td");
        element.text(value);
        });
    });
}

// creating empty dictionary to store 
var ufoFilters = {};

// updating filters to include in search criteria
function filters() {
    //setting variables to hold the element, value and id of the filters in query
    var inputElement = d3.select(this).select("input");
    var inputValue = inputElement.property("value");
    var inputId = inputElement.attr("id");

    // clear all filters unless one was inputed
    if (inputValue) {
        ufoFilters[inputId] = inputValue;
    }
    else {
        delete ufoFilters[inputId];
    }
    // apply filters and populate the table
    // build table function
    filterFunction();
}

function filterFunction() {
    // create copy of data to filter
    let filteredData = ufoData;

    // loop through the filters and keep filter values entered
    Object.entries(ufoFilters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] === value);
    });
    // populate filtered table
    popTable(filteredData);} 

// create event listener
d3.selectAll(".filter").on("change", filters);

// creating table when page loads
popTable(ufoData);