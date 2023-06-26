import { Box, CircularProgress, Typography, Button, Card, Select, MenuItem, FormControl } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { init, metamask, settlementContract, nftContract } from '../services/contract';
// const id = 1;

export default function NFTPage() {
  const { state } = useLocation();
  const { id } = state;
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('jwtToken');

  // !테스트를 위해 잠시 주석처리 해놓음
  // const [celler, setCeller] = React.useState('');
  // const [price, setPrice] = React.useState('');

  // !테스트용으로 추가한 데이터임. 추후 삭제 요망
  const [buyableNFT, setBuyableNFT] = React.useState(['0xEE6EDD7d51a09D26457C1a27d624F1505d885A5c']); //판매중인(살 수 있는) NFT 컨트랙트 주소 목록
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

  // 판매자 목록
  const sellerOptions = buyableNFT.map((seller, index) => (
    <MenuItem key={index} value={seller}>
      판매자{index + 1}
    </MenuItem>
  ));

  // 판매가격
  useEffect(() => {
    sellPrice();
  }, []);

  useEffect(() => {
    getRes();
  }, []);

  const sellPrice = async () => {
    init();
    return nftContract.load(buyableNFT[0]).getPrice();
  };

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
                ml: '4vw',
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
              {sellerOptions}
              {/* !테스트를 위해 잠시 주석처리 해놓음  */}
              {/* <MenuItem value={'test1'}>판매자1</MenuItem>
              <MenuItem value={'test2'}>판매자2</MenuItem>
              <MenuItem value={'test3'}>판매자3</MenuItem> */}
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
              {`NFT Price : ${sellPrice()} ETH`}
            </Typography>
            {localStorage.getItem('type') === 'General' ? (
              <Button
                onClick={async () => {
                  await init();
                  console.log(await nftContract.load(buyableNFT[0]).getPrice());
                  //TODO: nft contract 주소 받아오기
                  const settlementContractAddress = ''; //음원 정산 string
                  settlementContract.load(settlementContractAddress);
                  const NftContractAddresses = settlementContract.variables
                    .getNftContractAddresses()
                    .filter(async (address) => {
                      nftContractAddress.load(address);
                      return nftContractAddress.isApprovedForAll(metamask.account, address) ? true : false;
                    });
                  setBuyableNFT(NftContractAddresses);
                  console.log(buyableNFT);
                  const nftContractAddress = '';
                  nftContract.load(nftContractAddress);
                  const txReceipt = await nftContract.buy(await nftContract.variables.getPrice());
                  // TODO txReceipt.transactionHash: 트랜잭션 해시를 백엔드로 전송
                  console.log(txReceipt.transactionHash);
                }}
                variant="contained"
                color="secondary"
                sx={{ fontSize: '0.3rm', width: '70%', padding: '1vh', mt: '10%', ml: '15%' }}
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
