import React, { useState, useEffect } from 'react';
import { Box, Container, MenuItem, Select } from '@mui/material';
import BackgroundVideo from '../components/BackgroundVideo';
import ListItem from '../components/ListItem';
import Header from '../components/Header';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LibraryPage() {
  const [data, setData] = useState('');
  const [select, setSelect] = useState('song');
  const itemDatas = [...data];
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');
  const type = localStorage.getItem('type');

  const handleChange = (e) => {
    setSelect(e.target.value);
    //choose nft or song
  };

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
      })
      .catch((err) => {
        console.log(err);
        navigate('/403');
      });
  };

  useEffect(() => {
    type === 'General' ? getPurchaseRes() : getUploadDataRes();
    console.log(type);
  }, []);
  return (
    <Box sx={{ height: '100%', zIndex: 0 }}>
      <BackgroundVideo />
      <Header />
      <Container>
        <Box>
          <Select
            id="celler"
            name="celler"
            variant="outlined"
            value={select}
            label={'판매자선택'}
            onChange={handleChange}
            sx={{ fontSize: '0.6rem', borderRadius: '0.3em', mt: 1, bgcolor: 'white' }}
          >
            <MenuItem value={'song'}>곡</MenuItem>
            <MenuItem value={'nft'}>nft</MenuItem>
          </Select>
        </Box>
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
                sellerAddr={item.sellerAddr}
                pageState="Library"
                settlementAddr={item.settlementAddr}
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
  margin-top: 1%;
  border-radius: 0.3em;
  background-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
`;
