import {useState, useEffect} from 'react';
import ListMember from './listMember';

import AppBarForClassDetail from './appBarForClassDetail';


function ClassDetail({match}){
  const[valueTab, setValueTab] = useState(1);
  const[classDetail, setClassDetail] = useState(null);

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

  return (
    <div>
      <AppBarForClassDetail nameClass={classDetail != null ? classDetail.name : ""} valueTab={valueTab} handleChangeValueTab= {handleChangeValueTab}/>
      {valueTab === 1 ? <div> </div> : <ListMember idClass={classDetail.id}/>  }
  </div>
  );
}

export default ClassDetail;