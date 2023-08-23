import React, { useEffect, useState, useMemo } from 'react'
import './OutputTable.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';

/**
 * Populating table for CSV data coming from Github.
 * @param {Array<Object>} table - An array of table objects which will be shown on the UI.
 * @return {JSXElement} MUI JSX table container element.
 */

const OutputTable = ({ table }) => {

    // MUI custom styling of table cell container.
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    // MUI custom styling of table row container.
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    // Generate content for table head. 
    const generateTableHead = (slicedTable) => {
        const keys = Object.keys(table[0]);
        return (
            <TableRow>
                {keys.map((item, index) => {
                    return <TableCell key={index} >{item}</TableCell>;
                })}
            </TableRow>
        );
    };

    // Generate content for table body.
    const generateTableBody = (slicedTable) => {
        const keys = Object.keys(table[0]);
        return slicedTable.map((row, parentIndex) => {
            return (
                <StyledTableRow
                    key={parentIndex}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {keys.map((item, childIndex) => {
                        return (<StyledTableCell key={`${parentIndex}-${childIndex}`} component="th" scope="row">{row[item]}</StyledTableCell>);
                    })}
                </StyledTableRow>
            );
        });
    };

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
        () =>{
            [...table].slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
              ),
            [page, rowsPerPage, table]
        }
    );

    return (
        <div>{table.length > 0 ? (
            <div>
                <TableContainer sx={{ maxHeight: '500px' }} component={Paper}>
                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            {generateTableHead(slicedTable)}
                        </TableHead>
                        <TableBody>
                            {generateTableBody(slicedTable)}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 30, 40, 50]}
                    component="div"
                    count={table.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        ) : null}</div>
    )
}

export { OutputTable };