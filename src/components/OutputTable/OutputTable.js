import React, { useMemo, useState } from 'react'
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
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from '../../common/Button/Button';

/**
 * Populate table on the screen.
 * @param {object} table - Stores table meta data and rows.
 * @return {JSX.Element} Mui table container element.
*/

const OutputTable = ({ table }) => {
    const [slicedTable, setSlicedTable] = useState([]);

    /*
     * MUI custom styling of table cell container.
     */
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    /*
     * MUI custom styling of table row container.
     */
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    /*
     * Store memoize value of 'table head' to prevent re-renders.
     */ 
    const generateTableHead = useMemo(() => {
        const keys = Object.keys(slicedTable.length ? slicedTable[0] : {});
        return (
            <TableRow>
                {keys.map((item, index) => {
                    return <TableCell key={index} >{item}</TableCell>;
                })}
            </TableRow>
        );
    }, [slicedTable]);

    /*
     * Store memoize value of 'table body' to prevent re-renders.
     */
    const generateTableBody = useMemo(() => {
        const keys = Object.keys(slicedTable.length ? slicedTable[0] : {});
        return slicedTable.map((row, parentIndex) => {
            return (
                <StyledTableRow
                    key={parentIndex}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {keys.map((item, childIndex) => {
                        return (<StyledTableCell key={`${parentIndex}-${childIndex}`} component="th" scope="row">{row[item] ? row[item] : String(row[item])}</StyledTableCell>);
                    })}
                </StyledTableRow>
            );
        });
    }, [slicedTable]);

    /*
     * Handle download table.
     */
    const handleTableDownload = () => {
        const data = JSON.stringify(table);
        const blob = new Blob([data], { type: 'application/json' });  // Binary Large Object is a data type used to represent raw binary data.
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${table.name}.json`;
        a.click();   // Trigger download.
        URL.revokeObjectURL(url);  // revoke resources associated with the object URL.
    }

    return (
        <>{table.data && table.data.length !== 0 ?
            <div>
                <br />
                <div className='download-controller'>
                    <h3 className="table-heading">{table.name}</h3>
                    <Button onClick={handleTableDownload} title="Download Table" icon = {<FileDownloadIcon sx={{fontSize:18}}/>} />
                </div>
                <div>
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)' }} component={Paper}>
                        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                {generateTableHead}
                            </TableHead>
                            <TableBody>
                                {generateTableBody}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <PaginationContainer table={table} setSlicedTable={setSlicedTable} />
                </div>
            </div> : null}
        </>
    )
}

export { OutputTable };