import React from 'react'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import { Grid, Typography, Box, Container } from '@mui/material';

function LoginPage () {

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
        autoFocus/>

      <TextField 
        margin='normal'
        label="Password"
        name="password" 
        type="password"
        autoComplete='current-password'
        required 
        fullWidth/>
        
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="자동로그인"/>
      <Button type="submit" fullWidth variant='contained' sx={{ mt: 3, mb:2 }} style={{backgroundColor:"#7A84EB", height:'60px', fontSize:"20px"}}> 로그인 </Button>
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