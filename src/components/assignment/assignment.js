import React from "react";
import { TextField, Button, Box, Grid } from "@mui/material";
import { useState } from "react";
function Assignment({ item }) {
  const [IsEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSave = () => {
    setIsEdit(false);
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
            label="Tên"
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            disabled={!IsEdit}
            defaultValue={item.point}
            label="Điểm"
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={4}>
          <EditAndSave />
        </Grid>
        <Grid item xs={8} >
          <Button variant="outlined" color="error">
              Xóa
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Assignment;
