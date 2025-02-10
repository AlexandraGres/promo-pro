import './Search.scss';

import { Box } from '@mui/material';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../store/articles/articleSlice';
import { RootState } from '../../store/store';

const Search = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.articles.searchQuery);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Box className="search">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Find articles..."
      />
    </Box>
  );
};

export default Search;
