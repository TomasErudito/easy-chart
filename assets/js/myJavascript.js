$( document ).ready(setupPage());


/**
 * setup the actions for the buttons in the navbar
 *
 *call the functions
 *startNew()
 *exprotChart()
 *neddHelp()
 *
 */
 function setupPage(){
    $("#newChart").click(function() {startNew();});
    $("#exportChart").click(function() {exportChart();});
    $("#needHelp").click(function() {needHelp();});
}


/**
 * Start the process of creating a new chart
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
function startNew(){
    
    console.log("start new chart");
    $("#chart_menu").show();
    $("#Instructions").hide();
    $("#main_display").show();
}


/**
 * Start the process of export the created chart
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
 function exportChart(){
    console.log("export chart");
}


/**
 * Start the process of help
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
 function needHelp(){
    console.log("help required");
    $("#chart_menu").hide();
    $("#Instructions").show();
    $("#main_display").hide();
}