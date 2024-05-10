import React from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import './update.css'

function Edit(){
    const {id} = useParams()
    const [anime,setAniName]=useState()
    const [authorname,setAniAuthorName]=useState()
    const [start_date,setStartDate]=useState()
    const [theme,setTheme]=useState()
    const [character,setCharacter]=useState()
    const [image_url,setImageurl]=useState()
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get('http://localhost:3000/api/'+id)
          .then(response => {
            console.log(response.data);
            console.log("the data is: ",response.data) 
            setAniName(response.data.anime)
            setAniAuthorName(response.data.authorname)
            setStartDate(response.data.start_date)
            setTheme(response.data.theme)
            setCharacter(response.data.character)
          })
          .catch(err => console.log(err));
      }, []); 
    const update =(e)=>{
        e.preventDefault();
        axios.put("http://localhost:3000/api/updateAni/"+id,{anime,authorname,start_date,theme,character,image_url})
        .then(result=>{
            console.log(result)
            navigate('/mainpage')
        })
        .catch(err=>console.log(err))
    }
    return(
        <div className="update-body">
            <h1 id="title1">Edit Existing Anime</h1>
            
            <div>
                <form onSubmit={update}>
                    <div className="add-ani-name">
                        <label htmlFor="">Anime Name:</label>
                        <input type="text" placeholder="eg.Naruto" id="" onChange={(e)=>setAniName(e.target.value)} value={anime}/>
                    </div>
                    <div className="add-ani-authorname">
                        <label htmlFor="">Author Name:</label>
                        <input type="text" placeholder="eg.Masashi Kishimoto" id="" onChange={(e)=>setAniAuthorName(e.target.value)} value={authorname}/>
                    </div>
                    <div className="add-start-date">
                        <label htmlFor="">Start Date:</label>
                        <input type="text" placeholder="eg.October3, 2002" id="" onChange={(e)=>setStartDate(e.target.value)} value={start_date} />
                    </div>
                    <div className="add-theme">
                        <label htmlFor="">Theme:</label>
                        <input type="text" placeholder="eg.Hardships" id="" onChange={(e)=>setTheme(e.target.value)} value={theme} />
                    </div>
                    <div className="add-character">
                        <label htmlFor="">Character:</label>
                        <input type="text" placeholder="eg.Naruto Uzumaki" id="" onChange={(e)=>setCharacter(e.target.value)} value={character} />
                    </div>
                    <div className="add-image-url">
                        <label htmlFor="">Image Url:</label>
                        <input type="text" placeholder="optional" id="" onChange={(e)=>setImageurl(e.target.value)} value={image_url} />
                    </div>
                    <button type="submit" className="submit-btn">Update</button>
                </form>
                <Link to='/mainpage' className="back-button">← Back</Link>
            </div>
        </div>
    )
}
export default Edit;