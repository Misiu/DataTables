##DataTables.net Tools and Plugins

### Plugin list:

####1 [fnGetTableData](#fnGetTableData)


##Desctiption:

###1 <a id="fnGetTableData"></a>fnGetTableData


 Gets all the data from table including heared and footer.
 This function is slightly different from TableTools because 
 it return multiple rows for heared and footer
 
    $(document).ready(function() {
        var oTable = $('#example').dataTable();
        var tableData = oTable.fnGetTableData();
        console.log( tableData );
    });

