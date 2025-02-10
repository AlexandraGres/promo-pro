import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';

import Input from '../Input/Input';
import { RootState } from '../../store/store';
import useEditProfile from '../../hooks/useEditProfile';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userInfoSchema } from '../../utils/schemas';

const initialValues = {
    firstName: '',
    lastName: '',
    age: '',
};

const UserInfoForm = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const uid = user?.uid;
    const { updateUserInfo } = useEditProfile();

    let firstName, lastName;

    if (user && user.displayName) {
        [firstName, lastName] = user.displayName.split(' ');
    }

    const userData = {
        firstName: user?.firstName || firstName,
        lastName: user?.lastName || lastName,
        age: user?.age,
    };

    return (
        <Formik
            initialValues={userData || initialValues}
            validationSchema={userInfoSchema}
            onSubmit={async (values, { resetForm }) => {
                if (!uid) return;

                const success = await updateUserInfo(uid, values);

                if (success) {
                    resetForm({ values: initialValues });
                }
            }}
        >
            {({ isSubmitting, isValid }) => (
                <Form>
                    <Input name="firstName" label="First Name" type="text" placeholder="Enter your first name" />

                    <Input name="lastName" label="Last Name" type="text" placeholder="Enter your last name" />

                    <Input name="age" label="Age" type="number" placeholder="Enter your age" />

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
                            disabled={!isValid || isSubmitting}
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
