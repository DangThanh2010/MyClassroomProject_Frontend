import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
function Assignment({ item, deleteAssignment, updateAssignment }) {
  const [IsEdit, setIsEdit] = useState(false);
  const [nameValue, setNameValue] = useState(item.name);
  const [pointValue, setPointValue] = useState(item.point);
  
  const changeName = (event) => {
    setNameValue(event.target.value);
  }

  const changePoint= (event) => {
    setPointValue(event.target.value);
  }
  
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSave = () => {
    setIsEdit(false);
    updateAssignment(nameValue, pointValue);
  };
  function EditAndSave() {
    const result = !IsEdit ? (
      <Button variant="contained" onClick={handleEdit}>
        Cập nhật
      </Button>
    ) : (
      <Button variant="contained" onClick={handleSave}>
        Lưu
      </Button>
    );
    return result;
  }

  return (
    <Box component="form" noValidate maxWidth={400} sx={{padding: 2, mt: 1, display: 'flex', border: 1, borderColor: 'blue', borderRadius: 5 }}>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <TextField
            required
            disabled={!IsEdit}
            defaultValue={item.name}
            // value={nameValue}
            label="Tên"
            fullWidth={true}
            onChange={(event) => changeName(event)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            disabled={!IsEdit}
            defaultValue={item.point}
            // value={pointValue}
            label="Điểm"
            fullWidth={true}
            onChange={(event) => changePoint(event)}
          />
        </Grid>
        <Grid item xs={4}>
          <EditAndSave />
        </Grid>
        <Grid item xs={8} >
          <Button variant="outlined" color="error" onClick={deleteAssignment}>
              Xóa
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Assignment;
