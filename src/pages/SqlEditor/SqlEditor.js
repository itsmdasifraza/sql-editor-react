import './SqlEditor.css';
import React from 'react'
import { Sidebar } from '../../components/Sidebar/Sidebar';
import Grid2 from '@mui/material/Unstable_Grid2';

function SqlEditor() {
  return (
    <div className='sql-editor'>
        <Grid2 container spacing={0} >
            <Grid2 xs={12} sm={3} md={3} >
                <Sidebar/>
            </Grid2>
            <Grid2 xs={12} sm={1} md={3} >
                
            </Grid2>
        </Grid2>
    </div>
  )
}

export { SqlEditor};