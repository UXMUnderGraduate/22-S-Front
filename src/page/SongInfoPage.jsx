import { Box, Typography, Card } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SongInfo() {
  const { state } = useLocation();
  const { id } = state;
  const [data, setData] = useState('');

  
  const getRes = async () => {
    await axios
      .get(`http://192.168.0.2:9494/api/v1/music/${id}`, {
        headers: {
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iu2YhOyEoOyerCIsImlhdCI6MTY2MDIwMDU4M30.jSGHhrlFrHb2aeOwGd73a5iHEXpevW6R6K-nxAyqwLw',
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRes();
  }, []);

  return (
    <Box sx={{ height: '100vh', backgroundImage: 'url(/images/background.png)', textAlign: 'center' }}>
      <Typography variant="h4" component="h4" sx={{ paddingTop: '8%' }}>
        {data.title}
      </Typography>
      <Typography variant="h5" component="h5" sx={{ paddingTop: '1%' }}>
        {data.artist}
      </Typography>
      <Card
        sx={{
          width: '20vw',
          height: '20vw',
          marginTop: '2%',
          marginLeft: '40%',
          backgroundSize: 'cover',
          backgroundImage: `url('data:image/jpeg;base64,${data.image}')`,
        }}
      ></Card>
      {data.genre}
      <Typography
        variant="h6"
        component="h6"
        sx={{ paddingTop: '5%', paddingBottom: '10%', marginLeft: '35%', width: '30vw' }}
      >
        {data.lyrics}
      </Typography>
    </Box>
  );
}
