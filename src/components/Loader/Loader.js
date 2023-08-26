import React from 'react'
import './Loader.css';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

/**
 * Display temporary screen when SQL query not executed.
 * @param {object} table - Stores table meta data and rows.
 * @return {JSX.Element} JSX Component for initial screen load.
*/
const Loader = ({table}) => {
  return (
    <>{table.data && table.data.length === 0 ? 
        <div className="sql-loader">
            <div>
                <pre className="sql-loader__head">
                    QUERY();<br/>    EXECUTE();<br/>EXPLORE();
                </pre>
            </div>
            <QueryStatsIcon sx={{fontSize: '300px', color:'white'}}/>
        </div> : null}
    </>
  )
}

export { Loader };