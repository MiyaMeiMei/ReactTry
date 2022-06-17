import React, { Component, useState, useEffect, useMemo, useCallback, useReducer, useLayoutEffect } from 'react';
import logo from './../logo.svg';
import './../App.css';
import Charts from './Charts';
import Table from './Table';
import {getSrouceData} from '../utils/api';

const updateTableDataByChartAction = (state, action) => {
  const {type, seriesOptions} = action.e
  if (type === 'drilldown') {
    const childValues = seriesOptions.data.map(item => {
      return item[1]
    })
    state.tableData = [
      {make: "Toyota", model: "Celica", price: 35000},
    ]
  } else if (type === 'drillup') {
    const parentValues = seriesOptions.data.map(item => {
      return item[1]
    })
    // state.tableData = parentValues
  }

  return {...state}
}

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TABLE_DATA':
      return updateTableDataByChartAction(state, action)
    case 'INIT_RESOLUTION_CHART': {
      const {fixVersionTable, resolutionChart, title} = action
      return {...state, fixVersionTable, resolutionChart, title}
    }
    case 'INIT_FIXVERSION_CHART': {
      const {fixVersionTable, resolutionChart, title} = action
      return {...state, fixVersionTable, resolutionChart, title}
    }
    default:
      break
  }
}


function App(props) {

  const source = props.source;
  const issueCategories = ['Prod Issue', 'Bug', 'Story', 'Task', 'Not Fixed'];

  const [fixVersionTable, setFixVersionTable] = useState([]);
  const [resolutionChart, setResolutionnChart] = useState([]);
  const [issueTypeChart, setIssueTypeChart] = useState([]);
  const [state, dispatch] = useReducer(reducer, {fixVersionTable, resolutionChart});
  const [prodIssue, setProdIssue] = useState();
  const [qaRequired, setQARequired] = useState();
  const [linkTC, setLinkTC] = useState();

  const [columnDefsOfFixVersion, setColumnDefsOfFixVersion] = useState([
    {field: 'FixVersion'},
    {field: 'Total'}
  ]);
  const [columnDefsOfProdIssue, setColumnDefsOfProdIssue] = useState([
    {field: 'Key'},
    {field: 'Summary'},
    {field: 'Comment'}
  ]);
  
  const [columnDefsOfQA, setcolumnDefsOfQA] = useState([
    {field: 'QA Contact', filter: true},
    {field: 'Story'},
    {field: 'Task'},
    {field: 'Prod Issue'},
    {field: 'Bug'},
    {field: 'Grand Total'}
  ]);

  const [columnDefsOfDev, setcolumnDefsOfDev] = useState([
    {field: 'Role', filter: true},
    {field: 'Story'},
    {field: 'Task'},
    {field: 'Prod Issue'},
    {field: 'Bug'},
    {field: 'Grand Total'}
  ]);

  function filterData(source, key, targetVal){

    const filterData = source.filter(item => item[key]=== targetVal);
    console.log(filterData.length);

    return filterData;
  }

  function countViaHeader(source, columnKey){

    const fixVersion = source.map(item => item[columnKey]);

    const data = fixVersion.reduce((pre, next) => {
      pre[next] = (pre[next] + 1) || 1;

      return pre;
    },{});

    return data;
  }

  function filterArrayData(source, keyArr, columnKey, subKeyArr, subColKey){

    const dataset = {}

    keyArr.forEach(element => {
      const onlyOneFixVersion = source.filter(item => item[columnKey] === element)
      dataset[element] = [];
      subKeyArr.forEach(subEle => {
        const ammount = onlyOneFixVersion.filter(subItem => subItem[subColKey] === subEle).length
        dataset[element].push(ammount)
      })

    })
    console.log(dataset);

    return dataset;
  }

  function transferData(data, key1, key2){

    const tableData = [];

    Object.entries(data).forEach(([key, value]) => {
      tableData.push({[key1]: key, [key2]: value})
    })

    return tableData;
  }

  useEffect(() => {
    getSrouceData()
    .then(v =>  {
      const data = v.data;
      console.log(data);
      const fixVersionData = countViaHeader(data, 'FixVersion');
      const resolutionData = countViaHeader(data, 'Resolution');
      const resolutionPieData = transferData(resolutionData, 'name', 'y');
      const fixVersionTable = transferData(fixVersionData, 'FixVersion', 'Total');
      const prodIssueData = filterData(data, 'IssueType', 'Prod Issue');
      const issueTypeData = filterArrayData(data, Object.keys(fixVersionData), 'FixVersion', issueCategories, 'IssueType');
      const issueTypeGridBar = transferData(issueTypeData, 'name', 'data');
      console.log(resolutionPieData);
      console.log(fixVersionTable);
      console.log(issueTypeGridBar);
      setResolutionnChart(resolutionData);
      setFixVersionTable(fixVersionTable);
      setProdIssue(prodIssueData);
      setIssueTypeChart(issueTypeGridBar);
      dispatch({
        type: 'INIT_RESOLUTION_CHART',
        resolutionChart: resolutionPieData,
        fixVersionTable: fixVersionTable,
        title: 'Resolution'
      });

    })
    .catch(err => console.log(err));
    
  },[]);


  return (
    <div className="container mt-3">

  <ul className="nav nav-tabs" role="tablist">
    <li className="nav-item">
      <a className="nav-link active" data-bs-toggle="tab" href="#home">Summary</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" data-bs-toggle="tab" href="#menu1">Developer</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" data-bs-toggle="tab" href="#menu2">QA</a>
    </li>
  </ul>


  <div className="tab-content">
    <div id="home" className="container tab-pane active">
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Charts dispatch={dispatch} state={state} chartType={'Pie'}></Charts>
          <Charts issueTypeChart={issueTypeChart} chartType={'GridBar'}></Charts>
          <Table rowData={fixVersionTable} columnDefs={columnDefsOfFixVersion}></Table>
          <Table rowData={prodIssue} columnDefs={columnDefsOfProdIssue}></Table>
      </div>
    </div>
    <div id="menu1" className="container tab-pane fade">
      <h3>Menu 1</h3>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
    <div id="menu2" className="container tab-pane fade">
      <h3>Menu 2</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
    </div>
  </div>
    </div>
  );
}

export default App;


