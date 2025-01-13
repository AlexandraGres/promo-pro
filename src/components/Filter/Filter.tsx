import './Filter.scss';

import { Box, Button, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { categories } from '../ArticleForm/ArticleForm';

interface FilterProps {
  setFilter: (filter: string) => void;
}

const Filter = ({ setFilter }: FilterProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [category, setCategory] = useState('All Categories');
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (category: string) => {
    setFilter(category);
    setCategory(category);
    setAnchorEl(null);
  };

  return (
    <Box className='filter'>
      <span className='label'>Show: </span>
      <Button
        id='show-button'
        className={open ? 'open' : ''}
        aria-controls={open ? 'filter' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant='text'
      >
        {category}
      </Button>
      <Menu
        id='filter'
        MenuListProps={{
          'aria-labelledby': 'show-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {categories.map(({ id, title }) => (
          <MenuItem key={id} onClick={() => handleClose(title)} disableRipple>
            {title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Filter;
