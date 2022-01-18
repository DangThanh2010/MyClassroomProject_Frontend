import { RateReview } from '@mui/icons-material';
import { Avatar, Box, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import RequestReviewDialog from './requestReviewDialog';



function ViewGrade({match}){

  const [isLoaded, setIsLoaded] = useState(false);
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [isOpenedDialog, setIsOpenedDialog] =
    useState(false);
  const [idGrade, setIdGrade] = useState(null);
  const [reviewId, setReviewId] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    
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

  const openDialog = () => {
    setIsOpenedDialog(true);
  };

  const closeDialog = () => {
    setIsOpenedDialog(false);
  };

  const getOverallGrade = () => {
    let result = 0;
    grades.map(grade =>  result += (grade.grade.point * grade.assignment.point)/100);
    return result;
  }

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
        return result.review;
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

  const generateGrades = () => {
    return grades.map(grade => 
      <>
      <ListItem secondaryAction={
        <IconButton edge="end" aria-label="more" onClick={async () => {
          const review = await getReview(grade.grade.id);
          if(parseInt(match.params.role) !== 0 || review){
            if(review){
              setReviewId(review.id);
            }
          }else {
            openDialog();
            setIdGrade(grade.grade.id);
          }
          
        }}>
          <RateReview />
        </IconButton>
      }
      >
        <ListItemText primary="" />
        <ListItemText primary={(grade.assignment  === null ? "" : grade.assignment.name) + ": " + (grade.grade === null ? "" : grade.grade.point)}/>
      </ListItem>
      </>
    )
  };

  const redirectToReviewDetail = (reviewId) => {
    return (
      <Redirect to={"/reviewDetail/" + reviewId + "/" + match.params.role}></Redirect>
    )
  }

  return (
    <div>
      {error ? <Redirect to='/login' /> :
      <>
        {reviewId !== null ? redirectToReviewDetail(reviewId) : 
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

            <Divider/>
            <ListItem>
              <ListItemText primary=""/>
              <ListItemText primary={"Tổng kết: " + Math.round(getOverallGrade() * 100) / 100}/>
            </ListItem>
            

          </List>
          {parseInt(match.params.role) !== 0 &&
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/class/" + match.params.classId}> Quay lại lớp</Link>
            </Grid>
          </Grid>
          }

          <RequestReviewDialog
            isOpened={isOpenedDialog}
            close={closeDialog}
            requestReview={requestReview}
          />
          
        </Box>
        }
      </>
      }
  </div>
  );
}

export default ViewGrade;