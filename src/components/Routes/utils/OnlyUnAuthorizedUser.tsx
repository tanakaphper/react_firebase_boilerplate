import React, {useContext} from 'react';
import {Outlet, Navigate} from "react-router-dom";
import {AuthContext} from "../../../contexts/AuthProvider";
import {isSignedIn} from "../../../firebase";
import Loading from "../../Loading/Loading";

const OnlyUnAuthorizedUser: React.FC = () => {
  const {currentUser} = useContext(AuthContext);

  const signInState = isSignedIn(currentUser);
  if (signInState) {
    return <><Navigate to='/services'/></>
  }
  if (signInState === undefined) {
    return <><Loading/></>
  }

  return (
    <>
      <Outlet/>
    </>
  );
};

export default OnlyUnAuthorizedUser;
