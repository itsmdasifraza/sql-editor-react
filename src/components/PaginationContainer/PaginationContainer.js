import React, {useMemo, useEffect, useState} from 'react'
import TablePagination from '@mui/material/TablePagination';

/**
 * Display pagination below output table.
 * @param {Array<Object>} table - An array of table objects used to slice into pagination.
 * @return {JSX.Element} MUI JSX pagination container element.
*/

const PaginationContainer = ({table , setSlicedTable}) => {

    // Pagination initialization
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
    const slicedTable = useMemo(
        () =>
            [...table].slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
              ),
            [page, rowsPerPage, table]  
    );
    
    // Updating parent component sliced table 
    useEffect(()=>{
        setSlicedTable(slicedTable);
    },[slicedTable, setSlicedTable]);

    return (
        <TablePagination
            rowsPerPageOptions={[10, 20, 30, 40, 50]}
            component="div"
            count={table.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}

export { PaginationContainer };