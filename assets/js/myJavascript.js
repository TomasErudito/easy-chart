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



$(document).ready(setupPage());


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
          case "stack_icon":
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
    $( ".chart_icons" ).css( "border", "none" );
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
     $( ".chart_icons" ).css( "border", "none" )     
 }



/**
 * confirm the chart in the selection process
 *
 *
 */
 function confirmChartStyle() {
    
    let name = $("#chartTypeSelectionTitle").html();
    let newValue ="";
    switch (name) {
        case "Bar Chart" :
            newValue = "bar_icon";
          break;
          case "Stack Chart":
            newValue = "stack_icon";
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
    $( ".chart_icons" ).css( "border", "none" );
    $("#"+newValue).css( "border", "2px solid #cc0066");
     $("#chart_style_label").html(name);
     chartStyle = newValue; 
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
    $("#chart_menu_step_1").show();
    $("#Instructions").hide();
    $("#main_display").show();
    $("#chart_selection").click(function(){
        unHighlightIcon();
    })
    $("#bar_icon").click(function () {
        highlightIcon(this);
    });
    $("#stack_icon").click(function () {
        highlightIcon(this);
    });
    $("#pie_icon").click(function () {
        highlightIcon(this);
    });
    $("#radar_icon").click(function () {
        highlightIcon(this);
    });
    $("#line_icon").click(function () {
        highlightIcon(this);
    });
    $("#bubble_icon").click(function () {
        highlightIcon(this);
    });
    $(".deselect_icons").click(function () {
        unHighlightIcon();
    });
    $(".confirm_chart").click(function () {
        confirmChartStyle();
    });
    $("#gotoStep3").click(function () {
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

    columnsNumber = myColumns;
    rowsNumber = myRows;

    myRows++;
    myColumns++;


    let myHTML = "<form autocomplete='off'><table class='main_table h-75'>";

    for (i = 1; i <= myRows; i++) {
            myHTML += "<tr>";
        for (j = 1; j <= myColumns; j++) {
        if(i === 1 && j === 1){
            myHTML += "<th align=center> </th>";
        }else if(i === 1){
            myHTML += "<th align=center> <input type='text' class='reset table_input'  id='header" + (j - 1) +"' name='header" + (j - 1) +"' value='value " + (j - 1) + "'></th>";
        }else{
            if(j === 1){
                myHTML += "<td align=center class='table_serie'> <input type='text' class='reset table_input ' id='serie" + (i - 1)+"' name='serie" + (i - 1)+"' value='serie " + (i - 1) + "'></td>";
            }else{
            myHTML += "<td align=center> <input type='text' class='reset table_input' id='data_" + (i - 1) + (j - 1) +"' name='data_" + (i - 1) + (j - 1) +"'></td>";
            }
        };
           
        };
         myHTML += "</tr>";
    }
    myHTML += "</table></form>";
    document.getElementById("myTable").innerHTML = myHTML;

}


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
    
    $("#chart_menu_step_1").hide();
    $("#chart_menu_step_2").show();
    $("#Instructions").hide();
    $("#main_display").show();
    $("#viewfile").click(function () {
        ExportToTable();
    });
    $("#chartTitle").on("input", function() {
        titleCreation(); 
     });
    $("#create_table").click(function () {
        createTable(nRows.value, nColumns.value);
    });
    $("#gotoStep3").click(function () {
        customizeChart();
    });
}