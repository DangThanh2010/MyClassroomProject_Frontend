import * as React from "react";
import { BrowserRouter as Routes, Switch, Route, Link  } from "react-router-dom";
import Home from '../components/home';
import LoginPage from '../components/authentication/LoginPage';
import Detail from '../components/DetailClass/DetailClass'
function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
      </Routes> */}
      <Detail></Detail>
    </div>
  );
}