import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import Dashboard from './containers/Dashboard/Dashboard';
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';
import Login from './containers/Login/Login';
import NotFound from './containers/NotFound/NotFound';
import Notification from './components/Notification/Notification';
import { OnlineStatusProvider } from './components/Providers/OnlineStatusProvider';
import { RootState } from './store/store';
import SignUp from './containers/SignUp/SignUp';
import Terms from './containers/Terms/Terms';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { message, severity, show } = useSelector(
    (state: RootState) => state.notification
  );

  let routes = (
    <Routes>
      <Route path='/*' element={<Login />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/sign-up'} element={<SignUp />} />
      <Route path={'/forgot-pass'} element={<ForgotPassword />} />
      <Route path={'/edit-profile'} element={<Navigate to='/login' />} />
      <Route path={'/edit-article/:id'} element={<Navigate to='/login' />} />
      <Route path={'/terms'} element={<Terms />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );

  if (user) {
    routes = (
      <Routes>
        <Route path='/*' element={<Dashboard />} />
        <Route path={'/login'} element={<Navigate to='/' />} />
        <Route path={'/sign-up'} element={<Navigate to='/' />} />
        <Route path={'/forgot-pass'} element={<Navigate to='/' />} />
        <Route path={'/terms'} element={<Terms />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <OnlineStatusProvider>
      <Router>
        {show && (
          <Notification message={message} severity={severity} show={show} />
        )}
        {routes}
      </Router>
    </OnlineStatusProvider>
  );
}

export default App;
