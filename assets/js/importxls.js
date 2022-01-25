/*this code is from Midhun T P (developer) shared in the page https://www.c-sharpcorner.com/article/reading-a-excel-file-using-html5-jquery/ */

function ExportToTable() {  
    $('#myTable').html("");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
    /*Checks whether the file is a valid excel file*/  
    if (regex.test($("#excelfile").val().toLowerCase())) {  
        var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
        if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {  
            xlsxflag = true;  
        }  
        /*Checks whether the browser supports HTML5*/  
        if (typeof (FileReader) != "undefined") {  
            var reader = new FileReader();  
            reader.onload = function (e) {  
                var data = e.target.result;  
                /*Converts the excel data in to object*/  
                if (xlsxflag) {  
                    var workbook = XLSX.read(data, { type: 'binary' });  
                }  
                else {  
                    var workbook = XLS.read(data, { type: 'binary' });  
                }  
                /*Gets all the sheetnames of excel in to a variable*/  
                var sheet_name_list = workbook.SheetNames;  
 
                var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/  
                sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/  
                    /*Convert the cell value to Json*/  
                    if (xlsxflag) {  
                        var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);  
                    }  
                    else {  
                        var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
                    }  
                    if (exceljson.length > 0 && cnt == 0) {  
                       // BindTable(exceljson, '#myTable');  **commented to try my own code to create table
                       createTableXls(exceljson, '#myTable');
                        cnt++;  
                    }  
                });  
                $('#myTable').show();  
            }  
            if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/  
                reader.readAsArrayBuffer($("#excelfile")[0].files[0]);  
            }  
            else {  
                reader.readAsBinaryString($("#excelfile")[0].files[0]);  
            }  
        }  
        else {  
            alert("Sorry! Your browser does not support HTML5!");  
        }  
    }  
    else {  
        let message = 'You need to upload an excel file first. Please select the file you want to upload clicking on the text "Import file".'
        myAlert(message);  
    }  
}  


function BindTable(jsondata, tableid) {/*Function used to convert the JSON array to Html Table*/  
    var columns = BindTableHeader(jsondata, tableid); /*Gets all the column headings of Excel*/  
    for (var i = 0; i < jsondata.length; i++) {  
        var row$ = $('<tr/>');  
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
            var cellValue = jsondata[i][columns[colIndex]];  
            if (cellValue == null) {
                cellValue = "";  
            } 
                
            row$.append($('<td/>').html(cellValue));

        }  
        $(tableid).append(row$);  
    }  
}  
function BindTableHeader(jsondata, tableid) {/*Function used to get all column names from JSON and bind the html table header*/  
    var columnSet = [];  
    var headerTr$ = $('<tr/>');  
    for (var i = 0; i < jsondata.length; i++) {  
        var rowHash = jsondata[i];  
        for (var key in rowHash) {  
            if (rowHash.hasOwnProperty(key)) {  
                if ($.inArray(key, columnSet) == -1) {/*Adding each unique column names to a variable array*/  
                    columnSet.push(key);  
                    headerTr$.append($('<th/>').html(key));  
                    //myHeaders.push(key);//this is my code it push the headers into one array named myHeaders
                }  
            }  
        }  
    }  
    //$(tableid).append(headerTr$);  
    return columnSet;  
}  


/**
 * This code is mine, this function create the table from the data imported with the xls / xlsx file
 *
 *change menu's display to visible
 *hide the instructions
 *display the data / chart preview
 *
 */
function createTableXls(jsondata, tableid) {
    let columns = BindTableHeader(jsondata, tableid); /*Gets all the column headings of Excel*/

    let myRows = jsondata.length;
    let myColumns = columns.length;

    columnsNumber = (myColumns - 1) ;
    rowsNumber = myRows;


    let myHTML = "<form autocomplete='off'><table class='main_table h-75'><tr>";

    myHTML += "<th align=center></th>"; //creates an empty cell at the beginning

    for (h = 1; h < myColumns; h++){
        let headerValue = columns[h];  
        myHTML += "<th align=center> <input type='text' class='reset table_input' id='header" + (h) +"' name='header" + (h) +"' value='" + headerValue + "'></th>";
    }
    myHTML += "</tr>";

    for (i = 0; i < myRows; i++) {
        myHTML += "<tr>";


        for (j = 0; j <myColumns; j++) {
            
            let cellValue = jsondata[i][columns[j]];
            
            if(j == 0){
                myHTML += "<td align=center class='table_serie'> <input type='text' class='reset table_input ' id='serie" + (i + 1)+"' name='serie" + (i + 1)+"' value='" + cellValue + "'></td>";
            }else{
                myHTML += "<td align=center> <input type='text' class='reset table_input' id='data_" + (i + 1) + (j) +"' name='data_" + (i + 1) + (j) +"' value='" + cellValue + "'></td>";
            }

            //myHTML += "<td align=center id='" + (i + 1) + (j + 1) +"'>" + cellValue + "</td>";
        }

        myHTML += "</tr>";
    }


    myHTML += "</table></form>";
    document.getElementById("myTable").innerHTML = myHTML;

    let filepath = $("#excelfile").val().toLowerCase();
    const myArray = filepath.split(/\\/g);
    let fileName = myArray[myArray.length - 1];
    const tempTitle = fileName.split(".", 1);
    $("#chart_title").html(tempTitle);

    //alert if the user choose pie chart, but the table has more than 1 row
    if(chartStyle == "pie" && rowsNumber > 1){
    let message = "The uploaded file has more than 1 row and because of the chart type selected only the first row will be displayed."
    myAlert(message);
    }else if(chartStyle == "doughnut" && rowsNumber > 1){
        let message = "The uploaded file has more than 1 row and because of the chart type selected only the first row will be displayed."
        myAlert(message);
        }
}






/* this is how it looks the json: 1 array with 1 object for each row and keys for every column
0: {time: '10', all: '3', more: '4', tall: '5', call: '55', …}
1: {time: '12', all: '22', more: '85', tall: '85', call: '24', …}
2: {time: '14', all: '20', more: '20', tall: '365', call: '45', …}
3: {time: '16', all: '0', more: '42', tall: '2220', call: '42', …}
4: {time: '18', all: '42', more: '43', tall: '436', call: '3456', …}
5: {time: '20', all: '89', more: '789', tall: '97', call: '8', …}
*/