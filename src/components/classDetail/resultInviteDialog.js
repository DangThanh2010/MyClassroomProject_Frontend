import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';

function ResultInviteDialog({isOpened, close, result}) {

  return (
    <div>
      <Dialog open={isOpened} onClose={close} fullWidth={true}>
        <DialogContent>
          <Typography variant="h6" sx={{color: "blue"}}>
            {result}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResultInviteDialog;