import React, { memo } from 'react';
import { Redirect, Switch, Route , useParams } from 'react-router-dom';
import Dashboard from '../Dashboard';
import LoginPage from '../Login';
import SignupPage from '../Signup';
import BoardDetailPage from '../BoardDetail';
import UserProfilePage from '../UserProfile';
import DragdropPage from '../DragDrop';
import SharedBoardPage from '../SharedBoard';

function BoardDetail() {
  let { boardID } = useParams();
  return <BoardDetailPage boardID={boardID}/>;
}

function UserProfile() {
  let { userID } = useParams();
  return <UserProfilePage userID={userID}/>;
}

function SharedBoard() {
  let { boardKey } = useParams();
  return <SharedBoardPage boardKey={boardKey}/>;
}


export const AppLayout = props => (
  <Switch>
    <Route path="/dashboard"> {/* khai báo route khi truy cập đến URL /dashboard */}
      <Dashboard />
    </Route>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route path="/signup">
      <SignupPage />
    </Route>
    <Route path="/boardDetail/:boardID">  {/* khai báo route với param */}
      <BoardDetail/>
    </Route>
    <Route path="/users/:userID">
      <UserProfile/>
    </Route>
    <Route path="/sharedBoard/:boardKey">
      <SharedBoard/>
    </Route>
    <Route exact path="/dd">
      <DragdropPage />
    </Route>
    <Redirect to="/login" /> {/* khi vào trang ko xác định sẽ redirect về /dashboard */}
  </Switch>
);

export default memo(AppLayout);
