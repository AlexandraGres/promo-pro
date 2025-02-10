import './EditUser.scss';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { SyntheticEvent, useState } from 'react';

import UserAvatarForm from '../UserAvatarForm/UserAvatarForm';
import UserInfoForm from '../UserInfoForm/UserInfoForm';
import UserPasswordForm from '../UserPasswordForm/UserPasswordForm';

const EditUser: React.FC = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 630, mx: 'auto', my: 6, p: 4 }} className="box user-form">
      <h3 className="form-title">Manage your account</h3>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="User account">
            <Tab label="Edit Information" value="1" />
            <Tab label="User Avatar" value="2" />
            <Tab label="Change Password" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <h4>Change your information</h4>
          <UserInfoForm />
        </TabPanel>
        <TabPanel value="2">
          <h4>Change your photo</h4>
          <span>Drag and drop file below</span>
          <UserAvatarForm />
        </TabPanel>
        <TabPanel value="3">
          <h4>Change your password</h4>

          <UserPasswordForm />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default EditUser;
