import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import MyAppBar from "../home/myAppBar";
import EditPointDialog from "./editPointDialog";
import { useToasts } from "react-toast-notifications";

function DetailReview() {
  const { addToast } = useToasts();
  const location = useLocation();
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [isOpenedDialog, setIsOpenedDialog] = useState(false);
  const history = useHistory();
  const openDialog = () => {
    setIsOpenedDialog(true);
  };
  console.log("data", data);
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
    fetch(process.env.REACT_APP_API + "/review/acceptReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: data.id,
        gradeId: data.gradeId,
        gradeNew: point,
      }),
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          setIsOpenedDialog(false);
          addToast("Đã cập nhật điểm thành công", {
            appearance: "success",
            autoDismiss: true,
          });
        });
      }
    });
    const res = await fetch(
      process.env.REACT_APP_API + "/user/byStudentId/" + data.studentId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const result = await res.json();
    console.log("res", result);
    await fetch(process.env.REACT_APP_API + "/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userId: result.result.id,
        content: "Giáo viên đã cập nhật điểm"+ `${data.name}` +"cho bạn",
        link: "/viewGrade/" + result.result.id,
      }),
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      }
      history.push("/");
    });
    history.push("/");
  };
  const refuseReview = async () => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch(process.env.REACT_APP_API + "/review/refuseReview", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: data.id,
      }),
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          setIsOpenedDialog(false);
          addToast("Đã từ chối yêu cầu thành công", {
            appearance: "success",
            autoDismiss: true,
          });
          history.push("/");
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
                <b>Cấu trúc điểm: </b>
                {data.AssignmentPoint}
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
              pointWant={data.gradeWant}
            />
          </Box>

          <Button
            variant="contained"
            onClick={async () => {
              openDialog();
            }}
          >
            Chấp nhận
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={async () => {
              refuseReview();
            }}
          >
            Từ chối
          </Button>
        </>
      )}
    </div>
  );
}

export default DetailReview;
