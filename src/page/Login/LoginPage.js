import React from 'react'
import {Link} from 'react-router-dom'
import './LoginPage.css'

function LoginPage () {

  return (
    <div className="auth-wrapper" style={{width:"100%"}}>
      <h1>Login</h1>  
    <br/>

    <form>
 
      <label>Email</label>
      <input
          name="email"
          type="email"
        />
        
      <label>PassWord</label>
      <input
        name="password"
        type="password"
        />

      <button type="submit" >로그인</button>
       <Link to ="/Register" style={{color : 'gray' , textDecoration: 'none'}} > 회원가입 </Link>
       <Link to ="/" style={{color : 'gray' , textDecoration: 'none', float:"right"}} > 메인으로 이동 </Link> 
        
    </form>
    
  </div>
  )
}

export default LoginPage