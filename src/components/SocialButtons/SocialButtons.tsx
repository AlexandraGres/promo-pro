import './SocialButtons.scss';

import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';

const SocialButtons = () => {
  const { loginWithGoogle, loginWithFacebook } = useFirebaseAuth();

  return (
    <Box className="social-buttons" sx={{ display: 'flex', justifyContent: 'center' }}>
      <Link to="">
        <Box onClick={loginWithGoogle} className="social">
          <img src="google.svg" alt="google" />
        </Box>
      </Link>
      <Link to="">
        <Box onClick={loginWithFacebook} className="social">
          <img src="facebook.svg" alt="facebook" />
        </Box>
      </Link>
    </Box>
  );
};

export default SocialButtons;
