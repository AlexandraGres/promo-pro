import './TextDivider.scss';

import { Box } from '@mui/material';
import { FC } from 'react';

const TextDivider: FC<{ text: string }> = ({ text }) => {
  return (
    <Box className="text-divider">
      <Box className="divider" />
      <span>{text}</span>
      <Box className="divider" />
    </Box>
  );
};

export default TextDivider;
