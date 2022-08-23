import { Box } from '@mui/material';
import * as React from 'react';
import BoardList2 from '../components/BoardList2';
import BackgroundVideo from '../components/BackgroundVideo';
import Header from '../components/Header';
import BoardGrid from '../components/BoardGrid';


const BoardPage = (props) => {
  const dummyData = props.data
  return (
    <Box sx={{ height: '100%', zIndex: 0 , overflowX:"hidden"}}>
      <BackgroundVideo />
      <Header />
      <Box sx={{width: '100%', margin:"auto" }}>
        <BoardList2 data={dummyData} />
        <BoardGrid data={dummyData} />
      </Box>
    </Box>
  );
};
export default BoardPage;
