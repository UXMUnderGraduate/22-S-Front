import { createTheme, ThemeProvider, Container, Grid, Select, MenuItem, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserRate from './UserRate';
import jwtDecode from 'jwt-decode';
import { combineRates } from '../../utils/combineRates';
// import { init, deployContract } from '../../services/contract';
// import axios from 'axios';

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

const token = localStorage.getItem('jwtToken');
const { nickname: artist } = jwtDecode(token);

export default function UploadForm() {
  //mp3 upload
  const [mp3file, setMp3File] = useState(null);
  const handleMp3File = (event) => {
    setMp3File(event.target.files[0]);
    console.log(mp3file);
  };

  //image upload
  const [imageUrl, setImageUrl] = useState('');
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  //form data
  const [metaData, setMetaData] = useState({
    title: '',
    artist: artist,
    artistId: null,
    album: '',
    genre: 'POP',
    lyrics: '', // type : string
    cid1: '', //IPFS에 올라갈 음원 메타데이터 type : string
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMetaData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    // console.log(metaData);
  }, [metaData]);

  const genres = ['POP', 'R&B', 'Hiphop', 'Jazz', 'Rock'];

  //usreRate component props 받아오는 핸들러
  // const [copyrighterId, setCopyrighterId] = useState([]); //저작권자 id type : list
  // const [rates, setRates] = useState([]); // 저작권비율 type :  list
  // const [address, setAddress] = useState([]); //저작권자 지갑주소 type : list
  const [parentState1, setParentState1] = useState([]);
  const [parentState2, setParentState2] = useState([]);
  const [parentState3, setParentState3] = useState([]);

  const handleChildStateUpdate1 = (childState) => {
    // console.log('부모1 : ', childState);
    // Update parent state with the new child state
    console.log(childState);
    setParentState1([childState]);
  };

  const handleChildStateUpdate2 = (childState) => {
    // console.log('부모2 : ', childState);
    // Update parent state with the new child state
    console.log(childState);
    setParentState2([childState]);
  };

  const handleChildStateUpdate3 = (childState) => {
    // console.log('부모3 : ', childState);
    // Update parent state with the new child state
    console.log(childState);
    setParentState3([childState]);
  };

  //check input value
  // const checkInput = useRef(null);

  // Submit클릭
  const handleSubmit = async () => {
    // console.log(metaData);
    const result = combineRates(parentState1[0], parentState2[0], parentState3[0]);
    console.log('result : ', result);

    setMetaData({ ...metaData, rate: rates, composerId: copyrighterId, settleAddress: address });
    // checkData();
  };
  // 중복제거된 배열에서 id=copyrighterId, rate, address
  // /**
  //  * @param {object} user1 하위 컴포넌트에서 넘어온 user에 대한 값(id, rate, address...)
  //  * @param {object} user2 하위 컴포넌트에서 넘어온 user에 대한 값(id, rate, address...)
  //  * @param {object} user3 하위 컴포넌트에서 넘어온 user에 대한 값(id, rate, address...)
  //  * id를 기준으로 중복제거 후 rate 합산하고 id=copyrighterId, rate, address를 반환하는 함수
  //  */
  // const combineRates = (user1, user2, user3) => {
  //   console.log('중복제거 실행', user1, user2, user3);
  //   const idMap = {};
  //   [user1, user2, user3].forEach((obj) => {
  //     const { address, id } = obj;
  //     let { rate } = obj;
  //     rate = parseFloat(rate);
  //     if (!idMap[id]) {
  //       idMap[id] = { rate, address };
  //     } else {
  //       idMap[id].rate += rate;
  //       idMap[id].address = address; // 가장 마지막에 나온 address을 저장
  //     }
  //   });

  //   // 결과 배열 생성
  //   const result = [];
  //   for (const id in idMap) {
  //     const { address, rate } = idMap[id];
  //     result.push({ id, rate, address });
  //   }

  //   return result;
  // };

  // 중복곡체크하는 로직 - 폼데이터 전체 보냄 -> 업로드 버튼 onClickEvent 발생시
  // const checkData = async () => {
  //     await axios({
  //         method: 'post',
  //         headers: {
  //             authorization: token,
  //         },
  //         url: `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/upload/check`,
  //         data: metaData,
  //     })
  //         .then((res) => {
  //             if (res.data !== null) {
  //                 console.log('CID1반환 : ', res.data);
  //             } else {
  //                 alert('이미 존재하는 음악입니다.');
  //             }
  //         })
  //         .catch((err) => {
  //             console.error(err);
  //         });
  // };

  //:TODO: 1. 업로드 클릭시 폼데이터로 이루워진 메타데이터 CID생성 -> CID1을 반환 받고 폼데이터 업데이트

  // 2. 컨트렉트 생성 -> settlementContract Address반환

  // 3. settlementContract Address BE로 전송

  return (
    <ThemeProvider theme={theme}>
      <Container >
        <Grid container columnGap={2} sx={{ justifyContent: 'space-evenly', my: 1 }}>
          <Grid item xs={8}>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '15rem' }} />
            {imageUrl && <img src={imageUrl} alt="Preview Image" style={{ width: '15rem', height: '15rem' }} />}
          </Grid>
          <Grid item xs={3}>
            <Select
              size="small"
              value={metaData.genre}
              name="genre"
              fullWidth
              onChange={handleChange}
              sx={{ bgcolor: 'white' }}
            >
              {genres.map((genre) => {
                return (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder={'제목'}
              required
              fullWidth
              name="title"
              onChange={handleChange}
              sx={{ bgcolor: 'white', borderRadius: '0.3rem', my: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder={'앨범'}
              required
              name="album"
              onChange={handleChange}
              fullWidth
              sx={{ bgcolor: 'white', borderRadius: '0.3rem', my: 1 }}
            />
          </Grid>
          <TextField
            placeholder="가사"
            multiline
            minRows={8}
            fullWidth
            name="lyrics"
            onChange={handleChange}
            sx={{ bgcolor: 'white', borderRadius: '0.3rem', my: 1 }}
          />
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
              onChange={handleMp3File}
            />
          </Grid>
        </Grid>
        <UserRate handleChildStateUpdate={handleChildStateUpdate1}>작곡가 이메일</UserRate>
        <UserRate handleChildStateUpdate={handleChildStateUpdate2}>세션 이메일</UserRate>
        <UserRate handleChildStateUpdate={handleChildStateUpdate3}>가수 이메일</UserRate>
        <Button fullWidth variant="contained" color="secondary" size="large" onClick={handleSubmit}>
          업로드
        </Button>
      </Container>
    </ThemeProvider>
  );
}
