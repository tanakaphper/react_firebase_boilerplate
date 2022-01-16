import React, {useState} from 'react';
import {Avatar, Button, Container, Grid, TextField, Typography} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {passwordReset} from "../../../firebase";

const PasswordReset: React.FC = () => {
  const [passwordResetMailSent, setPasswordResetMailSent] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>('');
  const editEmailAddress = (emailAddress: string) => {setEmailAddress(emailAddress)};

  if (passwordResetMailSent) {
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
              入力いただいたメールアドレス宛に、パスワード再設定のメールを送信しました。メールに記載のURLをクリックしてパスワード再設定を完了させてください。
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
            <Typography variant="h6" display="block" gutterBottom>
              パスワード再設定
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="caption" display="block" gutterBottom textAlign="left">
              ご利用中のメールアドレスをご入力ください。パスワード再設定のためのURLをお送りします。
            </Typography>
          </Grid>
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
                console.log(emailAddress);
              }}
            />
          </Grid>
          <Grid>
            <Button
              variant='contained'
              sx={{margin: '3px', width: '95%'}}
              onClick={async () => {
                try {
                  await passwordReset(emailAddress);
                  setPasswordResetMailSent(true);
                } catch (e: any) {
                  console.log(e);
                }
              }}
            >
              再設定メールを送信
            </Button>
          </Grid>
        </Container>
      </>
    );
  }
};

export default PasswordReset;
