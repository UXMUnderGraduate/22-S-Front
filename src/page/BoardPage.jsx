import { Box } from '@mui/material';
import * as React from 'react';
import BoardList2 from '../components/BoardList2';
import BackgroundVideo from '../components/BackgroundVideo';
import Header from '../components/Header';
import BoardGrid from '../components/BoardGrid';

const dummyData = [
  {
    id: 1,
    img: '/images/test1.png',
    songName: '곡제목1',
    album: '엘범제목1',
    artistName: '생산자1',
    playTime: '1:00',
  },
  {
    id: 2,
    img: '/images/test2.png',
    songName: '곡제목2',
    album: '엘범제목2',
    artistName: '생산자2',
    playTime: '1:00',
  },
  {
    id: 3,
    img: '/images/test3.png',
    songName: '곡제목3',
    album: '엘범제목3',
    artistName: '생산자3',
    playTime: '1:00',
  },
  {
    id: 4,
    img: '/images/test1.png',
    songName: '곡제목4',
    album: '엘범제목4',
    artistName: '생산자4',
    playTime: '1:00',
  },
  {
    id: 5,
    img: '/images/test1.png',
    songName: '곡제목5',
    album: '엘범제목5',
    artistName: '생산자5',
    playTime: '1:00',
  },
  {
    id: 6,
    img: '/images/test1.png',
    songName: '곡제목6',
    album: '엘범제목6',
    artistName: '생산자6',
    playTime: '1:00',
  },
  {
    id: 7,
    img: '/images/test2.png',
    songName: '곡제목7',
    album: '엘범제목7',
    artistName: '생산자7',
    playTime: '1:00',
  },

  {
    id: 8,
    img: '/images/test3.png',
    songName: '곡제목8',
    album: '엘범제목8',
    artistName: '생산자8',
    playTime: '1:00',
  },

  {
    id: 9,

    img: '/images/test1.png',
    songName: '곡제목9',
    album: '엘범제목9',
    artistName: '생산자9',
    playTime: '1:00',
  },
  {
    id: 10,
    img: '/images/test1.png',
    songName: '곡제목10',
    album: '엘범제목10',
    artistName: '생산자10',
    playTime: '1:00',
  },

  {
    id: 11,
    img: '/images/test1.png',
    songName: '곡제목11',
    album: '엘범제목11',
    artistName: '생산자11',
    playTime: '1:00',
  },
  {
    id: 12,
    img: '/images/test2.png',
    songName: '곡제목12',
    album: '엘범제목12',
    artistName: '생산자12',
    playTime: '1:00',
  },
  {
    id: 13,
    img: '/images/test3.png',
    songName: '곡제목13',
    album: '엘범제목13',
    artistName: '생산자13',
    playTime: '1:00',
  },
  {
    id: 14,
    img: '/images/test1.png',
    songName: '곡제목14',
    album: '엘범제목14',
    artistName: '생산자14',
    playTime: '1:00',
  },
  {
    id: 15,
    img: '/images/test1.png',
    songName: '곡제목15',
    album: '엘범제목15',
    artistName: '생산자15',
    playTime: '1:00',
  },
];

const BoardPage = () => {
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
