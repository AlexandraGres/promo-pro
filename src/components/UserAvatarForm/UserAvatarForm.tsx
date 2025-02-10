import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useEditProfile from '../../hooks/useEditProfile';
import { RootState } from '../../store/store';
import { userAvatarSchema } from '../../utils/schemas';
import FileUpload from '../FileUpload/FileUpload';

const UserAvatarForm = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const uid = user?.uid;
  const { updateUserAvatar } = useEditProfile();

  return (
    <Formik
      initialValues={{ file: null }}
      validationSchema={userAvatarSchema}
      onSubmit={async (values, { resetForm }) => {
        if (!uid) return;

        const { file } = values;

        if (file) {
          const success = await updateUserAvatar(uid, file);

          if (success) {
            resetForm({ values: { file: null } });
          }
        }
      }}
    >
      {({ isSubmitting, values, isValid }) => (
        <Form>
          <FileUpload file={values.file} />

          <Box display="flex" mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                fontSize: 14,
                py: 1,
                px: 5,
                mr: 3,
              }}
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              sx={{
                fontSize: 14,
                py: 1,
                px: 5,
              }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || !isValid}
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

export default UserAvatarForm;
