import { TableRow, TableCell, Button } from "@mui/material";

export default function RowAssignment({ columns, importGradeFile }) {

  const handleChangeFile = (event, assignmentId) => {
    if(event.target.files[0]){
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("gradeFile", file);
      formData.append("assignmentId", assignmentId);
      
      importGradeFile(formData);
    }
  }

  return (
    <TableRow>
      <TableCell>Sort by Name</TableCell>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          align={"right"}
          style={{ minWidth: 170 }}
        >
          <>
            <div>{column.name}</div>
            <Button
              variant="outlined"
              component="label"
              sx={{ mt: 1, mb: 1 }}
            >
              Nhập file điểm
              <input
                type="file"
                hidden
                id="gradeFile"
                name="gradeFile"
                accept=".csv"
                onClick={(event) => event.target.value = null }
                multiple={false}
                onChange={(event) => handleChangeFile(event, column.id)}
              />
            </Button>
          </>

        </TableCell>
      ))}
    </TableRow>
  );
}
