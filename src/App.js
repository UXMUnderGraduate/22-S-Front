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

function App() {
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
          <Route path="/board" element={<Board />} />
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
