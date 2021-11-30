import {DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';
import  { Redirect } from 'react-router-dom';

import {Box, Card, CardHeader, CardContent, Typography, Grid, TextField, Button} from '@mui/material';

import Assignment from './assignment';
function ListAssignment({match}) {
  
  const [nameValue, setNameValue] = useState("");
  const [pointValue, setPointValue] = useState("");
  const [error, setError] = useState(false);
  
  // const data = [{
  //   id: "1",
  //   name: "one",
  //   points: "1"
  // },{
  //   id:"2",
  //   name: "two",
  //   points: "2"
  // },{
  //   id: "3",
  //   name: "three",
  //   points: "0.5"
  // },{
  //   id: "4",
  //   name: "four",
  //   points: "2.5"
  // },{
  //   id: "5",
  //   name: "five",
  //   points: "3"
  // }];


  const [list, setList] = useState([]);

  useEffect(() => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    getAssignment(token);
   
  }, []);

  const getAssignment = (token) => {
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
            console.log(result);
            setList(result);
          }
        });
      }
    });
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const onEnd = (result) => {
    if(result !== null && result.source !== null && result.destination !== null){
      setList(reorder(list, result.source.index, result.destination.index));
    }
  };

  const changeName = (event) => {
    setNameValue(event.target.value);
  }

  const changePoint= (event) => {
    setPointValue(event.target.value);
  }

  const addAssignment = () => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }

    fetch(process.env.REACT_APP_API + "/assignment/" + match.params.classId , {
      method: 'POST',
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
      body: JSON.stringify({
        "name": nameValue,
        "point": pointValue,
        })
      })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            if (result) {
             
            }
          });
        }
      })
  }
  return (
    <>
    {error ? <Redirect to='/login' /> : 
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
            title={<Typography sx={{color: 'white', fontWeight: 'bold', fontSize: 20}} >Cấu trúc điểm</Typography>}
            sx={{backgroundColor: 'blue', height: 40}}
          />
          <CardContent sx={{height: 30}}>Tổng điểm</CardContent>
        </Card>
      </Box>
      <DragDropContext onDragEnd= {onEnd}>
        <Droppable droppableId = "12345678">
          {(provided, snapshot) => (
            <div ref = {provided.innerRef}>
              {list.map((item, index) => (
                <Draggable
                  draggableId = {(item.id)}
                  key = {item.id}
                  index = {item.NO}
                >
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
                      <Assignment item={item}></Assignment>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box component="form" noValidate maxWidth={400} sx={{padding: 2, mt: 1, mb:1, display: 'flex', border: 1, borderColor: 'green', borderRadius: 5 }}>
          <Grid container spacing={2} >
            <Grid item xs={12}>
              <TextField
                value={nameValue}
                onChange={(event) => changeName(event)}
                onSubmit
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
              <Button variant="contained" color="success" onClick={addAssignment} 
                      disabled= {(nameValue === "" || pointValue === "" || parseInt(pointValue) === null ||parseInt(pointValue) === undefined)}>
                Thêm
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>}
    </>
  );
}

export default ListAssignment;