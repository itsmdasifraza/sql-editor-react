import React from 'react'
import './Sidebar.css';
import { tables } from '../../data/tables';
import TableChartIcon from '@mui/icons-material/TableChart';

/**
 * The sidebar layout displays the list of tables on which query will be performed.
 * @param void
 * @returns {JSX.Element}
 * @constructor
 */
let Sidebar = () => {

  const handleTable = (tableName) => {
    // console.log(tableName);
  } 

  return (
    <section className="sidebar">
        <div className="sidebar__table">
            <h4 className="sidebar__table--head">Tables</h4>
            {tables.map((elem, index)=>{
                return (
                    <div key={index} className="sidebar__table--element" 
                        onClick={()=>{handleTable(elem);}}>
                        <p className="sidebar__table--para">
                            <TableChartIcon className="table-icon"/>
                            <span>{elem}</span>
                        </p>
                    </div>
                );
            })}
        </div>
    </section>
  )

}

export {Sidebar};