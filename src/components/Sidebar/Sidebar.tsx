import "./Sidebar.scss";

import { Box, Button } from "@mui/material";

import { Link } from "react-router-dom";
import LogoutIcon from "../LogoutIcon/LogoutIcon";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

const Sidebar = () => {
  const active = true;
  const { logout } = useFirebaseAuth();

  return (
    <Box className="sidebar">
      <Box className="logo-container">
        <Link to="/">
          <img className="logo" src="logo.svg" alt="logo" />
        </Link>
      </Box>
      <Box className="menu-container">
        <h3 className="menu-title">Main Menu</h3>
        <Box className={active ? "active" : "disabled"}>
          <img
            src={active ? "dashboard.svg" : "dashboard-disabled.svg"}
            alt="dashboard icon"
          />
          <span>Dashboard</span>
        </Box>
      </Box>
      <Box className="buttons">
        <Button
          onClick={logout}
          sx={{ width: "100%" }}
          variant="contained"
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
