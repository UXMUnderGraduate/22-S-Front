import React from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import MyProfile from '../components/MyProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import styled from "styled-components";

function ProfilePage() {
  const theme = createTheme({
    main: '#ffffff',
  });
  const items = [
    {
      id: 1,
      email: 'hsj106@mju.ac.kr',
      name: '홍길동',
      type: 'General',
      nickname: '아이유',
      wallet: '0x9b234F7b778F2dff92d8338fbB9D5b3cE8636021',
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', backgroundImage: 'url(/images/background.png)', textAlign: 'center' }}>
        <AccountCircleIcon sx={{ fontSize: '600%', paddingTop: '10%' }} />
        <Typography variant="h2" component="h2" fontWeight="400" sx={{ paddingTop: '2%' }}>
          My Profile
        </Typography>
        {items.map((item) => {
          return (
            <MyProfile
              key={item.id}
              email={item.email}
              type={item.type}
              nickName={item.nickname}
              wallet={item.wallet}
            />
          );
        })}
      </Box>
    </ThemeProvider>
  );
}

export default ProfilePage;
