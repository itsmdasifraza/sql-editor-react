import React, { useContext } from 'react'
import './Sidebar.css';
import { tables } from '../../data/tables';
import { query } from '../../data/query';
import TableChartIcon from '@mui/icons-material/TableChart';
import TerminalIcon from '@mui/icons-material/Terminal';
import { CodeContext } from '../../context/CodeContext/CodeContext';

/**
 * The sidebar layout displays the list of tables on which query will be performed.
 * @param {String} tableName - Name of the table shown on the UI
 * @returns {JSX.Element} 
 */

const Row = ({rowTitle, rowIcon, parent}) => {
  const { setQuery } = useContext(CodeContext);
  
  const handleTable = (rowTitle) => {
    if(parent === 'table'){
      setQuery(`SELECT * FROM '${rowTitle}';`);
    }
    else{
      setQuery(rowTitle);
    }
  }
   
  return (
    <div className="sidebar__table--element" 
        onClick={()=>{handleTable(rowTitle);}}>
        <p className="sidebar__table--para">
            {rowIcon}
            <span>{rowTitle}</span>
        </p>
    </div>
  ); 
}  

/**
 * The sidebar layout displays the list of tables on which query will be performed.
 * @returns {JSX.Element} LHS Sidebar JSX element to display table and recent query.
 */
const Sidebar = () => {
  const { recentQuery } = useContext(CodeContext);
  return (
    <section className="sidebar">
        <div className="sidebar__table">
            <h4 className="sidebar__table--head">Database Tables</h4>
            <div className="sidebar__table--body">
              {tables.map((element, index)=>{
                return (<Row key={index} rowTitle = {element} rowIcon={<TableChartIcon className="table-icon"/>} parent={"table"} />)
              })}
            </div>
        </div>
        <div className="sidebar__table">
            <h4 className="sidebar__table--head">Reference Query</h4>
            <div className="sidebar__table--body">
              {query.map((element, index)=>{
                  return (<Row key={index} rowTitle = {element} rowIcon={<TerminalIcon className="table-icon"/>} parent={"query"} />)
              })}
            </div>
        </div>
        <div className="sidebar__table">
            <h4 className="sidebar__table--head">Recent Query</h4>
            <div className="sidebar__table--body">
              {recentQuery.map((element, index)=>{
                  return (<Row key={index} rowTitle = {element} rowIcon={<TerminalIcon className="table-icon"/>} parent={"recent_query"} />)
              })}
            </div>
        </div>
    </section>
  )
}

export {Sidebar};