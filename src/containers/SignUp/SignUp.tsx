import "./SignUp.scss";

import { Box, Button, Container, Link } from "@mui/material";
import { Form, Formik } from "formik";

import BgImage from "../../components/BgImage/BgImage";
import Input from "../../components/Input/Input";
import SocialButtons from "../../components/SocialButtons/SocialButtons";
import TextDivider from "../../components/TextDivider/TextDivider";
import Title from "../../components/Title/Title";
import { signUpSchema } from "../../utils/schemas";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

const SignUp = () => {
  const { signUp, readData } = useFirebaseAuth();

  const clickButton = async () => {
    await readData();
  };

  return (
    <Box className="sign-up">
      <BgImage className="sign-up-bg" />
      <Container component="main">
        <Box className="wrapper">
          <Title text="Get started today" />
          <span>Enter your details to create super account.</span>

          <Formik
            initialValues={{
              name: "",
              age: "",
              email: "",
              password: "",
              confirmPassword: "",
              accept: false,
            }}
            validationSchema={signUpSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const { email, password, name, age } = values;
              await signUp(email, password, name, parseInt(age));
              resetForm({
                values: {
                  name: "",
                  age: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  accept: false,
                },
              });

              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box sx={{ display: "flex" }}>
                  <Input
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="Name"
                  />
                  <Box sx={{ width: 30 }} />
                  <Input
                    name="age"
                    label="Age"
                    type="number"
                    placeholder="Enter your age"
                  />
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
                <Box sx={{ display: "flex" }}>
                  <Input name="accept" type="checkbox" />
                  <span className="secondary">I agree to Product </span>
                  <Link href="/terms" sx={{ fontWeight: "500", ml: 1 }}>
                    Terms and Policy.
                  </Link>
                </Box>
                <Button
                  disabled={isSubmitting}
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

          <Box sx={{ textAlign: "center" }}>
            <span className="secondary">Already have an account? </span>
            <Link href="/login" sx={{ fontWeight: "500" }}>
              Login
            </Link>
          </Box>

          <Button onClick={clickButton}>Data</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
