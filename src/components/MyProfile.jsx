import { Box, TextField, ThemeProvider, Button, createTheme } from '@mui/material';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useState } from 'react';
import * as contractApi from '../services/contract';

const theme = createTheme({
  palette: {
    primary: {
      main: '#550064',
    },
    secondary: {
      main: '#7966ce',
    },
  },
});

const token = localStorage.getItem('jwtToken');

async function handleSettle(address) {
  await contractApi.init();
  contractApi.settlementContract.load(address);
  const result = await contractApi.settlementContract.buy();
  console.log(`buy() Transaction: ${result.transactionHash}`);
}

function MyProfile(props) {
  const [type, setType] = useState('');
  useEffect(() => {
    try {
      setType(jwtDecode(token).type);
    } catch (err) {
      console.log('error: ' + err);
    }
  }, []);
  const address = props.wallet;
  const [name, setName] = useState(props.name);
  const [nickname, setNickname] = useState(props.nickName);
  const [password, setPassword] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickChange = () => {
    console.log('회원정보 수정');
    console.log(`Name: ${name}`);
    console.log(`Nickname: ${nickname}`);
    console.log(`Password: ${password}`);

    const token = localStorage.getItem('jwtToken');
    axios
      .put(
        `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/user`,
        { name, nickname, password },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert('회원정보 수정 성공');
        } else {
          alert('회원정보 수정 실패');
        }
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ width: '30vw', marginLeft: '35%', color: 'black', marginTop: '1%', height: '5vh' }}>
          <TextField
            sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
            color="secondary"
            label={props.name}
            name="name"
            margin="dense"
            fullWidth
            helperText="Please set a name to change"
            onChange={handleName}
            value={name}
          />
          <TextField
            id="name"
            margin="dense"
            label={props.nickName}
            color="secondary"
            variant="filled"
            fullWidth
            sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
            helperText="Please set a nickname to change"
            onChange={handleNickname}
            value={nickname}
          />
          <TextField
            sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
            color="secondary"
            label="********"
            name="password"
            margin="dense"
            fullWidth
            helperText="Please set a password to change"
            type="password"
            onChange={handlePassword}
            value={password}
          />
          <Button variant="contained" color="secondary" sx={{ width: '70%', marginTop: '2%' }} onClick={onClickChange}>
            change
          </Button>
          {type === 'Producer' ? (
            <Button
              onClick={async () => {
                await handleSettle(address);
              }}
              variant="contained"
              color="secondary"
              sx={{ width: '70%', marginTop: '2%' }}
            >
              settle
            </Button>
          ) : null}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MyProfile;
