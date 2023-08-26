import React, { useContext } from 'react'
import './CodeController.css';
import { fetchCSVData } from '../../services/tableHttpRequest';
import { GlobalContext } from '../../context/GlobalContext';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../../common/Button/Button';
import { splitQueryToList, extractClause, whereClauseFilter } from '../../utils/queryExtension';

/**
 * Display submit and clear button on UI used to make API calls.
 * @param {string} query - Stores text from code editor.
 * @param {function} setQuery - Sets query data.
 * @param {function} setTableData - Sets output table data.
 * @param {function} setRecentQuery - Sets recent query data.
 * @return {JSX.Element} JSX code controller.
*/
const CodeController = ({ query, setQuery , setTableData, setRecentQuery }) => {
    const { setBackdropOpen, triggerSnackbar } = useContext(GlobalContext);

    const handleQuerySubmit = () => {
        if(query !== ""){
            let splittedQuery = splitQueryToList(query);
            let [tableName, whereClause] = extractClause(splittedQuery);
            setBackdropOpen(true);

            /**
             * Handle promise API calls from Github.
             */
            fetchCSVData(tableName)
            .then((res)=>{
                res = whereClauseFilter(res, whereClause);
                if(res.length){
                    setTableData({name:tableName, data: res});
                    triggerSnackbar(3000, `${res.length} records fetched.`, "success", { vertical: 'bottom', horizontal: 'right' });
                    
                    setRecentQuery((prev)=>{
                        /**
                         * Check duplicates in recent query then inserting new one.
                         */
                        if(prev.length > 0){
                            const lastElem = [...prev].pop();
                            if(lastElem === query) return [...prev];
                            else return [...prev, query];
                        }else{
                            return [...prev, query];
                        }
                    });
                }else{
                    triggerSnackbar(3000, "No records found, try different query?","error" ,{ vertical: 'bottom', horizontal: 'right' });
                }
                setBackdropOpen(false);
            })
            .catch((err)=>{
                triggerSnackbar(3000, err, "error", { vertical: 'bottom', horizontal: 'right' });
                setBackdropOpen(false);
            });
        }
        else{
            triggerSnackbar(3000, "Please type any query, then execute.","error", { vertical: 'bottom', horizontal: 'right' });
        }
    }

    const handleQueryClear = () => {
        setQuery("");
    }

    return (
        <div className="editor-controller">
            <Button onClick={handleQuerySubmit} title="Execute Query" icon={<SendIcon sx={{fontSize:15}}/>}/><div className='button-space'></div>
            <Button onClick={handleQueryClear} title="Clear Query" icon={<DeleteIcon sx={{fontSize:15}}/>}/>
        </div>
    ) 
}

export { CodeController };