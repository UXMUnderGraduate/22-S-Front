import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import BackgroundVideo from '../components/BackgroundVideo';
import ListItem from '../components/ListItem';
import Header from '../components/Header';
import styled from 'styled-components';
import axios from 'axios';

function LibraryPage() {
  const [data, setData] = useState('');
  const itemDatas = [...data];

  const getRes = async () => {
    await axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/purchase`, {
        headers: {
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iu2YhOyEoOyerCIsImlhdCI6MTY2MDIwMDU4M30.jSGHhrlFrHb2aeOwGd73a5iHEXpevW6R6K-nxAyqwLw',
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(itemDatas);

  useEffect(() => {
    getRes();
  }, []);
  return (
    <Box sx={{ height: '100%', zIndex: 0 }}>
      <BackgroundVideo />
      <Header />
      <Tpbox>
        {itemDatas.map((item, index) => {
          return (
            <ListItem
              key={index}
              id={item.id}
              img={item.img}
              title={item.title}
              genre={item.genre}
              artist={item.artist}
              user_id={item.user_id}
            >
              {console.log(item)}
            </ListItem>
          );
        })}
      </Tpbox>
    </Box>
  );
}

export default LibraryPage;

const Tpbox = styled.div`
  font-weight: bold;
  padding: 0.5%;
  text-align: center;
  background-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
`;
