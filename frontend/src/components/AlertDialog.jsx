import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialog = () => {
    const { dialog, setDialog } = useGlobalContext();

    const handleClose = () => {
        setDialog({
            open: false,
            title: "",
            description: "",
            id: 0,
            delete: false
        })
    }

    return (
        <Dialog
            open={dialog.open}
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                { dialog.title }
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    { dialog.description }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" autoFocus>Close</Button>
                <Button onClick={() => setDialog({...dialog, delete: true})} variant="outlined" color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;