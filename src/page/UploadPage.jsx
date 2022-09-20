import React, { useState, useEffect } from 'react';

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
import { useDropzone } from 'react-dropzone';
import * as contractApi from '../services/contract';
import { useNavigate } from 'react-router-dom';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 0,
  padding: 0,
  width: 230,
  height: 230,
  borderRadius: 5,
  border: '1px solid lightgray',
  backgroundColor: 'white',
};

const thumb = {
  position: 'relative',
  display: 'inline-flex',
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  width: 230,
  height: 230,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 220,
  height: 220,
};

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
  const [genre, setGenre] = useState('R&B');
  const [checked, setChecked] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const token = localStorage.getItem('token');
  // let userId = localStorage.getItem('userId');
  // let sellerContractAddress;

  const onhandlePost = async (data) => {
    const { title, album, lylics, file, image } = data;
    const postData = { title, album, lylics, genre, file, image };

    // post
    await axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/upload`, {
        headers: {
          authorization: `${token}`,
        },
        data: postData,
      })
      .then(function (response) {
        console.log(response, '성공');
        alert('업로드 성공!');
        location.reload('');
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError('업로드에 실패하였습니다. 다시한번 확인해 주세요.');
      });
  };

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    console.log(data);
    const genreType = genre;
    const joinData = {
      title: data.get('title'),
      album: data.get('album'),
      name: data.get('name'),
      lyrics: data.get('lyrics'),
      file: data.get('file'),
      image: data.get('image'),
      genre: genreType,
    };

    // 회원가입 동의 체크
    if (!checked) alert('올바른 양식과 함께 업로드 약관에 동의해주세요.');
    if (checked) {
      onhandlePost(joinData);
    }
  };

  //엘범 커버 드래그앤드롭
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the Object URL to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  //작곡가, 가수 추가 부분
  const [countComposerList, setCountComposerList] = useState([0]);

  const onAddComposerDiv = () => {
    let countArr = [...countComposerList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setCountComposerList(countArr);
  };

  const [countSingerList, setCountSingerList] = useState([0]);

  const onAddSingerDiv = () => {
    let countArr = [...countSingerList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setCountSingerList(countArr);
  };
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100%', backgroundImage: 'url(/images/background.png)' }}>
        <Button
          sx={{ display: 'block', color: '#ffffff' }}
          onClick={() => {
            navigate('/board');
          }}
        >
          뒤로가기
        </Button>
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
              음원 업로드
            </Typography>
            <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <FormControl component="fieldset" variant="standard">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <label style={{ color: 'white' }}>앨범커버</label>
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} id="image" />
                      <aside style={thumbsContainer}> {thumbs}</aside>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      labelId="genre"
                      id="genre-select"
                      value={genre}
                      required
                      label="genre"
                      onChange={handleChange}
                    >
                      <MenuItem value={'R&B'}>R&B</MenuItem>
                      <MenuItem value={'Hiphop'}>Hiphop</MenuItem>
                      <MenuItem value={'Jazz'}>Jazz</MenuItem>
                      <MenuItem value={'Pop'}>Pop</MenuItem>
                      <MenuItem value={'Rock'}>rock</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      required
                      fullWidth
                      id="title"
                      name="title"
                      label="제목"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      required
                      fullWidth
                      type="album"
                      id="album"
                      name="album"
                      label="앨범"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <label style={{ color: 'white' }}>
                      음원 업로드
                      <br />
                    </label>
                    <input
                      type="file"
                      id="file"
                      accept="music/mp3, music/mp4, music/flac, music/ogg, music/mp2, music/m4r"
                      textDecoration="none"
                      style={{ color: 'white', borderBox: 'white' }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <label style={{ color: 'white' }}>참여 가수</label>
                    <CreateListDiv>
                      <div style={{ display: 'inline-block' }}>
                        <SingerList countSingerList={countSingerList} />
                        <Button onClick={onAddSingerDiv} style={{ backgroundColor: '#7966ce', color: 'white' }}>
                          추가
                        </Button>
                      </div>
                    </CreateListDiv>
                  </Grid>

                  <Grid item xs={12}>
                    <CreateListDiv>
                      <div style={{ display: 'inline-block' }}>
                        <label style={{ color: 'white' }}>참여 작곡가</label>
                        <ComposerList countComposerList={countComposerList} />
                        <Button onClick={onAddComposerDiv} style={{ backgroundColor: '#7966ce', color: 'white' }}>
                          추가
                        </Button>
                      </div>
                    </CreateListDiv>
                  </Grid>

                  <Grid item xs={12}>
                    <textarea
                      sx={{ backgroundColor: 'white', borderRadius: '0.3em' }}
                      required
                      rows="10"
                      cols="60"
                      id="lylics"
                      name="lylics"
                      placeholder="가사"
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
                      label="업로드 약관에 동의합니다."
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
                  업로드
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

//참여자 추가
const DetailDiv = styled.div`
  div {
    margin-bottom: 3px;
    display: flex;
  }
`;

const CreateListDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ComposerList = (props) => {
  return (
    <DetailDiv>
      {props.countComposerList &&
        props.countComposerList.map((item, i) => (
          <div key={i}>
            <div>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="작곡가"
                  name="name"
                  autoComplete="name"
                  sx={{ backgroundColor: 'white' }}
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="copyright"
                  label="저작권 비율"
                  name="copyright"
                  autoComplete="copyright"
                  sx={{ backgroundColor: 'white' }}
                  color="secondary"
                />
              </Grid>
            </div>
          </div>
        ))}
    </DetailDiv>
  );
};

const SingerList = (props) => {
  return (
    <DetailDiv>
      {props.countSingerList &&
        props.countSingerList.map((item, i) => (
          <div key={i}>
            <div>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="singer"
                  label="가수"
                  name="singer"
                  autoComplete="singer"
                  sx={{ backgroundColor: 'white' }}
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="copyright"
                  label="저작권 비율"
                  name="copyright"
                  autoComplete="copyright"
                  sx={{ backgroundColor: 'white' }}
                  color="secondary"
                />
              </Grid>
            </div>
          </div>
        ))}
    </DetailDiv>
  );
};
