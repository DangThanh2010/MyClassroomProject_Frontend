import { TableRow, TableCell, Input, Button } from "@mui/material";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DetailGrade({ rows, columns, handleSend, data, classId }) {
  let sumPoint = new Array(columns.length).fill(0);
  const [idEdit, setIdEdit] = useState(null);
  const [valueEdit, setValueEdit] = useState(null);
  const [haveLink, setHaveLink] = useState([]);

  useEffect(() => {
    const arrayLink = [];
    getHaveLinkArray(arrayLink).then(() => {
        if(compareHaveLinkArray(arrayLink, haveLink) === false){
          setHaveLink(arrayLink);
        }
      }
    )
  });

  const compareHaveLinkArray = (arrayLink1, arrayLink2) => {
    if(arrayLink1.length !== arrayLink2.length){
      return false;
    }

    for(let i = 0; i <= arrayLink1.length; i++){
      if(i === arrayLink1.length){
        return true;
      }
      let temp = 0;
      for(let j = 0; j < arrayLink2.length; j++){
        
        if(arrayLink1[i].studentId === arrayLink2[j].studentId){
          temp = 1;
          if(arrayLink1[i].success !== arrayLink2[j].success){
            return false;
          }
          break;
        }
      }
      if(temp === 0){
        return false;
      }
    }
  }

  const getHaveLinkArray =  async (arrayLink) => {
    for(let i = 0; i < data.length; i++){
      let token = "";
      if (localStorage.getItem("token")) {
        token = localStorage.getItem("token").slice(1);
        token = token.slice(0, -1);
      }

      const res = await fetch(process.env.REACT_APP_API + "/user/byStudentId/" + data[i].studentId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
        if (!res.ok) {
          arrayLink.push({studentId: data[i].studentId, haveLink: false});
        } else {
          const result = await res.json();
          arrayLink.push({studentId: data[i].studentId, haveLink: result.success});
        }
      
    }
  }
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
  };
  const onSave = () => {
    if (valueEdit && idEdit) {
      handleSend(idEdit, valueEdit);
    } else {
      alert("Something went wrong, Please reload the page");
    }
    setIdEdit(null);
    setValueEdit(null);
  };
  const sumPointAssignment = () => {
    let sumPointCourse = 0;
    columns.map((columns) => {
      sumPointCourse += columns.point;
    });
    return sumPointCourse;
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

            let have;
            for(let i = 0; i < haveLink.length; i++){
              if(row.studentId === haveLink[i].studentId){
                have = haveLink[i].haveLink;
                break;
              }
            }
            return (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={index + row.studentId}
              >
                <TableCell>
                  { have ? 
                    <Link
                      to={"/studentProfile/" + row.studentId + "/" + classId}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {name}
                    </Link>
                    : 
                    <>{name}</>
                  }     
                </TableCell>
                {columns.map((column, index1) => {
                  let value = "";
                  row.arrayPoint.map((arrPoint, idx) => {
                    if (column.id === arrPoint.AssignmentId) {
                      value = arrPoint.point;
                      sumPoint[index] += (value * column.point) / 100;
                    }
                  });

                  return (
                    <TableCell key={index1} align={"right"} sx={{ border: 1 }}>
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

                <TableCell key={index} align={"right"} sx={{ border: 1 }}>
                  <div style={flexContainer}>
                    <div
                      key="maxGrade"
                      style={{
                        textAlign: "center",
                        paddingTop: "2.5%",
                        fontSize: 16,
                      }}
                    >
                      {sumPoint[index]} / {sumPointAssignment()}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        : "Loading..."}
    </>
  );
}
