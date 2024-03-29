import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  createTheme,
  ThemeProvider,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Typography,
  Container,
  Select,
  MenuItem,
} from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ListItemButton, Drawer, List, Divider, ListItem, ListItemText } from '@mui/material';

import jwtDecode from 'jwt-decode';
import { init, deployContract } from '../services/contract';

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;
const img = {
  display: 'block',
  width: 220,
  height: 220,
};

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

function UploadPage() {
  function CheckSession() {
    if (localStorage.getItem('jwtToken') == null) {
      window.location = 'http://localhost:3000';
    }
  }
  setInterval(CheckSession(), 100);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#550064',
      },
      secondary: {
        main: '#7966ce',
      },
      header: {
        main: 'transparent',
      },
    },
  });
  const navigate = useNavigate();
  const [state, setState] = useState({
    index: 0,
    bottom: false,
  });
  const [data, setData] = useState([]);
  const [holder, setholder] = useState(Array(3).fill(''));
  const [holderNick, setHolderNick] = useState(Array(3).fill(''));
  const [rate, setRate] = useState(Array(3).fill(''));
  const [wallet, setWallet] = useState(Array(3).fill(''));
  const [image, setImage] = useState('');
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState([]);
  const [genre, setGenre] = useState('R&B');
  const token = localStorage.getItem('jwtToken');
  const [search, setSearch] = useState('');
  const ariaLabel = { 'aria-label': 'search' };
  const anchor = 'bottom';
  const [musicError, setMusicError] = useState(false);
  const [rateError, setRateError] = useState(false);
  const [UploadError, setUploadError] = useState('');

  const handleImage = (event) => {
    setImage(event.target.files[0]);
    encodeFileToBase64(event.target.files[0]);
  };
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };
  const [imageSrc, setImageSrc] = useState('');

  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  // const handleOnKeyPress = (e) => {
  //   if (e.key == ' ') {
  //     handleRate(e);
  //   }
  // };
  const handleRate = (e, index) => {
    let newRate = rate;
    newRate[index] = e.target.value;
    setRate(newRate);
    console.log('new rate:', rate);
  };

  function clickSubmit() {
    console.log('=================');
    console.log('Holder:', holder);
    console.log('HolderNick', holderNick);
    console.log('Rate: ', rate);
    console.log('Wallet: ', wallet);

    if (confirm('한번 업로드 하면 수정이 불가능합니다. 업로드 하시겠습니까?')) {
      //form submit
    } else {
      return;
    }
  }

  const toggleDrawer = (anchor, open) => (event) => {
    const index = event.target.getAttribute('data-index');
    handleOnClick();

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, index, [anchor]: open });
  };

  const handleHolder = (item) => {
    let newHolder = holder;
    newHolder[state.index] = item;
    setholder(newHolder);
    console.log('new holder:', holder);
  };

  const handleWallet = (item) => {
    let newWallet = wallet;
    newWallet[state.index] = item;
    setWallet(newWallet);
    console.log('new wallet', wallet);
  };

  const list = (anchor) => (
    <Box
      style={{ fontColor: 'red' }}
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {data.map((item) => (
          <ListItem style={{ color: 'Black' }} key={item.id}>
            <ListItemButton
              onClick={() => {
                let newHolderNick = holderNick;
                newHolderNick[state.index] = item.email;
                handleHolder(item.id);
                handleWallet(item.wallet);
              }}
            >
              <ListItemText primary={item.nickname} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const onChangeSearch = (e, index) => {
    const value = e.target.value;
    let newHolderNick = holderNick;
    newHolderNick[index] = value;
    setHolderNick(newHolderNick);
    setSearch(value);
    // toggleDrawer(anchor, true);
  };

  const handleOnClick = async () => {
    // console.log(token);

    await axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/user?search=${search}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log(JSON.stringify(res));
        setData(res.data.data);
        console.log('데이터: ', data);
        console.log('찾는 사람: ', search);
        console.log('배열: ', holder);
        console.log('지갑주소:', wallet);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createFormData = (postData) =>
    Object.keys(postData).reduce((formData, key) => {
      formData.append(key, postData[key]);
      return formData;
    }, new FormData());

  const onhandlePost = async (data) => {
    const { name: artist } = await jwtDecode(token);
    const { title, file, holder: dupHolder, rate: dupRate, cid1, settleAddr } = data;
    const parsedHolder = JSON.parse(dupHolder);
    const parsedRate = JSON.parse(dupRate);
    const uniques = {}; // 중복 없는 object
    parsedHolder.forEach((e, i) => {
      uniques[e] = (typeof uniques[e] === 'undefined' ? 0 : Number(uniques[e])) + Number(parsedRate[i]);
    });
    const holder = JSON.stringify(Object.keys(uniques).map(Number));
    const rate = JSON.stringify(Object.values(uniques).map(String));
    const postData = { title, artist, genre, file, holder, rate, cid1, settleAddr };
    console.log(postData);

    // post
    await axios({
      method: 'post',
      url: `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/upload`,
      headers: {
        authorization: token,
      },
      data: createFormData(postData),
    })
      .then(function (response) {
        console.log(response, '성공');
        alert('업로드 성공!');
        location.reload('');
      })
      .catch(function (err) {
        console.log(err);
        setUploadError('업로드에 실패하였습니다. 다시한번 확인해 주세요.');
      });
  };

  const onhandlePostMeta = async (data) => {
    const { name: artist, id: artistId } = jwtDecode(token);
    console.log(artist);
    console.log(artistId);
    const { title, album, image, lylics: lyrics } = data;
    const composerId = holder[1];
    const songWriterId = holder[2];
    const postData = { title, artist, artistId, album, genre, lyrics, image, composerId, songWriterId };

    console.log('image data');
    console.log(image);

    try {
      console.log('get response');
      console.log(postData);
      const response = await axios({
        method: 'post',
        url: `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/upload/meta`,
        headers: { authorization: token },
        data: createFormData(postData),
      });

      return response.data.data.cid1;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    const getSettleAddr = async (cid1) => {
      const walletRate = {};
      wallet.forEach((e, i) => {
        walletRate[e] = (typeof walletRate[e] === 'undefined' ? 0 : parseFloat(walletRate[e])) + parseFloat(rate[i]);
      });
      const resultWallet = Object.keys(walletRate);
      const resultRate = Object.values(walletRate);
      await init();
      console.log(resultWallet);
      console.log(resultRate.map((x) => x * 10000));
      console.log(JSON.stringify(jwtDecode(token)));
      const deployedContract = await deployContract.settlement(
        resultWallet, //addresses
        resultRate.map((x) => x * 10000), //proportion
        cid1, //songCid
        '900000000', //price
      );
      return deployedContract.options.address;
    };

    e.preventDefault();

    const data = new FormData(e.currentTarget);
    console.log(data);
    const genreType = genre;

    const joinData = {
      title: data.get('title'),
      album: data.get('album'),
      name: data.get('name'),
      lylics: data.get('lylics'),
      file: file,
      image: image,
      genre: genreType,
      holder: JSON.stringify(holder),
      rate: JSON.stringify(rate),
    };
    console.log(`rate: ${JSON.stringify(rate)}`);

    //중복곡 체크
    if (!image) {
      setMusicError('파일을 업로드 해주세요');
    } else {
      const formData = new FormData();
      formData.append('file', image);

      axios({
        method: 'post',
        headers: {
          authorization: token,
        },
        url: `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/upload/check`,
        data: formData,
      })
        .then((res) => {
          if (res.data !== null) {
            setMusicError('');
          } else {
            setMusicError('이미 존재하는 음악입니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // 저작권 비율 체크
    const sum = rate.reduce((accumulator, currentNumber) => accumulator * 1 + currentNumber * 1, 0);
    console.log(sum);
    if (!rate.every((e) => e > 0 && e < 1)) setRateError('저작권 비율은 0보다 크고 1보다 작아야 합니다!');
    else if (sum != 1) setRateError('저작권 총합이 1이 되도록 설정해주세요!');
    else setRateError('');

    // 회원가입 동의 체크
    if (!checked) alert('올바른 양식과 함께 업로드 약관에 동의해주세요.');
    if (checked) {
      const cid1 = await onhandlePostMeta(joinData);
      joinData.cid1 = cid1;
      console.log(cid1);
      joinData.settleAddr = await getSettleAddr(cid1);
      console.log(joinData.settleAddr);
      onhandlePost(joinData);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', backgroundImage: 'url(/images/background.png)' }}>
        <Button
          sx={{ display: 'block', color: '#ffffff' }}
          onClick={() => {
            navigate('/board');
          }}
        >
          뒤로가기
        </Button>
        <Container sx={{ color: '#ffffff' }} component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              paddingTop: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' }}
            >
              음원 업로드
            </Typography>
            <Boxs component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
              <FormControl component="fieldset" variant="standard">
                <Grid container rowSpacing={2}>
                  <Grid item xs={12}>
                    <label style={{ color: 'white' }}>앨범커버</label> <br />
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      textDecoration="none"
                      style={{ color: 'white', borderBox: 'white' }}
                      required
                      onChange={handleImage}
                    />
                  </Grid>
                  {imageSrc && <img src={imageSrc} alt="preview-img" style={img} />}

                  <Grid item xs={12}>
                    <Select
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      labelId="genre"
                      id="genre-select"
                      required
                      label="genre"
                      value={genre}
                      onChange={handleChange}
                    >
                      <MenuItem value={'R&B'}>R&B</MenuItem>
                      <MenuItem value={'Hiphop'}>Hiphop</MenuItem>
                      <MenuItem value={'Jazz'}>Jazz</MenuItem>
                      <MenuItem value={'Pop'}>Pop</MenuItem>
                      <MenuItem value={'Rock'}>rock</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      required
                      fullWidth
                      id="title"
                      name="title"
                      label="제목"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      required
                      fullWidth
                      type="album"
                      id="album"
                      name="album"
                      label="앨범"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label style={{ color: 'white' }}>
                      음원 업로드
                      <br />
                    </label>
                    <input
                      type="file"
                      id="file"
                      accept="audio/*"
                      textDecoration="none"
                      style={{ color: 'white', borderBox: 'white' }}
                      onChange={handleFile}
                    />
                  </Grid>
                  <FormHelperTexts>{musicError}</FormHelperTexts>
                  {rate.map((index) => {
                    return (
                      <>
                        <Grid container spacing={0} sx={{ marginBottom: '0.5em' }}>
                          <Grid item xs={6} md={4}>
                            <TextField
                              sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                              required
                              placeholder={`저작권자 이메일 ${index}`}
                              inputProps={ariaLabel}
                              onChange={(e) => {
                                onChangeSearch(e, index);
                              }}
                              value={holderNick[index]}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              data-index={index}
                              style={{
                                backgroundColor: '#7966ce',
                                height: '100%',
                                color: 'white',
                              }}
                              onClick={toggleDrawer(anchor, true)}
                            >
                              검색
                            </Button>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                              variant="outlined"
                              required
                              fullWidth
                              id="copyright"
                              label="저작권 비율"
                              name="copyright"
                              autoComplete="copyright"
                              color="secondary"
                              onChange={(e) => {
                                handleRate(e, index);
                              }}
                            />
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                  <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                  </Drawer>
                  <FormHelperTexts>{rateError}</FormHelperTexts>
                  <Grid item xs={12}>
                    <textarea
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      required
                      rows="10"
                      cols="60"
                      id="lylics"
                      name="lylics"
                      placeholder="가사"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleAgree}
                          sx={{
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            color: 'white',
                            '&.Mui-checked': { color: '#7966ce' },
                          }}
                        />
                      }
                      label="업로드 약관에 동의합니다."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 4 }}
                  style={{ backgroundColor: '#7966ce', height: '60px', fontSize: '20px' }}
                  onClick={clickSubmit}
                >
                  업로드
                </Button>
              </FormControl>
              <FormHelperTexts style={{ marginTop: '-20px' }}>{UploadError}</FormHelperTexts>
            </Boxs>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default UploadPage;
