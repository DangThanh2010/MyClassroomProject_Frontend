import { faBackspace, faSave } from "@fortawesome/free-solid-svg-icons";
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

  const [fullname, setFullname] = useState("");
  // const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  // useEffect(() => {
  //   fetchInfo();
  // }, []);
  // useEffect(() => {
  //   fetch(APIURL + "/user/" + 1, {
  //     method: "GET",
  //   })
  //     .then((data) => data.json())
  //     .then((data) => {
  //       setImage(data.avatar);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }

    fetch("http://localhost:3001/user/myself/get", {
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
            // setEmail(result.email);
            setImage(result.avatar);
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
      .post(APIURL + "/image/", formData, {
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
    fetch(APIURL + "/user/myself", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: fullname,
        // "email": email
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
    // axios
    //   .post(APIURL + "/user/", {
    //     name: fullname,
    //     email: email,
    //   })
    //   .then(function (response) {
    //     alert("Thanh cong");
    //     // addToast(response.data.msg, {
    //     //   appearance: 'success',
    //     //   autoDismiss: true,
    //     // });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }


  return (
    <div className="profilePage">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center">Your Profile</h1>
        <div>
          {image && (
            <Avatar
              alt="Remy Sharp"
              src={image}
              sx={{ width: 120, height: 120 }}
            />
          )}
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          multiple={false}
          onChange={imageHandler}
        />
        <FormGroup controlId="fullname" bsSize="large">
          <FormLabel>Fullname</FormLabel>
          <FormControl
            autoFocus
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </FormGroup>
        {/* <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup> */}

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
