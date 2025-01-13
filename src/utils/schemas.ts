import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup.string().required('Required'),
});

export const signUpSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().email('Please enter a valid email').required('Required'),
  age: yup.number().positive().integer().required('Required'),
  password: yup
    .string()
    .min(8, 'Must be 8 characters long at least')
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
});

export const forgotPassSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
});

export const articleSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(100, 'Title must be under 100 characters'),
  text: yup.string().required('Text is required'),
  file: yup
    .mixed()
    .nullable()
    .test('fileFormat', 'Only JPG and PNG files are allowed', (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return ['image/jpeg', 'image/png'].includes(value.type);
      }
      return false;
    }),
});

export const userInfoSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  age: yup.number().positive().integer(),
});

export const userAvatarSchema = yup.object().shape({
  file: yup
    .mixed()
    .test('fileFormat', 'Only JPG and PNG files are allowed', (value) => {
      if (!value) return false;
      if (value instanceof File) {
        return ['image/jpeg', 'image/png'].includes(value.type);
      }
      return false;
    }),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Required'),
  newPassword: yup
    .string()
    .min(8, 'Must be 8 characters long at least')
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
    .required('Required'),
});
