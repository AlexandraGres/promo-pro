import notificationReducer, {
  NotificationState,
  hideNotification,
  showNotification,
} from './notificationSlice';

describe('notificationSlice', () => {
  const initialState: NotificationState = {
    message: '',
    severity: 'info',
    show: false,
  };

  it('should return the initial state', () => {
    expect(notificationReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle showNotification', () => {
    const notificationPayload: NotificationState = {
      message: 'Operation successful',
      severity: 'success',
      show: true,
    };

    const nextState = notificationReducer(
      initialState,
      showNotification(notificationPayload)
    );

    expect(nextState).toEqual({
      message: 'Operation successful',
      severity: 'success',
      show: true,
    });
  });

  it('should handle hideNotification', () => {
    const currentState: NotificationState = {
      message: 'Operation successful',
      severity: 'success',
      show: true,
    };

    const nextState = notificationReducer(currentState, hideNotification());

    expect(nextState).toEqual({
      message: 'Operation successful',
      severity: 'success',
      show: false,
    });
  });
});
