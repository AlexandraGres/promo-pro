import './Navbar.scss';

import { Box } from '@mui/material';
import Search from '../Search/Search';
import UserMenu from '../UserMenu/UserMenu';

const Navbar = () => {
  return (
    <Box
      display='flex'
      className='navbar'
      sx={{
        flexDirection: { xs: 'column-reverse', sm: 'row' },
      }}
    >
      <Search />
      <UserMenu />
    </Box>
  );
};

export default Navbar;
