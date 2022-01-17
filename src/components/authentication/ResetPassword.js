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

export default function ResetPassword({ match }) {
  return (
    <>
      <Typography variant="h1">Đổi mật khẩu</Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
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
            {...register("password", { required: true })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="RePassword"
            required
            fullWidth
            id="RePassword"
            label="Nhập lại Mật khẩu"
            type="password"
            {...register("repassword", { required: true })}
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Đổi mật khẩu
        </Button>
      </Box>
    </>
  );
}
