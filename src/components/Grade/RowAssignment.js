import { TableRow, TableCell } from "@mui/material";

export default function RowAssignment({ columns }) {
  return (
    <TableRow>
      <TableCell>Sort by Name</TableCell>
      {columns.map((column) => (
        <TableCell
          key={column.id}
          align={"right"}
          style={{ minWidth: 170 }}
        >
          {column.name}
        </TableCell>
      ))}
    </TableRow>
  );
}
