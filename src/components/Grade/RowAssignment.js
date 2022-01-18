import { Button, TableCell, TableRow } from "@mui/material";

export default function RowAssignment({ columns, importGradeFile, markDone, role }) {

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
      <TableCell>Học sinh</TableCell>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          align={"right"}
          style={{ minWidth: 170 }}
        >
          <>
            <div>{column.name}</div>
            {role === 1 || role === 2 ?
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
              : <></> }
            <Button
              variant="outlined"
              component="label"
              sx={{ mt: 1, mb: 1, ml: 1 }}
            >
              Hoàn thành
              <input
                hidden
                id="markColumnDone"
                name="markColumnDone"
                accept=".csv"
                onClick={() => markDone(column.id) }
                multiple={false}
              />
            </Button>
          </>

        </TableCell>
      ))}
      <TableCell 
          align={"right"}
          style={{ minWidth: 170 }}>Tổng điểm</TableCell>
    </TableRow>
  );
}
