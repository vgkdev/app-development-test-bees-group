// src/pages/UserManagement.tsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import UserTable from "../components/UserTable";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  CssBaseline,
  Switch,
  FormControlLabel,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const UserManagement = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: darkMode ? "background.default" : "background.paper",
        color: darkMode ? "text.primary" : "text.secondary",
        transition: "all 0.3s ease",
      }}
    >
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          //   bgcolor: darkMode ? "primary.dark" : "primary.light",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            User Management
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            {/* <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  color="primary"
                />
              }
              label={darkMode ? "Light Mode" : "Dark Mode"}
              sx={{ ml: 1 }}
            /> */}
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          p: 3,
          flex: 1,
          width: "100%",
          maxWidth: 1600,
          mx: "auto",
        }}
      >
        <UserTable />
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          bgcolor: darkMode ? "background.paper" : "background.default",
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} User Management System
        </Typography>
      </Box>
    </Box>
  );
};

export default UserManagement;
