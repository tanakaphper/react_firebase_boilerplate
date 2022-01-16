import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {auth} from "../../../../firebase";

const VerifyEmail: React.FC = () => {
  const queryParams = useLocation().search;

  // 本人確認画面に遷移したあとの遷移先URL
  const redirectUrl = new URLSearchParams(queryParams).get('continueUrl');

  useEffect(() => {
    const verify = async () => {
      const oobCode = new URLSearchParams(queryParams).get('oobCode');
      oobCode && await auth.applyActionCode(oobCode);
      await auth.currentUser?.reload();
    };
    verify();
  }, []);
  return (
    <>
      verify email
      {redirectUrl &&
        <a href={redirectUrl}>aaa</a>
      }
    </>
  );
};

export default VerifyEmail;
