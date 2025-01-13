import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { FunctionComponent, SyntheticEvent } from 'react';
import {
  NotificationState,
  hideNotification,
} from '../../store/notification/notificationSlice';

import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Notification: FunctionComponent<NotificationState> = () => {
  const { message, severity, show } = useSelector(
    (state: RootState) => state.notification
  );
  const dispatch = useDispatch();

  const handleClose = (
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={4000}
      onClose={handleClose}
      className='notification'
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
