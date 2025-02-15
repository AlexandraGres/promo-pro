import './SocialButtons.scss';

import { Box } from '@mui/material';
import { FC } from 'react';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';

const SocialButtons: FC = () => {
  const { loginWithGoogle, loginWithFacebook } = useFirebaseAuth();

  return (
    <Box className="social-buttons" sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box onClick={loginWithGoogle} className="social" role="button">
        <img src="/google.svg" alt="google" />
      </Box>
      <Box onClick={loginWithFacebook} className="social" role="button">
        <img src="/facebook.svg" alt="facebook" />
      </Box>
    </Box>
  );
};

export default SocialButtons;
