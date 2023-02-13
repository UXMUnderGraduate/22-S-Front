import { Box, Typography, Card, CircularProgress, Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as contractApi from '../services/contract';

export default function SongInfo() {
  const { state } = useLocation();
  const { id } = state;
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const token = localStorage.getItem('jwtToken');
  // console.log(token);
  async function handleBuy(address) {
    await contractApi.init();
    contractApi.settlementContract.load(address);
    const result = await contractApi.settlementContract.buy();
    const txLog = await contractApi.settlementContract.event.getBuyLog(result);
    console.log(`buy() Transaction: ${result.transactionHash}`);
    console.log(txLog);
    await axios({
      method: 'post',
      headers: {
        authorization: token,
      },
      url: `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/purchase/${id}`,
      data: { hash: result.transactionHash },
    }).then((res) => {
      console.log(res.message);
      alert(`구매가 완료되었습니다!\ntxid: ${result.transactionHash}`);
    });
  }

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
        setAddress(res.data.data.settlementAddr);
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
      <Typography variant="h4" component="h4" sx={{ paddingTop: '1rem' }}>
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
      {/* <Typography
        variant="h6"
        component="h6"
        sx={{ paddingTop: '2%', paddingBottom: '10%', marginLeft: '35%', width: '30vw' }}
      >
        {data.lyrics}
      </Typography> */}
      <Lyrics>{data.lyrics}</Lyrics>
      {localStorage.getItem('type') === 'General' ? (
        <>
          <Button
            onClick={async () => {
              await handleBuy(address);
            }}
            variant="contained"
            color="secondary"
            sx={{ fontSize: '0.9rem', width: '10rem', padding: '0.5rem', m: 1 }}
          >
            Buy
          </Button>
          <br />
          <Button
            onClick={async () => {
              console.log('first');
            }}
            variant="contained"
            color="secondary"
            sx={{ fontSize: '0.9rem', width: '10rem', padding: '0.5rem', m: 1 }}
          >
            NFT
          </Button>
        </>
      ) : (
        <Box sx={{ paddingBottom: '3rem' }} />
      )}
    </Box>
  );
}

const Lyrics = styled.pre`
  font-size: 0.8rem;
  font-weight: 600;
`;
