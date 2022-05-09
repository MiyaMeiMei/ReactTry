import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
// import piecharts from './component/Piecharts';
import reportWebVitals from './reportWebVitals';
import Papa from 'papaparse';
import $ from 'jquery';
// import DATA from "./data/releasejira.csv"

// $.get("./data/releasejira.csv",function(data){
//   console.log(data);
// }, "json");
async function getSrouceData(){
  const response = await fetch("./data/releasejira.csv");
  let reader = response.body.getReader();
  let decoder = new TextDecoder('utf-8');
  let result = await reader.read();
  let data = await decoder.decode(result.value);
  let results = Papa.parse(await data, {header: true});
  let rows = results.data
  console.log(rows);
}

getSrouceData();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
