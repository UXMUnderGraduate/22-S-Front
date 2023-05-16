import React, { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Modal,
  InputBase,
  MenuItem,
  Menu,
  Typography,
  ListItemButton,
  ThemeProvider,
  createTheme,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// import { useCookies } from 'react-cookie';

// 모달창
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

//검색창
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const ariaLabel = { 'aria-label': 'search' };
export default function Header() {
  const [type, setType] = useState('');
  useEffect(() => {
    try {
      setType(jwtDecode(token).type);
    } catch (err) {
      console.log('error: ' + err);
    }
  }, []);

  const [state, setState] = React.useState({
    bottom: false,
  });

  const anchor = 'bottom';

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {data.map((item) => (
          <ListItem key={item.id}>
            <ListItemButton
              onClick={() =>
                Navigate(`/board/${item.id}`, {
                  state: {
                    id: item.id,
                  },
                })
              }
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const Navigate = useNavigate();
  const [data, setData] = useState([]);

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
    header: {
      main: 'transparent',
    },
  });
  const token = localStorage.getItem('jwtToken');

  const [search, setSearch] = useState('');
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    toggleDrawer(anchor, true);
  };

  const handleOnClick = async () => {
    console.log(search);
    // console.log(token);
    await axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/music?search=${search}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOnKeyPress = (e) => {
    if (e.key == 'Enter') {
      handleOnClick();
      console.log(data);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const COOKIE_KEY = window.LOGIN_KEY;

  // const logoutURL = `/`;

  // const [, , removeCookie] = useCookies([COOKIE_KEY]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    // removeCookie(COOKIE_KEY, { path: '/' });
    alert('로그아웃되었습니다.');
    Navigate('/');
    // localStorage.clear();
  };
  // const handleSearch = (
  // );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => window.location.replace('/profile')}>My account</MenuItem>
      {type === 'Producer' ? <MenuItem onClick={() => window.location.replace('/upload')}>Upload</MenuItem> : null}
      <MenuItem onClick={handleOpen}>terms of service</MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Terms of service
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
            s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
            to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Box>
      </Modal>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box sx={{ display: 'inline-' }}>
            <ListItemButton
              onClick={() => {
                Navigate('/board');
              }}
            >
              <Box src="logo/logo_transparent.png" component="img" sx={{ width: 50, paddingRight: '15%' }} />
              Home
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                Navigate('/library');
              }}
            >
              Library
            </ListItemButton>
          </Box>
          <React.Fragment key={anchor}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={ariaLabel}
                value={search}
                onChange={onChangeSearch}
                onKeyPress={handleOnKeyPress}
              />
              <Button onClick={toggleDrawer(anchor, true)}>검색</Button>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </Search>
          </React.Fragment>

          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </ThemeProvider>
  );
}
