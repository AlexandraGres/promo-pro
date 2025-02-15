import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';

import { FC } from 'react';
import Input from '../Input/Input';
import { changePasswordSchema } from '../../utils/schemas';
import useEditProfile from '../../hooks/useEditProfile';
import { useNavigate } from 'react-router-dom';
import { useOnlineStatus } from '../Providers/OnlineStatusProvider';

const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const UserPasswordForm: FC = () => {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const { changeUserPassword } = useEditProfile();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={changePasswordSchema}
      onSubmit={async (values, { resetForm }) => {
        const success = await changeUserPassword(values.oldPassword, values.newPassword);

        if (success) {
          resetForm({ values: initialValues });
        }
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Input
            name="oldPassword"
            label="Old Password"
            type="password"
            placeholder="Enter your current password"
          />
          <Input
            name="newPassword"
            label="New Password"
            type="password"
            placeholder="Enter your new password"
          />
          <Input
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="Enter your new password again"
          />
          <Box display="flex" mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ fontSize: 14, py: 1, px: 5, mr: 3 }}
              onClick={() => navigate('/')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              sx={{ fontSize: 14, py: 1, px: 5 }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || !isValid || !isOnline}
              disableElevation
            >
              Save
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UserPasswordForm;
