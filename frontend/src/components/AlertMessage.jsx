import React from 'react'
import { Slide, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useGlobalContext } from '../contexts/GlobalContext';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const AlertMessage = () => {
    const { alert, setAlert } = useGlobalContext();

    return (
        <Snackbar open={alert.msg.length > 0} TransitionComponent={SlideTransition} autoHideDuration={3000} onClose={() => setAlert({...alert, msg: ""})}>
            <Alert onClose={() => setAlert({...alert, msg: ""})} severity={alert.type} sx={{ width: '100%' }}>
                { alert.msg }
            </Alert>
        </Snackbar>
    )
}

export default AlertMessage;