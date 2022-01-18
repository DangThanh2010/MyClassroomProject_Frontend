import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert, Avatar, Box, Button,
  CssBaseline, Grid, Link,
  Paper, Snackbar, TextField, Typography
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom';
import LoginGoogle from "./LoginGooglePage";
import PopupEmailReset from "./PopupEmailReset";


export default function LoginPage() {
  const [Errors, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  //Form hook
  const {
    handleSubmit,
    register,
  } = useForm();
  const onSubmit = (data) => {
    fetchData(data);
  };
  // Fetch data
  const fetchData = async ({ Email, password }) => {
    await fetch(process.env.REACT_APP_API + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: Email,
        password: password,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 400) {
            setError("Vui lòng điền email và password!");
          } else if (res.status === 401) {
            setError("Sai Email hoặc mật khẩu, hoặc tài khoản chưa kích hoạt hoặc bị cấm!");
          } else {
            setError("Đã xảy ra lỗi gì đó, Vui lòng thử lại.");
          }
          setOpen(true);
        } else {
          res.json().then((result) => {
            if (result) {
              localStorage.setItem("token", JSON.stringify(result.token));
              localStorage.setItem("expAt", JSON.stringify(result.expAt));
              setLoginSuccess(true);
            }
          });
        }
      })
      .catch((err) => console.error(err));
  };
  // handleClose
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  // set Redirect
  const LoginGoogleSuccess = () => {
    setLoginSuccess(true);
  }
  return (
    <div>
    {loginSuccess ? <Redirect to='/' /> :
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "none",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng nhập vào hệ thống
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("Email", {
                  required: "Required",
                })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{ mb: 2 }}
                {...register("password", { required: true })}
              />
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={5}>
                  <Button type="submit" fullWidth variant="contained" sx={{lineHeight: 2}}>
                    Đăng nhập
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  {/* <Button type="submit" fullWidth variant="contained">
                    
                  </Button> */}
                </Grid>
                <Grid item xs={5}>
                  <LoginGoogle LoginGoogleSuccess = {LoginGoogleSuccess}></LoginGoogle>
                </Grid>
              </Grid>
              <Box sx={{height: 15}}> </Box>
              <Grid container>
                <Grid item xs>
                  <PopupEmailReset/>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Bạn chưa có tài khoản? Đăng ký"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
              {Errors}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    }
    </div>
  );
}
