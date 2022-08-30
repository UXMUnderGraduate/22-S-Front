import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListItem(props) {
  console.log(props.id);
  const Navigate = useNavigate();
  return (
    <Box
      sx={{ display: 'flex', textAlign: 'center', border: '0.5px solid', margin: '1.3%', borderRadius: '0.2em' }}
      onClick={() =>
        Navigate(`/board/${props.id}`, {
          state: {
            id: props.id,
          },
        })
      }
    >
      <Box sx={{ width: '33%' }}>{props.title}</Box>
      <Box sx={{ width: '33%' }}>{props.artist}</Box>
      <Box sx={{ width: '33%' }}>{props.genre}</Box>
    </Box>
  );
}
