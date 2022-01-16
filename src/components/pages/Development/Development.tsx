import React, {useContext, useEffect} from 'react';
import {Avatar, Box, Button, Container, Grid, Link, TextField, Typography} from "@mui/material";
import {AuthContext} from "../../../contexts/AuthProvider";
import {logout} from "../../../firebase";
import axios from "axios";

const Development: React.FC = () => {
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const apiClient = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const users = await apiClient.get('users');
      console.log(users);
    })();
  }, []);

  return (
    <>
      開発用
      <Grid>
        <Button
          onClick={() => {
            console.log(currentUser);
          }}
        >
          ログインユーザー確認
        </Button>
      </Grid>
      <Grid>
        <Button
          onClick={async () => {
            await logout();
          }}
        >
          ログアウト
        </Button>
      </Grid>
      <Grid>
        <Typography variant="button">
          <Link href='/signup'>SignUp</Link>
        </Typography>
      </Grid>
      <Grid>
        <Button
          onClick={() => {
            console.log(currentUser?.emailVerified);
          }}
        >
          verifyEmail確認
        </Button>
      </Grid>
      <Grid>
        <Typography variant="button">
          <Link href='/password_reset'>パスワード再設定</Link>
        </Typography>
      </Grid>
      <Box sx={{marginBottom: '900px'}}>a</Box>
      <Grid container direction="column" alignItems="center">
        {/*<Grid>*/}
        {/*  <Avatar*/}
        {/*    variant='square'*/}
        {/*    sx={{width: '1538px', height: '427px'}}*/}
        {/*    src={`${process.env.PUBLIC_URL}/app_bar_logo.png`}*/}
        {/*  />*/}
        {/*</Grid>*/}
        <Grid>
          <Avatar
            variant='square'
            sx={{width: '769px', height: '213px'}}
            src={`${process.env.PUBLIC_URL}/app_bar_logo.png`}
          />
        </Grid>
      </Grid>
      <Box sx={{marginBottom: '900px'}}></Box>
    </>
  );
};

export default Development;
