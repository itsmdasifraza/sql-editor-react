import React from 'react'
import BackdropMui from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

/** 
 * Display circular loader with a hazed shadow background.
 * @param {boolean} backdropOpen - Stores flag to display / hide backdrop.
 * @return {JSX.Element} Mui backdrop component
 */
const Backdrop = ({backdropOpen}) => {
  return (
    <BackdropMui
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
        >
        <CircularProgress color="inherit" />
    </BackdropMui>
  )
}

export { Backdrop };