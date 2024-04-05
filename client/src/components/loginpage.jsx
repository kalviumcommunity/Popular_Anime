import React from "react"
import "./loginpage.css"
// import image from './assets/login.jpg'
// import user from './assets/User-3.png'
// import pass from './assets/Password.png'
// import lock from './assets/Lock.png'
import { Link } from 'react-router-dom';
import { useState } from "react"
const Login =()=>{
    const [userName,setUserName]=useState()
    const [password,setPassword]=useState()
    const [confirmPassword,setConfirmPassword]=useState()
    const updateUsertoCookie =(e)=>{
        e.preventDefault();
        if(password!=confirmPassword){
            alert("password do not match");
            return;
        }
        const date=new Date();
        date.setTime(date.getTime() + 360*24*60*60*1000)
        let expires="expires="+date.toUTCString();
        document.cookie=`username=${userName};${expires}`;
        document.cookie=`password=${password};${expires}`;

        setUserName("");
        setPassword("");
        setConfirmPassword("");
        location.href='http://localhost:5173/mainpage'
    }
    return(
        <div className="loginbody">
            <form onSubmit={updateUsertoCookie} className="login-field">
                <h2 id="signup">Sign up</h2>
                <p className="para">Sign up to continue the anime website!</p>

                <div>
                    <input type="text" placeholder="username" id="username" onChange={(e)=>setUserName(e.target.value)} required/>
                </div>
                <div>
                    <input type="password" placeholder="password" id="password"  onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <div>
                    <input type="password" placeholder="confirm password" id="confpassword"  onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                </div>
                <button type="submit" id="submit">Sign up</button>
            </form>
            <Link to='/' className="backtohome-btn">← Back to home</Link>
        </div>
    )
}
export default Login