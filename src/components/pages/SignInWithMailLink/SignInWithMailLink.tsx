import React from 'react';
import firebase from "firebase/compat/app";
import Loading from "../../Loading/Loading";
import {useNavigate} from "react-router-dom";

const SignInWithMailLink: React.FC = () => {
  const navigate = useNavigate();

  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    let password = window.localStorage.getItem('passwordForSignIn');
    if (!password) {
      password = window.prompt('Please provide your password for confirmation');
    }

    email && firebase.auth().signInWithEmailLink(email, window.location.href)
      .then((result) => {
        window.localStorage.removeItem('emailForSignIn')
        navigate('/services');
      })
      .catch((error) => {
        console.log(error);
      });

    // email && password && firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then((result) => {
    //     window.localStorage.removeItem('emailForSignIn')
    //     window.localStorage.removeItem('passwordForSignIn')
    //     navigate('/services');
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  return (
    <>
      <Loading/>
    </>
  );
};

export default SignInWithMailLink;
