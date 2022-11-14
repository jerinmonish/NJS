import React, { useState, useEffect } from 'react'
import { Snackbar, Alert } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch } from "react-redux";
import * as constants from "../../actions/types";
const CToaster = (props) => {
  const dispatch = useDispatch();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = useState({
    open: props?.open,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({ ...state, open: false });
    dispatch({
      type: constants.MESSAGE_CLEAR
    });
  };


  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      autoHideDuration={4000}
      key={vertical + horizontal}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {props?.message}
      </Alert>
    </Snackbar>
  )
}

export default CToaster