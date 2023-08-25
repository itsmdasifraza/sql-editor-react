import React, { useContext } from 'react'
import './CodeController.css';
import { fetchCSVData } from '../../services/csv/csv';
import { GlobalContext } from '../../context/GlobalContext/GlobalContext';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Display submit and clear button on UI.
 * @return {JSX.Element} Controller part of code editor.
*/

const CodeController = ({ query, setQuery , setTableData, setRecentQuery }) => {
    const { setBackdropOpen, triggerSnackbar } = useContext(GlobalContext);

    const handleQuerySubmit = () => {
        if(query !== ""){
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
            setBackdropOpen(true);
            
            fetchCSVData(tableName)
            .then((res)=>{
                setTableData(res);
                setBackdropOpen(false);
            })
            .catch((err)=>{
                triggerSnackbar(3000, err, "error", { vertical: 'bottom', horizontal: 'right' });
                setTableData([]);
                setBackdropOpen(false);
            });
            setRecentQuery((prev)=>{
                if(prev.length > 0){
                    const lastElem = [...prev].pop();
                    if(lastElem === query) return [...prev];
                    else return [...prev, query];
                }else{
                    return [...prev, query];
                }
            });
        }
        else{
            triggerSnackbar(3000, "Please enter valid query!","error", { vertical: 'bottom', horizontal: 'right' });
        }
    }
    const handleQueryClear = () => {
        setQuery("");
    }

    return (
        <div className="editor-controller">
            <button onClick={handleQuerySubmit}><span>Execute Query</span><SendIcon sx={{fontSize:15}}/></button>
            <button onClick={handleQueryClear}><span>Clear Query</span><DeleteIcon sx={{fontSize:15}}/></button>
        </div>
    ) 
}

export { CodeController };