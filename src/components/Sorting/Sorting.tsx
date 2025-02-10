import './Sorting.scss';

import { Box, Button, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface SortingProps {
    setSortOrder: (order: 'Ascending' | 'Descending' | 'Newest') => void;
}

export type SortOrder = 'Ascending' | 'Descending' | 'Newest';

const Sorting = ({ setSortOrder }: SortingProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [sortOrder, setSortOrderState] = useState<SortOrder>('Newest');
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (order: SortOrder) => {
        setSortOrder(order);
        setSortOrderState(order);
        setAnchorEl(null);
    };

    return (
        <Box className="sorting" sx={{ ml: { sm: 'auto' } }}>
            <span className="label">Sort by: </span>
            <Button
                id="show-button"
                className={open ? 'open' : ''}
                aria-controls={open ? 'Sorting' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                variant="text"
            >
                {sortOrder}
            </Button>
            <Menu
                id="Sorting"
                MenuListProps={{
                    'aria-labelledby': 'show-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => handleClose('Ascending')} disableRipple>
                    Ascending
                </MenuItem>
                <MenuItem onClick={() => handleClose('Descending')} disableRipple>
                    Descending
                </MenuItem>
                <MenuItem onClick={() => handleClose('Newest')} disableRipple>
                    Newest
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Sorting;
