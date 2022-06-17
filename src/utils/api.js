import Papa from 'papaparse';
import csvPath from "../data/releasejira.csv"

export function getSrouceData(){

  const response = fetch(csvPath)
     .then(response => response.text())
     .then(res => Papa.parse(res, {header:true}))
     .catch(error => {
       console.error(error);
     })

  return response;

}

export function b(){

}

// export default getSrouceData;
