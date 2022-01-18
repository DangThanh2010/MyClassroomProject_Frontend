import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {
  Alert, Avatar, Box, Button,
  Container,
  CssBaseline, Grid, Link, Snackbar, TextField, Typography
} from "@mui/material";
import randomstring from "randomstring";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const [EmailReset, setEmailReset] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  //Form hook
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm();
  const onSubmit = async(data) => {
    fetchData(data);
    // await getID(data.Email);
  };

  const sendMailActive = async (id, email ) => {
    const splitChar = "abzkg";
    const link = process.env.REACT_APP_FRONTEND + "/activeAccount/" + GenerateLink(id, splitChar);
    await fetch(process.env.REACT_APP_API + "/user/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        link: link,
        email: email,
        splitChar: splitChar,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
          setId(null);
      })
      .catch((err) => console.error(err));
  }
  const GenerateLink = (id, splitChar) => {
    return randomstring.generate(10) + splitChar + id + splitChar + randomstring.generate(6);
  }
  // Fetch data
  const fetchData = async ({ fullName, Email, password }) => {
    
    await fetch(process.env.REACT_APP_API + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: fullName,
        email: Email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('result', result);
        setMessage(result.message);
        setSuccess(result.success);
        if(result.success){
          sendMailActive(result.data.id, Email);
        }
        setOpen(true);
        
        
      })
      .catch((err) => console.error(err));
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Container component="main" maxWidth="xs">
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
        <Typography component="h2" variant="h5">
          Đăng ký tài khoản
        </Typography>
        {/* Form register */}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="fullname"
                required
                fullWidth
                label="Họ tên"
                autoFocus
                {...register("fullName", { required: true, maxLength: 20 })}
              />
              {errors.fullName && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  Họ tên không quá 20 ký tự
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                {...register("Email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                })}
              />
              {errors.Email && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  Địa chỉ email không hợp lệ
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="Password"
                required
                fullWidth
                id="Password"
                label="Mật khẩu"
                type="password"
                {...register("password", { required: true })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng ký
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Bạn đã có tài khoản? Đăng nhập
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* Message from API */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={success === true ? 'success' : 'error'} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
