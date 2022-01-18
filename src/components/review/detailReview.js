import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CardHeader } from "@mui/material";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { MoreVert, PersonAdd } from "@mui/icons-material";
import MyAppBar from "../home/myAppBar";
import ListReview from "./listReview";
import EditPointDialog from "./editPointDialog";

function DetailReview() {
  const location = useLocation();
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [isOpenedDialog, setIsOpenedDialog] =
    useState(false);
  const [idGrade, setIdGrade] = useState(null);
  const openDialog = () => {
    setIsOpenedDialog(true);
  };
console.log('data', data)
  const closeDialog = () => {
    setIsOpenedDialog(false);
  };
  useEffect(() => {
    if (location.state) setData(location.state.member);
  }, [location]);
  const requestEdit = async (point) => {
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
  };
  return (
    <div>
      {error ? (
        <Redirect to="/login" />
      ) : (
        <>
          <MyAppBar />
          <Box sx={{ mx: 5, my: 5 }}>
            <ul>
            <li>
              <b>MSSV: </b>
              {data.studentId}
            </li>
            <li>
              <b>Họ tên: </b>
              {data.fullName}
            </li>
            <li>
              <b>Bài tập: </b>
              {data.name}
            </li>
            <li>
              <b>Điểm số hiện tại: </b>
              {data.point}
            </li>
            <li>
              <b>Điểm số mong muốn: </b>
              {data.gradeWant}
            </li>
            <li>
              <b>Lý do: </b>
              {data.explaination}
            </li>
            <li>
              <b>Ngày phúc khảo: </b>
              {new Date(data.createdAt).toLocaleDateString()}
            </li>
          </ul>
          <EditPointDialog
            isOpened={isOpenedDialog}
            close={closeDialog}
            requestEdit={requestEdit}
            currentPoint={data.point}
          />
          </Box>
          
          <Button variant="contained" onClick={async () => {openDialog()}}>Chấp nhận</Button>
          <Button variant="outlined" color="error">Từ chối</Button>
        </>
      )}
    </div>
  );
}

export default DetailReview;
