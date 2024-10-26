import './Dashboard.scss';

import { Box } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const Dashboard = () => {
  return (
    <Box className="dashboard">
      <Sidebar />
      <Navbar />
    </Box>
  );
};

export default Dashboard;
