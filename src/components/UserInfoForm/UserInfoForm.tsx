import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';

import { FC } from 'react';
import Input from '../Input/Input';
import { RootState } from '../../store/store';
import useEditProfile from '../../hooks/useEditProfile';
import { useNavigate } from 'react-router-dom';
import { useOnlineStatus } from '../Providers/OnlineStatusProvider';
import { useSelector } from 'react-redux';
import { userInfoSchema } from '../../utils/schemas';

interface UserInfoFormValues {
  firstName: string;
  lastName: string;
  age: string;
}

const UserInfoForm: FC = () => {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const { user } = useSelector((state: RootState) => state.auth);
  const uid = user?.uid;
  const { updateUserInfo } = useEditProfile();

  const [firstName = '', lastName = ''] = user?.displayName?.split(' ') || [];

  const initialValues: UserInfoFormValues = {
    firstName: user?.firstName || firstName,
    lastName: user?.lastName || lastName,
    age: user?.age || '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userInfoSchema}
      onSubmit={async (values) => {
        if (!uid) return;
        await updateUserInfo(uid, values);
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
          <Input name="lastName" label="Last Name" type="text" placeholder="Enter your last name" />
          <Input name="age" label="Age" type="number" placeholder="Enter your age" />
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
              disabled={!isValid || isSubmitting || !isOnline}
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

export default UserInfoForm;
