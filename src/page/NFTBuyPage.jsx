import { Box, CircularProgress, Typography, Button, Card, Select, MenuItem, FormControl } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const id = 1;

export default function NFTPage() {
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('jwtToken');

  // const [celler, setCeller] = React.useState('');
  // const [price, setPrice] = React.useState('');

  const [formData, setFormData] = React.useState({
    celler: '',
    price: '',
  });

  const handleChange = (e) => {
    const nextForm = {
      ...formData,
      [e.target.id]: e.target.value,
    };
    console.log(nextForm);
    setFormData(nextForm);
  };

  useEffect(() => {
    getRes();
  }, []);

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
        // setAddress(res.data.data.settlementAddr);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate('/403');
      });
  };

  return (
    <Box sx={{ pt: '10%', height: '100vh', backgroundImage: 'url(/images/background.png)', textAlign: 'center' }}>
      <Box sx={{ justifyContent: 'center', width: '70vw', display: 'flex', ml: '15%' }}>
        <Box>
          {loading ? (
            <CircularProgress />
          ) : (
            <Card
              sx={{
                width: '40vw',
                height: '40vw',
                backgroundSize: 'cover',
                backgroundImage: `url('data:image/jpeg;base64,${data.image}')`,
              }}
            ></Card>
          )}
          <Typography variant="h4" component="h4" sx={{ paddingTop: '1%' }}>
            {data.title}
          </Typography>
          <Typography variant="h5" component="h5" sx={{ paddingTop: '1%' }}>
            {data.artist}
          </Typography>
          <Typography variant="h6" component="h5">
            {data.genre}
          </Typography>
          <FormControl sx={{ m: 1, width: '40vw' }}>
            <Select
              id="celler"
              variant="outlined"
              value={'celler'}
              label="celler"
              onChange={handleChange}
              sx={{ borderRadius: '0.3em', mb: '2%', bgcolor: '#f0f0f0' }}
            >
              <MenuItem value={'test'}>판매자1</MenuItem>
              <MenuItem value={'test'}>판매자2</MenuItem>
              <MenuItem value={'test'}>판매자3</MenuItem>
            </Select>
            <Select
              id="price"
              variant="outlined"
              value={'price'}
              label="price"
              onChange={handleChange}
              sx={{ borderRadius: '0.3em', bgcolor: '#f0f0f0' }}
            >
              <MenuItem value={'test'}>WEI</MenuItem>
              <MenuItem value={'test'}>ETH</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h6" component="h5">
            {'NFT Price : ' + '0 ETH'}
          </Typography>
          {localStorage.getItem('type') === 'General' ? (
            <Button
              onClick={async () => {
                await console.log('다른함수넣기');
              }}
              variant="contained"
              color="secondary"
              sx={{ fontSize: '0.3rm', width: '70%', padding: '1vh', mt: '10%' }}
            >
              NFT 구매
            </Button>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
