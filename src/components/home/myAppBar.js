import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";

import { Link } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import Notification from "../notification/notification";

function MyAppBar({ openCreateClassDialog, openJoinClassDialog }) {
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [anchorElJoinCreate, setAnchorElJoinCreate] = useState(null);
  const history = useHistory();
  const [notiOpen, setNotiOpen] = useState(false);

  const openNoti = () => {
    setNotiOpen(true);
  }

  const closeNoti = () => {
    setNotiOpen(false);
  }

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
            <HomeIcon
              onClick={() => {
                history.push("/");
              }}
            />
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

          <IconButton
            size="large"
            aria-label="noti"
            onClick={openNoti}
            sx={{ color: "black" }}
          >
            <NotificationsNoneIcon />
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
            <MenuItem
              onClick={() => {
                openJoinClassDialog();
                handleCloseJoinCreate();
              }}
            >
              Tham gia lớp
            </MenuItem>
            <MenuItem
              onClick={() => {
                openCreateClassDialog();
                handleCloseJoinCreate();
              }}
            >
              Tạo lớp mới
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
              <MenuItem>Tài khoản cá nhân </MenuItem>
            </Link>
            <Link
              to="/mapping"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>Đồng bộ tài khoản và mã số sinh viên </MenuItem>
            </Link>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
      <Notification isOpened={notiOpen} close={closeNoti} ></Notification>
    </Box>

  );
}

export default MyAppBar;
