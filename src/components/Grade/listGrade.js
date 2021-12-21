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
import ImportStudent from "./importStudent";

export default function ListGrade({}) {
  const idClass = 1;
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [data, setData] = useState(
    Array.from({ length: rows }, () => Array.from({ length: rows }, () => null))
  );

  useEffect( () => {
    const token = getToken();
    fetchColumnsData(token);
    fetchRowsData(token);
    feactTableData(rows);
  }, [isLoaded]);

  const getToken = () => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    return token;
  };

  const handleSend = (id, point) => {
    const token = getToken();
    fetchGradeData(token, id, point);
  };

  const fetchGradeData = (token, id, point) => {
    fetch(process.env.REACT_APP_API + "/grade", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id: id,
        point: point,
      }),
    }).then((res) => {
      if (!res.ok) {
        setError(true);
        console.log(res);
      } else {
        res.json().then((result) => {
          if (result) {
            setIsLoaded(true);
          }
        });
      }
    });
  };

  const fetchColumnsData = (token) => {
    fetch(process.env.REACT_APP_API + "/assignment/" + idClass, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if (result) {
         
            setColumns(result);
            setIsLoaded(true);
            console.log(columns);
          }
        });
      }
    });
  };

  const fetchRowsData = (token) => {
    fetch(process.env.REACT_APP_API + "/grade/" + idClass, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if (result) {
            feactTableData(result.data[0]);
            setIsLoaded(true);
          }
        });
      }
    });
  };

  const feactTableData = (result) => {
    const row = Array.from(result);
    let dataTable = [];
    
    if (row.length > 0) {
      let mssv = [row[0].studentId];

      for (let i = 1; i < row.length; i++) {
        if (row[i-1].studentId !== row[i].studentId) {
          mssv.push(row[i].studentId);
        }
      }
      console.log(mssv);
      for (let i = 0; i < mssv.length; i++) {
        const objects = { studentId: mssv[i], arrayPoint: [] };
        for (let j = 0; j < row.length; j++) {
          let dataPoint = {
            AssignmentId: row[j].AssignmentId,
            point: row[j].point,
          };
          if (row[j].studentId === mssv[i]) {
            objects.arrayPoint.push(dataPoint);
          }
        }
        console.log("object: ", objects);
        dataTable.push(objects);
      }
      setData(dataTable);
      console.log("data:", dataTable);
      setIsLoaded(true);
      return;
    }
    return null;
  };

  const importStudetFile = (body) => {
    const token = getToken();
    fetch(process.env.REACT_APP_API + "/grade/" + idClass, {
      method: 'POST',
      headers: {
        Authorization: "Bearer " + token,
      },
      body: body
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if (result) {
            setIsLoaded(false);
          }
        });
      }
    });
  }; 

  return (
    <div>
      <ExportStudent />
      <ExportGrade />
      <br></br>
      <ImportStudent importStudetFile={importStudetFile}/>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <RowAssignment columns={columns} />
              
            </TableHead>
            <TableBody>
              <DetailGrade
                rows={rows}
                columns={columns}
                handleSend={handleSend}
                data={data}
                sumPointAssignment={500}
              ></DetailGrade>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
