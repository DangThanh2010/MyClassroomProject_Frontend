import {useState} from 'react';
import ListMember from './listMember';

import AppBarForClassDetail from './appBarForClassDetail';


function ClassDetail({idClass, nameClass, subject, inviteLinkTeacher, inviteLinkStudent}){
  const[valueTab, setValueTab] = useState(1);

  const handleChangeValueTab = (value) => {
    setValueTab(value);
  }

  return (
    <div>
      <AppBarForClassDetail nameClass={nameClass} valueTab={valueTab} handleChangeValueTab= {handleChangeValueTab}/>
      {valueTab === 1 ? <div> </div> : <ListMember idClass={idClass}/>  }
  </div>
  );
}

export default ClassDetail;