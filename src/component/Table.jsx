import React, { Component, useState, useEffect, useMemo, useCallback } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


function Table(props) {

    // const [rowData, setRowData] = useState(props.rowData);
    // console.log(rowData);

    // const [columnDefs, setColumnsDefs] = useState(props.columnDefs);

    // useEffect
    const {rowData, columnDefs} = props;

    return (
        <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
        <AgGridReact
           rowData={rowData}
           columnDefs={columnDefs}>
        </AgGridReact>
        </div>
    );
        
    
}

export default Table;