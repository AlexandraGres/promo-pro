import './Title.scss';

import { FC } from 'react';
import { Typography } from '@mui/material';

const Title: FC<{ text: string }> = ({ text }) => {
  return (
    <Typography variant="h1" className="title">
      {text}
    </Typography>
  );
};

export default Title;
