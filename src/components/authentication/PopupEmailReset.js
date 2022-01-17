import { useState, useEffect } from "react";
import randomstring from "randomstring";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from "@mui/material";

export default function PopupEmailReset() {
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
      console.log(email);
    if (email) feactRepass(email);
    setOpen(false);
  };

  const feactRepass = async (email) => {
    const splitChar = "apyng";
    const e = email.split('@');
    const link = process.env.REACT_APP_FRONTEND + "/resetPassword/" + randomstring.generate(10) + splitChar + e[0] + splitChar + randomstring.generate(7);
    await fetch(process.env.REACT_APP_API + "/user/sendMailRepass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        link: link,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
          setEmail(null);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Link variant="body2" onClick={handleClickOpen}>
        Quên mật khẩu
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập email dùng để đặt lại mật khẩu
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange = {e => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
          <Button onClick={handleSubmit}>Gửi Email Reset</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
