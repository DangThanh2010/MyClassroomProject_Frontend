import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import ActiveAccount from './components/authentication/ActiveAccount';
import LoginPage from './components/authentication/LoginPage';
import RegisterPage from './components/authentication/RegisterPage';
import ResetPassword from './components/authentication/ResetPassword';
import ChangePassword from './components/changePassWord/index';
import ClassDetail from './components/classDetail/classDetail';
import Home from './components/home/home';
import InviteStudent from './components/inviteStudent/inviteStudent';
import InviteTeacher from './components/inviteTeacher/inviteTeacher';
import MappingAccount from './components/mappingAccount/mappingAccount';
import Review from './components/review/detailReview';
import ListReview from './components/review/listReview';
import ReviewDetail from './components/reviewDetail/reviewDetail';
import UserProfile from './components/UserProfile/index';
import ViewGrade from './components/viewGrade/viewGrade';
import './index.css';


ReactDOM.render(
  <ToastProvider>
  <Router>
    <Route exact path="/" component={Home}></Route>
    <Route path="/activeAccount/:link" component={ActiveAccount}></Route>
    <Route path="/resetPassword/:link" component={ResetPassword}></Route>
    <Route path="/class/:id" component={ClassDetail}></Route>
    <Route path="/login" component={LoginPage}></Route>
    <Route path="/register" component={RegisterPage}></Route>
    <Route path="/mapping" component={MappingAccount}></Route>
    <Route path="/profile" component={UserProfile}></Route>
    <Route path="/sharedLinkStudent/:code" component={InviteStudent}></Route>
    <Route path="/sharedLinkTeacher/:code" component={InviteTeacher}></Route>
    <Route path="/changePassWord" component={ChangePassword}></Route>
    <Route path="/viewGrade/:studentId?/:classId?/:role?" component={ViewGrade}></Route>
    <Route path="/reviewDetail/:reviewId?/:role?" component={ReviewDetail}></Route>
    <Route path="/listReview" component={ListReview}></Route>
    <Route path="/review" component={Review}></Route>
  </Router>
  </ToastProvider>,
  document.getElementById('root')
);