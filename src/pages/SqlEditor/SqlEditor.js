import './SqlEditor.css';
import React, { useState } from 'react'
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { CodeEditor } from '../../components/Sidebar/CodeEditor/CodeEditor';
import Grid2 from '@mui/material/Unstable_Grid2';
import { CodeContext } from '../../context/CodeContext/CodeContext';
import { tables } from '../../data/tables';

function SqlEditor() {
  const [ query, setQuery ] = useState(`SELECT * FROM '${tables[0]}';`);
  return (
    <div className='sql-editor'>
      <CodeContext.Provider value = {{query, setQuery}}>
        <Grid2 container spacing={0} >
            <Grid2 xs={12} sm={3} md={3} >
                <Sidebar/>
            </Grid2>
            <Grid2 xs={12} sm={9} md={9} >
              <CodeEditor/>
            </Grid2>
        </Grid2>
      </CodeContext.Provider>
    </div>
  )
}

export { SqlEditor};