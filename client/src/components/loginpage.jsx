import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./signup.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
function Login(){
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
  
    useEffect(() => {
      let timer;
      if (loginMessage) {
        timer = setTimeout(() => {
          setLoginMessage('');
        }, 3000); 
      }
      return () => clearTimeout(timer); 
    }, [loginMessage]);
  
    const setCookie = (name, value, days) => {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', { userName, password });
            if (response.status === 200) {
                setCookie('username', userName, 365);
                setCookie('password', password, 365);
                sessionStorage.setItem('loginSuccess', 'Login successful');
                sessionStorage.setItem('login', true);
                navigate("/mainpage");
            } else {
                console.log('Failed to log in');
            }
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 401) {
                alert('Invalid credentials');
            } else {
                alert('User does not exist or there was an error');
            }
        }
        
        }
    return (
        <>
            <div className="loginbody">
            <form onSubmit={handleSubmit} className="login-field">
                <h2 id="signup">Sign up</h2>
                <p className="para">Sign up to continue to anime website!</p>
                <div>
                    <input type="text" placeholder="username" id="username" onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div>
                    <input type="password" placeholder="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" id="submit">Log in</button>
            </form>
            <Link to='/' className="backtohome-btn">← Back to home</Link>
        </div>
        </>
    )
}
export default Login;