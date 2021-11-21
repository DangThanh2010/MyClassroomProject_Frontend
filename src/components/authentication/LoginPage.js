import * as React from "react";
import { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  // FormControlLabel,
  // Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import LoginGoogle from "./LoginGooglePage";
import { useForm } from "react-hook-form";
function CheckExpireToken(){
  const timer = new Date().getTime();
  if(localStorage && localStorage.getItem("expAt")){
      const expAt = localStorage.getItem("expAt");
      if(expAt > timer)
          return true;
  }
  return false;
  
}
export default function LoginPage() {
  const [Errors, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);
  //Form hook
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    //console.log(data);
    fetchData(data);
  };
  // Fetch data
  const fetchData = async ({ Email, password }) => {
    await fetch("http://localhost:8080/auth/login", {
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
            setError("Please fill all the fields correctly!");
          } else if (res.status === 401) {
            setError("Invalid email or password!");
          } else {
            setError("Something went wrong! Please try again later.");
          }
          setOpen(true);
        } else {
          res.json().then((result) => {
            if (result) {
              alert(result.message);
              console.log(result.user);
              localStorage.setItem("user", JSON.stringify(result.user));
              localStorage.setItem("token", JSON.stringify(result.token));
              localStorage.setItem("expAt", JSON.stringify(result.expAt));
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
  return (
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
            Login into your classroom
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
              label="Email Address"
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
              label="Password"
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
                  Login
                </Button>
              </Grid>
              <Grid item xs={2}>
                {/* <Button type="submit" fullWidth variant="contained">
                  
                </Button> */}
              </Grid>
              <Grid item xs={5}>
                <LoginGoogle></LoginGoogle>
              </Grid>
            </Grid>
            <Box sx={{height: 15}}> </Box>
            <Grid container>
              <Grid item xs>
                <Link href="" variant="body2"></Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Register"}
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
  );
}
