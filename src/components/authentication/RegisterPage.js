import * as React from "react";
import { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  //   FormControlLabel,
  //   Checkbox,
  Link,
  Box,
  Grid,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  //Form hook
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    //console.log(data);c
    fetchData(data);
  };
  // Fetch data
  const fetchData = async ({ fullName, Email, password, IDStudent }) => {
    await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: fullName,
        email: Email,
        password: password,
        IDStudent: IDStudent,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setMessage(result.message);
        setSuccess(result.success);
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
                id="fullname"
                label="Họ tên"
                autoFocus
                {...register("fullName", { required: true, maxLength: 20 })}
              />
              {errors.fullName && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  Full name don't over 20 characters
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
                  Invalid email address
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
            <Grid item xs={12}>
              <TextField
                name="IDStudent"
                fullWidth
                id="IDStudent"
                label="Mã số sinh viên"
                type="text"
                {...register("IDStudent")}
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
