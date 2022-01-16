import React, {createContext, useEffect, useLayoutEffect, useState} from 'react';
import {User} from "@firebase/auth-types";
import {auth} from "../firebase"

interface IAuthContext {
  currentUser: User | null | undefined;
  isLogined: boolean;
}

const AuthContext = createContext<IAuthContext>({currentUser: undefined, isLogined: false});

const AuthProvider = (props: any) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);
  const [isLogined, setIsLogined] = useState<boolean>(false);

  useLayoutEffect(() => {
    auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        setIsLogined(user.emailVerified);
        (user.emailVerified) ? console.log('user.emailVerified: true') : console.log('user.emailVerified: false');
      } else {
        setIsLogined(false);console.log('emailVeified: false');
      }
    });
    return () => {};
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        isLogined: isLogined
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
