import React, { useContext, useState, useMemo } from 'react'
import { CodeContext } from '../../context/CodeContext/CodeContext';
import './CodeController.css';
import { fetchCSVData } from '../../services/csv/csv';
function CodeController() {
    const { query, setQuery , setTableData } = useContext(CodeContext);

    const handleSubmit = () => {
        let str = "";
        for(let i = 0; i < query.length; i++){
            if(query[i] !== "'" && query[i] !== "`" && query[i] !== ";" && query[i] !== '"'){
                str += query[i];
            }
        }
        let splittedQuery = str.split(" ");
        let tableName = ""; 
        for(let i = 0; i < splittedQuery.length; i++){
            if(splittedQuery[i] === 'FROM'){
                tableName = splittedQuery[i + 1];
            }
        }
        console.log(tableName);

        fetchCSVData(tableName)
        .then((res)=>{
            setTableData(res);
        })
        .catch((err)=>{
            console.log("--------------------");
            console.log(err);
            console.log("--------------------");
        });
    }
    const handleClear = () => {
        setQuery("");
    }

    return (
        <div>
            <button onClick={handleSubmit}>Execute</button>
            <button onClick={handleClear}>Clear</button>
        </div>
    ) 
}

export { CodeController };