import { Avatar, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import { FaLink } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
import { Prompt, Confirm, CustomDialog } from "react-st-modal";
import axios from "axios";
import ShowBoardURLModal from "../Modals/index";
const APIURL = "http://localhost:3001";

const Main = ({ idClass }) => {
  const { addToast } = useToasts();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [codeStudent, setCodeStudent] = useState("");
  const [codeTeacher, setCodeTeacher] = useState("");
  useEffect(() => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch("http://localhost:3001/class/" + idClass, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (!res.ok) {
        // setError(true);
      } else {
        res.json().then((result) => {
          if (result) {
            setName(result.name || "");
            setSubject(result.subject || "");
            setCodeStudent(result.inviteCodeStudent || "")
            setCodeTeacher(result.inviteCodeTeacher || "")
          }
        });
      }
    });
  }, []);
  function shareLinkStudent() {
    let host = window.location.protocol + "//" + window.location.hostname;
      if (window.location.port) host += ":" + window.location.port;
      // console.log(host)
      CustomDialog(
        <ShowBoardURLModal URL={host+"/sharedLinkStudent/"+codeStudent} />,
        {
          title: "Nice! Now you can share this URL with your partner",
        }
      );
      
  }
  function shareLinkTeacher() {
    let host = window.location.protocol + "//" + window.location.hostname;
      if (window.location.port) host += ":" + window.location.port;
      // console.log(host)
      CustomDialog(
        <ShowBoardURLModal URL={host+"/sharedLinkTeacher/"+codeTeacher} />,
        {
          title: "Nice! Now you can share this URL with your teacher",
        }
      );
      
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
              <h1 className="main__heading main__overflow">{name}</h1>
              <div className="main__section main__overflow">{subject}</div>
              <div className="main__wrapper2">
                <div className="main__code">
                  <Button
                    variant="outline-info"
                    className="btn-shareBoard"
                    onClick={() => shareLinkTeacher()}
                  >
                    <FaLink /> Share link Teacher
                  </Button>
                </div>
                <div className="main__code">
                  <Button
                    variant="outline-info"
                    className="btn-shareBoard"
                    onClick={() => shareLinkStudent()}
                  >
                    <FaLink /> Share link Student
                  </Button>
                </div>
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
