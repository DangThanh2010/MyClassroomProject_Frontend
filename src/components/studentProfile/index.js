import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import "./index.css";

export default function UserProfilePage({ match }) {

  const [error, setError] = useState(false);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }

    fetch(process.env.REACT_APP_API + "/user/byStudentId/" + match.params.studentId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if(result.success){
            setStudent(result.result);
          }
        });
      }
    });
  }, []);

  return (
    <div>
    {error ?  <Redirect to='/login' /> :
    <div className="profilePage">
        <h1 className="h3 mb-3 font-weight-normal text-center middle">
          Học viên
        </h1>
        <div>
          <div className="container-name-and-ava">
            <div className="container-avatar">
              <Avatar
                alt="Remy Sharp"
                src={student !== null ? student.avatar : null}
                sx={{ width: 180, height: 180 }}
              />
            </div>
          </div>
        </div>
        <div className="btn-container">
          <FormGroup controlId="fullname" bsSize="large">
            <FormLabel className="fullname name1">Họ tên: </FormLabel>
            <FormControl
              readOnly
              value={student !== null ? student.fullname : ""}
            />
          </FormGroup>
        </div>

        <div className="btn-container">
          <FormGroup controlId="fullname" bsSize="large">
            <FormLabel className="fullname name1">Mã số sinh viên: </FormLabel>
            <FormControl
              readOnly
              value={student !== null ? student.IDstudent : ""}
            />
          </FormGroup>
        </div>

        <div className="btn-container">
          <FormGroup controlId="fullname" bsSize="large">
            <FormLabel className="fullname name1">Email: </FormLabel>
            <FormControl
              readOnly
              value={student !== null ? student.email : ""}
            />
          </FormGroup>
        </div>
        
        <div className="btn-container">
          <Link to={"/class/" + match.params.classId} >
            <Button variant="outline-secondary" className="buttons">
              <FontAwesomeIcon className="icon" icon={faBackspace} />
              Back
            </Button>
          </Link>
        </div>
    </div>
    }
    </div>
  );
}
