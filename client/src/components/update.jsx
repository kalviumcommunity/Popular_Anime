import React from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './update.css'

function Update(){
    const [anime,setAniName]=useState()
    const [authorname,setAniAuthorName]=useState()
    const [start_date,setStartDate]=useState()
    const [theme,setTheme]=useState()
    const [character,setCharacter]=useState()
    const [image_url,setImageurl]=useState()
    const navigate = useNavigate()
    const submit =(e)=> {
        e.preventDefault();
        axios.post("http://localhost:3000/api/add-anime",{ anime,authorname,start_date,theme,character,image_url})
        .then(result=>{
            console.log(result)
            navigate('/mainpage')
        })
        .catch(err=>console.log(err))
    }
    return(
        <div className="update-body">
            <h1 id="title1">Add new Animes</h1>
            
            <div>
                <form onSubmit={submit}>
                    <div className="add-ani-name">
                        <label htmlFor="">Anime Name:</label>
                        <input type="text" placeholder="eg.Naruto" id="" onChange={(e)=>setAniName(e.target.value)} />
                    </div>
                    <div className="add-ani-authorname">
                        <label htmlFor="">Author Name:</label>
                        <input type="text" placeholder="eg.Masashi Kishimoto" id="" onChange={(e)=>setAniAuthorName(e.target.value)} />
                    </div>
                    <div className="add-start-date">
                        <label htmlFor="">Start Date:</label>
                        <input type="text" placeholder="eg.October3, 2002" id="" onChange={(e)=>setStartDate(e.target.value)} />
                    </div>
                    <div className="add-theme">
                        <label htmlFor="">Theme:</label>
                        <input type="text" placeholder="eg.Hardships" id="" onChange={(e)=>setTheme(e.target.value)} />
                    </div>
                    <div className="add-character">
                        <label htmlFor="">Character:</label>
                        <input type="text" placeholder="eg.Naruto Uzumaki" id="" onChange={(e)=>setCharacter(e.target.value)} />
                    </div>
                    <div className="add-image-url">
                        <label htmlFor="">Image Url:</label>
                        <input type="text" placeholder="eg.optional" id="" onChange={(e)=>setImageurl(e.target.value)} />
                    </div>
                    <button type="submit" className="submit-btn">Update</button>
                </form>
                <Link to='/mainpage' className="back-button">← Back</Link>
            </div>
        </div>
    )
}
export default Update;