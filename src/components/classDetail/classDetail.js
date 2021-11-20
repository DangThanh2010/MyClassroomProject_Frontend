import {useState, useEffect} from 'react';
import ListMember from './listMember';

import AppBarForClassDetail from './appBarForClassDetail';
import InviteMemberDialog from './inviteMemberDialog';


function ClassDetail({match}){
  const [valueTab, setValueTab] = useState(1);
  const [classDetail, setClassDetail] = useState(null);
  const [isOpenedInviteTeacherDialog, setIsOpenedInviteTeacherDialog] = useState(false);
  const [isOpenedInviteStudentDialog, setIsOpenedInviteStudentDialog] = useState(false);

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

  }

  const openInviteStudentDialog = () => {
    setIsOpenedInviteStudentDialog(true);
  }

  const closeInviteStudentDialog = () => {
    setIsOpenedInviteStudentDialog(false);
  }

  const inviteStudent = (email) => {

  }


  return (
    <div>
      <AppBarForClassDetail nameClass={classDetail != null ? classDetail.name : ""} valueTab={valueTab} handleChangeValueTab= {handleChangeValueTab}/>
      {valueTab === 1 ? <div> </div> : <ListMember idClass={classDetail.id} openInviteTeacherDialog={openInviteTeacherDialog} openInviteStudentDialog={openInviteStudentDialog}/>  }
      <InviteMemberDialog isOpened={isOpenedInviteTeacherDialog} close={closeInviteTeacherDialog} isInviteTeacher={true} inviteMember={inviteTeacher}></InviteMemberDialog>
      <InviteMemberDialog isOpened={isOpenedInviteStudentDialog} close={closeInviteStudentDialog} isInviteTeacher={false} inviteMember={inviteStudent}></InviteMemberDialog>
  </div>
  );
}

export default ClassDetail;