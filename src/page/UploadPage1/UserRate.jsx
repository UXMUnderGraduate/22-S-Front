import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const token = localStorage.getItem('jwtToken');

const inputStyles = {
  bgcolor: 'white',
  borderRadius: '0.3rem',
  my: 1,
};

function UserRate({ children, handleChildStateUpdate }) {
  const [searchText, setSearchText] = useState('');
  const [rate, setRate] = useState('');
  const [userData, setUserData] = useState([]);

  const handleSearch = () => {
    axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/user?search=${searchText}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        setUserData(response.data.data);
        handleChildStateUpdate(response.data.data[0].id, response.data.data[0].wallet, 0);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(searchText);
  }, [searchText]);

  return (
    <>
      <Grid container columnGap={1}>
        <Grid item xs={6}>
          <TextField
            sx={inputStyles}
            label={children}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            sx={inputStyles}
            label={'비율'}
            value={rate}
            onChange={(event) => setRate(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} sx={{ my: 1 }}>
          <Button variant="contained" color="secondary" onClick={handleSearch} fullWidth sx={{ h: '100%', p: 2 }}>
            확인
          </Button>
        </Grid>
        {userData.length > 0 && (
          <div>
            {userData.map((user, index) => {
              return <p key={index}>{user.email}</p>;
            })}
          </div>
        )}
      </Grid>
    </>
  );
}

UserRate.propTypes = {
  children: PropTypes.node.isRequired,
  handleChildStateUpdate: PropTypes.func.isRequired,
};

export default UserRate;
