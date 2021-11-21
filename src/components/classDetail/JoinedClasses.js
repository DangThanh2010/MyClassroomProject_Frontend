import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField } from "@mui/material";

import axios from "axios";
import "./style.css";

const APIURL = 'http://localhost:3000';


const Main = () => {

const classId=1;

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  useEffect(() => {
    fetchInfo();
  }, []);

  function fetchInfo() {
    axios
      .get(APIURL + "/class/" + classId)
      .then(function (response) {
        console.log(response)
        setName(response.data.name);
        setSubject(response.data.subject);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 

  
  return (
    <div className="main">
      <div className="main__wrapper">
        <div className="main__content">
          <div className="main__wrapper1">
            <div className="main__bgImage">
              <div className="main__emptyStyles" />
            </div>
            <div className="main__text">
              <h1 className="main__heading main__overflow">
                {name}
              </h1>
              <div className="main__section main__overflow">
                {subject}
              </div>
              <div className="main__wrapper2">
                <em className="main__code">{}</em>
                <div className="main__id">{}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="main__announce">
          <div className="main__status">
            <p>Upcoming</p>
            <p className="main__subText">No work due</p>
          </div>
          <div className="main__announcements">
            <div className="main__announcementsWrapper">
              <div className="main__ancContent">
                {showInput ? (
                  <div className="main__form">
                    <TextField
                      id="filled-multiline-flexible"
                      multiline
                      label="Announce Something to class"
                      variant="filled"
                      value={inputValue}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="main__buttons">
                      <input
                        // onChange={handleChange}
                        variant="outlined"
                        color="primary"
                        type="file"
                      />

                      <div>
                        <Button onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>

                        <Button
                          // onClick={handleUpload}
                          color="primary"
                          variant="contained"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="main__wrapper100"
                    onClick={() => setShowInput(true)}
                  >
                    <Avatar />
                    <div>Announce Something to class</div>
                  </div>
                )}
              </div>
            </div>
            {/* <Announcment classData={classData} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
