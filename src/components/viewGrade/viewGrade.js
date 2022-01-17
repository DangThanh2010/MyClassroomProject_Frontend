import { useState, useEffect } from 'react';
import React from "react";
import  { Redirect } from 'react-router-dom';

import {List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Box, Divider, Button, Typography} from '@mui/material';
import {RateReview} from '@mui/icons-material';

function ViewGrade({match}){

  const [isLoaded, setIsLoaded] = useState(false);
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    
    console.log("ok");
    fetch(process.env.REACT_APP_API + "/grade/listGradeForStudent/" + match.params.classId + "?studentId=" + match.params.studentId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if (result) {
            setStudent(result.student);
            setGrades(result.data);
            setIsLoaded(true);
          }
        });
      }
    });
  }, [isLoaded]);

  const generateGrades = () => {
    return grades.map(grade => 
      <ListItem secondaryAction={
        <IconButton edge="end" aria-label="more">
          <RateReview />
        </IconButton>
      }
      >
        <ListItemText primary={grade.assignment  === null ? "" : grade.assignment.name }/>
        <ListItemText primary={grade.grade === null ? "" : grade.grade.point}/>
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
            <ListItem >
              <ListItemAvatar>
                <Avatar  alt = "avatar" src={student === null ? "" : student.avatar} sx={{ width: 90, height: 90 }}/>
              </ListItemAvatar>
              <ListItemText primary={
                <Typography variant="h6" style={{ color: "blue" }}>{student === null ? "" : student.fullname}</Typography>
                } secondary={student === null ? "" : student.IDstudent}
                sx={{ ml: 5}} />
            </ListItem>
            <Divider style={{background: "blue"}}/>
            
            {generateGrades()}

          </List>
        </Box>
      </>
      }
  </div>
  );
}

export default ViewGrade;