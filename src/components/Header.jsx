import React from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';

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
  const Navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
    header: {
      main: 'transparent',
    },
  });

  const [search, setSearch] = useState('');
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  // console.log(search);

  const [list , setList] = useState([]); 

  const onSearch = (e) => {
    e.preventDefault();
    if (search===null || search===""){
      axios.get()
      .then((res) => {
        setList(res.data.userList)
      })}
    else {
      const filterData = list.filter((row) => row.userId.includes(search))
      setList(filterData)
    }
    setSearch("");
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <MenuItem onClick={() => Navigate('/profile')}>My account</MenuItem>
      <MenuItem onClick={() => Navigate('/upload')}>Upload</MenuItem>
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
      <MenuItem>Log out</MenuItem>
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
          <Search onSubmit={e => onSearch(e)}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={ariaLabel} onChange={onChangeSearch} />
          </Search>
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
