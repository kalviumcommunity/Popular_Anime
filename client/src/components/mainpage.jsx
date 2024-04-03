import { Link } from 'react-router-dom';
import './mainpage.css'
function Main() {
  return (
    <div className='Background'>
      <div>
        <h2 className='ani-name'>Naruto</h2>
        <h4 className='ani-authorname'>Masashi Kishimoto</h4>
      </div>
      <div className='anime-data'>
        <h3 className='start-date'>Start Date: </h3>
        <h3 className='theme'> Theme:</h3>
        <h3 className='character'> Character:</h3>
      </div>
      <div className='anime-datas'>
        <h5 className='sta-date'>October3, 2002 </h5>
        <h5 className='the'> Hardships</h5>
        <h5 className='char'>Naruto Uzumaki</h5>
      </div>
      <div>
        <img src="https://i.pinimg.com/736x/22/de/8d/22de8dbda07ba5571a97736b12905a17.jpg" alt="" className='ani-image'/>
      </div>
      <button className='back-btn'>← Back</button>
      <button className='next-btn'>Next →</button>
      <nav >
        <Link to='/' className='link'>Home</Link>
        <Link to='/about' className='link'>About</Link>
        <Link to='/mainpage' className='link'>Explore</Link>
        <Link to='/apipage' className='link'>Api</Link>
      </nav>
    </div>
  );
}

export default Main;