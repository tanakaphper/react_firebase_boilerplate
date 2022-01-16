import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Outlet, Navigate, useLocation} from "react-router-dom";
import {AuthContext} from "../../../contexts/AuthProvider";
import {CircularProgress} from "@mui/material";
import {isSignedIn} from "../../../firebase";

const PrivateRoute: React.FC = () => {
  const {currentUser} = useContext(AuthContext);
  const location = useLocation();

  if (!isSignedIn(currentUser)) {
    return <Navigate to='/signin' state={{from: location}}/>;
  }

  return (
    <>
      <Outlet/>
    </>
  );
};

export default PrivateRoute;
