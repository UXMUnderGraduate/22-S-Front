import * as React from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import MyProfile from '../components/MyProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import styled from "styled-components";

function ProfilePage() {
  const theme = createTheme({
    main: '#ffffff',
  });
  const [data, setData] = useState('');

  const getRes = async () => {
    const token = localStorage.getItem('jwtToken');
    await axios
      .get('http://localhost:9494/api/v1/user', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        const { id, name, nickname, password } = res.data.data;
        setData({ id, name, nickname, password });
      });
  };

  useEffect(() => {
    getRes();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', backgroundImage: 'url(/images/background.png)', textAlign: 'center' }}>
        <AccountCircleIcon sx={{ fontSize: '600%', paddingTop: '10%' }} />
        <Typography variant="h2" component="h2" fontWeight="400" sx={{ paddingTop: '2%' }}>
          My Profile
        </Typography>
        <MyProfile key={data.id} name={data.name} nickName={data.nickname} />
      </Box>
    </ThemeProvider>
  );
}

export default ProfilePage;
