import './ForgotPassword.scss';

import { Box, Button, Container, Link } from '@mui/material';
import { Form, Formik } from 'formik';

import BgImage from '../../components/BgImage/BgImage';
import { FC } from 'react';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import { forgotPassSchema } from '../../utils/schemas';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { useOnlineStatus } from '../../components/Providers/OnlineStatusProvider';

const ForgotPassword: FC = () => {
  const { forgotPassword } = useFirebaseAuth();
  const isOnline = useOnlineStatus();

  return (
    <Box className="forgot-pass">
      <BgImage className="forgot-pass-bg" />
      <Container component="main">
        <Box className="wrapper">
          <Title text="Password recovery" />
          <span>Enter the email you&apos;re using for your account.</span>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={forgotPassSchema}
            onSubmit={async (values, { resetForm }) => {
              await forgotPassword(values.email);
              resetForm({ values: { email: '' } });
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <Input
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email address"
                />
                <Button
                  disabled={isSubmitting || !isValid || !isOnline}
                  type="submit"
                  variant="contained"
                  disableElevation
                  fullWidth
                >
                  Reset
                </Button>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Link href="/login" sx={{ fontWeight: '500' }}>
              Back to Login
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
