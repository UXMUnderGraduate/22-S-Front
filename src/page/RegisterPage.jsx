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
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const onhandlePost = async (data) => {
    const { email, name, password } = data;
    const postData = { email, name, password, userType };

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
      regiserType: joinType,
    };

    const { email, name, password, rePassword } = joinData;

    //이름 확인(한글, 영어만 입력)
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) {
      setNameError('올바른 이름을 입력해주세요');
    } else {
      setNameError('');
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
    if (!checked) alert('회원가입 약관에 동의해주세요.');

    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(name) &&
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
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
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
                      sx={{ backgroundColor: 'white', borderRadius: '0.5em' }}
                      required
                      autoFocus
                      fullWidth
                      type="name"
                      id="name"
                      name="name"
                      label="이름"
                      variant="outlined"
                      error={nameError !== '' || false}
                    />
                  </Grid>
                  <FormHelperText>{nameError}</FormHelperText>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.5em' }}
                      required
                      autoFocus
                      fullWidth
                      type="nickname"
                      id="nickname"
                      name="nickname"
                      variant="outlined"
                      label="예명/닉네임"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.5em' }}
                      required
                      autoFocus
                      fullWidth
                      type="email"
                      id="email"
                      name="email"
                      label="이메일 주소"
                      variant="outlined"
                      error={emailError !== '' || false}
                    />
                  </Grid>
                  <FormHelperText>{emailError}</FormHelperText>

                  <Grid item xs={11}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.5em' }}
                      required
                      fullWidth
                      type={showPassword ? 'password' : 'text'}
                      id="password"
                      name="password"
                      label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                      variant="outlined"
                      error={passwordState !== '' || false}
                    ></TextField>
                  </Grid>
                  <FormHelperText>{passwordState}</FormHelperText>

                  <Grid item xs={1}>
                    <button
                      onClick={togglePass}
                      style={{
                        backgroundColor: 'white',
                        background: 'none',
                        border: 'none',
                        marginLeft: '-10px',
                        marginTop: '15px',
                        color: '#ffffff',
                        borderRadius: '0.5em',
                      }}
                    >
                      <Visibility />
                    </button>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.5em' }}
                      required
                      fullWidth
                      type="password"
                      id="rePassword"
                      name="rePassword"
                      label="비밀번호 재입력"
                      variant="outlined"
                      error={passwordError !== '' || false}
                    />
                  </Grid>
                  <FormHelperText>{passwordError}</FormHelperText>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.5em' }}
                      label="metamask wallet Adress"
                      name="metamask"
                      type="password"
                      required
                      fullWidth
                      variant="outlined"
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
                      label="회원가입 약관에 동의합니다."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                  size="large"
                  style={{ backgroundColor: '#7A84EB', height: '60px', fontSize: '20px' }}
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
