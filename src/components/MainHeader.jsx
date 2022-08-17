import React from 'react';
import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MainHeader() {
  const Navigate = useNavigate();
  return (
    <AppBar position="static" color="header" elevation={0}>
      <Toolbar variant="dense" disableGutters sx={{ mx: 2 }}>
        <Grid item xs={8}>
          <Box src="logo/logo_transparent.png" component="img" sx={{ width: '5em' }} />
        </Grid>
        <Box
          sx={{
            flexGrow: 1,
            display: {
              xs: 'none',
              sm: 'flex',
              justifyContent: 'flex-end',
            },
          }}
        >
          <Button
            sx={{ mr: 1, color: 'white', display: 'block' }}
            onClick={() => {
              Navigate('/register');
            }}
          >
            <Typography variant="h7">Account</Typography>
          </Button>
          <Button
            sx={{ mr: 1, color: 'white', display: 'block' }}
            onClick={() => {
              Navigate('/login');
            }}
          >
            <Typography variant="h7">Sign</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainHeader;
