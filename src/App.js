import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom"
import { SqlEditor } from './pages/SqlEditor/SqlEditor';
import { GlobalContext } from './context/GlobalContext/GlobalContext';
import { Backdrop } from './common/Backdrop/Backdrop';
import { Snackbar } from './common/Snackbar/Snackbar';

const App = () => {
  
  // Backdop global initialization.
  const [backdropOpen, setBackdropOpen] = useState(false);

  // Snackbar global initialization.
  const [snackbarOrigin, setSnackbarOrigin] = useState({ vertical: 'top', horizontal: 'right' });
  const [snackbarDuration, setSnackbarDuration] = useState(1000);
  const [snackbarMssg, setSnackbarMssg] = useState("Error message!");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Snackbar close button.
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Custom initialization of snackbar.
  const triggerSnackbar = (snackbarDuration, snackbarMssg, snackbarSeverity, snackbarOrigin) => {
    setSnackbarDuration(snackbarDuration);
    setSnackbarMssg(snackbarMssg);
    setSnackbarSeverity(snackbarSeverity);
    setSnackbarOrigin(snackbarOrigin);
    setSnackbarOpen(true);
  }

  return (
    <GlobalContext.Provider value={{ setBackdropOpen, triggerSnackbar }}>
      <Routes>
        <Route path="/" element={<SqlEditor />} />
      </Routes>
      <Backdrop backdropOpen={backdropOpen} />
      <Snackbar snackbarOrigin={snackbarOrigin} snackbarOpen={snackbarOpen} snackbarMssg={snackbarMssg} handleSnackbarClose={handleSnackbarClose} snackbarDuration={snackbarDuration} snackbarSeverity={snackbarSeverity} />
    </GlobalContext.Provider>
  );
}

export default App;
