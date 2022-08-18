import React, {useState, useEffect} from 'react';
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
  Select, MenuItem
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import { useDropzone } from "react-dropzone";


const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 0,
  padding: 0,
  width: 230,
  height: 230,
  borderRadius: 5,
  border: "1px solid lightgray",
  backgroundColor:"white"

};

const thumb = {
  position: "relative",
  display: "inline-flex",
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  width: 230,
  height: 230,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: 220,
  height: 220
};



function UploadPage () {

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

  
  const [checked, setChecked] = useState(false);
  const [genreType, setGenreType] = useState('R&B');
  const [uploaderType, setUploaderType] = useState('Singer');
  const [UploadError, setUploadError] = useState('');
  const navigate = useNavigate();

  const onhandlePost = async (data) => {
    const { email, album} = data;
    const postData = { email, album, genreType };

    // post
    await axios
      .post('http://localhost:5000/api/v1/upload', postData)
      .then(function (response) {
        console.log(response, '성공');
        navigate.push('/login');
      })
      .catch(function (err) {
        console.log(err);
        setUploadError('업로드에 실패하였습니다. 다시한번 확인해 주세요.');
      });
  };
  
  const handleGenreChange = (event) => {
    setGenreType(event.target.value);
  };
  const handleUploaderChange = (event) => {
    setUploaderType(event.target.value);
  };
  //동의체크
  const handleAgree = (event) => {
    setChecked(event.target.checked);
  }

  // form 전송
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const genreType = genreType
    const uploaderType = uploaderType
    const joinData = {
      album: data.get('album'),
      title: data.get('title'),
      email: data.get('email'),
      genreType: genreType,
      uploaderType: uploaderType
    };

    //업로드 약관 동의 체크
    if(!checked) alert('업로드 약관에 동의해주세요.')
    
    if (
      checked
    ) {
      onhandlePost(joinData);
    }
  };
  //엘범 커버 드래그앤드롭
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps} = useDropzone({
    
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
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
    [files]
  );

  
  

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100%', backgroundImage: 'url(/images/background.png)' }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            paddingop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5"
            style={{textAlign:"center", fontSize:"30px", fontWeight:'bold', 
            marginBottom:"10px", marginTop:"5rem", color:"white"}}>
            내 음원 업로드
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="outlined" >
              <Grid container spacing={2}>

              <Grid item xs={12}>
              <p style={{color:"white"}}>앨범커버</p>
              <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()}/>
              <aside style={thumbsContainer}> {thumbs}</aside> 
                  
              </div>
              </Grid>

                
                <Grid item xs={12}>
                <Select                  
                  labelId="genreType"
                  id="Genre-select"
                  value={genreType}
                  required
                  label="장르"
                  onChange={handleGenreChange}
                  sx={{ backgroundColor: 'white' }}
                  color="secondary"
                >
                <MenuItem value={'R&B'}>R&B</MenuItem>
                <MenuItem value={'Hiphop'}>Hiphop</MenuItem>
                <MenuItem value={'Pop'}>Pop</MenuItem>
                <MenuItem value={'Jazz'}>Jazz</MenuItem>
                <MenuItem value={'rock'}>락</MenuItem>
                </Select>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="album"
                    id="album"
                    name="album"
                    label="앨범 명"
                    sx={{ backgroundColor: 'white' }}
                    color="secondary"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="title"
                    id="title"
                    name="title"
                    label="곡 명"
                    sx={{ backgroundColor: 'white' }}
                    color="secondary" />
                </Grid>

                <Grid item xs={12}>
                <p style={{color:"white"}}>음원 업로드</p>
                <input 
                    type="file" 
                    accept='music/mp3, music/mp4, music/flac, music/ogg, music/mp2, music/m4r'
                    textDecoration="none"
                    style={{color:"white", borderBox:"white"}}  />
                </Grid>

                <Grid item xs={12} sm={3}>
                <Select
                  labelId="uploaderType"
                  id="Upload-select"
                  value={uploaderType}
                  required
                  label="uploaderType"
                  onChange={handleUploaderChange}
                  variant="outlined"
                  sx={{ backgroundColor: 'white' }}
                  color="secondary"
                >
                <MenuItem value={'Singer'}>가수</MenuItem>
                <MenuItem value={'Composer'}>작곡가</MenuItem>
                <MenuItem value={'Arranger'}>편곡가</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="이름"
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

                <Grid item xs={12}>
                <TextField
                  label="가사"
                  multiline
                  rows={5}
                  fullWidth
                  sx={{ backgroundColor: 'white' }}
                  color="secondary"
                />
                </Grid>
                

                <Grid item xs={12}>              
                  <FormControlLabel
                    sx={{ color: '#7966ce' }}
                    control={
                      <Checkbox
                        value="remember"
                        onChange={handleAgree}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, color: 'white', '&.Mui-checked': { color: '#7966ce' } }}
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
                sx={{ mt: 2, mb: 2 }}
                size="large"
                style={{backgroundColor:"#7966ce", height:'60px', fontSize:"20px", marginBottom:'5rem'}}
              >
                업로드
              </Button>
            </FormControl>
            <FormHelperText>{UploadError}</FormHelperText>
          </Box>
        </Box>
      </Container></Box>
    </ThemeProvider>
  );
};
export default UploadPage;