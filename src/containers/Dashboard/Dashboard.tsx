import './Dashboard.scss';

import { Box, Drawer, IconButton } from '@mui/material';
import { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ArticleForm from '../../components/ArticleForm/ArticleForm';
import ArticleList from '../ArticleList/ArticleList';
import EditUser from '../../components/EditUser/EditUser';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const DRAWER_WIDTH = 230;

const Dashboard: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => setMobileOpen(false);

  const handleDrawerTransitionEnd = () => setIsClosing(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box className="dashboard" display="flex">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
      >
        <Sidebar />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            position: 'relative',
            border: 'none',
          },
        }}
        open
      >
        <Sidebar />
      </Drawer>
      <Box width="100%">
        <IconButton
          color="default"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            display: { md: 'none' },
            position: 'absolute',
            left: 8,
            top: 16,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Navbar />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/edit-article/:id" element={<ArticleForm />} />
          <Route path="/add-article" element={<ArticleForm />} />
          <Route path="/edit-profile" element={<EditUser />} />
          <Route path="/edit-account" element={<h1>Edit Account</h1>} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
