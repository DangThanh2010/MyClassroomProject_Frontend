import { useState } from 'react';
import {Card, CardHeader, IconButton, Menu, MenuItem, CardContent, Typography} from '@mui/material';
import { Link } from 'react-router-dom'

import MoreVertIcon from '@mui/icons-material/MoreVert';

function ClassCard({id, name, subject, deleteClass}) {
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
                deleteClass();
                handleCloseSettings();
                }
              }>
                Xóa
              </MenuItem>
            </Menu>
          </div>
        }
        title={<Link to={"/class/" + id}> <Typography sx={{color: 'white', fontWeight: 'bold', fontSize: 20}} >{name}</Typography> </Link>}
        subheader={<Link to={"/class/" + id}> <Typography sx={{color: 'white',  fontSize: 15}} >{subject}</Typography> </Link>}
        sx={{backgroundColor: 'blue', height: 70}}
      />

      <CardContent sx={{height: 100}}></CardContent>
    </Card>
  );
}

export default ClassCard;