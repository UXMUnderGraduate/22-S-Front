import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, TextField } from '@mui/material';
import BackgroundImage from '../../components/BackgroundImage';

const token = localStorage.getItem('jwtToken');
console.log(token);

const InputField = ({ placeholder, required, name, multiline, minRows, fullWidth, onChange, sx }) => (
  <TextField
    placeholder={placeholder}
    required={required}
    name={name}
    multiline={multiline}
    minRows={minRows}
    fullWidth={fullWidth}
    onChange={onChange}
    sx={sx}
  />
);

const ImageUpload = ({ onChange, imageUrl }) => (
  <>
    <input type="file" accept="image/*" onChange={onChange} style={{ width: '15rem' }} />
    {imageUrl && <img src={imageUrl} alt="Preview Image" style={{ width: '15rem', height: '15rem' }} />}
  </>
);

const FileUpload = ({ label, accept, onChange }) => (
  <>
    <label style={{ color: 'white' }}>
      {label}
      <br />
    </label>
    <input type="file" accept={accept} textDecoration="none" style={{ color: 'white', borderBox: 'white' }} onChange={onChange} />
  </>
);


const GenreSelect = ({ value, name, onChange, sx, genres }) => (
  <Select size="small" value={value} name={name} fullWidth onChange={onChange} sx={sx}>
    {genres.map((genre) => (
      <MenuItem key={genre} value={genre}>
        {genre}
      </MenuItem>
    ))}
  </Select>
);

const UploadForm = () => {
  const [formState, setFormState] = useState({
    title: '',
    artist: '',
    album: '',
    image: null,
    lyrics: '',
    genre: '',
    file: null,
    holder: '',
    rate: '',
    settleAddr: '',
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormState({
      ...formState,
      [name]: files ? files[0] : value,
    });
  };

  const handleDuplicateCheck = async () => {
    const formData = new FormData();
    formData.append('file', formState.file);

    const response = await axios.post(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/upload/check`, formData);
    return response.data.data.isDuplicated;
  };

  const handleMetadataUpload = async () => {
    // Add code to upload metadata and return cid1 using axios
  };

  const handleFinalUpload = async (cid1) => {
    console.log(cid1);
    // Add code to upload with cid1 and return the final response using axios
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isDuplicated = await handleDuplicateCheck();

    if (!isDuplicated) {
      const cid1 = await handleMetadataUpload();
      const finalResponse = await handleFinalUpload(cid1);
      console.log(finalResponse);
    } else {
      alert('Duplicate song detected. Please upload a different song.');
    }
  };

  // ... (rest of the UploadForm component)

  return (
    <BackgroundImage>
      <Container component="article" sx={{ width: '50%', mt: 10 }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '100%' }}
        >
          <Grid container columnGap={2} sx={{ justifyContent: 'space-around', my: 1 }}>
            <Grid item xs={8}>
              <ImageUpload onChange={handleImageChange} imageUrl={imageUrl} />
            </Grid>
            <Grid item xs={3}>
              <GenreSelect value={metaData.genre} name="genre" onChange={handleChange} sx={{ bgcolor: 'white' }} genres={genres} />
            </Grid>
            <Grid item xs={12}>
              <InputField
                placeholder="제목"
                required
                fullWidth
                name="title"
                onChange={handleChange}
                sx={{ bgcolor: 'white', borderRadius: '0.3rem', my: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                placeholder="앨범"
                required
                name="album"
                onChange={handleChange}
                fullWidth
                sx={{ bgcolor: 'white', borderRadius: '0.3rem', my: 1 }}
              />
            </Grid>
            <InputField
              placeholder="가사"
              multiline
              minRows={8}
              fullWidth
              name="lyrics"
              onChange={handleChange}
              sx={{ bgcolor: 'white', borderRadius: '0.3rem', my: 1 }}
            />
            <Grid item xs={12}>
              <FileUpload label={'음원업로드'} accept={'audio/mp3'} onChange={handleChange}/>
            </Grid>
          </Grid>
          {/* <UserRate handleChildStateUpdate={handleChildStateUpdate1}>작곡가 이메일</UserRate>
          <UserRate handleChildStateUpdate={handleChildStateUpdate2}>세션 이메일</UserRate>
          <UserRate handleChildStateUpdate={handleChildStateUpdate3}>가수 이메일</UserRate> */}
          <button type="submit">Submit</button>
        </form>
      </Container>
    </BackgroundImage>
  );
};

export default UploadForm;
