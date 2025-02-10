import './UserMenu.scss';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar, Box, Button, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';

const UserMenu = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = () => {
    navigate('/edit-profile');
    handleClose();
  };

  return (
    <Box className="user-menu">
      <Avatar
        className={open ? 'open' : ''}
        src={user?.photoURL}
        sx={{ mx: 1, height: 48, width: 48 }}
      />

      <Button
        id="profile-button"
        className={open ? 'open' : ''}
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant="text"
      >
        {user?.displayName}
      </Button>

      <Menu
        id="user-menu"
        MenuListProps={{
          'aria-labelledby': 'profile-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleNavigation} disableRipple>
          Edit Profile
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
