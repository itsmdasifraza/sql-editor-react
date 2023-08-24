import './SqlEditor.css';
import React, { useState } from 'react'
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { CodeEditor } from '../../components/CodeEditor/CodeEditor';
import { CodeController } from '../../components/CodeController/CodeController';
import Grid2 from '@mui/material/Unstable_Grid2';
import { CodeContext } from '../../context/CodeContext/CodeContext';
import { tables } from '../../data/tables';
import { OutputTable } from '../../components/OutputTable/OutputTable';

function SqlEditor() {
  const [ query, setQuery ] = useState(`SELECT * FROM '${tables[0]}';`);
  const [ recentQuery, setRecentQuery ] = useState([]);
  const [ tableData, setTableData ] = useState([]);
  return (
    <div className='sql-editor'>
      <CodeContext.Provider value = {{query, setQuery, setTableData, recentQuery, setRecentQuery}}>
        <Grid2 container spacing={3} >
            <Grid2 xs={12} sm={3} md={3} >
                <Sidebar/>
            </Grid2>
            <Grid2 xs={12} sm={9} md={9} >
              <CodeEditor/>
              <CodeController/>
              {tableData && tableData.length > 0 ? <><br/><h3 className="table-heading">Table Data</h3><OutputTable table={tableData}/></>  : <></>}
              
            </Grid2>
        </Grid2>
      </CodeContext.Provider>
    </div>
  )
}

export { SqlEditor};