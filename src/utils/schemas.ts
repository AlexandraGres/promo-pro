import * as yup from 'yup';

const emailField = yup
  .string()
  .email('Please enter a valid email')
  .required('Required');

const passwordField = yup.string().required('Required');

const confirmPasswordField = (refField: string) =>
  yup
    .string()
    .oneOf([yup.ref(refField), undefined], 'Passwords must match')
    .required('Required');

const fileField = yup
  .mixed()
  .nullable()
  .test('fileFormat', 'Only JPG and PNG files are allowed', (value) => {
    if (!value) return true;
    if (value instanceof File) {
      return ['image/jpeg', 'image/png'].includes(value.type);
    }
    return false;
  });

export const loginSchema = yup.object().shape({
  email: emailField,
  password: passwordField,
});

export const signUpSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: emailField,
  age: yup.number().positive().integer().required('Required'),
  password: passwordField.min(8, 'Must be 8 characters long at least'),
  confirmPassword: confirmPasswordField('password'),
});

export const forgotPassSchema = yup.object().shape({
  email: emailField,
});

export const articleSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(100, 'Title must be under 100 characters'),
  text: yup.string().required('Text is required'),
  file: fileField,
});

export const userInfoSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  age: yup.number().positive().integer(),
});

export const userAvatarSchema = yup.object().shape({
  file: fileField.test('fileRequired', 'File is required', (value) => !!value),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: passwordField,
  newPassword: passwordField.min(8, 'Must be 8 characters long at least'),
  confirmPassword: confirmPasswordField('newPassword'),
});
