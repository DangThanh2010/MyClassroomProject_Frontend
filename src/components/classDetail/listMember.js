import { useState, useEffect } from 'react';
import  { Redirect } from 'react-router-dom';

import {List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Box, Divider} from '@mui/material';
import {MoreVert, PersonAdd} from '@mui/icons-material';

function ListMember({idClass, openInviteTeacherDialog, openInviteStudentDialog, role}){

  const [isLoaded, setIsLoaded] = useState(false);
  const [creator, setCreator] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch("https://myclassroom-api.herokuapp.com/userInClass/" + idClass + "?role=Creator", {
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
    })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            if (result) {
              fetch("https://myclassroom-api.herokuapp.com/userInClass/" + idClass + "?role=Teacher", {
                headers: {'Content-Type':'application/json',
                          Authorization: 'Bearer ' + token},
              })
                .then(res => {
                  if (!res.ok) {
                    setError(true);
                  } else {
                    res.json().then((result1) => {
                      if(result1){
                        fetch("https://myclassroom-api.herokuapp.com/userInClass/" + idClass + "?role=Student", {
                          headers: {'Content-Type':'application/json',
                                    Authorization: 'Bearer ' + token},
                        })
                          .then(res => {
                            if (!res.ok) {
                              setError(true);
                            } else {
                              res.json().then((result2) => {
                                setIsLoaded(true);
                                setCreator(result);
                                setTeachers(result1);
                                setStudents(result2);
                              })
                            }
                          })
                      }
                    })
                  }
                })
            }
          });
        }
      })
  }, [isLoaded])

  const generateMembers = (members) => {
    return members.map(member => 
      <ListItem secondaryAction={
        <IconButton edge="end" aria-label="more">
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
      {error ? <Redirect to='/login' /> :
      <>
        <Box sx={{mx: 35, my: 5}} >
          <List xs={12}>
            <ListItem secondaryAction={ role === 2 || role === 1 ?
              <IconButton edge="end" aria-label="invite" size="large" onClick={openInviteTeacherDialog}>
                <PersonAdd style={{color: "blue"}}/>
              </IconButton>
              : <IconButton></IconButton>
            }
            >
              <ListItemText primary="Giáo viên" sx={{ fontSize: 30, color: "blue"}} disableTypography/>
            </ListItem>
            <Divider style={{background: "blue"}}/>
            
            <ListItem secondaryAction={
              <IconButton edge="end" aria-label="more">
                <MoreVert />
              </IconButton>
            }
            >
              <ListItemAvatar>
                <Avatar alt = "avatar" src={creator.length === 0 ? "" : creator[0].avatar}/>
              </ListItemAvatar>
              <ListItemText primary={creator.length === 0 ? "" : creator[0].fullname + " (Host)"}/>
            </ListItem>,
            <Divider/>

            {generateMembers(teachers)}

            <ListItem secondaryAction={ role === 2 || role === 1 ?
              <IconButton edge="end" aria-label="invite" size="large" onClick={openInviteStudentDialog}>
                <PersonAdd style={{color: "blue"}}/>
              </IconButton>
              : <IconButton></IconButton>
            }
            >
              <ListItemText primary="Học viên" sx={{ fontSize: 30, color: "blue"}} disableTypography/>
            </ListItem>
            <Divider style={{background: "blue"}}/>

            {generateMembers(students)}
          </List>
        </Box>
      </>
      }
  </div>
  );
}

export default ListMember;