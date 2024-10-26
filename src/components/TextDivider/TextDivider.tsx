import './TextDivider.scss';

import { Box } from '@mui/material';

const TextDivider = ({ text }: { text: string }) => {
  return (
    <Box className="text-divider">
      <Box className="divider" />
      <span>{text}</span>
      <Box className="divider" />
    </Box>
  );
};

export default TextDivider;
