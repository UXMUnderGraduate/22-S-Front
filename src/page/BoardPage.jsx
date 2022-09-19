import { Box } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BoardList2 from '../components/BoardList2';
import BackgroundVideo from '../components/BackgroundVideo';
import Header from '../components/Header';
import BoardGrid from '../components/BoardGrid';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const BoardPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const test = [...data];

  const token = localStorage.getItem('jwtToken');
  localStorage.setItem('type', jwtDecode(token).type);
  localStorage.setItem('userId', jwtDecode(token).id);
  // console.log(jwtDecode(token).type);

  const getRes = async () => {
    await axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/music/chart?genre=Pop`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        navigate('/403');
      });
  };
  console.log(test);

  useEffect(() => {
    getRes();
    // window.location.reload(true);
  }, []);

  return (
    <Box sx={{ height: '100%', zIndex: 0, overflowX: 'hidden' }}>
      <BackgroundVideo />
      <Header />
      <Box sx={{ width: '100%', margin: 'auto' }}>
        <BoardList2 data={data} />
        <BoardGrid data={data} />
      </Box>
    </Box>
  );
};
export default BoardPage;
