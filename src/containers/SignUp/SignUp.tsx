import './SignUp.scss';

import { Box, Button, Container, Link } from '@mui/material';
import { Form, Formik } from 'formik';

import { useNavigate } from 'react-router-dom';
import BgImage from '../../components/BgImage/BgImage';
import Input from '../../components/Input/Input';
import SocialButtons from '../../components/SocialButtons/SocialButtons';
import TextDivider from '../../components/TextDivider/TextDivider';
import Title from '../../components/Title/Title';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { signUpSchema } from '../../utils/schemas';

interface SignUpProps {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  age: string;
  accept: boolean;
}

const SignUp = () => {
  const { signUp } = useFirebaseAuth();
  const navigate = useNavigate();

  const initialValues: SignUpProps = {
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    accept: false,
  };

  return (
    <Box className="sign-up">
      <BgImage className="sign-up-bg" />
      <Container component="main">
        <Box className="wrapper">
          <Title text="Get started today" />
          <span>Enter your details to create super account.</span>

          <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={async (values, { resetForm }) => {
              const { email, password, firstName, lastName, age } = values;
              const success = await signUp(email, password, firstName, lastName, parseInt(age));

              if (success) {
                resetForm({ values: initialValues });
                navigate('/');
              }
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <Input
                  name="firstName"
                  label="First Name"
                  type="text"
                  placeholder="Enter your first name"
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                />

                <Box className="age">
                  <Input name="age" label="Age" type="number" placeholder="Enter your age" />
                </Box>
                <Input
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                />
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />
                <Input
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  placeholder="Enter your new password again"
                />
                <Box sx={{ display: 'flex' }}>
                  <Input name="accept" type="checkbox" />
                  <span className="secondary">I agree to Product </span>
                  <Link href="/terms" sx={{ fontWeight: '500', ml: 1 }}>
                    Terms and Policy.
                  </Link>
                </Box>
                <Button
                  disabled={isSubmitting || !isValid}
                  type="submit"
                  variant="contained"
                  disableElevation
                  fullWidth
                >
                  Get started now
                </Button>
              </Form>
            )}
          </Formik>

          <TextDivider text="Or sign up with" />

          <SocialButtons />

          <Box sx={{ textAlign: 'center' }}>
            <span className="secondary">Already have an account? </span>
            <Link href="/login" sx={{ fontWeight: '500' }}>
              Login
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
