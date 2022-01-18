import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function ClassCard({id, name, subject, role, deleteOrLeaveClass}) {
  const [anchorElSettings, setAnchorElSettings] = useState(null);

  const handleMenuSettings = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorElSettings(null);
  };
  
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        action={
          <div>
            <IconButton
              size="large"
              aria-label="settings"
              aria-controls="menu-settings"
              aria-haspopup="true"
              onClick={handleMenuSettings}
              sx={{color: 'white'}}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-settings"
              anchorEl={anchorElSettings}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElSettings)}
              onClose={handleCloseSettings}
            >
              <MenuItem onClick={() => {
                deleteOrLeaveClass();
                handleCloseSettings();
                }
              }>
                {role === 2 ? 'Xóa lớp' : 'Rời lớp'}
              </MenuItem>
            </Menu>
          </div>
        }
        title={<Link to={"/class/" + id} style={{ textDecoration: 'none', color: "white" }}> <Typography sx={{color: 'white', fontWeight: 'bold', fontSize: 20}} >{name}</Typography> </Link>}
        subheader={<Link to={"/class/" + id} style={{ textDecoration: 'none', color: "white" }}> <Typography sx={{color: 'white',  fontSize: 15}} >{subject}</Typography> </Link>}
        sx={{backgroundColor: 'blue', height: 70}}
      />

      <CardContent sx={{height: 100}}></CardContent>
    </Card>
  );
}

export default ClassCard;