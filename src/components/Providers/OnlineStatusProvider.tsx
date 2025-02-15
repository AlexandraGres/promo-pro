import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { showNotification } from '../../store/notification/notificationSlice';
import { useDispatch } from 'react-redux';

const OnlineStatusContext = createContext<boolean>(navigator.onLine);

export const OnlineStatusProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
