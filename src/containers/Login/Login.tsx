import './Login.scss';

import { Box, Button, Container, Link } from '@mui/material';
import { Form, Formik } from 'formik';

import BgImage from '../../components/BgImage/BgImage';
import Input from '../../components/Input/Input';
import SocialButtons from '../../components/SocialButtons/SocialButtons';
import TextDivider from '../../components/TextDivider/TextDivider';
import Title from '../../components/Title/Title';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { loginSchema } from '../../utils/schemas';

const Login = () => {
  const { login } = useFirebaseAuth();

  return (
    <Box className="login">
      <BgImage className="login-bg" />
      <Container component="main">
        <Box className="wrapper">
          <Box sx={{ mb: 6 }}>
            <img src="/hand.svg" alt="hand" />
          </Box>
          <Title text="Welcome back" />
          <span>Sign in to manage your account.</span>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              await login(values.email, values.password);
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
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />
                <Box sx={{ mb: 2 }}>
                  <Link href="/forgot-pass" sx={{ fontWeight: '500' }}>
                    Forgot your password?
                  </Link>
                </Box>
                <Button
                  disabled={isSubmitting || !isValid}
                  type="submit"
                  variant="contained"
                  disableElevation
                  fullWidth
                >
                  Sign in
                </Button>
              </Form>
            )}
          </Formik>
          <TextDivider text="Or do it via other accounts" />
          <SocialButtons />
          <Box sx={{ textAlign: 'center' }}>
            <span className="secondary">Don’t have an account? </span>
            <Link href="/sign-up" sx={{ fontWeight: '500' }}>
              Sign Up
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
