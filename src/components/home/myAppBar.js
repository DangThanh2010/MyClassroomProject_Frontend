import { useState } from "react";
import { Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@mui/material";

import { Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";

function MyAppBar({ openCreateClassDialog }) {
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [anchorElJoinCreate, setAnchorElJoinCreate] = useState(null);

  const handleMenuAccount = (event) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleCloseAccount = () => {
    setAnchorElAccount(null);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expAt");
  };

  const handleMenuJoinCreate = (event) => {
    setAnchorElJoinCreate(event.currentTarget);
  };

  const handleCloseJoinCreate = () => {
    setAnchorElJoinCreate(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: "black" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            My Classroom
          </Typography>

          <IconButton
            size="large"
            aria-label="join or create class"
            aria-controls="menu-join-create"
            aria-haspopup="true"
            onClick={handleMenuJoinCreate}
            sx={{ color: "black" }}
          >
            <AddIcon />
          </IconButton>
          <Menu
            id="menu-join-create"
            anchorEl={anchorElJoinCreate}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElJoinCreate)}
            onClose={handleCloseJoinCreate}
          >
            <MenuItem onClick={handleCloseJoinCreate}>Tham gia l???p</MenuItem>
            <MenuItem
              onClick={() => {
                openCreateClassDialog();
                handleCloseJoinCreate();
              }}
            >
              T???o l???p m???i
            </MenuItem>
          </Menu>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-account"
            aria-haspopup="true"
            onClick={handleMenuAccount}
            sx={{ color: "black" }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-account"
            anchorEl={anchorElAccount}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElAccount)}
            onClose={handleCloseAccount}
          >
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>T??i kho???n c?? nh??n </MenuItem>
            </Link>
            <Link
              to="/mapping"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>?????ng b??? t??i kho???n v?? m?? s??? sinh vi??n </MenuItem>
            </Link>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem onClick={handleLogout}>????ng xu???t</MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MyAppBar;
