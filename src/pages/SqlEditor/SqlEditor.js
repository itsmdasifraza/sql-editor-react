import './SqlEditor.css';
import React, { useState } from 'react'
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { CodeEditor } from '../../components/CodeEditor/CodeEditor';
import { CodeController } from '../../components/CodeController/CodeController';
import Grid2 from '@mui/material/Unstable_Grid2';
import { tables } from '../../data/tables';
import { OutputTable } from '../../components/OutputTable/OutputTable';

function SqlEditor() {
  const [ query, setQuery ] = useState(`SELECT * FROM '${tables[0]}';`);
  const [ recentQuery, setRecentQuery ] = useState([]);
  const [ tableData, setTableData ] = useState([]);
  
  return (
    <div className='sql-editor'>
        <Grid2 container spacing={3} >
            <Grid2 xs={12} sm={3} md={3} >
              <Sidebar 
                recentQuery = { recentQuery } 
                setQuery = { setQuery } />
            </Grid2>
            <Grid2 xs={12} sm={9} md={9} >
              <CodeEditor 
                query = { query } 
                setQuery = { setQuery } />
              <CodeController 
                query = { query } 
                setQuery = { setQuery } 
                setTableData = { setTableData } 
                setRecentQuery = { setRecentQuery } />
              <OutputTable 
                table={tableData}/>
            </Grid2>
        </Grid2>
    </div>
  )
}

export { SqlEditor};