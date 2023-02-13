import { Box, CircularProgress, Typography, Button, Card, Select, MenuItem, FormControl } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// const id = 1;

export default function NFTPage() {
  const { state } = useLocation();
  const { id } = state;
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('jwtToken');

  // const [celler, setCeller] = React.useState('');
  // const [price, setPrice] = React.useState('');

  const [formData, setFormData] = React.useState({
    celler: 'test1',
    price: 'WEI',
  });

  const handleChange = (e) => {
    const nextForm = {
      ...formData,
      [e.target.name]: e.target.value,
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
      <Box sx={{ justifyContent: 'center', display: 'flex' }}>
        <Box>
          {loading ? (
            <CircularProgress />
          ) : (
            <Card
              sx={{
                width: '40vw',
                height: '40vw',
                ml:"4vw",
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
              name="celler"
              variant="outlined"
              displayEmpty
              value={formData.celler}
              label={'판매자선택'}
              onChange={handleChange}
              sx={{ borderRadius: '0.3em', mb: '2%', bgcolor: 'white', color: 'black' }}
            >
              <MenuItem value={'test1'}>판매자1</MenuItem>
              <MenuItem value={'test2'}>판매자2</MenuItem>
              <MenuItem value={'test3'}>판매자3</MenuItem>
            </Select>
            <Select
              id="price"
              name="price"
              variant="outlined"
              value={formData.price}
              label={'단위선택'}
              onChange={handleChange}
              sx={{ borderRadius: '0.3em', mb: '2%', bgcolor: 'white', color: 'black' }}
            >
              <MenuItem value={'WEI'}>WEI</MenuItem>
              <MenuItem value={'ETH'}>ETH</MenuItem>
            </Select>
            <Typography variant="h6" component="h5">
              {'NFT Price : ' + '0 ETH'}
            </Typography>
            {localStorage.getItem('type') === 'General' ? (
              <Button
                onClick={async () => {
                  await console.log('구매함수 쓰셈');
                  //NFT 구매함수 여기 console.log 지우고 쓰셈 nft구매에 필요한 데이터는 ui바꿀때 콘솔에 찍히거든 객체담기는 변수는 formData고 필요한거잇으면 카톡 ㄱㄱ
                }}
                variant="contained"
                color="secondary"
                sx={{ fontSize: '0.3rm', width: '70%', padding: '1vh', mt: '10%', ml: '15%'}}
              >
                NFT 구매
              </Button>
            ) : null}
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
