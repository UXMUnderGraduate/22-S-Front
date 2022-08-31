import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

function RegisterPage() {
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
  const [type, setType] = useState('General');
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [walletError, setWalletError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const onhandlePost = async (data) => {
    const { email, name, nickname, password, wallet } = data;
    const postData = { email, name, nickname, password, wallet, type };

    // post
    await axios
      .post('http://192.168.0.2:9494/api/v1/auth/signup', postData)
      .then(function (response) {
        console.log(response, '성공');
        navigate('/login');
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
      });
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinType = type;
    const joinData = {
      email: data.get('email'),
      nickname: data.get('nickname'),
      name: data.get('name'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
      wallet: data.get('wallet'),
      regiserType: joinType,
    };
    const { email, nickname, name, password, rePassword, wallet } = joinData;

    // 이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    // 비밀번호 유효성 체크
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)) setPasswordState('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
    else setPasswordState('');

    // 비밀번호 같은지 체크
    if (password !== rePassword) setPasswordError('비밀번호가 일치하지 않습니다.');
    else setPasswordError('');

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) setNameError('올바른 이름을 입력해주세요.');
    else setNameError('');

    //닉네임 확인(한글, 영어만 입력)
    const nicknameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nicknameRegex.test(nickname) || nickname.length < 1) {
      setNicknameError('올바른 닉네임을 입력해주세요');
    } else {
      setNicknameError('');
    }

    //메타마스트 확인(숫자, 영어만 입력)
    const walletRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{42}$/;
    if (!walletRegex.test(wallet) || wallet.length < 1) {
      setWalletError('올바른 지갑주소를 입력해주세요');
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/v1/auth/check',
        data: {
          wallet: e.target.value,
        },
      })
        .then((res) => {
          if (res.data !== null) {
            setWalletError('');
          } else {
            setWalletError('이미 존재하는 지갑주소입니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    // 회원가입 동의 체크
    if (!checked) alert('올바른 양식과 함께 회원가입 약관에 동의해주세요.');

    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(name) &&
      walletRegex.test(wallet) &&
      checked
    ) {
      onhandlePost(joinData);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const togglePass = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100%', backgroundImage: 'url(/images/background.png)' }}>
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
              회원가입
            </Typography>
            <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <FormControl component="fieldset" variant="standard">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Select
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      labelId="registerType"
                      id="register-select"
                      value={type}
                      required
                      label="registerType"
                      onChange={handleChange}
                    >
                      <MenuItem value={'General'}>일반회원</MenuItem>
                      <MenuItem value={'Producer'}>아티스트</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      required
                      fullWidth
                      id="name"
                      name="name"
                      label="이름"
                      error={nameError !== '' || false}
                    />
                  </Grid>
                  <FormHelperTexts>{nameError}</FormHelperTexts>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      required
                      fullWidth
                      type="nickname"
                      id="nickname"
                      name="nickname"
                      label="예명/닉네임"
                      error={nicknameError !== '' || false}
                    />
                  </Grid>
                  <FormHelperTexts>{nameError}</FormHelperTexts>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      required
                      autoFocus
                      fullWidth
                      type="email"
                      id="email"
                      name="email"
                      label="이메일 주소"
                      error={emailError !== '' || false}
                    />
                  </Grid>
                  <FormHelperTexts>{emailError}</FormHelperTexts>
                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      required
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                      error={passwordState !== '' || false}
                    />
                  </Grid>
                  <Grid item xs={12} sm={10.5}>
                    <FormHelperTexts style={{ marginLeft: '-15px' }}>{passwordState}</FormHelperTexts>
                  </Grid>

                  <Grid item xs={12} sm={1.5}>
                    <button
                      onClick={togglePass}
                      style={{
                        backgroundColor: 'white',
                        background: '#7966ce',
                        border: 'none',
                        borderRadius: '5px',
                        color: '#ffffff',
                        float: 'right',
                        marginLeft: '-5px',
                        paddingTop: '3px',
                        paddingBottom: '3px',
                      }}
                    >
                      확인
                    </button>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      required
                      fullWidth
                      type="password"
                      id="rePassword"
                      name="rePassword"
                      label="비밀번호 재입력"
                      error={passwordError !== '' || false}
                    />
                  </Grid>
                  <FormHelperTexts>{passwordError}</FormHelperTexts>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      label="메타마스크 지갑주소"
                      name="wallet"
                      id="wallet"
                      type="repassword"
                      required
                      fullWidth
                      error={walletError !== '' || false}
                    />
                  </Grid>
                  <FormHelperTexts>{walletError}</FormHelperTexts>

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
                      label="회원가입 약관에 동의합니다."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 4 }}
                  style={{ backgroundColor: '#7966ce', height: '60px', fontSize: '20px' }}
                >
                  회원가입
                </Button>
              </FormControl>
              <FormHelperTexts>{registerError}</FormHelperTexts>
            </Boxs>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default RegisterPage;
