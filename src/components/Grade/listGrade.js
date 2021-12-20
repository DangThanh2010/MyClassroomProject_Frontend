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
    Array.from({ length: rows.length }, () =>
      Array.from({ length: columns.length })
    )
  );

  useEffect(() => {
    const token = getToken();
    fetchColumnsData(token);
    fetchRowsData(token);
    setData(feactTableData(rows, columns));
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
            setRows(result.data[0]);
            setIsLoaded(true);
            
          }
        });
      }
    });
  };

  const feactTableData = (rows, columns) => {
    if(rows || columns) {
      return null;
    }
    let dataTable = [];
    let objects = [];
    for (let j = 0; j < rows.length; j++) {
      objects["studentId"] = rows[j].studentId;
      objects["fullName"] = rows[j].fullName;
      for (let i = 0; i < columns.length; i++) {
        objects[columns[i].name] = "";
        if (rows[j].name === columns[i].name) {
          objects[columns[i].name] = rows[j].point;
        }
      }
      console.log(objects);
      if (j + 1 < rows.length && objects["studentId"] !== rows[j].studentId) {
        dataTable.push(objects);
        objects = [];
      }
      if (j + 1 === rows.length) {
        dataTable.push(objects);
      }
    }
    console.log(objects);
    return dataTable;
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
              ></DetailGrade>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
