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
// import { init, metamask, settlementContract, nftContract, deployContract } from '../services/contract';
import { init, metamask, nftContract, deployContract } from '../services/contract';

const dummy = ['A', 'B', 'C', 'D', 'E'];
export default function NFTPage() {
  const { state } = useLocation();
  const { id } = state;
  const [isFirstContract, setIsFirstContract] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = React.useState({
    chooseNFT: dummy,
    price: 0,
    type: 'WEI',
  });
  const token = localStorage.getItem('jwtToken');

  // 컨트랙트 연결시 해제
  // const checkFirstContract = async () => {
  //   //(완)여기에 매타마스크 체크하는 그거 써 반환값이 true false이어야함 결과값을 변수로 만들어서 setIsFirstContract(변수)이렇게만 해줘
  //   //(완)setIsFirstContract(); //괄호안에 변수 넣으면됨 리턴 바로되면 걍 상관없고
  //   await init();
  //   console.log('init done.');
  //   const nftContractAddress = await settlementContract.variables.getNftContractAddresses(metamask.account);

  //   console.log(nftContractAddress);
  //   if (metamask.web3.utils.hexToNumber(nftContractAddress) !== 0) setIsFirstContract(false);
  //   return;
  // };

  //isFirstContract 상태 변경 함수, 컨트랙트 연결시 삭제
  const change_setIsFirstContract = () => {
    if(isFirstContract === true){
      setIsFirstContract(false);
    }
    else {
      setIsFirstContract(true);
    }
  }

  const setMenuItem = async () => {
    //contract 연결시 init 삭제, 아래 setFormData 삭제
    await init();
    setFormData((prevFormData) => ({
      ...prevFormData,
      chooseNFT : metamask.account
    }))
    console.log('menu change');

    // //contract 연결시 주석 해제
    // if(isFirstContract === false){
    //     setFormData((prevFormData) => ({
    //       ...prevFormData,
    //       chooseNFT : metamask.account
    //     }))
    //   }
    // else{
    //   setFormData((prevFormData) => ({
    //     //여기에 구매 가능한 nft 목록 받아와서 chooseNFT 변경
    //     ...prevFormData,
    //     chooseNFT : nftContractAddress
    //   }))
    // }
  }

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
      await getRes();
      // contract 연결시 주석 해제
      //await checkFirstContract();
      await setMenuItem();
    };
  
    fetchData();
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

  //ipfsCid 값을 받아오는 함수
  const getCID = async () => {
    //메타데이터 업로드
    setLoading(true);
    let get_Cid = '';
    await axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/nft/meta` , {
        musicId : data.id,
      },
      {
        headers:{
          Authorization : token,
        },
      }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.data.cid);
        console.log('load CID complete.');
        get_Cid = res.data.data.cid;
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate('/403');
      });
      return get_Cid;
  };
  
  //transactionHash 전송
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

  //NFT 생성
  // const CreateNFT = async (musicid, ipfsCid, contractaddr, txid) => {
  //   setLoading(true);
  //   await axios
  //     .post(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/nft/create`, {
  //       musicId : musicid,
  //       cid : ipfsCid,
  //       contractAddr : contractaddr,
  //       txId : txid,
  //     },
  //     {
  //       headers: {
  //         Autorization : token,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       navigate('/403');
  //     });
  // }

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
          <Button onClick={change_setIsFirstContract}>발행여부 변경</Button>
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
                {/* 컨트랙트 연결시 아래 dummy라고 적힌 부분 chooseNFT로 변겅*/}
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
              // NFT 생성함수
              const ipfsCid = await getCID();
              console.log(ipfsCid);
              const settlementContractAddress = data.settlementAddr;

              const deployedNftContract = deployContract.nft(ipfsCid, settlementContractAddress);
              console.log(deployedNftContract.options.address);
              nftContract.load(deployedNftContract.options.address);

              await nftContract.register();

              const txReceipt = await nftContract.sell(
                formData.type === 'ETH' ? metamask.web3.utils.toWei(formData.price) : formData.price,
              );

              //NFT 생성, 컨트랙트 연결시 주석 해제
              // if(isFirstContract === true){
              //   CreateNFT(data.id, ipfsCid, settlementContractAddress, txReceipt.transactionHash);
              // }

              //  트랜젝션 해시 백엔드로 전송
              sendTXid(txReceipt.transactionHash);
            }}
            variant="contained"
            color="secondary"
            sx={{ fontSize: '0.3rm', width: '70%', padding: '1vh', mt: '10%' }}
          >
            NFT 판메
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
