import * as React from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  //   FormControlLabel,
  //   Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  //Form hook
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  // Fetch data
  const fetchData = async (title, description) => {
    await fetch("http://localhost:8080/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then((res) => res.json())
      .then((result) => alert(result.message + ". Please reload the page"))
      .catch((err) => console.error(err));
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
          Register Account
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
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                {...register("fullName", { required: true, maxLength: 20 })}
                
              />
              {errors.fullName && (
                <Alert severity="error" sx = {{ mt: 1}}>FullName dont over 20 characters</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="Email"
                required
                fullWidth
                id="Email"
                label="Email"
                autoFocus
                {...register("Email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                })}
              />
              {errors.Email && (
                <Alert severity="error" sx = {{ mt: 1}}>Invalid email address</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="Password"
                required
                fullWidth
                id="Password"
                label="Password"
                autoFocus
                type="password"
                {...register("password", { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="IDStudent"
                fullWidth
                id="IDStudent"
                label="ID Student"
                autoFocus
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
