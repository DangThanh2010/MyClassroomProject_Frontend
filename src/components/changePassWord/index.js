import { faPen, faBackspace, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import "./index.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { ToastProvider, useToasts } from "react-toast-notifications";
const APIURL = "http://localhost:3001";

export default function UserProfilePage() {
  const { addToast } = useToasts();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);



  function validateForm() {
    return (oldPassword.length > 0 && newPassword.length>0);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch(APIURL + "/user/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword
        // "email": email
      }),
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          console.log('result',result);
          if(result.status==1){
          addToast(result.msg, {
            appearance: "success",
            autoDismiss: true,
          });}
          else
          addToast(result.msg, {
            appearance: "error",
            autoDismiss: true,
          });
        });
      }
    });
  }

  return (
    <div className="profilePage">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center middle">
          Change Password
        </h1>
        <div></div>
        <div className="btn-container">
          <FormGroup controlId="old-password" bsSize="large">
            <FormLabel className="fullname">Old Password: </FormLabel>
            <FormControl
              autoFocus
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="new-password" bsSize="large">
            <FormLabel>New Password: </FormLabel>
            <FormControl
              autoFocus
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormGroup>
        </div>

        <div className="btn-container">
          <Button
            variant="primary"
            className="buttons"
            disabled={!validateForm()}
            type="submit"
          >
            <FontAwesomeIcon className="icon" icon={faSave} />
            Save
          </Button>

          <Link to="/">
            <Button variant="outline-secondary" className="buttons">
              <FontAwesomeIcon className="icon" icon={faBackspace} />
              Back
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
