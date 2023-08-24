import React from 'react'
import SnackbarMui from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Snackbar({snackbarOrigin, snackbarOpen, snackbarMssg, handleSnackbarClose, snackbarDuration, snackbarSeverity}) {

    return (
        <SnackbarMui anchorOrigin={snackbarOrigin} open={snackbarOpen} autoHideDuration={snackbarDuration} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarMssg}
            </Alert>
        </SnackbarMui>
    )
}

export { Snackbar };