import React, { useContext } from 'react'
import { CodeContext } from '../../context/CodeContext/CodeContext';
import './CodeController.css';

function CodeController() {
    const { query, setQuery } = useContext(CodeContext);

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
        // fetchCSVData();
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