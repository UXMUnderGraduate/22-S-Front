import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import BackgroundVideo from '../components/BackgroundVideo';
import ListItem from '../components/ListItem';
import Header from '../components/Header';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LibraryPage() {
  const [data, setData] = useState('');
  const itemDatas = [...data];
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  const decodeData = JSON.parse(payload.toString());
  const type = decodeData.type;
  console.log(type);

  const getPurchaseRes = async () => {
    await axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/purchase`, {
        headers: {
          authorization: `${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        navigate('/403');
      });
  };
  // console.log(itemDatas);
  const getUploadDataRes = async () => {
    await axios
      .get(
        `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/upload
`,
        {
          headers: {
            authorization: token,
          },
        },
      )
      .then((res) => {
        setData(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigate('/403');
      });
  };

  useEffect(() => {
    type === 'General' ? getPurchaseRes() : getUploadDataRes();
  }, []);
  return (
    <Box sx={{ height: '100%', zIndex: 0 }}>
      <BackgroundVideo />
      <Header />
      <Container>
        <Tpbox>
          {itemDatas.map((item, index) => {
            return (
              <ListItem
                key={index}
                id={item.id}
                img={item.img}
                title={item.title}
                album={item.album}
                artist={item.artist}
                user_id={item.user_id}
                pageState="Library"
              >
                {console.log(item)}
              </ListItem>
            );
          })}
        </Tpbox>
      </Container>
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
