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
import ExportListGrade from "./exportListGrade";

export default function ListGrade({idClass}) {
  
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

  const handleSend = (studentData, point) => {
    const token = getToken();
    fetchGradeData(token, studentData.studentId, studentData.fullName,studentData.assignmentId,point);
  };

  const fetchGradeData = (token, studentId, fullName, assignmentId, point) => {
    
    fetch(process.env.REACT_APP_API + "/grade/UpdateOrCreate/" + idClass, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        studentId: studentId,
        fullName: fullName,
        assignmentId: assignmentId,
        point: point,
      }),
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if (result) {
            setIsLoaded(!isLoaded);
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
          if (result.data) {
            feactTableData(result.data);
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
      let mssv = [{studentId: row[0].studentId, fullName: row[0].fullName}]; //[{studentId: row[0].studentId, fullName: row[0].fullName}]

      for (let i = 1; i < row.length; i++) {
        if (row[i-1].studentId !== row[i].studentId) {
          mssv.push({studentId: row[i].studentId, fullName: row[i].fullName});
        }
      }
      for (let i = 0; i < mssv.length; i++) {
        const objects = { studentId: mssv[i].studentId, fullName: mssv[i].fullName, arrayPoint: [] };
        for (let j = 0; j < row.length; j++) {
          let dataPoint = {
            AssignmentId: row[j].AssignmentId,
            point: row[j].point,
          };
          if (row[j].studentId === mssv[i].studentId) {
            objects.arrayPoint.push(dataPoint);
          }
        }
        dataTable.push(objects);
      }
      setData(dataTable);
      return;
    }
    return null;
  };

  const importStudentFile = (body) => {
    const token = getToken();
    fetch(process.env.REACT_APP_API + "/grade/listStudent/" + idClass, {
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

  const importGradeFile = (body) => {
    const token = getToken();
    fetch(process.env.REACT_APP_API + "/grade/listGrade/" + idClass, {
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
            setIsLoaded(!isLoaded);
          }
        });
      }
    });
  }; 
  const markDone = (body) => {
    const token = getToken();
    fetch(process.env.REACT_APP_API + "/grade/markDone/" + idClass, {
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
          console.log(result);
          if (result) {
            setIsLoaded(!isLoaded);
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
      <ImportStudent importStudentFile={importStudentFile}/>
      <ExportListGrade data={data} columns={columns}/>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <RowAssignment columns={columns} importGradeFile={importGradeFile } markDone={markDone}/>
              
            </TableHead>
            <TableBody>
              <DetailGrade
                rows={rows}
                columns={columns}
                handleSend={handleSend}
                data={data}
                classId={idClass}
              ></DetailGrade>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
