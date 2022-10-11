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
import { useNavigate } from 'react-router-dom';
import { InputBase, ListItemButton, Drawer, List, Divider, ListItem, ListItemText } from '@mui/material';

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

function UploadPage() {
  function checklocalStorage() {
    if (localStorage.getItem('jwtToken') == null) {
      window.location = 'http://localhost:3000';
    }
  }
  setInterval(checklocalStorage(), 100);

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
  const [musicError, setMusicError] = useState(false);
  const [UploadError, setUploadError] = useState('');
  const token = localStorage.getItem('jwtToken');

  const onhandlePost = async (data) => {
    console.log('name');
    const { title, album, lylics, file, image, holder, rate } = data;
    const postData = { title, album, lylics, genre, file, image, holder, rate };

    // post
    await axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/upload`, postData, {
        headers: {
          authorization: token,
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
        setUploadError('업로드에 실패하였습니다. 다시한번 확인해 주세요.');
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
      lylics: data.get('lylics'),
      file: data.get('file'),
      image: data.get('image'),
      genre: genreType,
      holder: data.get('holder'),
      rate: data.get('rate'),
    };

    //중복곡 체크
    const musicCheck = document.getElementById('file').value;
    if (!musicCheck) {
      setMusicError('파일을 업로드 해주세요');
    } else {
      axios({
        method: 'post',
        url: `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/upload/check`,
        data: {
          music: e.target.value,
        },
      })
        .then((res) => {
          if (res.data !== null) {
            setMusicError('');
          } else {
            setMusicError('이미 존재하는 음악입니다.');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

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
    // countArr[counter] = counter   // index 사용 시 윗줄 대신 사용
    setCountComposerList(countArr);
  };

  const onDeleteComposerDiv = () => {
    let countArr = [...countComposerList];
    let counter = countArr.slice(-1)[0];
    counter -= 1;
    countArr.pop(counter); // index 사용 X
    // countArr[counter] = counter   // index 사용 시 윗줄 대신 사용
    setCountComposerList(countArr);
  };

  const [countSingerList, setCountSingerList] = useState([0]);

  const onAddSingerDiv = () => {
    let countArr = [...countSingerList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter   // index 사용 시 윗줄 대신 사용
    setCountSingerList(countArr);
  };

  const onDeleteSingerDiv = () => {
    let countArr = [...countSingerList];
    let counter = countArr.slice(-1)[0];
    counter -= 1;
    countArr.pop(counter); // index 사용 X
    // countArr[counter] = counter   // index 사용 시 윗줄 대신 사용
    setCountSingerList(countArr);
  };

  const navigate = useNavigate();

  function clickSubmit() {
    if (confirm('한번 업로드 하면 수정이 불가능합니다. 업로드 하시겠습니까?')) {
      //form submit
    } else {
      return;
    }
  }
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
                      accept="audio/*"
                      textDecoration="none"
                      style={{ color: 'white', borderBox: 'white' }}
                    />
                    <FormHelperTexts>{musicError}</FormHelperTexts>
                  </Grid>

                  <Grid item xs={12}>
                    <label style={{ color: 'white' }}>참여 가수</label>
                    <CreateListDiv>
                      <div style={{ display: 'inline-block' }}>
                        <SingerList countSingerList={countSingerList} />
                        <Button onClick={onAddSingerDiv} style={{ backgroundColor: '#7966ce', color: 'white' }}>
                          추가
                        </Button>
                        <Button
                          onClick={onDeleteSingerDiv}
                          style={{ backgroundColor: '#7966ce', color: 'white', marginLeft: '5px' }}
                        >
                          삭제
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
                        <Button
                          onClick={onDeleteComposerDiv}
                          style={{ backgroundColor: '#7966ce', color: 'white', marginLeft: '5px' }}
                        >
                          삭제
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
                  onClick={clickSubmit}
                >
                  업로드
                </Button>
              </FormControl>
              <FormHelperTexts>{UploadError}</FormHelperTexts>
            </Boxs>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default UploadPage;

const StyledInputBase = styled(InputBase)(() => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    backgroundColor: 'white',
    height: '85%',
    width: '100%',
    // [theme.breakpoints.up('md')]: {
    //   width: '20ch',
    // },
  },
}));

const ariaLabel = { 'aria-label': 'search' };

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
  const [state, setState] = React.useState({
    bottom: false,
  });

  const anchor = 'bottom';

  const toggleDrawer = (anchor, open) => (event) => {
    handleOnClick();

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // const Navigate = useNavigate();
  const [holder, setholder] = useState([]);
  const holderlist = (item) => {
    setholder((holder) => {
      console.log(holder);
      return [...holder, item];
    });
  };
  const list = (anchor) => (
    <Box
      style={{ fontColor: 'red' }}
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {data.map((item) => (
          <ListItem style={{ color: 'Black' }} key={item.id}>
            <ListItemButton onClick={() => holderlist(item.id)}>
              <ListItemText primary={item.nickname} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const [data, setData] = useState([]);

  const token = localStorage.getItem('jwtToken');

  const [search, setSearch] = useState('');

  const [copyright, setcopyright] = useState([]);

  const copyrightlist = (e) => {
    setcopyright((copyright) => {
      return [...copyright, e.target.value];
    });
  };

  const handleOnKeyPress = (e) => {
    if (e.key == ' ') {
      copyrightlist(e);
    }
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    toggleDrawer(anchor, true);
  };

  const handleOnClick = async () => {
    // console.log(token);

    await axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/user?search=${search}`, {
        headers: {
          authorization: token,
        },
        params: {
          holder,
        },
      })
      .then((res) => {
        setData(res.data.data);
        console.log(data);
        console.log(search);
        console.log(holder);
        console.log(copyright);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DetailDiv>
      {props.countComposerList &&
        props.countComposerList.map((i) => (
          <div key={i}>
            <div>
              <Grid item xs={12} sm={8}>
                <StyledInputBase
                  required
                  placeholder="작곡가 이메일"
                  inputProps={ariaLabel}
                  onChange={onChangeSearch}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
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
                  onKeyPress={handleOnKeyPress}
                />
              </Grid>

              <Button style={{ backgroundColor: 'white', height: '95%' }} onClick={toggleDrawer(anchor, true)}>
                {' '}
                등록
              </Button>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </div>
          </div>
        ))}
    </DetailDiv>
  );
};

const SingerList = (props) => {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const anchor = 'bottom';

  const toggleDrawer = (anchor, open) => (event) => {
    handleOnClick();
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const [holder2, setholder2] = useState([]);
  const holderlist2 = (item) => {
    setholder2((holder2) => {
      console.log(holder2);
      return [...holder2, item];
    });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {data.map((item) => (
          <ListItem style={{ color: 'Black' }} key={item.id}>
            <ListItemButton onClick={() => holderlist2(item.id)}>
              <ListItemText primary={item.nickname}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const [data, setData] = useState([]);

  const token = localStorage.getItem('jwtToken');

  const [search, setSearch] = useState('');
  const [copyright2, setcopyright2] = useState([]);

  const copyrightlist2 = (e) => {
    setcopyright2((copyright2) => {
      return [...copyright2, e.target.value];
    });
  };

  const handleOnKeyPress = (e) => {
    if (e.key == ' ') {
      copyrightlist2(e);
    }
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    toggleDrawer(anchor, true);
  };

  const handleOnClick = async () => {
    await axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/user?search=${search}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        const data = res.data;
        setData(data.data);
        console.log(search);
        console.log(holder2);
        console.log(copyright2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DetailDiv>
      {props.countSingerList &&
        props.countSingerList.map((i) => (
          <div key={i}>
            <div>
              <Grid item xs={12} sm={8}>
                <StyledInputBase required placeholder="가수 이메일" inputProps={ariaLabel} onChange={onChangeSearch} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="copyright2"
                  label="저작권 비율"
                  name="copyright2"
                  autoComplete="copyright2"
                  sx={{ backgroundColor: 'white' }}
                  color="secondary"
                  onKeyPress={handleOnKeyPress}
                />
              </Grid>

              <Button style={{ backgroundColor: 'white', height: '95%' }} onClick={toggleDrawer(anchor, true)}>
                {' '}
                등록
              </Button>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </div>
          </div>
        ))}
    </DetailDiv>
  );
};
