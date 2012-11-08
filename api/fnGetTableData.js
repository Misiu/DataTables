/**
 * Gets all the data from table including heared and footer.
 * This function is slightly different from TableTools because 
 * it return multiple rows for heared and footer
 *
 *  @name fnGetTableData
 *  @anchor fnGetTableData
 *  @author <a href="http://jagusz.pl">Tomasz Jagusz</a>
 *
 *  @example
 *    $(document).ready(function() {
 *        var oTable = $('#example').dataTable();
 *         
 *        // get table data including header and footer
 *        var tableData = oTable.fnGetTableData();
 *        console.log( tableData );
 *    } );
 */
$.fn.dataTableExt.oApi.fnGetTableData = function (oSettings, oData) {

	//default settings
	var exportType = 'visible';
	var allowedType = ['full', 'visible'];
	var exportParts = 'all';
	var allowedParts = ['all', 'header', 'footer', 'none'];
	var exportSorted = false;
	var excludeClass = 'exclude';

	if (typeof oData !== 'undefined' && typeof oData === 'object') {

		//if (typeof oData.type !== 'undefined' && typeof oData.type === 'string' && $.inArray(oData.type, allowedType) > -1) {
		//	exportType = oData.type;
		//}

		if (typeof oData.parts !== 'undefined' && typeof oData.parts === 'string' && $.inArray(oData.parts, allowedParts) > -1) {
			exportParts = oData.parts;
		}
		
		//if (typeof oData.sorted !== 'undefined' && typeof oData.sorted === 'boolean') {
		//	exportSorted = oData.sorted;
		//}
		
		if (typeof oData.exclude !== 'undefined' && typeof oData.exclude === 'string') {
			excludeClass = oData.exclude;
		}
		
	}

	var aData = [],
		aRow, sLoopData = '';

	var aColumnsInc = [];
	for (i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
		aColumnsInc.push(oSettings.aoColumns[i].bVisible && oSettings.aoColumns[i].sClass.indexOf('last') === -1 ? true : false);
	}

	//
	//Header
	//
	//if (exportParts === 'all' || exportParts === 'header')
	if ($.inArray(exportParts, ['all', 'header']) > -1) {
		aRow = [];
		for (i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
			if (aColumnsInc[i]) {
				sLoopData = oSettings.aoColumns[i].sTitle.replace(/\n/g, " ").replace(/<.*?>/g, "").replace(/^\s+|\s+$/g, "");
				aRow.push(sLoopData);
			}
		}
		aData.push({
			type: 'thead',
			cells: aRow
		});

	}

	//
	//Body
	//
	
	//test
	if (exportSorted) {
	var tableData = this._('tr');//sorted data
	
	for (j = 0, jLen = tableData.length; j < jLen; j++) {
	
	aRow = [];
	var i=0;
	$.each(tableData[j], function(key, value) {
		if (aColumnsInc[i]) {
				aRow.push(tableData[j][key]);
			}
		i++;
	});

	aData.push({
			type: 'tbody',
			cells: aRow
		});
	}
	
	} else {
	for (j = 0, jLen = oSettings.aoData.length; j < jLen; j++) {

		aRow = [];

		for (i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
			if (aColumnsInc[i]) {
				if (oSettings.aoColumns[i].mData !== null) {
					sLoopData = oSettings.aoData[j]._aData[oSettings.aoColumns[i].mData];
					aRow.push(sLoopData);
				} else {
					aRow.push('');
				}
			}
		}
		aData.push({
			type: 'tbody',
			cells: aRow
		});
	}
	}

	//
	//Footer
	//
	if ($.inArray(exportParts, ['all', 'footer']) > -1 && oSettings.nTFoot !== null) {

		var vLen = 0;
		for (i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
			if (oSettings.aoColumns[i].bVisible && oSettings.aoColumns[i].sClass.indexOf(excludeClass) === -1) {
				vLen++;
			}
		}
		for (j = 0, jLen = oSettings.nTFoot.children.length; j < jLen; j++) {
			aRow = [];
			for (i = 0; i < vLen; i++) {
				sLoopData = oSettings.nTFoot.children[j].children[i].innerHTML.replace(/\n/g, " ").replace(/<.*?>/g, "").replace(/^\s+|\s+$/g, "");
				aRow.push(sLoopData);
			}
			aData.push({
				type: 'tfoot',
				cells: aRow
			});
		}
	}

	return aData;
};