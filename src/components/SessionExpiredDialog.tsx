import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { removeToken } from '../redux/slices/authSlice';

export default function SessionExpiredDialog() {

    const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
    dispatch(removeToken(null));           // for navigate to login page
  };

  return (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Session Expired
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please login Again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}