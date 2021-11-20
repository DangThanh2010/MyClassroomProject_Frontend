import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './index.css';

import Home from './components/home';
import ClassDetail from './components/classDetail/classDetail';

ReactDOM.render(
  <Router>
    <Route exact path="/" component={Home}></Route>
    <Route path="/class/:id" component={ClassDetail}></Route>
  </Router>,
  document.getElementById('root')
);