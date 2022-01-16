import React from 'react';
import {Avatar, Button, Container, Grid, Link, TextField, Typography} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {signUp} from "../../../firebase";

const MobileSignUp: React.FC<{
  emailAddress: string,
  editEmailAddress: (emailAddress: string) => void,
  password: string,
  editPassword: (password: string) => void,
  emailSent: boolean,
  updateEmailSent: (emailSentStatus: boolean) => void
}> = ({emailAddress, editEmailAddress, password, editPassword, emailSent, updateEmailSent}) => {
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
            width: "84%",
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
                  await signUp(emailAddress, password);
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

export default MobileSignUp;
