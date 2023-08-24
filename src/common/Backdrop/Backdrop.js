import React from 'react'
import BackdropMui from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Backdrop({backdropOpen}) {
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