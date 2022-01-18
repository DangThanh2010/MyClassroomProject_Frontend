import { faBackspace, faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import "./index.css";

export default function UserProfilePage() {
  const { addToast } = useToasts();

  const [fullname, setFullname] = useState("");

  const [image, setImage] = useState("");
  const [authType, setAuthType] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }

    fetch(process.env.REACT_APP_API + "/user/myself/get", {
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
            setFullname(result.fullname);
            setImage(result.avatar);
            setAuthType(result.authType);
          }
        });
      }
    });
  }, []);

  const imageHandler = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    axios
      .post(process.env.REACT_APP_API + "/image/", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        setImage(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function validateForm() {
    return fullname.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch(process.env.REACT_APP_API + "/user/myself", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: fullname,
      }),
    }).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          addToast(result.msg, {
            appearance: "success",
            autoDismiss: true,
          });
        });
      }
    });
  }

  return (
    <div>
    {error ?  <Redirect to='/login' /> : <>
    <div className="profilePage">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center middle">
          Tài khoản của bạn
        </h1>
        <div>
          <div className="container-name-and-ava">
            {image ? (
              <div className="container-avatar">
                <Avatar
                  alt="Remy Sharp"
                  src={image}
                  sx={{ width: 180, height: 180 }}
                />
              </div>
            ) : (
              <div className="container-avatar">
                <Avatar
                  alt="Remy Sharp"
                  src={image}
                  sx={{ width: 180, height: 180 }}
                />
              </div>
            )}

            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              multiple={false}
              onChange={imageHandler}
              class="hidden"
            />
            <label for="image" className="change-avatar">
              <FontAwesomeIcon className="icon" icon={faPen} />
              Đổi avatar
            </label>
          </div>
        </div>
        <div className="btn-container">
          <FormGroup controlId="fullname" bsSize="large">
            <FormLabel className="fullname name1">Họ tên: </FormLabel>
            <FormControl
              autoFocus
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </FormGroup>
        </div>
        {authType === "google" ? <></> :
        <div className="container-changePass">
          <div className="inside-container-changePass">
            <div className="fullname">Mật khẩu: </div>
            <div className="container-edit">
              <div className="boder-pass">
                {" "}
                <span>************</span>
              </div>
              <div>
                <Link to="/changePassWord">
                  <Button
                    variant="outline-secondary"
                    className="buttons button-edit"
                  >
                    <FontAwesomeIcon className="icon" icon={faPen} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        }
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
    </>
    }
    </div>
  );
}