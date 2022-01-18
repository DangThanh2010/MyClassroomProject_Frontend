import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';


function CreateClassDialog({isOpened, close, createClass}) {
  const [nameValue, setNameValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");

  const changeName = (event) => {
    setNameValue(event.target.value);
  }

  const changeSubject= (event) => {
    setSubjectValue(event.target.value);
  }

  return (
    <div>
      <Dialog open={isOpened} onClose={close}>
        <DialogTitle>Tạo lớp mới</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Tên lớp"
            fullWidth
            variant="outlined"
            value={nameValue}
            onChange={(event) => changeName(event)}
          />
          <TextField
            margin="dense"
            id="subject"
            label="Môn học"
            fullWidth
            variant="outlined"
            value={subjectValue}
            onChange={(event) => changeSubject(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Hủy</Button>
          <Button onClick={() => {
            createClass(nameValue, subjectValue);
            setNameValue("");
            setSubjectValue("");
          }} disabled= {!(nameValue !== "")}>
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateClassDialog;