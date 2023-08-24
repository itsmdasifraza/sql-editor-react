import React, { useContext } from 'react'
import './Sidebar.css';
import { tables } from '../../data/tables';
import { query } from '../../data/query';
import TableChartIcon from '@mui/icons-material/TableChart';
import TerminalIcon from '@mui/icons-material/Terminal';
import { CodeContext } from '../../context/CodeContext/CodeContext';

/**
 * The sidebar layout displays a row in the section.
 * @param {String} rowTitle - title to be given on each row.
 * @param {String} rowIcon - icon to be placed on each row of a section.
 * @param {String} parent - parent section of a row.
 * @returns {JSX.Element} JSX row that should be shown on each section
 */

const Row = ({rowTitle, rowIcon, parent}) => {
  const { setQuery } = useContext(CodeContext);
  
  const handleRow = (rowTitle) => {
    if(parent === 'table'){
      setQuery(`SELECT * FROM '${rowTitle}';`);
    }
    else{
      setQuery(rowTitle);
    }
  }
   
  return (
    <div className="sidebar__section--element" 
        onClick={()=>{handleRow(rowTitle);}}>
        <p className="sidebar__section--para">
            {rowIcon}
            <span>{rowTitle}</span>
        </p>
    </div>
  ); 
}  

/**
 * The sidebar layout displays the list of sections.
 * @returns {JSX.Element} LHS Sidebar JSX element to display table and recent query.
 */
const Sidebar = () => {
  const { recentQuery } = useContext(CodeContext);
  return (
    <section className="sidebar">
        {/*
         * Database table section.
         */}
        <div className="sidebar__section">
            <h4 className="sidebar__section--head">Database Tables</h4>
            <div className="sidebar__section--body">
              {tables.map((element, index)=>{
                return (<Row key={index} rowTitle = {element} rowIcon={<TableChartIcon className="section-icon"/>} parent={"table"} />)
              })}
            </div>
        </div>
        {/*
         * Reference query section.
         */}
        <div className="sidebar__section">
            <h4 className="sidebar__section--head">Reference Query</h4>
            <div className="sidebar__section--body">
              {query.map((element, index)=>{
                  return (<Row key={index} rowTitle = {element} rowIcon={<TerminalIcon className="section-icon"/>} parent={"query"} />)
              })}
            </div>
        </div>
        {/*
         * Recent query section. 
         */}
        <div className="sidebar__section">
            <h4 className="sidebar__section--head">Recent Query</h4>
            <div className="sidebar__section--body">
              {recentQuery.map((element, index)=>{
                  return (<Row key={index} rowTitle = {element} rowIcon={<TerminalIcon className="section-icon"/>} parent={"recent_query"} />)
              })}
            </div>
        </div>
    </section>
  )
}

export {Sidebar};