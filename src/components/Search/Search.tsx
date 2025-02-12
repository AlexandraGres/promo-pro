import './Search.scss';

import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';
import { ChangeEvent } from 'react';
import { RootState } from '../../store/store';
import { setSearchQuery } from '../../store/articles/articleSlice';

const Search = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.articles.searchQuery);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Box className="search">
      <input
        data-cy="search-input"
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Find articles..."
      />
    </Box>
  );
};

export default Search;
