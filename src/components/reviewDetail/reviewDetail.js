import { useState, useEffect } from 'react';
import React from "react";
import  { Redirect } from 'react-router-dom';

import {List, ListItem, ListItemText, Box, Divider, Typography} from '@mui/material';

function ReviewDetail({match}){

  const [isLoaded, setIsLoaded] = useState(false);
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [grade, setGrade] = useState(null);
  const [assignment, setAssignment] = useState(null);
  //const [isOpenedDialog, setIsOpenedDialog] =useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    
    fetch(process.env.REACT_APP_API + "/comment/" + match.params.reviewId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if (result.result === 1) {
            setComments(result.comments);
            setReview(result.review);
            setGrade(result.grade);
            setAssignment(result.assignment);
            setIsLoaded(true);
          }
        });
      }
    });
  }, [isLoaded]);

  /*
  const openDialog = () => {
    setIsOpenedDialog(true);
  };

  const closeDialog = () => {
    setIsOpenedDialog(false);
  };
  */

  /*
  const requestReview = async (point, explaination) => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    
    fetch(process.env.REACT_APP_API + "/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        gradeId: idGrade,
        gradeWant: point,
        explaination: explaination
      }),
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          setIsOpenedDialog(false);
        });
      }
    });
    const res = await fetch(process.env.REACT_APP_API + "/userInClass/" + match.params.classId + "?role=Teacher", {
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
    });
    const res2 = await fetch(process.env.REACT_APP_API + "/userInClass/" + match.params.classId + "?role=Creator", {
        headers: {'Content-Type':'application/json',
                  Authorization: 'Bearer ' + token},
    });
    const result = (await res.json()).concat(await res2.json());
    for(let i = 0; i < result.length; i++){
      fetch(process.env.REACT_APP_API + "/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          userId: result[i].id,
          content: student.fullname + " đã yêu cầu phúc khảo.",
          link: "/viewGrade/" + student.IDstudent + "/" + match.params.classId + "/1"
        }),
      }).then((res) => {
        if (!res.ok) {
          setError(true);
        }
      });
    }
  };

  const getReview = async (gradeId) => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    const res = await fetch(process.env.REACT_APP_API + "/review/" + gradeId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if(res.ok){
      const result = await res.json();
      if(result.result === 1){
        return true;
      }
      else {
        return false;
      }
    }
    else {
      setError(true);
      return false;
    }
  }
  */

  const generateComments = () => {
    return comments.map(comment => 
      <>
      <ListItem >
        <ListItemText primary={comment.isTeacher ? "Giáo viên" : "Học sinh"}
                      secondary={comment.comment}/>
      </ListItem>
      <Divider/>
      </>
    )
  }

  return (
    <div>
      {error ? <Redirect to='/login' /> :
      <>
        
        <Box sx={{mx: 35, my: 5}} >
          <List xs={12}>
            <ListItem >
              <ListItemText primary={
                <Typography variant="h6" style={{ color: "blue" }}>{grade === null ? "" : grade.studentId}</Typography>
                } secondary={"Cột điểm: " + (assignment === null ? "" : assignment.name)}
              />

              <ListItemText primary={"Điểm hiện tại: " + (grade === null ? "" : grade.point)}/>
              <ListItemText primary={"Điểm mong muốn: " + (review === null ? "" : review.gradeWant)}
                            secondary={"Lý do: " + (review === null ? "" : review.explaination)}
              />
            </ListItem>

            
            <Divider style={{background: "blue"}}/>
            
            {generateComments()}

          </List>
        </Box>
      </>
      }
  </div>
  );
}

export default ReviewDetail;