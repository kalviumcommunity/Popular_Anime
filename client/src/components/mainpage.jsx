import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './mainpage.css'
import './main1'
import axios from "axios";
import { useLocation } from 'react-router-dom';
function Main() {
  const location = useLocation();
  const [index, setIndex] = useState(parseInt(localStorage.getItem('pos'), 10) || 0);
  const [ani, setAni] = useState([]);
  console.log(index)
  const increment = () => {
    setIndex(prevIndex => (prevIndex < 22 ? prevIndex + 1 : 0));
  };
  
  const decrement = () => {
    setIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 22));
  };
  window.addEventListener("keydown", function(event){
    switch (event.key){
        case "ArrowRight":
            increment()
            break;
    }
  });
   window.addEventListener("keydown", function(event){
    switch (event.key){
        case "ArrowLeft":
            decrement()
            break;
    }
  });
  useEffect(() => {
    axios.get('http://localhost:3000/api')
      .then(response => {
        console.log(response.data[0]);
        console.log(response.data)
        setAni(response.data);
        
      })
      .catch(err => console.log(err));
  }, []); 
  return (
    <div className='Background'>
      
      <div>
        {ani.length > 0 &&<h2 className='ani-name'>{ani[index].anime}</h2>}
        {ani.length > 0 && <h4 className='ani-authorname'>{ani[index].authorname}</h4>}
      </div>
      <div className='anime-data'>
        <h3 className='start-date'>Start Date: </h3>
        <h3 className='theme'>Theme:</h3>
        <h3 className='character'>Character:</h3>
      </div>
      <div className='anime-datas'>
        {ani.length > 0 && <h5 className='sta-date'>{ani[index].start_date} </h5>}
        {ani.length > 0 &&<h5 className='the'>{ani[index].theme}</h5>}
        {ani.length > 0 && <h5 className='char'>{ani[index].character}</h5>}
      </div>
      <div>
      {ani.length > 0 &&<img src={ani[index].image_url} alt="" className='ani-image'/>}
      </div>
      <Link to='/mainpage' className='back-button'>Animes List</Link>
      <button className='back-btn' onClick={decrement}>Back</button>
      <button className='next-btn' onClick={increment}>Next</button>

      <nav className='all'>
        <Link to='/' className='link'>Home</Link>
        <Link to='/about' className='link'>About</Link>
        <Link to='/mainpage' className='link'>Explore</Link>
        <Link to='/apipage' className='link'>Api</Link>
      </nav>
    </div>
  );
}

export default Main;