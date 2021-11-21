import { useState } from 'react';
import {Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem} from '@mui/material';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';

function MyAppBar({openCreateClassDialog}) {
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [anchorElJoinCreate, setAnchorElJoinCreate] = useState(null);

  const handleMenuAccount = (event) => {
    setAnchorElAccount(event.currentTarget);
  };
  
  const handleCloseAccount = () => {
    setAnchorElAccount(null);
  };

  const handleMenuJoinCreate = (event) => {
    setAnchorElJoinCreate(event.currentTarget);
  };
  
  const handleCloseJoinCreate = () => {
    setAnchorElJoinCreate(null);
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
            My Classroom
          </Typography>

          <IconButton
            size="large"
            aria-label="join or create class"
            aria-controls="menu-join-create"
            aria-haspopup="true"
            onClick={handleMenuJoinCreate}
            sx={{color: 'black'}}
          >
            <AddIcon />
          </IconButton>
          <Menu
            id="menu-join-create"
            anchorEl={anchorElJoinCreate}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElJoinCreate)}
            onClose={handleCloseJoinCreate}
          >
            <MenuItem onClick={handleCloseJoinCreate}>Tham gia lớp</MenuItem>
            <MenuItem onClick={ () => {
              openCreateClassDialog();
              handleCloseJoinCreate();
              }
            }>Tạo lớp mới</MenuItem>
          </Menu>
            
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
            <MenuItem onClick={handleCloseAccount}>Tài khoản cá nhân</MenuItem>
            <Link to="/mapping" style={{ textDecoration: 'none', color: "black" }} ><MenuItem>Đồng bộ tài khoản và mã số sinh viên </MenuItem></Link>
            <MenuItem onClick={handleCloseAccount}>Đăng xuất</MenuItem>
          </Menu>
                
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MyAppBar;