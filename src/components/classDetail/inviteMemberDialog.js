import { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

function InviteMemberDialog({isOpened, close, isInviteTeacher, inviteMember}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const changeEmail = (event) => {
    setEmail(event.target.value);
  }

  return (
    <div>
      <Dialog open={isOpened} onClose={close} fullWidth={true}>
        <DialogTitle>{isInviteTeacher ? "Mời giáo viên" : "Mời học viên"}</DialogTitle>
        <DialogContent>
          <TextField
            error= {error}
            margin="dense"
            id="email"
            label="Email"
            placeholder="Nhập email"
            fullWidth
            helperText={error ? "Email không đúng định dạng" : ""}
            variant="outlined"
            value={email}
            onChange={(event) => changeEmail(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            close();
            setEmail("");
            setError(false);
            }
          }>Hủy</Button>
          <Button onClick={() => {
            if(email.includes('@'))
            {
              inviteMember(email);
              setEmail("");
              setError(false);
            }
            else{
              setError(true);
            }
          }} disabled= {!(email !== "")}>
            Mời
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InviteMemberDialog;