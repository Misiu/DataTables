##DataTables.net Tools and Plugins


####1. fnGetTableData


##Desctiption:

####1. fnGetTableData


Gets all the data from table including heared and footer.  
This function is slightly different from TableTools because it return multiple rows for heared and footer.

* Basic example:  
 
````javascript
    $(document).ready(function() {
        var oTable = $('#example').dataTable();
        var tableData = oTable.fnGetTableData();
        console.log( tableData );
    });
````
