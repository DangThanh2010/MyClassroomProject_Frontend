import {
  TableRow,
  TableCell,
  OutlinedInput,
  Input
} from "@mui/material";

import { useState } from "react";


export default function DetailGrade({ rows, page, rowsPerPage, columns }) {
  return (
    <>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          const name = row.fullName
            ? `${row.fullName}(${row.studentId})`
            : row.studentId;
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
              <TableCell>{name}</TableCell>
              {columns.map((column, index) => {
                let value;
                if (column.id === row.AssignmentId) {
                  value = row.point;
                }
                return (
                  <>
                    <TableCell key={column.id} align={"right"} sx = {{border: 1}} minWidth={2}>
                      {value} / 100
                    </TableCell>
                  </>
                );
              })}
            </TableRow>
          );
        })}
    </>
  );
}
