import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ListAssignment from "../assignment/listAssignment";
import ListGrade from "../Grade/listGrade";
import ListReview from "../review/listReview";
import ViewGrade from "../viewGrade/viewGrade";
import AppBarForClassDetail from "./appBarForClassDetail";
import InviteMemberDialog from "./inviteMemberDialog";
import JoinedClasses from "./JoinedClasses";
import ListMember from "./listMember";
import ResultInviteDialog from "./resultInviteDialog";

function ClassDetail({ match }) {
  const [valueTab, setValueTab] = useState(1);
  const [classDetail, setClassDetail] = useState(null);
  const [isOpenedInviteTeacherDialog, setIsOpenedInviteTeacherDialog] =
    useState(false);
  const [isOpenedInviteStudentDialog, setIsOpenedInviteStudentDialog] =
    useState(false);
  const [isOpenedResultInviteDialog, setIsOpenedResultInviteDialog] =
    useState(false);
  const [resultInvite, setResultInvite] = useState("");
  const [error, setError] = useState(false);
  const [role, setRole] = useState(null);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch(process.env.REACT_APP_API + "/class/" + match.params.id, {
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
            setClassDetail(result);
          }
        });
      }
    });
    // Get Role
    fetch(process.env.REACT_APP_API + "/class/" + match.params.id + "/role", {
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
            setRole(result.role);
          }
        });
      }
    });

    fetch(process.env.REACT_APP_API + "/user/myself/get", {
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
      })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            if (result) {
              setStudent(result);
            }
          });
        }
      })
  }, []);

  const handleChangeValueTab = (value) => {
    setValueTab(value);
  };

  const openInviteTeacherDialog = () => {
    setIsOpenedInviteTeacherDialog(true);
  };

  const closeInviteTeacherDialog = () => {
    setIsOpenedInviteTeacherDialog(false);
  };

  const inviteTeacher = (email) => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    let host = window.location.protocol + "//" + window.location.hostname;
    if (window.location.port) host += ":" + window.location.port;
    host += "/sharedLinkTeacher/";

    fetch(
      process.env.REACT_APP_API +
        "/class/" +
        classDetail.id +
        "/invite?role=Teacher",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          email: email,
          url: host,
        }),
      }
    ).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if (result) {
            setIsOpenedInviteTeacherDialog(false);
            setResultInvite(
              result.result === 1
                ? "Mời thành công."
                : "Đã xảy ra lỗi. Hãy thử lại sau."
            );
            setIsOpenedResultInviteDialog(true);
          }
        });
      }
    });
  };

  const openInviteStudentDialog = () => {
    setIsOpenedInviteStudentDialog(true);
  };

  const closeInviteStudentDialog = () => {
    setIsOpenedInviteStudentDialog(false);
  };

  const inviteStudent = (email) => {
    let token = "";
    if (localStorage.getItem("token")) {
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }

    let host = window.location.protocol + "//" + window.location.hostname;
    if (window.location.port) host += ":" + window.location.port;
    host += "/sharedLinkStudent/";

    fetch(
      process.env.REACT_APP_API +
        "/class/" +
        classDetail.id +
        "/invite?role=Student",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          email: email,
          url: host,
        }),
      }
    ).then((res) => {
      if (!res.ok) {
        setError(true);
      } else {
        res.json().then((result) => {
          if (result) {
            setIsOpenedInviteStudentDialog(false);
            setResultInvite(
              result.result === 1
                ? "Mời thành công."
                : "Đã xảy ra lỗi. Hãy thử lại sau."
            );
            setIsOpenedResultInviteDialog(true);
          }
        });
      }
    });
  };

  const closeResultInviteDialog = () => {
    setIsOpenedResultInviteDialog(false);
  };

  return (
    <div>
      {error ? (
        <Redirect to="/login" />
      ) : (
        <>
          {classDetail !== null &&
          role !== null &&
          (classDetail.id === -1 || role === -1) ? (
            <Typography
              style={{ color: "blue" }}
              align="center"
              variant="h3"
              marginTop={20}
            >
              Lớp không tồn tại hoặc bạn chưa tham gia lớp.
            </Typography>
          ) : (
            <>
              <AppBarForClassDetail
                nameClass={classDetail != null ? classDetail.name : ""}
                valueTab={valueTab}
                handleChangeValueTab={handleChangeValueTab}
                role={role}
              />
              {classDetail !== null ? (
                <div>
                  {valueTab === 1 ? (
                    <JoinedClasses
                      idClass={classDetail != null ? classDetail.id : ""}
                    />
                  ) : (
                    <div>
                      {valueTab === 2 ? (
                        <ListMember
                          idClass={classDetail.id}
                          openInviteTeacherDialog={openInviteTeacherDialog}
                          openInviteStudentDialog={openInviteStudentDialog}
                          role={role}
                        />
                      ) : (
                        <div>
                        {valueTab === 3 ? 
                          (
                            <div>
                            {role === 0 ? 
                              <ViewGrade match={{params: {classId: match.params.id, studentId: student !== null  ? student.IDstudent : null, role: role}}}></ViewGrade>
                            :  <ListAssignment idClass={classDetail.id}></ListAssignment>}
                            </div>
                           
                          ) : 
                          (
                            <div>
                            {valueTab === 4 ? 
                              (
                                <ListGrade idClass={classDetail.id} role= {role}></ListGrade>
                               
                              ) : 
                              <ListReview idClass={classDetail.id}></ListReview>
                              
                              
                            }
                            </div>
                          )
                          
                        }
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div></div>
              )}
              {role === 2 || role === 1 ? (
                <InviteMemberDialog
                  isOpened={isOpenedInviteTeacherDialog}
                  close={closeInviteTeacherDialog}
                  isInviteTeacher={true}
                  inviteMember={inviteTeacher}
                ></InviteMemberDialog>
              ) : (
                <></>
              )}
              {role === 2 || role === 1 ? (
                <InviteMemberDialog
                  isOpened={isOpenedInviteStudentDialog}
                  close={closeInviteStudentDialog}
                  isInviteTeacher={false}
                  inviteMember={inviteStudent}
                ></InviteMemberDialog>
              ) : (
                <></>
              )}
              {role === 2 || role === 1 ? (
                <ResultInviteDialog
                  isOpened={isOpenedResultInviteDialog}
                  close={closeResultInviteDialog}
                  result={resultInvite}
                ></ResultInviteDialog>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ClassDetail;
