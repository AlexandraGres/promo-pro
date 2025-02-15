import './Sidebar.scss';

import { Box, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FC } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';

const Sidebar: FC = () => {
  const { logout } = useFirebaseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className="sidebar">
      <Box className="logo-container">
        <Link to="/">
          <img className="logo" src="/logo.svg" alt="logo" />
        </Link>
      </Box>
      <Box className="menu-container">
        <h3 className="menu-title">Main Menu</h3>
        <Box
          className={location.pathname === '/' ? 'active' : 'disabled'}
          onClick={() => navigate('/')}
        >
          <img
            src={location.pathname === '/' ? '/dashboard.svg' : '/dashboard-disabled.svg'}
            alt="dashboard icon"
          />
          <span>Dashboard</span>
        </Box>
      </Box>
      <Box className="buttons">
        <Button
          onClick={logout}
          sx={{ width: '100%' }}
          variant="contained"
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
