import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ClassCard from "./classCard";
import CreateClassDialog from "./createClassDialog";
import JoinClassDialog from "./joinClassDialog";
import MyAppBar from "./myAppBar";

function Home() {
  const { addToast } = useToasts();
  const [isLoaded, setIsLoaded] = useState(false);
  const [classes, setClasses] = useState([]);
  const [isOpenedCreateClassDialog, setIsOpenedCreateClassDialog] =
    useState(false);
  const [isOpenedJoinClassDialog, setIsOpenedJoinClassDialog] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();
  useEffect(() => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }

    fetch(process.env.REACT_APP_API + "/class", {
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
            setClasses(result);
          }
        });
      }
    });
  }, [isLoaded]);

  const deleteOrLeaveClass = (id) => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch(process.env.REACT_APP_API + "/class/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          setIsLoaded(false);
        });
      }
    });
  };

  const openCreateClassDialog = () => {
    setIsOpenedCreateClassDialog(true);
  };

  const closeCreateClassDialog = () => {
    setIsOpenedCreateClassDialog(false);
  };
  const openJoinClassDialog = () => {
    setIsOpenedJoinClassDialog(true);
  };

  const closeJoinClassDialog = () => {
    setIsOpenedJoinClassDialog(false);
  };

  const createClass = (name, subject) => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch(process.env.REACT_APP_API + "/class", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: name,
        subject: subject,
      }),
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          setIsOpenedCreateClassDialog(false);
          setIsLoaded(false);
        });
      }
    });
  };
  const joinClass = (code) => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch(process.env.REACT_APP_API + "/userInClass/inviteStudent/" + code, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        code: code,
      }),
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if (result) {
            
            setIsOpenedCreateClassDialog(false);
            addToast("Bạn đã trở thành thành viên của lớp", {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/class/${result.ClassId}`);
          }
        });
      }
    });
  };

  return (
    <div>
      {error ? (
        <Redirect to="/login" />
      ) : (
        <>
          <MyAppBar
            openCreateClassDialog={openCreateClassDialog}
            openJoinClassDialog={openJoinClassDialog}
          />
          <Box sx={{ mt: 5, ml: 5, mr: 5, mb: 5 }}>
            <Grid container spacing={2} justifyContent="space-evently">
              {generateGridClasses(classes, (id) => deleteOrLeaveClass(id))}
            </Grid>
          </Box>
          <CreateClassDialog
            isOpened={isOpenedCreateClassDialog}
            close={closeCreateClassDialog}
            createClass={createClass}
          />
          <JoinClassDialog
            isOpened={isOpenedJoinClassDialog}
            close={closeJoinClassDialog}
            joinClass={joinClass}
          />
        </>
      )}
    </div>
  );
}

function generateGridClasses(classes, deleteOrLeaveClass) {
  return classes.map((cls) => (
    <Grid item xs={12} sm={6} md={3} key={cls.id}>
      {" "}
      <ClassCard
        id={cls.id}
        name={cls.name}
        subject={cls.subject}
        role={cls.UserinClass.role}
        deleteOrLeaveClass={() => deleteOrLeaveClass(cls.id)}
      />{" "}
    </Grid>
  ));
}

export default Home;
