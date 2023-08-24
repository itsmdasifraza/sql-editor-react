import React, { useState } from 'react'
import './OutputTable.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { PaginationContainer } from '../PaginationContainer/PaginationContainer';

/**
 * Populate table for CSV data coming from Github.
 * @param {Array<Object>} table - An array of table objects which will be shown on the UI.
 * @return {JSX.Element} MUI JSX table container element.
*/

const OutputTable = ({ table }) => {

    const [slicedTable, setSlicedTable] = useState([]);

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

    return (
        <div>
            <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)' }} component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        {generateTableHead(slicedTable)}
                    </TableHead>
                    <TableBody>
                        {generateTableBody(slicedTable)}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationContainer table={table} setSlicedTable = {setSlicedTable}/>
        </div>
    )
}

export { OutputTable };