import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';


function RequestReviewDialog({isOpened, close, requestReview}) {
  const [pointValue, setPointValue] = useState("");
  const [explainationValue, setExplainationValue] = useState("");

  const changePoint = (event) => {
    setPointValue(event.target.value);
  }

  const changeExplaination= (event) => {
    setExplainationValue(event.target.value);
  }

  return (
    <div>
      <Dialog open={isOpened} onClose={() => {
            close();
            setPointValue("");
            setExplainationValue("");
          }}>
        <DialogTitle>Yêu cầu phúc khảo</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            margin="dense"
            id="point"
            label="Điểm mong muốn"
            fullWidth
            variant="outlined"
            value={pointValue}
            onChange={(event) => changePoint(event)}
          />
          <TextField
            margin="dense"
            id="explainaton"
            label="Lý do"
            fullWidth
            variant="outlined"
            value={explainationValue}
            onChange={(event) => changeExplaination(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            close();
            setPointValue("");
            setExplainationValue("");
          }}>Hủy</Button>
          <Button onClick={() => {
            requestReview(pointValue, explainationValue);
            setPointValue("");
            setExplainationValue("");
          }} disabled= {!(pointValue !== "" && parseInt(pointValue) !== null && parseInt(pointValue) !== undefined && parseInt(pointValue) >= 0 && parseInt(pointValue) <= 100 )}>
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RequestReviewDialog;