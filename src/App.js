import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import MainPage from './page/MainPage';
import Board from './page/BoardPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PretendardWoff2 from './fonts/Pretendard/Pretendard-Medium.woff2';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import Error403 from './page/Error/Error403';
import Error404 from './page/Error/Error404';
import UploadPage from './page/UploadPage';
import LibraryPage from './page/LibraryPage';
import ProfilePage from './page/ProfilePage';
import SongInfoPage from './page/SongInfoPage';
// import {useEffect, useState} from "react";
// import axios from "axios";

const dummyData = [
  {
    id: 1,
    img: '/images/test1.png',
    songName: '곡제목1',
    album: '엘범제목1',
    artistName: '생산자1',
    playTime: '가사입니다 가사입니다 가사입니다 가사입니다 가사입니다 가사입니다 가사입니다 가사입니다',
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

function App() {
  // const [post, setpost ] = useState()

  // useEffect(()=>{
  //     axios({
  //       method:"GET",
  //       url:"http://localhost:5000/api/v1/music/chart?genre=Pop"
  //     }).then(response => setpost(response.data))
  //   }
  // )

  const theme = createTheme({
    typography: {
      fontFamily: 'Pretendard',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Pretendard';
          src: local('Pretendard-Medium'), local('Pretendard-Thin'),url(${PretendardWoff2}) format('woff2');
        }
      `,
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/board" element={<Board data={dummyData} />} />
          <Route path="/board/:id" element={<SongInfoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/403" element={<Error403 />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
