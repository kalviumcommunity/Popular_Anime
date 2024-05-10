// import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import axios from "axios";
// import './mainpage1.css'
// function Main1() {
//     const [ani, setAni] = useState([]);
//     useEffect(() => {
//         axios.get('http://localhost:3000/api')
//             .then(response => {
//                 setAni(response.data);
//                 console.log(response.data); 
//             })
//             .catch(err => console.log(err));
//     }, []); 
//     const handleDelete = (id) => {
//       const confirmDelete = window.confirm("Are you sure you want to delete this item?");
//       if (confirmDelete) {
//         axios.delete(`http://localhost:3000/api/deleteAni/${id}`)
//           .then(response => {
//             location.reload();
//             console.log(response);
//           })
//           .catch(err => console.log(err));
//       }
//     };
//     const sendIndex=(indexpos)=>{
//         localStorage.setItem('pos',indexpos);
//         console.log(indexpos)
//     }
//     return (
//         <div className="org">
//             <nav >
//                 <Link to='/' className='link1'>Home</Link>
//                 <Link to='/about' className='link1'>About</Link>
//                 <Link to='/mainpage' className='link1'>Explore</Link>
//                 <Link to='/apipage' className='link1'>Api</Link>
//             </nav>
//             <h1 id="title">List of Popular <br /> Animes</h1>
//             <Link to='/updateani' id="add-ani">Add New Animes +</Link>
//             <div className="anis">
//             {
//                    ani.map((data, dataIndex) => (
//                     <Link key={data._id} to={{ pathname: "/mainpage1"}}>
//                       <button 
//                         className="ani-names"  
//                         onClick={() => sendIndex(dataIndex)} // Corrected
//                       >
//                         {data.animeName}
//                         <Link className="edit-btn" to={`/editAni/${data._id}`}> Edit </Link>
//                         <Link className="delete-btn" to='/mainpage' onClick={(e)=>handleDelete(data._id)}>Delete </Link>
//                       </button>
//                     </Link>
//                   ))
//                 }
//             </div>
            
//         </div>
//     );
// }

// export default Main1;





import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './mainpage1.css';

function Main2() {
    const [ani, setAni] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedId, setSelectedId] = useState("all");

    useEffect(() => {
        axios.get('http://localhost:3000/api/users/names')
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (selectedId === "all") {
            axios.get(`http://localhost:3000/api/anime`)
                .then(response => {
                    setAni(response.data);
                    console.log(response.data); 
                })
                .catch(err => console.log(err));
        } else {
            axios.get(`http://localhost:3000/api/anime/${selectedId}`)
                .then(response => {
                    setAni(response.data);
                    console.log(response.data); 
                })
                .catch(err => console.log(err));
        }
    }, [selectedId]);

    const handleFilter = (e) => {
        console.log(e.target.value);
        setSelectedId(e.target.value);
    };
    
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            axios.delete(`http://localhost:3000/api/deleteAni/${id}`)
                .then(response => {
                    location.reload();
                    console.log(response);
                })
                .catch(err => console.log(err));
        }
    };

    const sendIndex = (indexpos) => {
        localStorage.setItem('pos', indexpos);
        console.log(indexpos);
    };

    return (
        <div className="org">
            <nav >
                <Link to='/' className='link1'>Home</Link>
                <Link to='/about' className='link1'>About Us</Link>
                <Link to='/mainpage' className='link1'>Explore</Link>
                <Link to='/apipage' className='link1'>Api</Link>
            </nav>
            <h1 id="title">List of Popular <br /> Animes</h1>
            <Link to='/updateani' id="add-ani">Add New Animes</Link>
            <div className="anis">
            {
                ani.map((data, dataIndex) => (
                    <Link key={data._id} to={{ pathname: "/mainpage1"}}>
                        <button 
                            className="ani-names"  
                            onClick={() => sendIndex(dataIndex)}
                        >
                            {data.animeName}
                            <Link className="edit-btn" to={`/editAni/${data._id}`}> Edit </Link>
                            <Link className="delete-btn" to='/mainpage' onClick={(e) => handleDelete(data._id)}>Delete </Link>
                        </button>
                    </Link>
                ))
            }
            </div>
            <div className="dropdown">
                <select name="userDropdown" id="userDropdown" onChange={handleFilter}>
                    <option value="all">User Names</option>
                    {users.map((user, index) => (
                        <option key={index} value={user._id}>
                            {user.userName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Main2;