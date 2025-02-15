import './EditUser.scss';

import { Box, Tab, Typography } from '@mui/material';
import { SyntheticEvent, useCallback, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import UserAvatarForm from '../UserAvatarForm/UserAvatarForm';
import UserInfoForm from '../UserInfoForm/UserInfoForm';
import UserPasswordForm from '../UserPasswordForm/UserPasswordForm';

const TABS = {
  INFO: '1',
  AVATAR: '2',
  PASSWORD: '3',
};

const EditUser: React.FC = () => {
  const [value, setValue] = useState('1');

  const handleChange = useCallback((event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }, []);

  return (
    <Box sx={{ maxWidth: 630, mx: 'auto', my: 6, p: 4 }} className="box user-form">
      <Typography variant="h3" className="form-title">
        Manage your account
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="User account settings">
            <Tab label="Edit Information" value={TABS.INFO} />
            <Tab label="User Avatar" value={TABS.AVATAR} />
            <Tab label="Change Password" value={TABS.PASSWORD} />
          </TabList>
        </Box>
        <TabPanel value={TABS.INFO}>
          <Typography variant="h4">Change your information</Typography>
          <UserInfoForm />
        </TabPanel>
        <TabPanel value={TABS.AVATAR}>
          <Typography variant="h4">Change your photo</Typography>
          <Typography variant="body2">Drag and drop file below</Typography>
          <UserAvatarForm />
        </TabPanel>
        <TabPanel value={TABS.PASSWORD}>
          <Typography variant="h4">Change your password</Typography>
          <UserPasswordForm />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default EditUser;
