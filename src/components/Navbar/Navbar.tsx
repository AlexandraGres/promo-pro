import './Navbar.scss';

import { Box } from '@mui/material';
import Search from '../Search/Search';
import UserMenu from '../UserMenu/UserMenu';

const Navbar = () => {
  return (
    <Box className="navbar">
      <Search />
      <UserMenu />
    </Box>
  );
};

export default Navbar;
