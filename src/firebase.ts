import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/auth";
import {User} from "@firebase/auth-types";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
});
const signInMailLinkUrl = process.env.REACT_APP_BASE_URL + '/signin_with_mail_link';

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const googleLogin = async () => {
  try {
    await auth.signInWithPopup(googleAuthProvider);
  } catch (e: any) {
    console.log(e);
  }
};

export const facebookLogin = async () => {
  try {
    await auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  } catch (e: any) {
    console.log(e);
  }
};

export const sendSignInLinkToEmail = async (email: string) => {
  const actionCodeSettings = {
    url: signInMailLinkUrl,
    //handleCodeInApp: true
  };
  try {
    await auth.sendSignInLinkToEmail(email, actionCodeSettings)
  } catch (e: any) {
    console.log(e);
  }
};

// export const emailLogin = async (email: string) => {
//   try {
//     const credential = firebase.auth.EmailAuthProvider.credentialWithLink(email, signInMailLinkUrl)
//     await auth.currentUser?.reauthenticateWithCredential(credential);
//   } catch (e: any) {
//     console.log(e.message);
//     alert(e.message);
//   }
// };

/**
 * メールアドレスとパスワードでアカウント作成して本人確認メールを送信
 *
 * @param email
 * @param password
 */
export const signUp = async (email: string, password: string) => {
  // アカウント作成
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
  } catch (e: any) {
    console.log(JSON.stringify(e.message))
  }

  // 本人確認メール送信
  const actionCodeSettings = {
    url: process.env.REACT_APP_BASE_URL + '/services',
    handleCodeInApp: true
  };
  try {
    await auth.currentUser?.sendEmailVerification(actionCodeSettings);
  } catch (e: any) {
    console.log(JSON.stringify(e.message))
  }
};

/**
 * メールアドレスとパスワードでログイン
 *
 * @param email
 * @param password
 */
export const signIn = async (email: string, password: string) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (e: any) {
    console.log(e);
  }
};

export const passwordReset = async (emailAddress: string) => {
  const actionCodeSettings = {
    url: process.env.REACT_APP_BASE_URL + '/services'
  };
  try {
    await auth.sendPasswordResetEmail(emailAddress, actionCodeSettings);
  } catch (e: any) {
    console.log(e);
  }
};

export const getEmailAddressFromPasswordResetCode = async (actionCode: string): Promise<string|null> => {
  try {
    return await auth.verifyPasswordResetCode(actionCode);
  } catch (e: any) {
    return null;
  }
};

export const confirmNewPassword = async (actionCode: string, newPassword: string) => {
  try {
    await auth.confirmPasswordReset(actionCode, newPassword);
    console.log('confirmNewPassword');
  } catch (e: any) {
    console.log(e);
  }
};

export const logout = async () => {
  try {
    await firebase.auth().signOut();
  } catch (e: any) {
    console.log(JSON.stringify(e.message))
  }
};

export const isSignedIn = (currentUser: User|null|undefined): boolean|undefined => {
  if (currentUser === undefined) {
    return undefined;
  }

  if (currentUser === null) {
    return false;
  }

  if (!currentUser.emailVerified) {
    return false;
  }

  return true;
};
