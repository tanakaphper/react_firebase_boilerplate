import React from 'react';
import {Route, Routes} from "react-router-dom";
import Top from "../pages/Top";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Development from "../pages/Development/Development";
import PrivateRoute from "./utils/PrivateRoute";
import Services from "../pages/Services/Services";
import VerifyEmail from "../pages/MailLink/VerifyEmail/VerifyEmail";
import OnlyUnAuthorizedUser from "./utils/OnlyUnAuthorizedUser";
import PasswordReset from "../pages/PasswordReset/PasswordReset";
import ConfirmNewPassword from "../pages/ConfirmNewPassword/ConfirmNewPassword";

const RouteGroup: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Top/>}></Route>
      <Route path="/email_link_verify_email" element={<VerifyEmail/>}></Route>
      <Route path="/password_reset" element={<PasswordReset/>}></Route>
      <Route path="/confirm_new_password" element={<ConfirmNewPassword/>}></Route>
      <Route element={<OnlyUnAuthorizedUser/>}>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Route>

      <Route element={<PrivateRoute/>}>
        <Route path="services" element={<Services/>} />
      </Route>
      {process.env.REACT_APP_ENV != 'production' &&
        <Route path="/dev" element={<Development/>}></Route>
      }
    </Routes>
  );
};

export default RouteGroup;
