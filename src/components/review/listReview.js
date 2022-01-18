import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Typography,
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
  const header = {fontSize: 25, color: "blue", fontWeight: "bold" };
  const resolve = (member) => {
    return history.push({ pathname: "/review", state: { member } });
  };
  const generateReviews = (listReview) => {
    return listReview.map(
      (member) => (
        <TableRow key={member.studentId}>
          <TableCell>{member.studentId}</TableCell>
          <TableCell>{member.name}</TableCell>
          <TableCell>
            {new Date(member.createdAt).toLocaleDateString('en-GB')}
          </TableCell>
          <TableCell align="right">
            {" "}
            <Button variant="contained" onClick={() => resolve(member)}>
              Giải quyết
            </Button>
          </TableCell>
        </TableRow>
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
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ marginTop: "15px" }}
          >
            Danh sách phúc khảo
          </Typography>
          <Table size="small" sx={{ marginTop: "15px" }}>
            <TableHead>
              <TableRow>
                <TableCell sx = {header}>Học sinh</TableCell>
                <TableCell sx = {header}>Bài tập</TableCell>
                <TableCell sx = {header}>Ngày</TableCell>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{generateReviews(review)}</TableBody>
          </Table>
        </>
      )}
    </div>
  );
}

export default ListReview;
