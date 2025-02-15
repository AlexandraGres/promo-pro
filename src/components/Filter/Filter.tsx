import './Filter.scss';

import { Box, Button, Menu, MenuItem } from '@mui/material';
import { FC, MouseEvent, useCallback, useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CATEGORIES = [
  { id: 0, title: 'All Categories' },
  { id: 1, title: 'Productivity' },
  { id: 2, title: 'Media' },
  { id: 3, title: 'Business' },
  { id: 4, title: 'Technology' },
];

interface FilterProps {
  setFilter: (filter: string) => void;
}

const Filter: FC<FilterProps> = ({ setFilter }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [category, setSelectedCategory] = useState(CATEGORIES[0].title);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(
    (category: string) => {
      setFilter(category);
      setSelectedCategory(category);
      setAnchorEl(null);
    },
    [setFilter],
  );

  return (
    <Box className="filter">
      <span className="label">Show: </span>
      <Button
        id="show-button"
        className={open ? 'open' : ''}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant="text"
      >
        {category}
      </Button>
      <Menu id="filter" anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {CATEGORIES.map(({ id, title }) => (
          <MenuItem key={id} onClick={() => handleClose(title)} disableRipple>
            {title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Filter;
