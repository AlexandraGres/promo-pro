import './Sorting.scss';

import { Box, Button, Menu, MenuItem } from '@mui/material';
import { FC, MouseEvent, useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export type SortOrder = 'Ascending' | 'Descending' | 'Newest';

interface SortingProps {
  setSortOrder: (order: SortOrder) => void;
}

const sortOptions: SortOrder[] = ['Ascending', 'Descending', 'Newest'];

const Sorting: FC<SortingProps> = ({ setSortOrder }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOrder, setSortOrderState] = useState<SortOrder>('Newest');
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
    setSortOrderState(order);
    handleMenuClose();
  };

  return (
    <Box className="sorting" sx={{ ml: { sm: 'auto' } }}>
      <span className="label">Sort by: </span>
      <Button
        id="show-button"
        className={open ? 'open' : ''}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant="text"
      >
        {sortOrder}
      </Button>
      <Menu id="Sorting" anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        {sortOptions.map((option) => (
          <MenuItem key={option} onClick={() => handleSortChange(option)} disableRipple>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Sorting;
