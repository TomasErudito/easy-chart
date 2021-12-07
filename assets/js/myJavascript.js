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
  ["#422066", "#ffb85f", "#ff7a5a", "#00aaa0", "#8ed2c9", "#fcf4d9"],
  ["#218c8d", "#6ccecb", "#f9e559", "#ef7126", "#8edc9d", "#473e3f"],
  ["#60bb22", "#ffc200", "#ff5b00", "#b80028", "#84002e", "#4ac0f2"],
  ["#bd2031", "#fdb813", "#f68b1f", "#f17022", "#62c2cc", "#eef66c"],
  ["#c5aaf5", "#a3cbf1", "#79bfa1", "#f5a352", "#fb7374", "#423c40"],
  ["#ff9c00", "#351330", "#424254", "#64908a", "#e8caa4", "#cc2a41"],
  ["#5e412f", "#fcebb6", "#78c0a8", "#f07818", "#f0a830", "#d68189"],
  ["#f8b195", "#f67280", "#c06c84", "#6c5b7b", "#355c7d", "#bf4d28"]
];
let chartBackgroundColor;
let chartDescription;
let descriptionPosition;

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
       
    $( ".colour_icons" ).css( "border", "none" );
    $("#chart_colour_label").html("<img src='/assets/images/colours/colour_"+newValue+".jpg' alt='' id='selectedColour' class='colour_icons'>");
     item.style.border = '2px solid #cc0066';  
     newValue--; 
     colourSelected = newValue;
     console.log("colour selected number "+colourSelected+" and the colours are "+colourPalette[colourSelected][0]+"/"+colourPalette[colourSelected][1]+"/"+colourPalette[colourSelected][2]+"/"+colourPalette[colourSelected][3]+"/"+colourPalette[colourSelected][4]+"/"+colourPalette[colourSelected][5])
 }

/**
 * deselect the colours in the selection process
 *
 *
 */
 function unHighlightColour() {
    
     $("#chart_colour_label").html("Select the colours");
     $( ".colour_icons" ).css( "border", "none" )     
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

    console.log("start new chart");
    $("#chart_menu_step_1").show();
    $("#chart_menu_step_2").hide();
    $("#chart_menu_step_3").hide();
    $("#Instructions").hide();
    $("#main_display").show();
    $("#theChart").hide();
    $("#chart_selection").click(function(){
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
     $( "#chartBackground" ).change(function() {
      chartBackgroundColor = this.value;
    });
    $( "#descriptionPosition" ).change(function() {
     descriptionPosition = this.value;
   });
   $( "#chartDescription" ).change(function() {
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
    console.log("export chart");
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
    console.log("customize chart");
    
    $("#chart_menu_step_1").hide();
    $("#chart_menu_step_2").show();
    $("#Instructions").hide();
    $("#main_display").show();
    $("#theChart").hide();
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
  console.log("create chart");
  
  $("#chart_menu_step_1").hide();
  $("#chart_menu_step_2").hide();
  $("#chart_menu_step_3").show();
  $("#Instructions").hide();
  $("#main_display").show();
  $("#data_chart").hide();
  $("#theChart").show();
  drawChart();
  $("#exportChart").click(function () {
      exportChart();
  });
};
//------------------------------------------------------------------------//




/**
 * This function get the values for the headers from the table
 *
 *
 */
function getHeaders(){
    let myHeaders = [];
    for(i=1; i<=columnsNumber; i++){
        let newHeader = $("#header"+i).val();
        myHeaders.push(newHeader);
    }
    return myHeaders;
};


/**
 * This function get the values from the table
 *
 *
 */
 function getValues(item){

  
    let myValues = [];
    for(i=1; i<=columnsNumber; i++){
        let newValue = $("#data_"+ item + i).val();
        myValues.push(newValue);
    }
    return myValues;
  };


/**
 * This function get the values for the series from the table
 *
 *
 */
 function getSeries(i){

  let newSerie = $("#serie"+ i).val();
    return newSerie;
  };




//------------------------------------------------------------------------//

/**
 * This function draw the chart with the values send in the object values and use the headers from the array headers
 *
 *
 */
 function drawChart(){
  //alert("columns: "+columnsNumber+"/ rows: "+rowsNumber+"/ style: "+chartStyle+"/ colours selected: "+colourPalette[colourSelected]+"/ ")
  
  let nSeries;
  if(chartStyle=="pie"){
      nSeries = 1;
  }else{
      nSeries = rowsNumber;
  }
  let headers = getHeaders();
  let values = getValues(nSeries);
  let colours =  colourPalette[colourSelected];
  let label = getSeries(nSeries);

  const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: headers,
        datasets: [{
            label: label,
            data: values,
            backgroundColor: colours.slice(0, columnsNumber),
            borderColor: colours,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
  };
  