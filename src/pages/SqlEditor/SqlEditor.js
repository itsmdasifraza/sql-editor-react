import './SqlEditor.css';
import React, { useState } from 'react'
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { CodeEditor } from '../../components/CodeEditor/CodeEditor';
import { CodeController } from '../../components/CodeController/CodeController';
import Grid2 from '@mui/material/Unstable_Grid2';
import { CodeContext } from '../../context/CodeContext/CodeContext';
import { tables } from '../../data/tables';
import { OutputTable } from '../../components/OutputTable/OutputTable';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function SqlEditor() {
  const [open, setOpen] = useState(false);
  const [ query, setQuery ] = useState(`SELECT * FROM '${tables[0]}';`);
  const [ tableData, setTableData ] = useState([]);
  return (
    <div className='sql-editor'>
      <CodeContext.Provider value = {{query, setQuery, setTableData}}>
        <Grid2 container spacing={0} >
            <Grid2 xs={12} sm={3} md={3} >
                <Sidebar/>
            </Grid2>
            <Grid2 xs={12} sm={9} md={9} >
              <CodeEditor/>
              <CodeController setOpen = { setOpen }/>
              <OutputTable table={tableData}/>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </Grid2>
        </Grid2>
      </CodeContext.Provider>
    </div>
  )
}

export { SqlEditor};