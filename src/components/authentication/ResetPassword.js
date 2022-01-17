import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Link,
  Box,
  Grid,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
const splitChar = "apyng";
export default function ResetPassword({ match }) {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(null);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(null);
  const feactRepassAccount = async (email, password) => {
    await fetch(process.env.REACT_APP_API + "/user/Repass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if (result) {
              console.log(result);
            setMessage(result.msg);
            setSuccess(result.success);
          }
        });
      }
    });
  };
  const handleSubmit = (e, password) => {
    e.preventDefault();
    if (match.params.link) {
      const link = match.params.link;
      const arr = link.split(splitChar);
      if (password) {
        feactRepassAccount(arr[1], password);
      }
    }
  };


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Typography variant="h6">Đổi mật khẩu</Typography>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => handleSubmit(e, password)}
        sx={{ mt: 3 }}
      >
        <Grid item xs={12}>
          <TextField
            name="Password"
            required
            fullWidth
            id="Password"
            label="Mật khẩu"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Đổi mật khẩu
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={success === true ? 'success' : 'error'} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
