import { useEffect, useState } from "react";
import  { Redirect, Link } from 'react-router-dom';

import { Avatar, Button, Container, CssBaseline, TextField, Box, Grid, Typography } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

function MappingAccount(){
  const [idStudent, setIdStudent] = useState("");
  const [haveIdStudent, setHaveIdStudent] = useState(false);
  const [haveUser, setHaveUser] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  const changeIdStudent = (event) => {
    setIdStudent(event.target.value)
  }

  const mapping = () => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }

    fetch("http://localhost:3001/user/myself/mapping", {
      method: 'POST',
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
      body: JSON.stringify({
        "idStudent": idStudent
        })
      })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            if (result) {
              if(result.result === 0){
                setHaveUser(true);
                setHelperText("Mã số sinh viên này đã được sử dụng bởi tài khoản khác.");
              }
              else if(result.result === 1){
                setHaveUser(false);
                setHaveIdStudent(true);
                setHelperText("Đồng bộ thành công.");
              }
              else{
                setHaveUser(true);
                setHelperText("Đã xảy ra lỗi.");
              }
            }
          });
        }
      })
  }

  useEffect(() => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }

    fetch("http://localhost:3001/user/myself/get", {
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
      })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            if (result) {
              if(result.IDstudent && result.IDstudent !== null && result.IDstudent !== "" && result.IDstudent !== undefined)
              {
                setHaveIdStudent(true);
                setIdStudent(result.IDstudent);
                setHelperText("Tài khoản đã đồng bộ với mã số sinh viên.");
              }
            }
          });
        }
      })
  }, [])

  return(
    <div>
      {error ? <Redirect to="/login" /> :
      <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            Đồng bộ mã số sinh viên
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                disabled={haveIdStudent}
                error={haveUser}
                helperText={helperText}
                margin="dense"
                name="idStudent"
                required
                fullWidth
                autoFocus
                id="idStudent"
                label="Mã số sinh viên"
                placeholder="Nhập mã số sinh viên của bạn"
                value={idStudent}
                onChange={(event) => changeIdStudent(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={mapping}
                fullWidth
                variant="contained"
                disabled={haveIdStudent || idStudent === ""}
                sx={{ mt: 3, mb: 2 }}
              >
                Đồng bộ
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/"> Quay lại trang chủ </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
      </>
      }
    </div>
  );
}

export default MappingAccount;