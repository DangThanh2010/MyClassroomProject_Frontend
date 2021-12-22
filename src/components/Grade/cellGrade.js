import { useState } from "react";

import { TableCell, Input, Button, TextField } from "@mui/material";

const CellGrade = ({key, value, studentId, fullName, assignmentId, onSave}) => {
  const [valueEdit, setValueEdit] = useState(value);
  const [edit, setEdit] = useState(false);

  const handleChange = (event) => {
    setValueEdit(event.target.value);
    setEdit(true);
  }

  const flexContainer = {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    justifyContent: "flex-end",
  };

  return (
    <TableCell key={key} align={"right"} sx={{ border: 1 }}>
      <div style={flexContainer}>
        <TextField
          variant="standard" 
          value={edit ? valueEdit : value}
          className="input-grade"
          key="input"
          onChange={(event) =>
            handleChange(event)
          }
        />
        <div
          key="maxGrade"
          style={{
            textAlign: "center",
            paddingTop: "2.5%",
            fontSize: 16,
          }}
        >
          / 100
        </div>
          <Button key="btn-Save" onClick={ () => {
            const dataEdit = {
              studentId: studentId,
              fullName: fullName,
              assignmentId: assignmentId,
            };
            onSave(dataEdit, valueEdit);
          }}>
            Lưu
          </Button>
        </div>
      </TableCell>

    )
}

export default CellGrade;