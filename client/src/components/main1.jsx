import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './main1.css'
function Main1() {
    const [ani, setAni] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/api')
            .then(response => {
                setAni(response.data);
                console.log(response.data); 
            })
            .catch(err => console.log(err));
    }, []); 
    const sendIndex=(indexpos)=>{
        localStorage.setItem('pos',indexpos);
        console.log(indexpos)
    }
    return (
        <div className="container">
            <nav >
                <Link to='/' className='link1'>Home</Link>
                <Link to='/about' className='link1'>About</Link>
                <Link to='/mainpage' className='link1'>Explore</Link>
                <Link to='/apipage' className='link1'>Api</Link>
            </nav>
            <h1 id="title">List of Popular <br /> Animes</h1>

            <div className="anis">
            {
                   ani.map((data, dataIndex) => (
                    <Link key={data._id} to={{ pathname: "/main1"}}>
                      <button 
                        className="ani-names"  
                        onClick={() => sendIndex(dataIndex)} // Corrected
                      >
                        {data.anime}
                      </button>
                    </Link>
                  ))
                }
            </div>
        </div>
    );
}

export default Main1;