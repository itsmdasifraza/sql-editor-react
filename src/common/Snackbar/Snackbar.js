import React from 'react'
import SnackbarMui from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/** 
 * Display Mui Snackbar component.
 * @param {object} snackbarOrigin - Stores position of the snackbar like {top, left}.
 * @param {boolean} snackbarOpen - Stores flag to display / hide snackbar.
 * @param {string} snackbarMssg - Stores the message displayed on snackbar.
 * @param {function} handleSnackbarClose - Function to close the snackbar forcely.
 * @param {number} snackbarDuration - Stores the duration for whuch snackbar will be shown once triggered.
 * @param {string} snackbarSeverity - Stores ui designs like primary, error, warning.
 * @return {JSX.Element} Mui snackbar component
 */
function Snackbar({snackbarOrigin, snackbarOpen, snackbarMssg, handleSnackbarClose, snackbarDuration, snackbarSeverity}) {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <SnackbarMui anchorOrigin={snackbarOrigin} open={snackbarOpen} autoHideDuration={snackbarDuration} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarMssg}
            </Alert>
        </SnackbarMui>
    )
}

export { Snackbar };