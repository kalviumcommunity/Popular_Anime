// import React from 'react';
// import './home.css';
// import { Link } from 'react-router-dom';
// function Home() {
//   return (
//     <div className='Body'>
//       <div>
//         <h1>Popular Animes</h1>
//       </div>
//       <div>
//         <h3>Special Categories</h3>
//         <p>There are many other great anime series and movies,<br />
//            out there to explore. With so much variety<br/> to choose from,to everyone's taste.</p>
//           <nav>
//             <Link to='/mainpage' className='explore'>View More →</Link>
//           </nav>
//       </div>
//       <nav>
//         <Link to='/' className='links'>Home</Link>
//         <Link to='/about' className='links'>About</Link>
//         <Link to='/mainpage' className='links'>Explore</Link>
//         <Link to='/apipage' className='links'>Api</Link>
//       </nav>
//     </div>
//   );
// }

// export default Home;


import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if cookies exist
    const cookies = document.cookie;
    setIsLoggedIn(cookies);
  }, []); // Runs once on component mount

  const deleteCookie = () => {
    // Delete cookies
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false); // Update state
  };

  return (
    <div className='Body'>
      <div>
        <h1>Popular Animes</h1>
      </div>
      <div>
        <h3>Special Categories</h3>
        <p>There are many other great anime series and movies,<br />
           out there to explore. With so much variety<br/> to choose from,to everyone's taste.</p>
        <nav>
          <Link to='/mainpage' className='explore'>View More →</Link>
        </nav>
      </div>
      <nav>
        <Link to='/' className='links'>Home</Link>
        <Link to='/about' className='links'>About</Link>
        <Link to='/mainpage' className='links'>Explore</Link>
        <div className='links' id='dynamic-btn'>
          {isLoggedIn ? (
            <button id='logout-btn' onClick={deleteCookie}>Log out</button>
          ) : (
            <Link to='/loginpage' id='signin-btn'>Sign Up</Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Home;