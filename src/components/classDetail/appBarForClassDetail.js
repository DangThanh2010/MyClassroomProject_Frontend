import { useState } from 'react';
import {Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem} from '@mui/material';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function AppBarForClassDetail({nameClass, valueTab, handleChangeValueTab, role}) {
  const [anchorElAccount, setAnchorElAccount] = useState(null);

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: 'white'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: 'black' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{color: 'black' }}>
            {nameClass}
          </Typography>

          <Tabs value={valueTab} onChange={(event, newValue) => handleChangeValueTab(newValue)} centered sx={{flexGrow: 1, color: 'black' }}>
            <Tab label="Bảng tin" value={1} />
            <Tab label="Mọi người" value={2} />
            {role===1||role===2?<Tab label="Điểm số" value={3}/>:<Tab label="Xem điểm" value={3}/>}
            {(role===1||role===2) && <Tab label="Chấm điểm" value={4}/>}
            {(role===1||role===2) && <Tab label="Phúc khảo" value={5}/>}
          </Tabs>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-account"
            aria-haspopup="true"
            onClick={handleMenuAccount}
            sx={{color: 'black'}}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-account"
            anchorEl={anchorElAccount}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElAccount)}
            onClose={handleCloseAccount}
          >
            <Link to="/profile" style={{ textDecoration: 'none', color: "black" }} ><MenuItem>Tài khoản cá nhân </MenuItem></Link>
            <Link to="/mapping" style={{ textDecoration: 'none', color: "black" }} ><MenuItem>Đồng bộ tài khoản và mã số sinh viên </MenuItem></Link>
            <Link to="/login" style={{ textDecoration: 'none', color: "black" }}><MenuItem onClick={handleLogout}>Đăng xuất</MenuItem></Link>
            
          </Menu>
                
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarForClassDetail;