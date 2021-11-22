import {useState, useEffect} from 'react';
import  { Redirect } from 'react-router-dom';

import ListMember from './listMember';
import AppBarForClassDetail from './appBarForClassDetail';
import InviteMemberDialog from './inviteMemberDialog';
import ResultInviteDialog from './resultInviteDialog';


function ClassDetail({match}){
  const [valueTab, setValueTab] = useState(1);
  const [classDetail, setClassDetail] = useState(null);
  const [isOpenedInviteTeacherDialog, setIsOpenedInviteTeacherDialog] = useState(false);
  const [isOpenedInviteStudentDialog, setIsOpenedInviteStudentDialog] = useState(false);
  const [isOpenedResultInviteDialog, setIsOpenedResultInviteDialog] = useState(false);
  const [resultInvite, setResultInvite] = useState("");
  const [error, setError] = useState(false);
  const [role, setRole] = useState(-1);
  useEffect(() => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch("http://localhost:3001/class/" + match.params.id, {
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
    })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            if (result) {
              setClassDetail(result);
              console.log(result);
            }
          });
        }
      });
      // Get Role
      fetch("http://localhost:3001/class/" + match.params.id + "/role", {
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
    })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            if (result) {
              setRole(result.role);
              console.log(result);
            }
          });
        }
      })
  }, [])

  const handleChangeValueTab = (value) => {
    setValueTab(value);
  }

  const openInviteTeacherDialog = () => {
    setIsOpenedInviteTeacherDialog(true);
  }

  const closeInviteTeacherDialog = () => {
    setIsOpenedInviteTeacherDialog(false);
  }

  const inviteTeacher = (email) => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch("http://localhost:3001/class/" + classDetail.id + "/invite?role=Teacher", {
      method: 'POST',
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
      body: JSON.stringify({
        "email": email
        })
      })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            if (result) {
              setIsOpenedInviteTeacherDialog(false);
              setResultInvite(result.result === 1 ? "Mời thành công." : "Đã xảy ra lỗi. Hãy thử lại sau." );
              setIsOpenedResultInviteDialog(true);
            }
          });
        }
      })
  }

  const openInviteStudentDialog = () => {
    setIsOpenedInviteStudentDialog(true);
  }

  const closeInviteStudentDialog = () => {
    setIsOpenedInviteStudentDialog(false);
  }

  const inviteStudent = (email) => {
    let token = "";
    if(localStorage.getItem("token")){
      token = localStorage.getItem("token").slice(1);
      token = token.slice(0, -1);
    }
    fetch("http://localhost:3001/class/" + classDetail.id + "/invite?role=Student", {
      method: 'POST',
      headers: {'Content-Type':'application/json',
                Authorization: 'Bearer ' + token},
      body: JSON.stringify({
        "email": email
        })
      })
      .then(res => {
        if (!res.ok) {
          setError(true);
        } else {
          res.json().then((result) => {
            if (result) {
              setIsOpenedInviteStudentDialog(false);
              setResultInvite(result.result === 1 ? "Mời thành công." : "Đã xảy ra lỗi. Hãy thử lại sau.");
              setIsOpenedResultInviteDialog(true);
            }
          });
        }
      })
  }

  const closeResultInviteDialog = () => {
    setIsOpenedResultInviteDialog(false);
  }


  return (
    <div>
      {error ? <Redirect to='/login' /> :
      <>
        <AppBarForClassDetail nameClass={classDetail != null ? classDetail.name : ""} valueTab={valueTab} handleChangeValueTab= {handleChangeValueTab}/>
        {valueTab === 1 ? <div> </div> : <ListMember idClass={classDetail.id} openInviteTeacherDialog={openInviteTeacherDialog} openInviteStudentDialog={openInviteStudentDialog} role={role}/>  }
        <InviteMemberDialog isOpened={isOpenedInviteTeacherDialog} close={closeInviteTeacherDialog} isInviteTeacher={true} inviteMember={inviteTeacher}></InviteMemberDialog>
        <InviteMemberDialog isOpened={isOpenedInviteStudentDialog} close={closeInviteStudentDialog} isInviteTeacher={false} inviteMember={inviteStudent}></InviteMemberDialog>
        <ResultInviteDialog isOpened={isOpenedResultInviteDialog} close={closeResultInviteDialog} result={resultInvite}></ResultInviteDialog>
      </>
      }
    </div>
  );
}

export default ClassDetail;