/**
 * Here are variables that need to be used for the creation of the chart 
 *
 *They will be stored here, so we don't need to request them so many times, and only when changes are made
 *
 */
let chartTitle;
let columnsNumber;
let rowsNumber;
let chartStyle;
let colourSelected;
let colourPalette = [
    ["rgba(66, 32, 102", "rgba(255, 184, 95", "rgba(255, 122, 90", "rgba(0, 170, 160", "rgba(142, 210, 201", "rgba(252, 244, 217"],
    ["rgba(33, 140, 141", "rgba(108, 206, 203", "rgba(249, 229, 89", "rgba(239, 113, 38", "rgba(142, 220, 157", "rgba(71, 62, 63"],
    ["rgba(96, 187, 34", "rgba(255, 194, 0", "rgba(255, 91, 0", "rgba(184, 0, 40", "rgba(132, 0, 46", "rgba(74, 192, 242"],
    ["rgba(189, 32, 49", "rgba(253, 184, 19", "rgba(246, 139, 31", "rgba(241, 112, 34", "rgba(98, 194, 204", "rgba(238, 246, 108"],
    ["rgba(197, 170, 245", "rgba(163, 203, 241", "rgba(121, 191, 161", "rgba(245, 163, 82", "rgba(251, 115, 116", "rgba(66, 60, 64"],
    ["rgba(255, 156, 0", "rgba(53, 19, 48", "rgba(66, 66, 84", "rgba(100, 144, 138", "rgba(232, 202, 164", "rgba(204, 42, 65"],
    ["rgba(94, 65, 47", "rgba(252, 235, 182", "rgba(120, 192, 168", "rgba(240, 120, 24", "rgba(240, 168, 48", "rgba(214, 129, 137"],
    ["rgba(248, 177, 149", "rgba(246, 114, 128", "rgba(192, 108, 132", "rgba(108, 91, 123", "rgba(53, 92, 125", "rgba(191, 77, 40"]
];
let textMainColor;
let chartDescription;
let descriptionPosition;
const canvas = document.getElementById('myChart');
const ctx = canvas.getContext("2d");
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
    }
});
let resetChartVariable = false;
let readyToExport = false;

/**
 * Reset all the parameters and the canvas to starta new chart
 *
 *
 */
 function resetChart() {
    chartTitle="My Chart";
columnsNumber="";
rowsNumber="";
chartStyle="";
colourSelected="";
textMainColor="";
chartDescription="";
descriptionPosition="";
$("#chart_style_label").html("Select your chart style");
$("#chart_colour_label").html("Select the colours");
$("#textColour").val("#ffffff");
$("#chartDescription").val("");
$("#descriptionPosition").val(1).change();
$("#nColumns").val(1).change();
$("#nRows").val(1).change();
$("#chartTitle").val("Chart Title");
$("#chart_title").html("Chart Title");
$("#myTable").html("");
}

//----------------------------------------------------------------------------------//
/**
 * start the setup once the document is ready
 *
 *call the functions
 *setupPage()
 *
 *
 * 
 */
$(document).ready(setupPage());


//-----------------------------------------------------------------------------------//

/**
 * setup the actions for the buttons in the navbar
 *
 *call the functions
 *startNew()
 *exprotChart()
 *neddHelp()
 *
 *
 * 
 */
function setupPage() {
    $("#newChart").click(function () {
        startNew();
    });
    $("#exportChart").click(function () {
        exportChart();
    });
    $("#needHelp").click(function () {
        needHelp();
    });
}

//------------------------------------------------------------------------------------//

//this part of code is related to the modal with icons to select the chart style and chart style selection


/**
 * changes the border of the chart icons in the selection process
 *
 *
 */
function highlightIcon(item) {
    let name = item.id;
    let newValue;
    switch (name) {
        case "bar_icon":
            newValue = "Bar Chart";
            break;
        case "stacked_icon":
            newValue = "Stack Chart";
            break;
        case "pie_icon":
            newValue = "Pie Chart";
            break;
        case "radar_icon":
            newValue = "Radar Chart";
            break;
        case "line_icon":
            newValue = "Line Chart";
            break;
        case "bubble_icon":
            newValue = "Bubble Chart";
            break;
        default:
            newValue = "Chart Style";

    }
    $(".chart_icons").css("border", "none");
    $("#chartTypeSelectionTitle").html(newValue);
    item.style.border = '2px solid #cc0066';
}

/**
 * deselect the chart in the selection process
 *
 *
 */
function unHighlightIcon() {

    $("#chartTypeSelectionTitle").html("Chart Style");
    $(".chart_icons").css("border", "none")
}



/**
 * confirm the chart in the selection process
 *
 *
 */
function confirmChartStyle() {

    let name = $("#chartTypeSelectionTitle").html();
    let newValue = "";
    switch (name) {
        case "Bar Chart":
            newValue = "bar_icon";
            break;
        case "Stack Chart":
            newValue = "stacked_icon";
            break;
        case "Pie Chart":
            newValue = "pie_icon";
            break;
        case "Radar Chart":
            newValue = "radar_icon";
            break;
        case "Line Chart":
            newValue = "line_icon";
            break;
        case "Bubble Chart":
            newValue = "bubble_icon";
            break;
        default:
    }
    $(".chart_icons").css("border", "none");
    $("#" + newValue).css("border", "2px solid #cc0066");
    $("#chart_style_label").html(name);
    let theStyle = newValue.split("_icon");
    chartStyle = theStyle[0];
}

//-----------------------------------------------------------------------------------------------------//

//this part of code is related to the modal with icons to select the chart colours and chart colours selection


/**
 * changes the border of the colour icons in the selection process
 *
 *
 */
function highlightColour(item) {
    let name = item.id;
    let newValue = name.charAt(6);

    $(".colour_icons").css("border", "none");
    $("#chart_colour_label").html("<img src='/assets/images/colours/colour_" + newValue + ".jpg' alt='' id='selectedColour' class='colour_icons'>");
    item.style.border = '2px solid #cc0066';
    newValue--;
    colourSelected = newValue;
    //console.log("colour selected number " + colourSelected + " and the colours are " + colourPalette[colourSelected][0] + "/" + colourPalette[colourSelected][1] + "/" + colourPalette[colourSelected][2] + "/" + colourPalette[colourSelected][3] + "/" + colourPalette[colourSelected][4] + "/" + colourPalette[colourSelected][5])
}

/**
 * deselect the colours in the selection process
 *
 *
 */
function unHighlightColour() {

    $("#chart_colour_label").html("Select the colours");
    $(".colour_icons").css("border", "none")
}

//-----------------------------------------------------------------------------------------------------//

/**
 * Start the process of creating a new chart
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
function startNew() {

    //console.log("start new chart");
    resetChart();
    readyToExport=false;
    $("#chart_menu_step_1").show();
    $("#chart_menu_step_2").hide();
    $("#chart_menu_step_3").hide();
    $("#Instructions").hide();
    $("#main_display").show();
    $("#theChart").hide();
    $("#chart_selection").click(function () {
        unHighlightIcon();
    })
    $(".chart_icons").click(function () {
        highlightIcon(this);
    });
    $(".deselect_icons").click(function () {
        unHighlightIcon();
    });
    $(".confirm_chart").click(function () {
        confirmChartStyle();
    });
    $(".colour_icons").click(function () {
        highlightColour(this);
    });
    $(".deselect_colour").click(function () {
        unHighlightColour();
    });
    $("#textColour").change(function () {
        textMainColor = this.value;
        $("#myChart").css("background-color", textMainColor);
    });
    $("#descriptionPosition").change(function () {
        descriptionPosition = this.value;
    });
    $("#chartDescription").change(function () {
        chartDescription = this.value;
    });
    $("#gotoStep2").click(function () {
        customizeChart();
    });
}

//-------------------------------------------------------------------------//


/**
 * Start the process of export the created chart
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
function exportChart() {

    var myImage = document.getElementById('myChart').toDataURL("image/png");

    if(readyToExport == false){
        let message = "The chart is not created yet, there's nothing to export"
            myAlert(message);
    }else{
        let myFileName = chartTitle + ".png";
        downloadURI("data:" + myImage, myFileName);
    }
};



function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
    //after creating link you should delete dynamic link
    //clearDynamicLink(link); 
}



//---------------------------------------------------------------------------//


/**
 * Start the process of help
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
function needHelp() {
    console.log("help required");
    $("#chart_menu").hide();
    $("#Instructions").show();
    $("#main_display").hide();
}

//------------------------------------------------------------------------//

/**
 * Start the process of creating a new table to insert the data manually
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
function createTable(myRows, myColumns) {

    columnsNumber = myColumns;
    rowsNumber = myRows;

    myRows++;
    myColumns++;


    let myHTML = "<form autocomplete='off'><table class='main_table h-75'>";

    for (i = 1; i <= myRows; i++) {
        myHTML += "<tr>";
        for (j = 1; j <= myColumns; j++) {
            if (i === 1 && j === 1) {
                myHTML += "<th align=center> </th>";
            } else if (i === 1) {
                myHTML += "<th align=center> <input type='text' class='reset table_input'  id='header" + (j - 1) + "' name='header" + (j - 1) + "' value='value " + (j - 1) + "'></th>";
            } else {
                if (j === 1) {
                    myHTML += "<td align=center class='table_serie'> <input type='text' class='reset table_input ' id='serie" + (i - 1) + "' name='serie" + (i - 1) + "' value='serie " + (i - 1) + "'></td>";
                } else {
                    myHTML += "<td align=center> <input type='text' class='reset table_input' id='data_" + (i - 1) + (j - 1) + "' name='data_" + (i - 1) + (j - 1) + "'></td>";
                }
            };

        };
        myHTML += "</tr>";
    }
    myHTML += "</table></form>";
    document.getElementById("myTable").innerHTML = myHTML;

}

//--------------------------------------------------------------------------------//


/**
 * Take the title from the menu and save it in a variable and display it during the creation process
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
function titleCreation() {
    chartTitle = $("#chartTitle").val();
    $("#chart_title").html(chartTitle);
}

//--------------------------------------------------------------------//


/**
 * Select chart style
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
function customizeChart() {
    //console.log("customize chart");

    $("#chart_menu_step_1").hide();
    $("#chart_menu_step_2").show();
    $("#Instructions").hide();
    $("#main_display").show();
    $("#myTable").html("");
    $("#data_chart").show();
    $("#theChart").hide();
    $("#nRows").change(function () {
        if (chartStyle == "pie" && $("#nRows").val() > 1) {
            $("#nRows").val(1);
            let message = "The pie chart can only have 1 row."
            myAlert(message);
        }
    });
    $("#viewfile").click(function () {
        ExportToTable();
    });
    $("#chartTitle").on("input", function () {
        titleCreation();
    });
    $("#create_table").click(function () {
        createTable(nRows.value, nColumns.value);
    });
    $("#gotoStep3").click(function () {
        createChart();
    });
};


//--------------------------------------------------------------------//


/**
 * Select chart style
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
function createChart() {
    //console.log("create chart");
    readyToExport=true;

    $("#chart_menu_step_1").hide();
    $("#chart_menu_step_2").hide();
    $("#chart_menu_step_3").show();
    $("#Instructions").hide();
    $("#main_display").show();
    $("#data_chart").hide();
    $("#theChart").show();
    drawChart();
};
//------------------------------------------------------------------------//




/**
 * This function get the values for the headers from the table
 *
 *
 */
function getHeaders() {
    let myHeaders = [];
    for (i = 1; i <= columnsNumber; i++) {
        let newHeader = $("#header" + i).val();
        myHeaders.push(newHeader);
    }
    return myHeaders;
};


/**
 * This function get the values from the table
 *
 *
 */
function getValues(item) {
    let numberValues;
    if (chartStyle == "pie") {
        item = 1;
        numberValues = columnsNumber;
    }else{
        numberValues = +columnsNumber +1;
    }
    
    
    let myValues = [];
    for (i = 1; i <= numberValues; i++) {
        let newValue = $("#data_" + item + i).val();
        myValues.push(newValue);
    }
    return myValues;
};


/**
 * This function get the values for the series from the table
 *
 *
 */
function getSeries(i) {

    let newSerie = $("#serie" + i).val();
    return newSerie;
};


/**
 * This function get the values for the colours to use on the graph
 *
 *
 */
 function getAllColours() {

    let allColours = []; 
    if(chartStyle == "radar"){
        for(i=0; i<rowsNumber; i++){
            let newColour = colourPalette[colourSelected][i].concat(",0.2)");
            allColours.push(newColour);
        }
    }else{
        for(i=0; i<rowsNumber; i++){
        let newColour = colourPalette[colourSelected][i].concat(",1)");
        allColours.push(newColour);
    }
    }
    
    
    return allColours;
};





//------------------------------------------------------------------------//

/**
 * This function draw the chart with the values send in the object values and use the headers from the array headers
 *
 *
 */
function drawChart() {
    //alert("columns: "+columnsNumber+"/ rows: "+rowsNumber+"/ style: "+chartStyle+"/ colours selected: "+colourPalette[colourSelected]+"/ ")
    myChart.data.datasets.length = 0;
    let nSeries;
    if (chartStyle == "pie") {
        nSeries = 1;
    }else{
        nSeries = rowsNumber;
    }
    let headers = getHeaders();

    let colours;
    if (chartStyle == "pie") {
        colours = colourPalette[colourSelected];
    }else{
        colours = getAllColours();
    }

    let mylabel = [];
    let allDatasets = [];
    for(i=1; i<=nSeries; i++){
        let newLabel = getSeries(i);
        mylabel.push(newLabel);
    }


    //the datasets and the options change with the type of chart
    
    if (chartStyle == "pie") {
        
    for(j=0; j<nSeries;j++){
        let newValue = getValues(j);
        let newLabel = mylabel[j];
        let newDataset ={
            label: newLabel,
            data: newValue,
            backgroundColor: colours.slice(0, columnsNumber).concat(",1)"),
            borderColor: colours,
            borderWidth: 1
        };
        myChart.data.datasets.push(newDataset);
        myChart.data.labels = headers;
        myChart.config.type= chartStyle;
    }
    } else if (chartStyle == "bar"){
        
    for(j=1; j<=nSeries;j++){
        let newTempVar = +j -1;
        let newValue = getValues(j);
        let newLabel = mylabel[newTempVar];
        let newDataset ={
            label: newLabel,
            data: newValue,
            backgroundColor: colours[newTempVar],
        };
        myChart.data.datasets.push(newDataset);
        myChart.data.labels = headers; //this is the text under each column
        myChart.config.type= chartStyle;
    }
        
    } else if (chartStyle == "stacked"){    
        for(j=1; j<=nSeries;j++){
            let newTempVar = +j -1;
            let newValue = getValues(j);
            let newLabel = mylabel[newTempVar];
            let newDataset ={
                label: newLabel,
                data: newValue,
                backgroundColor: colours[newTempVar],
            };
            myChart.data.datasets.push(newDataset);
            myChart.data.labels = headers; //this is the text under each column
            myChart.config.type= "bar";
    
        }
        myChart.options.scales.x = {stacked : true};
        myChart.options.scales.y = {stacked : true};
    } else if (chartStyle == "line"){
        
        for(j=1; j<=nSeries;j++){
            let newTempVar = +j -1;
            let newValue = getValues(j);
            let newLabel = mylabel[newTempVar];
            let newDataset ={
                label: newLabel,
                data: newValue,
                backgroundColor: colours[newTempVar],
                borderColor: colours[newTempVar],
            };
            myChart.data.datasets.push(newDataset);
            myChart.data.labels = headers; //this is the text under each column
            myChart.config.type= chartStyle;
        }
            
        myChart.options.tension=0;
    } else if (chartStyle == "radar"){
        
        for(j=1; j<=nSeries;j++){
            let newTempVar = +j -1;
            let newValue = getValues(j);
            let newLabel = mylabel[newTempVar];
            let newDataset ={
                label: newLabel,
                data: newValue,
                backgroundColor: colours[newTempVar],
                borderColor: colours[newTempVar],
                borderWidth: 1,
                fill:true,
            };
            myChart.data.datasets.push(newDataset);
            myChart.data.labels = headers; //this is the text under each column
            myChart.config.type= chartStyle;
        }
        
    }



    //this is the type of chart it works for all the types
   
    //this is for the labels, it works for all EXCEPT BUBBLES
    //console.log(myChart.data.datasets);


    //this is the same for all the charts
    myChart.update();
};


/**
 * This function opens the alert modal and display the alert message
 *
 *
 */
function myAlert(message) {
    $("#alertContent").html("<h2>" + message + "</h2>");
    $("#myAlert").modal('show');
}
