import React, {useMemo, useEffect, useState} from 'react'
import TablePagination from '@mui/material/TablePagination';
import './PaginationContainer.css';

/**
 * Display pagination below output table.
 * @param {Array} table - An array of table objects used to slice into pagination.
 * @return {JSX.Element} MUI JSX pagination container element.
*/

const PaginationContainer = ({table , setSlicedTable}) => {

    // Pagination initialization
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    // Handling page change.
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    // Handling row change.
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // On selecting different table reset page to 0.
    useEffect(()=>{
        setPage(0);
    },[table]);

    // Limit table data to fixed number of rows for pagination.
    const slicedTable = useMemo(() =>{
        return [...table.data].slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        )
    }, [page, rowsPerPage, table]);
    
    // Updating parent component sliced table 
    useEffect(()=>{                  
        setSlicedTable(slicedTable);  
    },[slicedTable, setSlicedTable]);

    return (
        <div className='custom-pagination'>
            <TablePagination
                classes={{
                    selectIcon: 'black-select-icon',
                }}
                sx={{color:'white'}}
                backIconButtonProps={{color: "primary"}}
                nextIconButtonProps={{ color: "primary" }}
                rowsPerPageOptions={[25, 50, 100, 500, 1000]}
                component="div"
                count={table.data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export { PaginationContainer };