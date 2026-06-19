import React, { Component } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function CustomAlert(props) {

//*** Popup message  */ 
const [open, setOpen] = React.useState(false);
const [Action, setAction] = React.useState('success');
const [ActionMessage, setActionMessage] = React.useState('');
const vertical = 'top', horizontal = 'center';

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//Popup message end************************************* */


    return (
        <>
          <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleClose} severity={Action} sx={{ width: '100%' }}>
                  {ActionMessage}
                </Alert>
              </Snackbar>
            </Stack>
          </div>
        </>
      )

} export default CustomAlert