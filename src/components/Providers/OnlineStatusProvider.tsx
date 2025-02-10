import { createContext, useContext, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { showNotification } from '../../store/notification/notificationSlice';

const OnlineStatusContext = createContext<boolean>(navigator.onLine);

export const OnlineStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      dispatch(
        showNotification({
          message: 'Internet connection restored!',
          severity: 'success',
        }),
      );
    };
    const handleOffline = () => {
      setIsOnline(false);
      dispatch(
        showNotification({
          message: 'You are offline. Please check your connection.',
          severity: 'error',
        }),
      );
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);

  return <OnlineStatusContext.Provider value={isOnline}>{children}</OnlineStatusContext.Provider>;
};

export const useOnlineStatus = () => useContext(OnlineStatusContext);
