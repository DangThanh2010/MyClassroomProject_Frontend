import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faBackspace } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./index.css";
import Form from "react-bootstrap/Form";
import CommonLayout from "../AppLayout/CommonLayout";
import AlertBT from "react-bootstrap/Alert";
import { useToasts } from 'react-toast-notifications';
const APIURL = 'http://localhost:3000';

// Bua nao nho chinh lai userID cho trang nay

export default function UserProfilePage() {
  // const { addToast } = useToasts();
  // Xoa dong nay
  const userID=1;
  
  
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    fetchInfo();
  }, []);

  function fetchInfo() {
    axios
      .get(APIURL + "/user/" + userID)
      .then(function (response) {
        console.log(response)
        setFullname(response.data.fullname);
        setEmail(response.data.email);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function validateForm() {
    return fullname.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(APIURL + "/user/" + userID, {
        name: fullname,
        email: email,
        
      })
      .then(function (response) {
        alert('Thanh cong')
        // addToast(response.data.msg, {
        //   appearance: 'success',
        //   autoDismiss: true,
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function goBackToDashBoard() {
    window.location.href = "/dashboard";
  }

 
{console.log('fullname',fullname)};
{console.log('email',email)};
  return (
    <CommonLayout>
    <div className="profilePage">
      
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center">Your Profile</h1>
        <FormGroup controlId="fullname" bsSize="large">
          <FormLabel>Fullname</FormLabel>
          <FormControl
            autoFocus
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
      
        
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
          <Button
            variant="outline-secondary"
            className="buttons"
            onClick={() => goBackToDashBoard()}
          >
            <FontAwesomeIcon className="icon" icon={faBackspace} />
            Back
          </Button>
        </div>
      </form>
      
    </div>
    </CommonLayout>
  );
}
