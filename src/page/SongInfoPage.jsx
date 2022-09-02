import { Box, Typography, Card, CircularProgress, Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import * as contractApi from '../services/contract';

async function handleBuy(address) {
  await contractApi.init();
  contractApi.settlementContract.load(address);
  const result = await contractApi.settlementContract.buy();
  console.log(`settle() Transaction: ${result.transactionHash}`);
}

export default function SongInfo() {
  const { state } = useLocation();
  const { id } = state;
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const address = '0x2F24C9C668F968cDDeEA0B7685029c1e0E9c1b1f';
  const token = localStorage.getItem('jwtToken');
  console.log(token);

  const getRes = async () => {
    setLoading(true);
    await axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/music/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setData(res.data.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate('/403');
      });
  };

  useEffect(() => {
    getRes();
  }, []);

  return (
    <Box sx={{ height: '100%', backgroundImage: 'url(/images/background.png)', textAlign: 'center' }}>
      <Typography variant="h4" component="h4" sx={{ paddingTop: '8%' }}>
        {data.title}
      </Typography>
      <Typography variant="h5" component="h5" sx={{ paddingTop: '1%' }}>
        {data.artist}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
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
      )}
      {data.genre}
      <Typography
        variant="h6"
        component="h6"
        sx={{ paddingTop: '2%', paddingBottom: '10%', marginLeft: '35%', width: '30vw' }}
      >
        {data.lyrics}
      </Typography>
      {data.state === true ? (
        <Button
          onClick={async () => {
            await handleBuy(address);
          }}
          variant="contained"
          color="secondary"
          sx={{ fontSize: '3vh', width: '40%', padding: '1vh', marginBottom: '10%' }}
        >
          Buy
        </Button>
      ) : null}
    </Box>
  );
}
