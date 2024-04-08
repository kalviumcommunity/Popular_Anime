import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import './loginpage.css'

function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                userName,
                password
            });

            const feedback = response.data;

            if (response.status === 200) {
                const { accessToken, userId } = feedback;
                console.log(feedback);
                const currentDate = new Date();
                const nextYear = new Date(currentDate);
                nextYear.setUTCFullYear(nextYear.getUTCFullYear() + 1);
                const expires = nextYear.toUTCString();
                document.cookie = `accessToken=${accessToken};expires=${expires};path=/;`;
                document.cookie = `userId=${userId};expires=${expires};path=/;`;
                document.cookie = `password=${password};expires=${expires};path=/;`;
                localStorage.setItem('user', userId);
                console.log("Login successful");
                navigate('/');
            } else {
                console.log("Login error");
            }
            return feedback;
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="loginbody">
            <form onSubmit={handleSubmit} className="login-field">
                <h2 className="signup">Login Page</h2>
                <p className="pa">Sign up to continue to anime website!</p>

                <div>
                    <input type="text" placeholder="Username" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>

                <div>
                    <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div id="ask-sign">Don't have an account? <Link to='/signup' id="ask-signin">Sign up</Link></div>
                <button type="submit" className="submit">Log in</button>
            </form>
            <Link to='/' className="backtohome-btn">← Back to home</Link>
        </div>
    );
}

export default Login;