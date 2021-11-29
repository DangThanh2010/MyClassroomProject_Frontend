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
        Edit
      </Button>
    ) : (
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    );
    return result;
  }

  return (
    <Box component="form" noValidate sx={{ mt: 1, display: 'flex' }}>
      <div style={{ margin: "20px 10px" }}>
        <TextField
          disabled={!IsEdit}
          defaultValue={item.name}
          label="Name"
          sx={{ mb: 1, display: "block" }}
        />
        <TextField
          disabled={!IsEdit}
          defaultValue={item.points}
          label="Point"
        />
        <Grid container sx={{ mt: 1 }}>
          <Grid item xs>
            <EditAndSave />
          </Grid>
          <Grid item xs>
            <Button variant="outlined" color="error">
              Remove
            </Button>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
export default Assignment;
