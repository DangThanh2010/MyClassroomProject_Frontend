import { useState, useEffect } from 'react';
import {Grid, Box} from '@mui/material';
import { Link } from 'react-router-dom'

import MyAppBar from './myAppBar'
import ClassCard from './classCard';
import CreateClassDialog from './createClassDialog';
import ClassDetail from './classDetail/classDetail';

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [classes, setClasses] = useState([]);
  const [isOpenedCreateClassDialog, setIsOpenedCreateClassDialog] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/class")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setClasses(result);
        },
      )
  }, [isLoaded])

  const deleteClass = (id) => {
    fetch("http://localhost:3001/class/" + id, {method: 'DELETE',})
      .then(
        (result) => {
          setIsLoaded(false);
        },
      )
  }

  const openCreateClassDialog = () => {
    setIsOpenedCreateClassDialog(true);
  }

  const closeCreateClassDialog = () => {
    setIsOpenedCreateClassDialog(false);
  }

  const createClass = (name, subject) => {
    fetch("http://localhost:3001/class", {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "name": name,  
        "subject": subject
        })
      })
      .then(
        (result) => {
          setIsOpenedCreateClassDialog(false);
          setIsLoaded(false);
        },
      )
  }
  
  return (
    <div>
      <MyAppBar openCreateClassDialog={openCreateClassDialog}/>
      <Box sx={{mt: 5, ml: 5, mr: 5}}>
        <Grid container spacing={2} justifyContent='space-evently'>
          {generateGridClasses(classes, (id) => deleteClass(id))}
        </Grid>
      </Box>
      <CreateClassDialog isOpened={isOpenedCreateClassDialog} close={closeCreateClassDialog} createClass={createClass}/> 
    </div>
  );
}

function generateGridClasses(classes, deleteClass) {
  return classes.map(cls => <Grid item xs={12} sm={6} md={3} key={cls.id}> <Link to={"/class/" + cls.id}> <ClassCard name={cls.name} subject={cls.subject} deleteClass={() => deleteClass(cls.id)} /> </Link></Grid>
    ) 
}

export default Home;