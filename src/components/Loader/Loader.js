import React from 'react'
import './Loader.css';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const Loader = ({table}) => {
  return (
    <>{table.length === 0 ? 
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