import { Box, CircularProgress, Typography, Button, Card, Select, MenuItem, FormControl, TextField, FormHelperText } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { json, useLocation, useNavigate } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { init, metamask, settlementContract, nftContract } from '../services/contract';


export default function NFTBuyPage() {
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
  const [buyableNFT, setBuyableNFT] = React.useState([]); //판매중인(살 수 있는) NFT 컨트랙트 주소 목록
  const [formData, setFormData] = React.useState({
    celler: 'test1',
    price: ' ',
    value: 'WEI',
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
    const fetchData = async () => {
      await init();
      const result = await getRes();
      console.log(result);
      await handleNFTSet(result);
    };
  
    fetchData();
  }, []);


  const getRes = async () => {
    setLoading(true);
    let response = ''
    await axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/music/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setData(res.data.data);
        // setAddress(res.data.data.settlementAddr);
        console.log(res.data.data);
        response = res.data.data;
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate('/403');
      });
      return response;
  };

    //판매목록 set, useEffect 안에 있음
    const handleNFTSet = async(result) => {
      const settlementAddr = result.settlementAddr;
      console.log(settlementAddr);
      settlementContract.load(settlementAddr);
      //컨트랙트 연결 확인해주세요
      const NftContractAddresses = settlementContract.variables
        .getNftContractAddresses()
        .filter(async (address) => {
          NftContractAddresses.load(address);
          return NftContractAddresses.isApprovedForAll(metamask.account, address) ? true : false;
        });
      setBuyableNFT(NftContractAddresses);
    }

    const handleBuy = async () => {
      //컨트랙트 확인 부탁드립니다
      const Selected_nftContractAddress = formData.celler;
      nftContract.load(Selected_nftContractAddress);
      const txReceipt = await nftContract.buy(await nftContract.variables.getPrice());
      sendTXid(txReceipt.transactionHash);
      console.log(txReceipt.transactionHash);
    }

    const sendTXid = async (txid) => {
      setLoading(true);
      await axios
        .post(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/nft/sell/${id}` , {
          txId : txid,
        },
        {
          headers: {
            Authorization : token,
          },
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          navigate('/403');
        });
    }

    return (
        <Box sx={{ pt: '10%', height: '100vh', backgroundImage: 'url(/images/background.png)', textAlign: 'center' }}>
            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                <Box >
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Card
                    sx={{
                        width: '40vw',
                        height: '40vw',
                        margin: '1%',
                        backgroundSize: 'cover',
                        backgroundImage: `url('data:image/jpeg;base64,${data.image}')`,
                    }}
                    ></Card>
                  )}
                    <Typography variant="h4" component="h4" sx={{ paddingTop: '1%' }} color={'white'}>
                        {data.title}
                    </Typography>
                    <Typography variant="h5" component="h5" sx={{ paddingTop: '1%' }} color={'white'}>
                        {data.artist}
                    </Typography>
                    <Typography variant="h6" component="h5" color={'white'}>
                        {data.genre}
                    </Typography>
                    <FormControl sx={{m: 1, width: '40vw'}} >
                        <Select
                            id="celler"
                            name="celler"
                            variant='outlined'
                            displayEmpty
                            value= {formData.celler}
                            label= {'판매자선택'}
                            onChange={handleChange}
                            sx={{ borderRadius: '0.3em', mb: '2%', bgcolor: 'white', color: 'black', marginBottom: '20px' }} >
                                {buyableNFT.map((item) => {
                                  return (
                                    <MenuItem key={item} value={item}>
                                      {item}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                            <Box sx={{display: 'flex'}}>
                                <TextField 
                                  label="구매가 * " 
                                  id = "price"
                                  name = "price"
                                  onChange={handleChange}
                                  sx={{ borderRadius: '0.3em', mb: '2%', bgcolor: 'white', color: 'black' ,width : '40vw'}}
                                />
                                <Select
                                    id="value"
                                    name="value"
                                    variant="outlined"
                                    value = {formData.value}
                                    label={'단위선택'}
                                    onChange={handleChange}
                                    sx={{ borderRadius: '0.3em', mb: '2%', bgcolor: 'white', color: 'black', width: '15vw', marginLeft:'10px' }}
                                >
                                    <MenuItem value={'WEI'}>WEI</MenuItem>
                                    <MenuItem value={'ETH'}>ETH</MenuItem>
                                </Select>
                            </Box>
                            <FormHelperText sx = {{color : 'white', marginBottom : '10px'}}>구매가는 판매금액 이상이여야 합니다.</FormHelperText>
                            <Typography variant='h6' component="h5" color={'white'} textAlign={'left'} >
                                    {`NFT Price : ${formData.price} ${formData.value} `} 
                                </Typography>
                                <FormHelperText sx={{color : 'white'}}>*트랜젝션 비용은 별도입니다.</FormHelperText>
                            <Button
                                onClick={handleBuy}
                                variant='contained'
                                color='secondary'
                                sx={{ fontSize: '0.3rm', width: '40vw', marginTop:'3vh'}}
                            >
                                NFT 구매
                            </Button>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
}