import React, { useContext } from 'react'
import { CodeContext } from '../../context/CodeContext/CodeContext';
import './CodeController.css';
import { fetchCSVData } from '../../services/csv/csv';

/**
 * Display submit and clear button on UI.
 * @return {JSX.Element} Controller part of code editor.
*/

const CodeController = ({ setOpen }) => {
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
        setOpen(true);
        fetchCSVData(tableName)
        .then((res)=>{
            setTableData(res);
            setOpen(false);
        })
        .catch((err)=>{
            console.error(err);
            setOpen(false);
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