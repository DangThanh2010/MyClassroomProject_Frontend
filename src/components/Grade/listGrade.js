import { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
} from "@mui/material";

import RowAssignment from "./RowAssignment";
import DetailGrade from "./detailGrade";

import ExportStudent from "./exportStudent";
import ExportGrade from "./exportGrade";



export default function ListGrade({}) {
  const idClass = 1;
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const token = getToken();
    fetchColumnsData(token);
    fetchRowsData(token);
    
  }, [isLoaded]);

  const getToken = () => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    return token;
  }
  const fetchColumnsData = (token) => {
    fetch(process.env.REACT_APP_API + "/assignment/" + idClass, {
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
      })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            if (result) {
              setIsLoaded(true);
              setColumns(result);
            }
          });
        }
      })
  }

  const fetchRowsData = (token) => {
    fetch(process.env.REACT_APP_API + "/grade/" + idClass, {
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
      })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            if (result) {
              setIsLoaded(true);
              setRows(result.data);
            }
          });
        }
      })
  }
  return (
    <div>
     <ExportStudent />
      <ExportGrade />

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <RowAssignment columns={columns} />
            </TableHead>
            <TableBody>
              <DetailGrade
                rows={rows}
                page={page}
                rowsPerPage={rowsPerPage}
                columns={columns}
              ></DetailGrade>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
