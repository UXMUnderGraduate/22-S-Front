import * as React from 'react';
import { Box, Button, ThemeProvider, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import MyProfile from '../components/MyProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import styled from "styled-components";

function ProfilePage() {
  const navigate = useNavigate();
  const theme = createTheme({
    main: '#ffffff',
  });
  const [data, setData] = useState('');

  const getRes = async () => {
    const token = localStorage.getItem('jwtToken');
    await axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/user`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        const { id, name, nickname, password, wallet } = res.data.data;
        setData({ id, name, nickname, password , wallet});
      });
  };

  useEffect(() => {
    getRes();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', backgroundImage: 'url(/images/background.png)', textAlign: 'center' }}>
        <Button
          sx={{ display: 'block', color: '#ffffff' }}
          onClick={() => {
            navigate('/board');
          }}
        >
          뒤로가기
        </Button>
        <AccountCircleIcon sx={{ fontSize: '600%', margin: '3vh' }} />
        <Typography variant="h2" component="h2" fontWeight="400" sx={{ paddingTop: '2vh' }}>
          My Profile
        </Typography>
        <MyProfile key={data.id} name={data.name} nickName={data.nickname} wallet={data.wallet}/>
      </Box>
    </ThemeProvider>
  );
}

export default ProfilePage;
