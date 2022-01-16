import React from 'react';
import {CircularProgress, Container, Grid} from "@mui/material";

const Loading: React.FC = () => {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{marginTop: '20%', position: 'absolute'}}
      >
        <CircularProgress size='80px' color="primary" />
      </Grid>
    </>
  );
};

export default Loading;
