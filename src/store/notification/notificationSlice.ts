import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface NotificationState {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  show?: boolean;
}

const initialState: NotificationState = {
  message: '',
  severity: 'info',
  show: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<NotificationState>) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.show = true;
    },
    hideNotification: (state) => {
      state.show = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
