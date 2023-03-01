import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Card,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const dummy = ['A', 'B', 'C', 'D', 'E'];
export default function NFTPage() {
  const { state } = useLocation();
  const { id } = state;
  const [isFirstContract, setIsFirstContract] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = React.useState({
    chooseNFT: dummy[0],
    price: 0,
    type: 'WEI',
  });
  const token = localStorage.getItem('jwtToken');

  const checkFirstContract = () => {
    // setIsFirstContract(true);
    //여기에 매타마스크 체크하는 그거 써 반환값이 true false이어야함 결과값을 변수로 만들어서 setIsFirstContract(변수)이렇게만 해줘
    setIsFirstContract(); //괄호안에 변수 넣으면됨 리턴 바로되면 걍 상관없고
  };



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
    checkFirstContract();
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
    <Box
      className="test"
      sx={{ pt: '7%', height: '100vh', backgroundImage: 'url(/images/background.png)', textAlign: 'center', p: 10 }}
    >
      <Box sx={{ justifyContent: 'center', display: 'flex' }}>
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
          <Box sx={{ width: '40vw' }}>
            {isFirstContract ? (
              <>
                <TextField
                  id="chooseNFT"
                  name="chooseNFT"
                  value={formData.chooseNFT}
                  fullWidth
                  disabled
                  sx={{ borderRadius: '0.3em', bgcolor: 'white', color: 'black' }}
                />
                <FormHelperText sx={{ color: '#e6e6e6', mb: 1 }}>사용자 지갑주소</FormHelperText>
              </>
            ) : (
              <Select
                id="chooseNFT"
                name="chooseNFT"
                variant="outlined"
                fullWidth
                value={formData.chooseNFT}
                label={'판매자선택'}
                onChange={handleChange}
                sx={{ borderRadius: '0.3em', mb: '2%', bgcolor: 'white', color: 'black' }}
              >
                {dummy.map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          </Box>
          <Box
            sx={{
              borderRadius: '0.3em',
              mb: '2%',
              w: '40vw',
              justifyContent: 'space-between',
              display: 'flex',
            }}
          >
            <TextField
              id="price"
              name="price"
              type="number"
              label="가격"
              fullWidth
              onChange={handleChange}
              sx={{ borderRadius: '0.3em', bgcolor: 'white', mr: '0.5rem' }}
            />
            <Select
              id="type"
              name="type"
              variant="outlined"
              value={formData.type}
              label={'단위선택'}
              onChange={handleChange}
              sx={{ borderRadius: '0.3em', bgcolor: 'white', color: 'black' }}
            >
              <MenuItem value={'WEI'}>WEI</MenuItem>
              <MenuItem value={'ETH'}>ETH</MenuItem>
            </Select>
          </Box>
          <Typography variant="h6" component="h5">
            {`NFT Price : ${formData.price} ${formData.type}`}
          </Typography>
          <Button
            onClick={async () => {
              await console.log('생성함수 쓰셈');
              //NFT 생성함수 여기 console.log 지우고 쓰셈 nft생성에 필요한 데이터는 ui바꿀때 콘솔에 찍히거든 객체담기는 변수는 formData고 필요한거잇으면 카톡 ㄱㄱ
            }}
            variant="contained"
            color="secondary"
            sx={{ fontSize: '0.3rm', width: '70%', padding: '1vh', mt: '10%' }}
          >
            NFT 생성
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
