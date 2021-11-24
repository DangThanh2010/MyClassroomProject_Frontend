import { faBackspace, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import "./index.css";

export default function ChangePasswordPage() {
  const { addToast } = useToasts();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
    fetch("https://myclassroom-api.herokuapp.com/user/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword
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
          Đổi mật khẩu
        </h1>
        <div></div>
        <div className="btn-container-input">
          <FormGroup controlId="old-password" bsSize="large">
            <FormLabel className="fullname name2">Mật khẩu cũ: </FormLabel>
            <FormControl
              autoFocus
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="new-password" bsSize="large">
            <FormLabel className="new-pass">Mật khẩu mới: </FormLabel>
            <FormControl
            
              type="password"
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

          <Link to="/profile">
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
