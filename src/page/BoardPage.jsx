import { Box } from '@mui/material';
import * as React from 'react';
import BoardList2 from '../components/BoardList2';
import BackgroundVideo from '../components/BackgroundVideo';

const BoardPage = () => {
  return (
    <Box sx={{ height: '100vh', zIndex: 0 }}>
      <BackgroundVideo />
      <Box sx={{ m: 5, width: '100%' }}>
        <BoardList2 />
      </Box>
    </Box>
  );
};
export default BoardPage;
