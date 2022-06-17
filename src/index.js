import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
// import piecharts from './component/Piecharts';
import reportWebVitals from './reportWebVitals';
import Papa from 'papaparse';
import csvPath from "./data/releasejira.csv"

// var data;
// async function getSrouceData(){

//   const response = await fetch(csvPath)
//      .then(response => response.text())
//      .then(res => Papa.parse(res, {header:true}))
//      .catch(error => {
//        console.error(error);
//      })

//   // const source = response.then(v => v.data);

//   return response;

// }

// async function getData(){
//   getSrouceData().then(v => {
//    data = v.data;
//    console.log(data);
//   });
//   console.log(data);
// }
// getData();
// console.log(data);



// async function getSrouceData(){
//   const response = await fetch("./data/releasejira.csv");
//   let reader = response.body.getReader();
//   let decoder = new TextDecoder('utf-8');
//   let result = await reader.read();
//   let data = await decoder.decode(result.value);
//   let results = Papa.parse(await data, {header: true});
//   let rows = results.data
//   console.log(rows);
// }

// getSrouceData();
// const fs = require('fs');
// const file = fs.createReadStream('./data/releasejira.csv');
// Papa.parse(file,{
//   complete: function(results){
//     console.log(results);
//   }
// });source={source}

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
