import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './index.css';

import Home from './components/home/home';
import ClassDetail from './components/classDetail/classDetail';
import LoginPage from './components/authentication/LoginPage';
import RegisterPage from './components/authentication/RegisterPage';
import MappingAccount from './components/mappingAccount/mappingAccount';
import ChangePassword from './components/changePassWord/index'
import UserProfile from './components/UserProfile/index'
import { ToastProvider, useToasts } from 'react-toast-notifications';
import InviteStudent from './components/inviteStudent/inviteStudent';
import InviteTeacher from './components/inviteTeacher/inviteTeacher';
import ListAssignment from './components/assignment/listAssignment';

ReactDOM.render(
  <ToastProvider>
  <Router>
    <Route exact path="/" component={Home}></Route>
    <Route path="/class/:id" component={ClassDetail}></Route>
    <Route path="/login" component={LoginPage}></Route>
    <Route path="/register" component={RegisterPage}></Route>
    <Route path="/mapping" component={MappingAccount}></Route>
    <Route path="/profile" component={UserProfile}></Route>
    <Route path="/sharedLinkStudent/:code" component={InviteStudent}></Route>
    <Route path="/sharedLinkTeacher/:code" component={InviteTeacher}></Route>
    <Route path="/changePassWord" component={ChangePassword}></Route>
  </Router>
  </ToastProvider>,
  document.getElementById('root')
);