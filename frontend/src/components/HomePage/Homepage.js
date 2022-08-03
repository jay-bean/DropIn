import './Homepage.css';
import { useSelector } from 'react-redux';

function Homepage() {
  const sessionUser = useSelector(state => state.session.user)

  return(
    <div id='homepage-container'>
      <div className='homepage-img'>{sessionUser ? <p className='home-page-title'>Ready to skate, {sessionUser.firstName}?</p> : <p className='home-page-title'>Ready to skate?</p>}</div>
    </div>
  );
}

export default Homepage;
