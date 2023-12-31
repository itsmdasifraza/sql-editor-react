import './SqlEditor.css';
import React, { useState } from 'react'
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { CodeEditor } from '../../components/CodeEditor/CodeEditor';
import { CodeController } from '../../components/CodeController/CodeController';
import Grid2 from '@mui/material/Unstable_Grid2';
import { OutputTable } from '../../components/OutputTable/OutputTable';
import { Loader } from '../../components/Loader/Loader';

/** 
 * Display SQL editor component where we can perform all our SQL operations.
 * @return {JSX.Element} SQL editor component
 */
function SqlEditor() {

  //  SQL Editor initializations.
  const [ query, setQuery ] = useState(`/* Start writing your query here or use pre query sets from sidebar */`);
  const [ recentQuery, setRecentQuery ] = useState([]);
  const [ tableData, setTableData ] = useState({name:"", data:[]});
  
  return (
    <div className='sql-editor'>
        <Grid2 container spacing={3} >
            <Grid2 xs={12} sm={12} md={3} >
              
              <Sidebar 
                recentQuery = {recentQuery} 
                setQuery = {setQuery} />

            </Grid2>
            <Grid2 xs={12} sm={12} md={9} >
              
              <CodeEditor 
                query = {query} 
                setQuery = {setQuery} />
              
              <CodeController 
                query = {query} 
                setQuery = {setQuery} 
                setTableData = {setTableData} 
                setRecentQuery = {setRecentQuery} />
              
              <OutputTable 
                table = {tableData} />
              
              <Loader 
                table = {tableData} />
                
            </Grid2>
        </Grid2>
    </div>
  )
}

export { SqlEditor};