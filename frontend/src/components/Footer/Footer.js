import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getTags } from '../../store/parktag';
import { getSkateparks } from '../../store/skatepark';
import './footer.css';

function Footer() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [tags, setTags] = useState([]);
  const skateparks = useSelector(state => state.skateparks);

  useEffect(() => {
    (async () => {
      const allTags = await getTags();
      setTags(allTags)
    })();
    dispatch(getSkateparks());
  }, [dispatch])

  return (
    Object.values(skateparks).length ?
    <div className="footer">
      <div className='footer-flex'>
        <div id='footer-explore'>
          <Link className='footer-headers footer-explore-h2' to='/skateparks'><h2>Explore</h2></Link>
          <div className='footer-tags-container'>
            {tags && tags.length ? tags.map(tag => {
              return (
                <Link to={`/skateparks/${tag.type}`} className='footer-tags' key={tag.id}>{tag.type}</Link>
              );
            }): null}
          </div>
        </div>
        {sessionUser &&
          <div className='footer-prof'>
            <Link className='footer-headers' to='/profile'><h2>Profile</h2></Link>
            <div className='prof-p-container'>
              <Link className='footer-prof-p' to='/profile'><p>Account</p></Link>
              <Link className='footer-prof-p' to='/profile/skateparks'><p>Skateparks</p></Link>
              <Link className='footer-prof-p' to='/profile/favorites'><p>Favorites</p></Link>
              <Link className='footer-prof-p' to='/profile/reviews'><p>Reviews</p></Link>
            </div>
          </div>}
          <div>
            <Link className='footer-headers' to='/about'><h2>About</h2></Link>
            <div className='footer-about'>
            <a className='footer-social-links' href="https://www.jayhutts.dev/" target="_blank"><img className='footer-socials' src="https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/DFD01411-79E8-4256-B284-689523CA0C18.png" alt="portfolio"/>Portfolio</a>
              <a className='footer-social-links' href="https://github.com/jay-bean" target="_blank"><img className='footer-socials' src="https://t2marketinginternational.com/wp-content/uploads/2018/06/Github-Logo-450x450.png" alt="github"/>Github</a>
              <a className='footer-social-links' href="https://www.linkedin.com/in/jay-hutts-300ab9180/" target="_blank"><img className='footer-socials' src="https://www.maryville.edu/wp-content/uploads/2015/11/Linkedin-logo-1-550x550-300x300.png" alt="linked-in"/>Linkedin</a>
            </div>
          </div>
        {!sessionUser &&
          <div className='footer-prof'>
            <div className='footer-signup'>
              <Link  className='footer-headers' to='/signup'><h2 className='footer-signup-h2'>Sign up</h2></Link>
              <Link  className='footer-headers' to='/login'><h2 className='footer-login-h2'>Log in</h2></Link>
            </div>
          </div>
        }
        <div className='footer-image-container'>
          <img className='footer-image' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/Los_Angeles_skateboarders.jpeg' alt='people-skating'/>
          <div className='footer-wheels-div'>
            <h2 className='footer-wheels-header'>All Wheels Welcomed</h2>
            <div className='footer-icons-div'>
              <img className='footer-icons' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/skateboard.png' alt='skateboard'></img>
              <img className='footer-icons'  src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/rollerskate.png' alt='rollerskate'></img>
              <img className='footer-icons' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/rollerblade.png' alt='rollerblade'></img>
              <img className='footer-icons' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/bicycle.png' alt='bicycle'></img>
              <img className='footer-icons' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/kick-scooter.png' alt='scooter'></img>
            </div>
          </div>
        </div>
      </div>
    </div> : <div id='footer-explore'></div>
  );
}

export default Footer;
