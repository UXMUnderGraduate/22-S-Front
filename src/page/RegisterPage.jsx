import React, { useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  FormHelperText,
  Select,
  MenuItem,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Visibility } from '@mui/icons-material';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
  const [checked, setChecked] = useState(false);
  const [userType, setUserType] = useState('General');
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [walletError, setWalletError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const onhandlePost = async (data) => {
    const { email, name,nickname, password, wallet } = data;
    const postData = { email, name, nickname, password, wallet, userType };

    // post
    await axios
      .post('http://localhost:5000/api/v1/auth/signup', postData)
      .then(function (response) {
        console.log(response, '성공');
        navigate.push('/login');
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
      });
  };

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  //동의체크
  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  // form 전송
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinType = userType;
    const joinData = {
      name: data.get('name'),
      nickname: data.get('nickname'),
      email: data.get('email'),
      password: data.get('password'),
      repassword: data.get('repassword'),
      wallet: data.get('wallet'),
      regiserType: joinType,
    };

    const { email, nickname, name, password, rePassword, wallet} = joinData;

    //이름 확인(한글, 영어만 입력)
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) {
      setNameError('올바른 이름을 입력해주세요');
    } else {
      setNameError('');
    }
    //닉네임 확인(한글, 영어만 입력)
    const nicknameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nicknameRegex.test(nickname) || nickname.length < 1) {
      setNicknameError('올바른 닉네임을 입력해주세요');
    } else {
      setNicknameError('');
    }
    //메타마스트 확인(한글, 영어만 입력)
    const walletRegex = /^[0-0a-zA-Z]+$/;
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
          setWalletError('이미 존재하는 지갑주소입니다.' );
        } else {
          setWalletError('');
        }
      })
      .catch((err) => {
        console.error(err);
      });
      
    }

    //이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) {
      setEmailError('이메일 형식으로 입력하세요.');
    } else {
      setEmailError('');
    }

    //비밀번호 유효성 체크
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)) {
      setPasswordState('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
    } else {
      setPasswordState('');
    }

    //비밀번호 확인
    if (password !== rePassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }

    //회원가입 동의 체크
    if (!checked) alert('올바른 양식으로 입력하고 회원가입 약관을 동의해주세요.');

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
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handlepasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', backgroundImage: 'url(/images/background.png)' }}>
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <FormControl component="fieldset" variant="standard">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Select
                      sx={{ backgroundColor: 'white' }}
                      labelId="registerType"
                      id="register-select"
                      value={userType}
                      required
                      label="registerType"
                      onChange={handleChange}
                    >
                      <MenuItem value={'General'}>일반회원</MenuItem>
                      <MenuItem value={'Artist'}>아티스트</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white' }}
                      required
                      autoFocus
                      fullWidth
                      type="name"
                      id="name"
                      name="name"
                      label="이름"
                      variant="standard"
                      error={nameError !== '' || false}
                    />
                  </Grid>
                  <FormHelperText>{nameError}</FormHelperText>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white' }}
                      required
                      autoFocus
                      fullWidth
                      type="nickname"
                      id="nickname"
                      name="nickname"
                      variant="standard"
                      label="예명/닉네임"
                      error={nicknameError !== '' || false}
                    />
                  </Grid>
                  <FormHelperText>{nameError}</FormHelperText>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white' }}
                      required
                      autoFocus
                      fullWidth
                      type="email"
                      id="email"
                      name="email"
                      label="이메일 주소"
                      variant="standard"
                      error={emailError !== '' || false}
                    />
                  </Grid>
                  <FormHelperText>{emailError}</FormHelperText>

                  <Grid item xs={12}>
                  <Input
                        id="password"
                        fullWidth
                        placeholder='비밀번호 (숫자+영문자+특수문자 8자리 이상)*'
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handlepasswordChange('password')}
                        error={passwordError !== '' || false}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              required
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                  </Grid>
                  <FormHelperText>{passwordState}</FormHelperText>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white' }}
                      required
                      fullWidth
                      type="password"
                      id="rePassword"
                      name="rePassword"
                      label="비밀번호 재입력"
                      variant="standard"
                      error={passwordError !== '' || false}
                    />
                  </Grid>
                  <FormHelperText>{passwordError}</FormHelperText>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white' }}
                      label="메타마스크 지갑주소"
                      name="wallet"
                      id="wallet"
                      type="password"
                      required
                      fullWidth
                      variant="standard"
                      error={walletError !== '' || false}
                    />
                  </Grid>
                  <FormHelperText>{walletError}</FormHelperText>

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
                  sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: '#7966ce', height: '60px', fontSize: '20px' }}
                >
                  회원가입
                </Button>
              </FormControl>
              <FormHelperText>{registerError}</FormHelperText>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
export default RegisterPage;
