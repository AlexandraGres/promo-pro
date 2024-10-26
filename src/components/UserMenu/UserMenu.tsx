import './UserMenu.scss';

import { Avatar, Box, Button, Menu, MenuItem } from '@mui/material';

import DownIcon from '../DownIcon/DownIcon';
import React from 'react';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="user-menu">
      <Avatar className={open ? 'open' : ''} src="avatar.png" sx={{ mx: 1, height: 48, width: 48 }} />

      <Button
        id="profile-button"
        className={open ? 'open' : ''}
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={<DownIcon />}
        variant="text"
      >
        Annette Black
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
        <MenuItem onClick={handleClose} disableRipple>
          Edit Profile
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
