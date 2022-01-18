import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText
} from "@mui/material";
import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

function ListReview({ idClass }) {
  const [review, setReview] = useState([]);
  const [error, setError] = useState(false);
  const history = useHistory();
  useEffect(() => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch(process.env.REACT_APP_API + "/review/getByClassId/" + idClass, {
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
            setReview(result);
          }
        });
      }
    });
  }, []);

  const resolve = (member) => {
    return history.push({pathname: '/review', state:{member}});
  };
  const generateReviews = (listReview) => {
    return listReview.map(
      (member) => (
        <ListItem
          style={{ paddingRight: "0px" }}
          secondaryAction={
            <Button variant="contained" onClick={()=>resolve(member)}>
              Giải quyết
            </Button>
          }
        >
          <ListItemText primary={member.studentId} />
          <ListItemText primary={member.name} />
          <ListItemText
            primary={new Date(member.createdAt).toLocaleDateString()}
          />

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
              <ListItem>
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
