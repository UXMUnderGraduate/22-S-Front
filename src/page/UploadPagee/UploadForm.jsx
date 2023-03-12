import { createTheme, ThemeProvider, Container, Grid, Select, MenuItem, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserRate from './UserRate';
import jwtDecode from 'jwt-decode';

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

const righter = [0, 1, 2];

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
  const [formData, setFormData] = useState({
    title: '',
    artist: artist,
    album: '',
    genre: 'POP',
    lyrics: '',
    holder: '',
    rate: '',
    cid1: '',
    settleAddr: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const genres = ['POP', 'R&B', 'Hiphop', 'Jazz', 'Rock'];

  //usreRate component props 받아오는 핸들러
  const [parentState, setParentState] = useState([]);

  const handleChildStateUpdate = (childState) => {
    console.log('부모 : ', childState);
    // Update parent state with the new child state
    setParentState([...parentState, childState]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container columnGap={2} sx={{ justifyContent: 'space-around', my: 1 }}>
          <Grid item xs={8}>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '15rem' }} />
            {imageUrl && <img src={imageUrl} alt="Preview Image" style={{ width: '15rem', height: '15rem' }} />}
          </Grid>
          <Grid item xs={3}>
            <Select
              size="small"
              value={formData.genre}
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
        {righter.map((item) => {
          return <UserRate key={item} onChildStateUpdate={handleChildStateUpdate} />;
        })}
        <Button fullWidth variant="contained" color="secondary" size="large" sx={{ mt: 2 }}>
          업로드
        </Button>
      </Container>
    </ThemeProvider>
  );
}
