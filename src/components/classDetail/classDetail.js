import {useState, useEffect} from 'react';
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

  useEffect(() => {
    fetch("http://localhost:3001/class/" + match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          setClassDetail(result);
        }
      )
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
    fetch("http://localhost:3001/class/" + classDetail.id + "/invite?role=Teacher", {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "email": email
        })
      })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsOpenedInviteTeacherDialog(false);
          setResultInvite(result.result === 1 ? "Mời thành công." : "Đã xảy ra lỗi. Hãy thử lại sau." );
          setIsOpenedResultInviteDialog(true);
        },
      )
  }

  const openInviteStudentDialog = () => {
    setIsOpenedInviteStudentDialog(true);
  }

  const closeInviteStudentDialog = () => {
    setIsOpenedInviteStudentDialog(false);
  }

  const inviteStudent = (email) => {
    fetch("http://localhost:3001/class/" + classDetail.id + "/invite?role=Student", {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "email": email
        })
      })
      .then(res => res.json())
      .then(
        (result) => {
          setIsOpenedInviteStudentDialog(false);
          setResultInvite(result.result === 1 ? "Mời thành công." : "Đã xảy ra lỗi. Hãy thử lại sau.");
          setIsOpenedResultInviteDialog(true);
        },
      )
  }

  const closeResultInviteDialog = () => {
    setIsOpenedResultInviteDialog(false);
  }


  return (
    <div>
      <AppBarForClassDetail nameClass={classDetail != null ? classDetail.name : ""} valueTab={valueTab} handleChangeValueTab= {handleChangeValueTab}/>
      {valueTab === 1 ? <div> </div> : <ListMember idClass={classDetail.id} openInviteTeacherDialog={openInviteTeacherDialog} openInviteStudentDialog={openInviteStudentDialog}/>  }
      <InviteMemberDialog isOpened={isOpenedInviteTeacherDialog} close={closeInviteTeacherDialog} isInviteTeacher={true} inviteMember={inviteTeacher}></InviteMemberDialog>
      <InviteMemberDialog isOpened={isOpenedInviteStudentDialog} close={closeInviteStudentDialog} isInviteTeacher={false} inviteMember={inviteStudent}></InviteMemberDialog>
      <ResultInviteDialog isOpened={isOpenedResultInviteDialog} close={closeResultInviteDialog} result={resultInvite}></ResultInviteDialog>
    </div>
  );
}

export default ClassDetail;