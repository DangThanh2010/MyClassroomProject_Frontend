import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

function EditPointDialog({ isOpened, close, requestEdit, pointWant }) {
  const [pointValue, setPointValue] = useState("");

  const changePoint = (event) => {
    setPointValue(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={() => {
          close();
          setPointValue("");
        }}
      >
        <DialogTitle>Cập nhật điểm</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            margin="dense"
            id="point"
            label="Điểm cập nhật"
            fullWidth
            variant="outlined"
            placeholder={pointWant}
            value={pointValue}
            onChange={(event) => changePoint(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              close();
              setPointValue("");
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={() => {
              requestEdit(pointValue);
              setPointValue("");
            }}
            disabled={
              !(
                pointValue !== "" &&
                parseInt(pointValue) !== null &&
                parseInt(pointValue) !== undefined &&
                parseInt(pointValue) >= 0 &&
                parseInt(pointValue) <= 100
              )
            }
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditPointDialog;
