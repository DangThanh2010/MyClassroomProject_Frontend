import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Divider, Grid, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import MyAppBar from '../home/myAppBar';



function ReviewDetail({match}){

  const [isLoaded, setIsLoaded] = useState(false);
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [grade, setGrade] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [student, setStudent] = useState(null);
  const [comment, setComment] = useState("");
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
            setStudent(result.student);
            setIsLoaded(true);
          }
        });
      }
    });
  }, [isLoaded]);

  const sendComment = async () => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    
    fetch(process.env.REACT_APP_API + "/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        reviewId: match.params.reviewId,
        isTeacher: parseInt(match.params.role) !== 0 ? true : false,
        comment: comment
      }),
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          setIsLoaded(false);
        });
      }
    });
    if(parseInt(match.params.role) !== 0){
      fetch(process.env.REACT_APP_API + "/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          userId: student.id,
          content: "Giáo viên đã thêm bình luận mới vào bài phúc khảo của bạn.",
          link: "/reviewDetail/" + review.id + "/0"
        }),
      }).then((res) => {
        if (!res.ok) {
          setError(true);
        }
      });
    }
    else {
      const res = await fetch(process.env.REACT_APP_API + "/userInClass/" + grade.ClassId + "?role=Teacher", {
        headers: {'Content-Type':'application/json',
                  Authorization: 'Bearer ' + token},
      });
      const res2 = await fetch(process.env.REACT_APP_API + "/userInClass/" + grade.ClassId + "?role=Creator", {
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
            content: student.fullname + " đã thêm bình luận về bài phúc khảo của họ.",
            link: "/reviewDetail/" + review.id + "/1"
          }),
        }).then((res) => {
          if (!res.ok) {
            setError(true);
          }
        });
      }
    }
  };

  const changeComment = (event) => {
    setComment(event.target.value);
  }

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
        <MyAppBar></MyAppBar>
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

            <Grid container spacing={2} justifyContent="space-evently">
              <Grid item xs={10}>
      
                <TextField
                  margin="dense"
                  id="comment"
                  label="Nhập bình luận"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={comment}
                  onChange={(event) => changeComment(event)}
                />
                
              </Grid>
              <Grid item xs={2}>
                <Button sx={{mt: 1}} variant="contained" endIcon={<SendIcon />} onClick={() => {
                  sendComment();
                  setComment("");
                        
                }} disabled= {!(comment !== "")}>
                  Gửi
                </Button>
              </Grid>
            </Grid>
          </List>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/class/" + (grade === null ? "" : grade.ClassId)}> Quay lại lớp</Link>
            </Grid>
          </Grid>
        </Box>
      </>
      }
  </div>
  );
}

export default ReviewDetail;