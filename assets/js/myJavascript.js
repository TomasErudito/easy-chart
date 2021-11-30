$(document).ready(setupPage());


/**
 * setup the actions for the buttons in the navbar
 *
 *call the functions
 *startNew()
 *exprotChart()
 *neddHelp()
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


/**
 * Start the process of creating a new chart
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
function startNew() {

    console.log("start new chart");
    $("#chart_menu").show();
    $("#Instructions").hide();
    $("#main_display").show();
    $("#viewfile").click(function () {
        ExportToTable();
    });
    $("#create_table").click(function () {
        createTable(nRows.value, nColumns.value);
    });
    $("#gotoStep2").click(function () {
        customizeChart();
    });
}


/**
 * Start the process of export the created chart
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
function exportChart() {
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
function needHelp() {
    console.log("help required");
    $("#chart_menu").hide();
    $("#Instructions").show();
    $("#main_display").hide();
}



/**
 * Start the process of creating a new table
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
function createTable(myRows, myColumns) {

    console.log("create a new table");

    let myHTML = "<form autocomplete='off'><table class='main_table h-75'>";

    for (i = 1; i <= myRows; i++) {
            myHTML += "<tr>";
        for (j = 1; j <= myColumns; j++) {
        if(i === 1){
            myHTML += "<th align=center> <input type='text' class='reset table_input' id='" + i + j +"' name='" + i + j +"'></th>";
        }else{
            myHTML += "<td align=center> <input type='text' class='reset table_input' id='" + i + j +"' name='" + i + j +"'></td>";
        };
           
        };
         myHTML += "</tr>";
    }
    myHTML += "</table></form>";
    document.getElementById("myTable").innerHTML = myHTML;

}




/**
 * Select chart style
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
function customizeChart() {
    console.log("customize chart");
}