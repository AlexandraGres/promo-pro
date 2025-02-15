import './UserMenu.scss';

import { Avatar, Box, Button, Menu, MenuItem } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserMenu: FC = () => {
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
        alt="User Avatar"
        sx={{ mx: 1, height: 48, width: 48 }}
      />

      <Button
        id="profile-button"
        className={open ? 'open' : ''}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant="text"
      >
        {user?.displayName || 'User'}
      </Button>

      <Menu id="user-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleNavigation} disableRipple>
          Edit Profile
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
