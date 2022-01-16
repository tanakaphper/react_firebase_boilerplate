import React, {useState} from 'react';
import {Avatar, Button, Container, Grid, Link, TextField, Typography} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {useIsMobile} from "../../../contexts/MediaQuery";
import {signUp} from "../../../firebase";
import MobileSignUp from "./MobileSignUp";

const SignUp: React.FC = () => {
  const {isMobile} = useIsMobile();
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const updateEmailSent = (emailSentStatus: boolean) => {setEmailSent(emailSentStatus)};
  const [emailAddress, setEmailAddress] = useState('');
  const editEmailAddress = (emailAddress: string) => {setEmailAddress(emailAddress)};
  const [password, setPassword] = useState('');
  const editPassword = (password: string) => {setPassword(password)};

  if (isMobile) {
    return (
      <MobileSignUp
        emailAddress={emailAddress}
        editEmailAddress={editEmailAddress}
        password={password}
        editPassword={editPassword}
        emailSent={emailSent}
        updateEmailSent={updateEmailSent}
      />
    );
  } else {
    if (emailSent) {
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
            <Grid container direction="column">
              <Typography variant="button" display="block" gutterBottom textAlign="left">
                入力いただいたメールアドレス宛に、本人確認メールを送信しました。メールに記載のURLをクリックして本登録を完了させてください。
              </Typography>
            </Grid>
          </Container>
        </>
      );
    } else {
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
              <Typography variant="button" display="block" gutterBottom>
                新規登録
              </Typography>
              <Grid>
                <TextField
                  id="outlined-textarea"
                  label="メールアドレス"
                  placeholder="hoge@example.com"
                  fullWidth
                  size="small"
                  value={emailAddress}
                  sx={{margin: '3px', width: '95%', height: '10%'}}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value: string = event.target.value;
                    editEmailAddress(value);
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  id="outlined-textarea"
                  label="パスワード"
                  fullWidth
                  size="small"
                  type='password'
                  value={password}
                  sx={{margin: '3px', width: '95%', height: '10%'}}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value: string = event.target.value;
                    editPassword(value);
                  }}
                />
              </Grid>
              <Grid>
                <Button
                  variant='contained'
                  sx={{margin: '3px', width: '95%'}}
                  onClick={async () => {
                    try {
                      await signUp(emailAddress, password);
                      setEmailSent(true);
                    } catch (e: any) {
                      console.log(e);
                    }
                  }}
                >
                  サインアップ
                </Button>
              </Grid>
              <Grid>
                <Typography variant="button">
                  すでにアカウントをお持ちの方は<Link href='/signin'>こちら</Link>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </>
      );
    }
  }
}

export default SignUp
