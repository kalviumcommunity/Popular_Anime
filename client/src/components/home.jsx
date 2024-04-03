import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
function Home() {
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
        <Link to='/apipage' className='links'>Api</Link>
      </nav>
    </div>
  );
}

export default Home;