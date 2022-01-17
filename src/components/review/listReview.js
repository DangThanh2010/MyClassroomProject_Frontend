import {
    Box, Button, Divider, List,
    ListItem, ListItemText
} from "@mui/material";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
function ListReview({
 
  openInviteTeacherDialog,
  
}) {
    const idClass=1;
  const [isLoaded, setIsLoaded] = useState(false);
  const [creator, setCreator] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [review, setReview]=useState([]);
  const [error, setError] = useState(false);
useEffect(() => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch(
      process.env.REACT_APP_API +
        "/review/getByClassId/" +idClass,
      {
       
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
  
      }
    ).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if (result) {
            setReview(result[0]);
            console.log('result', result)
          }
        });
      }
    });
  }, []);

  const generateReviews = (listReview) => {
    return listReview.map(
      (member) => (
        <ListItem style={{ paddingRight: "0px" }}
          secondaryAction={
            <Button variant="contained">Cập nhật</Button>
          }
        >
          {/* <ListItemAvatar>
            <Avatar alt="avatar" src={member.avatar} />
          </ListItemAvatar> */}
          <ListItemText primary={member.studentId} />
          <ListItemText primary={member.name} />
          <ListItemText primary={member.createdAt} />
          <Divider style={{ background: "blue" }} />
        </ListItem>
        
      ),
      <Divider />
    );
  };

  return (
    <div>
      {error ? (
        <Redirect to="/login" />
      ) : (
        <>
          <Box sx={{ mx: 5, my: 5 }}>
            <List xs={12}>
              <ListItem
            
              >
                <ListItemText
                  primary="Học sinh"
                  sx={{ fontSize: 25, color: "blue" }}
                  disableTypography
                />
                <ListItemText
                  primary="Bài tập"
                  sx={{ fontSize: 25, color: "blue" }}
                  disableTypography
                />
                <ListItemText
                  primary="Ngày"
                  sx={{ fontSize: 25, color: "blue" }}
                  disableTypography
                />
              </ListItem>
              <Divider style={{ background: "blue" }} />
              {generateReviews(review)}
            </List>
          </Box>
        </>
      )}
    </div>
  );
}

export default ListReview;
