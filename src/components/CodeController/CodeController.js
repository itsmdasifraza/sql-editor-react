import React, { useContext } from 'react'
import './CodeController.css';
import { fetchCSVData } from '../../services/csv/csv';
import { GlobalContext } from '../../context/GlobalContext/GlobalContext';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../../common/Button/Button';
import { splitQueryToList, extractClause, whereClauseFilter } from '../../utils/queryExtension';
/**
 * Display submit and clear button on UI.
 * @return {JSX.Element} Controller part of code editor.
*/
// const f
const CodeController = ({ query, setQuery , setTableData, setRecentQuery }) => {
    const { setBackdropOpen, triggerSnackbar } = useContext(GlobalContext);

    const handleQuerySubmit = () => {
        if(query !== ""){
            let splittedQuery = splitQueryToList(query);
            let [tableName, whereClause] = extractClause(splittedQuery);
            
            setBackdropOpen(true);
            fetchCSVData(tableName)
            .then((res)=>{
                whereClauseFilter(res, whereClause);
                if(whereClause){
                    let arr = res.filter((elem)=>{
                        const [field, operator, value] = whereClause;
                        console.log(elem[field]);
                        if (operator === '=' && elem[field] === value) return true;
                        if (operator === '>' && elem[field] > value) return true;
                        if (operator === '<' && elem[field] < value) return true;
                        if (operator === '>=' && elem[field] >= value) return true;
                        if (operator === '<=' && elem[field] <= value) return true;
                        if (operator === '<>' && elem[field] !== value) return true;
                        if (operator === '!=' && elem[field] !== value) return true;
                        return false;
                    });
                    res = arr;
                }
                setTableData({name:tableName, data: res});
                triggerSnackbar(3000, "Table fetched successfully!", "success", { vertical: 'bottom', horizontal: 'right' });
                setBackdropOpen(false);
                setRecentQuery((prev)=>{
                    if(prev.length > 0){
                        const lastElem = [...prev].pop();
                        if(lastElem === query) return [...prev];
                        else return [...prev, query];
                    }else{
                        return [...prev, query];
                    }
                });
                
            })
            .catch((err)=>{
                triggerSnackbar(3000, err, "error", { vertical: 'bottom', horizontal: 'right' });
                setBackdropOpen(false);
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
            <Button onClick={handleQuerySubmit} title="Execute Query" icon={<SendIcon sx={{fontSize:15}}/>}/><div className='button-space'></div>
            <Button onClick={handleQueryClear} title="Clear Query" icon={<DeleteIcon sx={{fontSize:15}}/>}/>
        </div>
    ) 
}

export { CodeController };