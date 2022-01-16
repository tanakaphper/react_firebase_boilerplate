import React from 'react';
import {Avatar, Box, Button, Container, Divider, Grid, Link, Paper, TextField, Typography} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {googleLogin, facebookLogin, signIn} from "../../../firebase";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import {useNavigate} from "react-router-dom";

const MobileSignIn: React.FC<{
  emailAddress: string,
  editEmailAddress: (emailAddress: string) => void,
  password: string,
  editPassword: (password: string) => void
}> = ({emailAddress, editEmailAddress, password, editPassword}) => {

  const navigtate = useNavigate();

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
          <Typography variant="button" display="block" gutterBottom>
            メールアドレスでログイン
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
              await signIn(emailAddress, password);
            }}
          >
            サインイン
          </Button>
        </Grid>
        <Grid>
          <Typography variant="button">
            パスワードを忘れた方は<Link href='/reset_password'>こちら</Link>
          </Typography>
        </Grid>
        <Divider sx={{marginTop: '12px', marginBottom: '12px'}}>または</Divider>
        <GoogleLoginButton
          onClick={async () => {
            try {
              await googleLogin();
            } catch (e: any) {
              console.log(e);
            }
          }}
        >
          Google でログイン
        </GoogleLoginButton>
        <FacebookLoginButton
          onClick={async () => {
            try {
              await facebookLogin();
            } catch (e: any) {
              console.log(e);
            }
          }}
        >
          Facebook でログイン
        </FacebookLoginButton>
        <Divider sx={{marginTop: '12px', marginBottom: '12px'}}>はじめての方は</Divider>
        <Grid>
          <Button
            variant='contained'
            sx={{margin: '3px', width: '95%'}}
            onClick={() => {
              navigtate('/signup');
            }}
          >
            メールアドレスで新規登録
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default MobileSignIn;
