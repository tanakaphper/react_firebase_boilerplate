import React, {useEffect, useState} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {confirmNewPassword, getEmailAddressFromPasswordResetCode, passwordReset} from "../../../firebase";
import {Avatar, Button, Container, Grid, TextField, Typography} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Loading from "../../Loading/Loading";

const ConfirmNewPassword: React.FC = () => {
  const [valieEmail, setValidEmail] = useState<string|null|undefined>(undefined);
  const queryParams = useLocation().search;
  const [newPassword, setNewPassword] = useState<string>('');
  const editNewPassword = (newPassword: string) => {setNewPassword(newPassword)};

  const redirectUrl = new URLSearchParams(queryParams).get('continueUrl');
  console.log('redirectUrl');
  console.log(redirectUrl);
  const actionCode = new URLSearchParams(queryParams).get('oobCode');
  console.log('actionCode');
  console.log(actionCode);
  const mode = new URLSearchParams(queryParams).get('mode');
  console.log('mode');
  console.log(mode);

  useEffect(() => {
    (async () => {
      if (actionCode) {
        const validEmail = await getEmailAddressFromPasswordResetCode(actionCode);
        console.log(validEmail);
        setValidEmail(validEmail);
      }
    })();
  }, []);

  if (valieEmail === undefined) {
    return (
      <><Loading/></>
    );
  }
  if (valieEmail === null) {
    return <><Navigate to='/top'/></>
  }

  return (
    <>
      <Container
        sx={{
          backgroundColor: '#fff',
          marginTop: "40px",
          width: "380px",
          borderRadius: '5px',
          padding: '25px',
          border: '1px solid',
          borderColor: 'grey.400'
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Grid>
            <Avatar
              sx={{
                marginTop: '10px',
                marginBottom: '30px',
                bgcolor: 'blue',
                width: 56, height: 56
              }}>
              <LockOpenIcon/>
            </Avatar>
          </Grid>
        </Grid>
        <Grid>
          <Typography variant="h6" display="block" gutterBottom>
            パスワード再設定
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="caption" display="block" gutterBottom textAlign="left">
            新しいパスワードをご入力いただき、パスワードを再設定してください。
          </Typography>
        </Grid>
        <Grid>
          <TextField
            id="outlined-textarea"
            label="パスワード"
            fullWidth
            type='password'
            size="small"
            value={newPassword}
            sx={{margin: '3px', width: '95%', height: '10%'}}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value: string = event.target.value;
              editNewPassword(value);
            }}
          />
        </Grid>
        <Grid>
          <Button
            variant='contained'
            sx={{margin: '3px', width: '95%'}}
            onClick={async () => {
              console.log(actionCode);
              console.log(newPassword);
              actionCode && await confirmNewPassword(actionCode, newPassword);
            }}
          >
            変更する
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default ConfirmNewPassword;
