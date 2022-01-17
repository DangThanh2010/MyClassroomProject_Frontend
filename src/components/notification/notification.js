import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { Dialog, DialogTitle, DialogContent, List, ListItemText, ListItem, Typography, Divider, Button} from '@mui/material';

function Notification({ isOpened, close}) {

  const [list, setList] = useState([]);

  useEffect(() => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }

    fetch(process.env.REACT_APP_API + "/user/myself/get", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (!res.ok) {
        
      } else {
        res.json().then((result) => {
         if(result)
          return result.id;
        }).then((id) => {
          fetch(process.env.REACT_APP_API + "/notification/" + id, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }).then((res) => {
            if (!res.ok) {
              
            } else {
              res.json().then((result) => {
                setList(result);
              });
            }
          });
        });
      }
    });
  }, []);

  const setNotNew = (id) => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }

    fetch(process.env.REACT_APP_API + "/notification/watched/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (!res.ok) {
       
      }
    });
  }

  const generateListNoti = () => {
    return list.map(item => 
      <>
      <Divider/>
      <ListItem>
        <Button onClick={() => setNotNew(item.id)}>
          <ListItemText primary={
             <Link
              to={item.link}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography sx={{fontWeight: item.isNew ? "bold" : "medium"}}>{item.content}</Typography>
            </Link>
          }/>
        </Button>
      </ListItem>

      
      </>
    )
  }

  return (
    <div>
      <Dialog open={isOpened} onClose={close}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <List xs={12}>
            {generateListNoti()}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Notification;