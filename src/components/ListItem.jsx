import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListItem(props) {
  const Navigate = useNavigate();
  return (
    <Box
      sx={{ display: 'flex', textAlign: 'center', border: '1px solid', margin: '1%', borderRadius: '0.2em' }}
      onClick={() =>
        Navigate(`/board/${props.id}`, {
          state: {
            id: props.id,
            album: props.album,
            artistName: props.artistName,
            img: props.img,
            songName: props.songName,
            playTime: props.playTime,
          },
        })
      }
    >
      <Box sx={{ width: '25%' }}>{props.songName}</Box>
      <Box sx={{ width: '25%' }}>{props.artistName}</Box>
      <Box sx={{ width: '25%' }}>{props.album}</Box>
      <Box sx={{ width: '25%' }}>{props.playTime}</Box>
    </Box>
  );
}
