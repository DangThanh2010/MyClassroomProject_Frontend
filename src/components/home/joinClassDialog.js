import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';


function JoinClassDialog({isOpened, close, joinClass}) {
  const [codeClass, setCodeClass] = useState("");

  const changeId = (event) => {
    setCodeClass(event.target.value);
  }

  return (
    <div>
      <Dialog open={isOpened} onClose={close}>
        <DialogTitle>Tham gia lớp</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Mã lớp"
            fullWidth
            variant="outlined"
            value={codeClass}
            onChange={(event) => changeId(event)}
          />
      
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Hủy</Button>
          <Button onClick={() => {
            joinClass(codeClass);
            setCodeClass("");
          }} disabled= {!(codeClass !== "")}>
            Tham gia
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default JoinClassDialog;