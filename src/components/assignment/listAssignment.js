import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import Assignment from "./assignment";
function ListAssignment({ match }) {
  const [list, setList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [pointValue, setPointValue] = useState("");
  const [error, setError] = useState(false);


  const getToken = () => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    return token;
  }
  useEffect(() => {
    const token = getToken();
    fetch(process.env.REACT_APP_API + "/assignment/" + match.params.classId, {
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
            setIsLoaded(true);
            setList(result);
          }
        });
      }
    });
  }, [isLoaded]);
  //Update Index
  const UpdateIndex = async (data, token) => {
    await fetch(process.env.REACT_APP_API + "/assignment/updateIndex", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        data: data,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    result.map((item,index) => {
      item.NO = index;
    });
    const token = getToken();
    UpdateIndex(result,token);

    setList(result);
  };

  const onEnd = (result) => {
    if (
      result !== null &&
      result.source !== null &&
      result.destination !== null
    ) {
      reorder(list, result.source.index, result.destination.index);
    }
  };

  const changeName = (event) => {
    setNameValue(event.target.value);
  };

  const changePoint = (event) => {
    setPointValue(event.target.value);
  };

  const addAssignment = () => {
    const token = getToken();
    fetch(process.env.REACT_APP_API + "/assignment/" + match.params.classId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: nameValue,
        point: pointValue,
      }),
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if (result) {
            setIsLoaded(false);
            setNameValue("");
            setPointValue("");
          }
        });
      }
    });
  };

  const deleteAssignment = (id) => {
    const token = getToken();
    fetch(process.env.REACT_APP_API + "/assignment/" + id, {
      method: 'DELETE',
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
      })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            setIsLoaded(false);
          });
        }
      })
  }

  const getTotalPoint = () => {
    let result = 0;
    for(let i = 0; i < list.length; i++){
      result += list[i].point;
    }
    return result;
  }

  function BoxDnD() {
    return list.map((item, index) => (
      <Draggable draggableId={item.id.toString()} key={item.id} index={item.NO}>
        {(provided, snapshot) => (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginBottom={1}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Assignment item={item} deleteAssignment={() => deleteAssignment(item.id)}></Assignment>
          </Box>
        )}
      </Draggable>
    ));
  }

  return (
    <>
      {error ? (
        <Redirect to="/login" />
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={2}
            marginBottom={2}
          >
            <Card sx={{ width: 420 }}>
              <CardHeader
                title={
                  <Typography
                    sx={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                  >
                    Cấu trúc điểm
                  </Typography>
                }
                sx={{ backgroundColor: "blue", height: 40 }}
              />
              <CardContent sx={{ height: 30 }}>{"Tổng điểm: " + getTotalPoint()}</CardContent>
            </Card>
          </Box>
          <DragDropContext onDragEnd={onEnd}>
            <Droppable droppableId="12345678">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  <BoxDnD />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box
              component="form"
              noValidate
              maxWidth={400}
              sx={{
                padding: 2,
                mt: 1,
                mb: 1,
                display: "flex",
                border: 1,
                borderColor: "green",
                borderRadius: 5,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={nameValue}
                    onChange={(event) => changeName(event)}
                    label="Tên"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={pointValue}
                    onChange={(event) => changePoint(event)}
                    label="Điểm"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={addAssignment}
                    disabled={
                      nameValue === "" ||
                      pointValue === "" ||
                      parseFloat(pointValue) === null ||
                      parseFloat(pointValue) === undefined
                    }
                  >
                    Thêm
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default ListAssignment;
