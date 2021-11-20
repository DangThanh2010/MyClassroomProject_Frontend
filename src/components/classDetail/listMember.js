import { useState, useEffect } from 'react';

import {List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Box, Divider} from '@mui/material';
import {MoreVert, PersonAdd} from '@mui/icons-material';

function ListMember({idClass}){

  const [isLoaded, setIsLoaded] = useState(false);
  const [creator, setCreator] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/userInClass/1?role=Creator")
      .then(res => res.json())
      .then(
        (result) => {
          
          fetch("http://localhost:3001/userInClass/1?role=Teacher")
            .then(res => res.json())
            .then(
              (result1) => {
                fetch("http://localhost:3001/userInClass/1?role=Student")
                  .then(res => res.json())
                  .then(
                    (result2) => {
                      setIsLoaded(true);
                      setCreator(result);
                      setTeachers(result1);
                      setStudents(result2);
                    }
                  )
              }
            )
        }
      )
  }, [isLoaded])

  const generateMembers = (members) => {
    return members.map(member => 
      <ListItem secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <MoreVert />
        </IconButton>
      }
      >
        <ListItemAvatar>
          <Avatar alt = "avatar" src={member.avatar}/>
        </ListItemAvatar>
        <ListItemText primary={member.fullname}/>
      </ListItem>,
      <Divider/>
    )
  }

  return (
    <div>
      <Box sx={{mx: 35, my: 5}} >
        <List xs={12}>
          <ListItem secondaryAction={
            <IconButton edge="end" aria-label="invite" size="large">
              <PersonAdd style={{color: "blue"}}/>
            </IconButton>
          }
          >
            <ListItemText primary="Giáo viên" sx={{ fontSize: 30, color: "blue"}} disableTypography/>
          </ListItem>
          <Divider style={{background: "blue"}}/>
          
          <ListItem secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <MoreVert />
            </IconButton>
          }
          >
            <ListItemAvatar>
              <Avatar alt = "avatar" src={creator.length === 0 ? "" : creator[0].avatar}/>
            </ListItemAvatar>
            <ListItemText primary={creator.length === 0 ? "" : creator[0].fullname}/>
          </ListItem>,
          <Divider/>

          {generateMembers(teachers)}

          <ListItem secondaryAction={
            <IconButton edge="end" aria-label="invite" size="large">
              <PersonAdd style={{color: "blue"}}/>
            </IconButton>
          }
          >
            <ListItemText primary="Học viên" sx={{ fontSize: 30, color: "blue"}} disableTypography/>
          </ListItem>
          <Divider style={{background: "blue"}}/>

          {generateMembers(students)}

      </List>
    </Box>
  </div>
  );
}

export default ListMember;