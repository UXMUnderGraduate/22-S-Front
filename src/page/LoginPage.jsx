import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import { Grid, Typography, Box, Container } from '@mui/material';
import axios from 'axios'

function LoginPage () {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPw, setInputPW] = useState('')

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value)
  }

  const handleInputPw = (e) => {
    setInputPW(e.target.value)
  }

  //로그인
  const onClickLogin = () => {
    console.log('로그인');
    console.log('Email:', inputEmail);
    console.log('Pw:', inputPw);
    axios.post('http://localhost:5000/api/v1/auth/signin', null, {
      params: {
        'email' : inputEmail,
        'password' : inputPw
      }
    })
    .then(res => {
      if(res.data.email === undefined){
        //이메일 불일치
        alert('아이디를 확인하세요.')
      } else if (res.data.email===null){
        //비밀번호 불일치
        alert('비밀번호를 확인하세요.')
      }else if(res.data.email===inputEmail){
        //일치
        sessionStorage.setItem('email', inputEmail)
      }
      //로그인 성공시 메인페이지로 이동
      document.location.href ='/'
    })
    .catch()
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/auth/signin')
    .then(res => console.log(res))
    .catch()
},[])


  return (
    <div>
      <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 35,
          display: 'flex',
          flexDirection: 'column'
          }}
        >
      <Typography component='h1' varient='h1' style={{textAlign:"center", fontSize:"30px", fontWeight:'bold', marginBottom:"10px"}}>
        Login
      </Typography>
      <TextField 
        margin='normal'
        label='Email Address' 
        name='email'
        type='email'
        autoComplete='email'
        required 
        fullWidth
        autoFocus
        onChange={handleInputEmail}
        value={inputEmail}/>

      <TextField 
        margin='normal'
        label="Password"
        name="password" 
        type="password"
        autoComplete='current-password'
        required 
        fullWidth
        onChange={handleInputPw}
        value={inputPw}/>
      
        
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="자동로그인"/>
      <Button type="button" fullWidth onSubmit={onClickLogin} variant='contained' sx={{ mt: 3, mb:2 }} style={{backgroundColor:"#7A84EB", height:'60px', fontSize:"20px"}}> 로그인 </Button>
      <Grid container>
        <Grid item xs> <Link href="/register" style={{color : 'gray' , textDecoration: 'none'}}> 회원가입 </Link> </Grid>
        <Grid item> <Link href="/" style={{color : 'gray' , textDecoration: 'none'}}> 메인으로 이동 </Link> </Grid>
      </Grid>
      </Box>
      </Container>
          
            
    </div>
  )
}

export default LoginPage