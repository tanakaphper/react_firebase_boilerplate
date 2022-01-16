import React, {useContext, useState} from 'react';
import {useIsMobile} from "../../../contexts/MediaQuery";
import MobileSignIn from "./MobileSignIn";
import {AuthContext} from "../../../contexts/AuthProvider";
import {Avatar, Box, Button, Chip, Container, Divider, Grid, Link, TextField, Typography} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {facebookLogin, googleLogin, signIn} from "../../../firebase";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import {useLocation, useNavigate} from "react-router-dom";

const SignIn: React.FC = () => {
  const {isMobile} = useIsMobile();
  const [emailAddress, setEmailAddress] = useState('');
  const editEmailAddress = (emailAddress: string) => {setEmailAddress(emailAddress)};
  const [password, setPassword] = useState('');
  const editPassword = (password: string) => {setPassword(password)};
  const navigate = useNavigate();
  const location = useLocation();

  if (isMobile) {
    // スマホ
    return (
      <MobileSignIn
        emailAddress={emailAddress}
        editEmailAddress={editEmailAddress}
        password={password}
        editPassword={editPassword}
      />
    );
  } else {
    // PC
    return (
      <>
        <Container
          sx={{
            backgroundColor: '#fff',
            marginTop: "40px",
            width: "60%",
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
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{xs: 1, sm: 2, md: 3}}
          >
            <Grid item xs={5}>
              <Typography variant="button" display="block" gutterBottom>
                メールアドレスでログイン
              </Typography>
              <Grid>
                <TextField
                  id="outlined-textarea"
                  label="メールアドレス"
                  placeholder="hoge@example.com"
                  fullWidth
                  size="small"
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
                  type='password'
                  size="small"
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
                  sx={{margin: '4px', width: '95%'}}
                  onClick={async () => {
                    await signIn(emailAddress, password)
                    navigate(location.pathname || "/");
                  }}
                >
                  送信
                </Button>
              </Grid>
              <Typography variant="button">
                パスワードを忘れた方は<Link href='/password_reset'>こちら</Link>
              </Typography>
              <Divider sx={{marginTop: '12px', marginBottom: '12px'}}>
                <Typography variant="button" display="block" gutterBottom>
                  はじめての方は
                </Typography>
              </Divider>
              <Grid>
                <Button
                  variant='contained'
                  sx={{margin: '2px', width: '95%'}}
                  onClick={async () => {
                    console.log(emailAddress);
                    navigate('/signup');
                  }}
                >
                  メールアドレスで新規登録
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Box sx={{paddingTop: '60px'}}>
                <Chip label="または" />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="button" display="block" gutterBottom>
                SNSアカウントでログイン
              </Typography>
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
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
};

export default SignIn
