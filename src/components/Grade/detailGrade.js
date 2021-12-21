import { TableRow, TableCell, Input, Button } from "@mui/material";

import { useState, useRef, useEffect } from "react";

export default function DetailGrade({ rows, columns, handleSend, data }) {
  const [idEdit, setIdEdit] = useState(null);
  const [valueEdit, setValueEdit] = useState(null);
  const handleChange = (event, id) => {
    if (idEdit) {
      setIdEdit(id);
    }
    if (idEdit !== id) {
      setIdEdit(id);
      setValueEdit(event.target.value);
    } else {
      setValueEdit(event.target.value);
    }
    console.log(idEdit);
    console.log(valueEdit);
  };
  const onSave = () => {
    console.log(idEdit + valueEdit);
    if (valueEdit && idEdit) {
      handleSend(idEdit, valueEdit);
    } else {
      alert("Something went wrong, Please reload the page");
    }
    setIdEdit(null);
    setValueEdit(null);
  };

  const flexContainer = {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    justifyContent: "flex-end",
  };

  return (
    <>
      {data
        ? data.map((row, index) => {
            const name = row.studentId;
            return (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={index + row.studentId}
              >
                <TableCell>{name}</TableCell>
                {columns.map((column, index) => {
                    let value = "";
                    row.arrayPoint.map((arrPoint, idx) =>{
                      if(column.id === arrPoint.AssignmentId){
                      value = arrPoint.point;
                    }
                    })
                    
                    return (
                      <TableCell key={index} align={"right"} sx={{ border: 1 }}>
                        <div style={flexContainer}>
                          <Input
                            defaultValue={value}
                            className="input-grade"
                            key="input"
                            onChange={(event) => handleChange(event, row.id)}
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
                          <Button key="btn-Save" onClick={onSave}>
                            Save
                          </Button>
                        </div>
                      </TableCell>
                    );
                  
                })}
              </TableRow>
            );
          })
        : "Loading..."}
    </>
  );
}
