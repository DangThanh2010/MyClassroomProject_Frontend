import { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

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
        <DialogTitle>Create class</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Class name"
            fullWidth
            variant="outlined"
            value={nameValue}
            onChange={(event) => changeName(event)}
          />
          <TextField
            margin="dense"
            id="subject"
            label="Subject"
            fullWidth
            variant="outlined"
            value={subjectValue}
            onChange={(event) => changeSubject(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={() => {
            createClass(nameValue, subjectValue);
            setNameValue("");
            setSubjectValue("");
          }} disabled= {!(nameValue !== "")}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateClassDialog;