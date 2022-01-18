import { Avatar, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { CustomDialog } from "react-st-modal";
import ShowBoardURLModal from "../Modals/index";
import "./style.css";

const Main = ({ idClass }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [codeStudent, setCodeStudent] = useState("");
  const [codeTeacher, setCodeTeacher] = useState("");
  const [role, setRole] = useState("");
  const [listAssignment, setListAssignment] = useState([]);
  const getToken = () => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    return token;
  };
  useEffect(() => {
    const token = getToken();
    fetch(process.env.REACT_APP_API + "/class/" + idClass, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (!res.ok) {
        alert("Lỗi hiển thị.");
      } else {
        res.json().then((result) => {
          if (result) {
            setName(result.name || "");
            setSubject(result.subject || "");
            setCodeStudent(result.inviteCodeStudent || "");
            setCodeTeacher(result.inviteCodeTeacher || "");
          }
        });
      }
    });
    fetch(
      process.env.REACT_APP_API +
        "/userInClass/" +
        idClass +
        "/roleUserInClass",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    ).then((res) => {
      if (!res.ok) {
        alert("Lỗi hiển thị.");
      } else {
        res.json().then((result) => {
          if (result) {
            setRole(result.role || "");
          }
        });
      }
    });
    fetch(process.env.REACT_APP_API + "/assignment/" + idClass, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (!res.ok) {
        alert("Lỗi hiển thị cấu trúc điểm.");
      } else {
        res.json().then((result) => {
          if (result) {
            setListAssignment(result);
          }
        });
      }
    });
  }, []);

  function shareLinkStudent() {
    let host = window.location.protocol + "//" + window.location.hostname;
    if (window.location.port) host += ":" + window.location.port;
    CustomDialog(
      <ShowBoardURLModal URL={host + "/sharedLinkStudent/" + codeStudent} />,
      {
        title:
          "Bạn có thể sao chép link bên dưới và gửi cho học sinh muốn mời.",
      }
    );
  }
  function shareLinkTeacher() {
    let host = window.location.protocol + "//" + window.location.hostname;
    if (window.location.port) host += ":" + window.location.port;
    CustomDialog(
      <ShowBoardURLModal URL={host + "/sharedLinkTeacher/" + codeTeacher} />,
      {
        title:
          "Bạn có thể sao chép link bên dưới và gửi cho giáo viên muốn mời.",
      }
    );
  }
  const getTotalPoint = () => {
    let result = 0;
    for (let i = 0; i < listAssignment.length; i++) {
      result += listAssignment[i].point;
    }
    return result;
  };

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
                {role === 2 || role === 1 ? (
                  <div>
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
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="main__grade">
          <div className="main__grade-content">
            {role === 2 || role === 1 ? (<div style={{color:"blue", fontSize:"17px"}}><b>Code: </b><Button variant="outlined">{codeStudent}</Button><hr /></div>) : <></>}

            
            <b>Cấu trúc điểm:</b>
            

            <div className="main__list-grade">
              {listAssignment.map((item, index) => (
                <div>
                  - {item.name} :{" "}
                  <span className="main__list-grade-point">{item.point}</span>{" "}
                </div>
              ))}
            </div>
            <hr />
            <div className="main__sum-grade">
              - Tổng điểm :{" "}
              <span className="main__sum-grade-point">{getTotalPoint()}</span>{" "}
            </div>
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
                      <input variant="outlined" color="primary" type="file" />

                      <div>
                        <Button onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>

                        <Button color="primary" variant="contained">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
