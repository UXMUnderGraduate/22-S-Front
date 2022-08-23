import { Box, Typography, Card } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SongInfo() {
  const { state } = useLocation();
  const { songName, artistName, album } = state;

  console.log(state);
  return (
    <Box sx={{ height: '100vh', backgroundImage: 'url(/images/background.png)', textAlign: 'center' }}>
      <Typography variant="h4" component="h4" sx={{ paddingTop: '8%' }}>
        {songName}
      </Typography>
      <Typography variant="h5" component="h5" sx={{ paddingTop: '1%' }}>
        {artistName}
      </Typography>
      <Card
        sx={{
          width: '50vw',
          height: '50vh',
          marginTop: '2%',
          marginLeft: '25%',
          backgroundImage: `url(${state.img})`,
          backgroundSize: 'cover',
        }}
      ></Card>
      {album}
    </Box>
  );
}
