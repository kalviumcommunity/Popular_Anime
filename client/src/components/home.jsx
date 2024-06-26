import React, { useState, useEffect } from 'react';
import './home.css';
import {useNavigate, Link } from 'react-router-dom';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const cookies = document.cookie;
    setIsLoggedIn(cookies);
  }, []); 

  const checkLoggedin=()=>{
    if (isLoggedIn){
      navigate('/mainpage')
    } else{
      window.alert('Please sign in and continue')
    }
  }
  const deleteCookie = async () => {
    const confirm_logout=window.confirm('Are you sure you want to log out..?')
    if(confirm_logout){
      document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
      document.cookie = 'password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setIsLoggedIn(false);
  }
};


  return (
    <div className='Body'>
      <div>
        <h1>Popular Animes</h1>
      </div>
      <div>
        <h3>Greatest Anime of the World</h3>
        <p>There are many other great anime series and movies, <br />
        out there to explore. With so much variety <br /> to choose from,to everyone's taste.</p>
        <nav>
           <Link to='/mainpage' className='explore'>View More →</Link>
        </nav>
      </div>
      <nav>
        <Link to='/' className='links'>Home</Link>
        <Link to='/about' className='links'>About Us</Link>
        <Link to='/mainpage' className='links'>Explore</Link>
        <div className='links' id='dynamic-btn'>
          {isLoggedIn ? (
            <button id='logout-btn' onClick={deleteCookie}>Log out</button>
          ) : (
            <Link id='signin-btn' to='/loginpage'>Sign in</Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Home;