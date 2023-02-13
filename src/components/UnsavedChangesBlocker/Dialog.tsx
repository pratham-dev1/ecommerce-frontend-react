import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function BlockingDialog({showDialog ,confirmNavigation,cancelNavigation}:any) {
  
//console.log(showDialog)
  return (
    <div>
      <Dialog
        open={showDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>cancelNavigation()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            There are some unsaved changes
            Are you sure you want to navigate?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" size="small" onClick={()=>cancelNavigation()}>No</Button>
          <Button variant="contained" color="primary" size="small" onClick={()=>confirmNavigation()}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
