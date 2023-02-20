import { Box, Button, Grid, List, ListItem, ListItemText, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const token = localStorage.getItem('jwtToken');

export default function UserRate({ onChildStateUpdate }) {
  const [searchEmail, setSearchEmail] = useState('');
  const [rate, setRate] = useState('');
  const [resData, setResData] = useState([]);
  const [listVisible, setListVisible] = useState(true);

  //이메일 검색
  const handleUserEmail = (event) => {
    setSearchEmail(event.target.value);
    setListVisible(true);
  };

  //email 클릭시 textfiled로 값 변경
  const handleItemClick = (item) => {
    setSearchEmail(item);
    setListVisible(false);
  };

  //user검색
  const handleOnClick = async () => {
    await axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/user?search=${searchEmail}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setResData(res.data.data);
        console.log('데이터: ', resData);
        // toList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //비율입력
  const handleRate = (event) => {
    setRate(event.target.value);
  };

  //상위컴포넌트로 props전달
  const [childState, setChildState] = useState({
    email: "",
    rate: "",
  });

  useEffect(() => {
    console.log('Email: ', searchEmail, ',', 'rate : ', rate);
    setChildState({ email: searchEmail, rate: rate });
  }, [searchEmail]);
  
  useEffect(() => {
    onChildStateUpdate(childState);
  }, [childState]);

  return (
    <Grid container columnGap={1} sx={{ justifyContent: 'space-between', my: 1 }}>
      <Grid item xs={6}>
        <Box>
          <TextField
            placeholder="저작권자 이메일"
            required
            size="small"
            value={searchEmail}
            fullWidth
            onChange={handleUserEmail}
            sx={{ bgcolor: 'white', borderRadius: '0.3rem', height: '100%' }}
          />
          {listVisible && (
            <List sx={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {resData.map((item) => (
                <ListItem
                  sx={{ bgcolor: 'white', borderRadius: '0.3rem', color: 'black', my: 0.3 }}
                  key={item.id}
                  disablePadding
                  onClick={() => {
                    handleItemClick(item.email);
                  }}
                >
                  <ListItemText primary={item.email} sx={{ fontSize: '1.2rem', ml: 1 }} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Grid>
      <Grid item xs={2.5}>
        <Button fullWidth variant="contained" size="large" color="secondary" onClick={handleOnClick}>
          검색
        </Button>
      </Grid>
      <Grid item xs={2.5}>
        <TextField
          placeholder="비율"
          required
          size="small"
          fullWidth
          onChange={handleRate}
          sx={{ bgcolor: 'white', borderRadius: '0.3rem' }}
        />
      </Grid>
    </Grid>
  );
}
