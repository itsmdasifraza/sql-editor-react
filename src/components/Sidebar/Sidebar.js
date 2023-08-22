import React, { useContext } from 'react'
import './Sidebar.css';
import { tables } from '../../data/tables';
import TableChartIcon from '@mui/icons-material/TableChart';
import { CodeContext } from '../../context/CodeContext/CodeContext';

/**
 * The sidebar layout displays the list of tables on which query will be performed.
 * @param {list of parameters are defined below}
 *  -  element (renamed as tableName) : name of the table
 * @returns {JSX.Element}
 * @constructor
 */

const TableName = ({element : tableName}) => {
  const { setQuery } = useContext(CodeContext);
  
  const handleTable = (tableName) => {
    setQuery(`SELECT * FROM '${tableName}';`);
  }
   
  return (
    <div className="sidebar__table--element" 
        onClick={()=>{handleTable(tableName);}}>
        <p className="sidebar__table--para">
            <TableChartIcon className="table-icon"/>
            <span>{tableName}</span>
        </p>
    </div>
  ); 
}  

/**
 * The sidebar layout displays the list of tables on which query will be performed.
 * @param void
 * @returns {JSX.Element}
 * @constructor
 */
let Sidebar = () => {
  return (
    <section className="sidebar">
        <div className="sidebar__table">
            <h4 className="sidebar__table--head">Tables</h4>
            {tables.map((element, index)=>{
                return (<TableName key={index} element = {element} index = {index} />)
            })}
        </div>
    </section>
  )
}

export {Sidebar};