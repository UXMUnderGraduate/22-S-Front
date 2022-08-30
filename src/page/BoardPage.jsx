import { Box } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import BoardList2 from '../components/BoardList2';
import BackgroundVideo from '../components/BackgroundVideo';
import Header from '../components/Header';
import BoardGrid from '../components/BoardGrid';

const BoardPage = () => {
  const [data, setData] = useState('');
  const test = [...data];

  const getRes = async () => {
    await axios
      .get('http://192.168.0.2:9494/api/v1/music/chart?genre=Pop')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(test);

  useEffect(() => {
    getRes();
  }, []);

  return (
    <Box sx={{ height: '100%', zIndex: 0, overflowX: 'hidden' }}>
      <BackgroundVideo />
      <Header />
      <Box sx={{ width: '100%', margin: 'auto' }}>
        {/* <BoardList2 data={data} /> */}
        <BoardGrid data={data} />
      </Box>
    </Box>
  );
};
export default BoardPage;
