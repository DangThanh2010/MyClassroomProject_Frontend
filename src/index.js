import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Home from './components/home';
import ListMember from './components/classDetail/listMember';
import ClassDetail from './components/classDetail/classDetail';

ReactDOM.render(
  <React.StrictMode>
    <ClassDetail idClass={1} nameClass="PTUDWNC-18_3" subject="Phát triển ứng dụng web nâng cao" inviteLinkStudent={null} inviteLinkTeacher={null}/>
  </React.StrictMode>,
  document.getElementById('root')
);