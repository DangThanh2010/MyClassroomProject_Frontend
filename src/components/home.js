import { useState, useEffect } from 'react';
import {Grid, Box} from '@mui/material';
import  { Redirect } from 'react-router-dom';

import MyAppBar from './myAppBar'
import ClassCard from './classCard';
import CreateClassDialog from './createClassDialog';

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [classes, setClasses] = useState([]);
  const [isOpenedCreateClassDialog, setIsOpenedCreateClassDialog] = useState(false);
  const [error, setError] = useState(false);
  const [logout, setLogout] = useState(false);

  const handleLogout = () => {
    setLogout(true);
  }
  useEffect(() => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
      setLogout(false);
    }

    fetch("http://localhost:3001/class", {
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
              setClasses(result);
              console.log(result);
            }
          });
        }
      })
  }, [isLoaded])

  const deleteClass = (id) => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch("http://localhost:3001/class/" + id, {
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

  const openCreateClassDialog = () => {
    setIsOpenedCreateClassDialog(true);
  }

  const closeCreateClassDialog = () => {
    setIsOpenedCreateClassDialog(false);
  }

  const createClass = (name, subject) => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch("http://localhost:3001/class", {
      method: 'POST',
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
      body: JSON.stringify({
        "name": name,  
        "subject": subject
        })
      })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            setIsOpenedCreateClassDialog(false);
            setIsLoaded(false);
          });
        }
      })
  }
  
  return (
    <div>
      {error ? <Redirect to='/login' /> :
      <><MyAppBar openCreateClassDialog={openCreateClassDialog} logout = {logout} clickLogout = {handleLogout}/><Box sx={{ mt: 5, ml: 5, mr: 5 }}>
          <Grid container spacing={2} justifyContent='space-evently'>
            {generateGridClasses(classes, (id) => deleteClass(id))}
          </Grid>
        </Box><CreateClassDialog isOpened={isOpenedCreateClassDialog} close={closeCreateClassDialog} createClass={createClass} /></> 
      }
    </div>
  );
}

function generateGridClasses(classes, deleteClass) {
  return classes.map(cls => <Grid item xs={12} sm={6} md={3} key={cls.id}> <ClassCard id={cls.id} name={cls.name} subject={cls.subject} role={cls.UserinClass.role} deleteClass={() => deleteClass(cls.id)} /> </Grid>
    ) 
}

export default Home;