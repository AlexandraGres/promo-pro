import './Search.scss';

import { Box } from '@mui/material';

const Search = () => {
  return (
    <Box className="search">
      <input type="text" placeholder="Find articles..." />
    </Box>
  );
};

export default Search;
