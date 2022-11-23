import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getSkateparks } from '../../store/skatepark';
import SearchBar from '../SearchBar/SearchBar';
import HomePageImgCarousel from './HomePageImgCarousel';
import HomepageTagCarousel from './HomepageTagCarousel';
import './Homepage.css';

function Homepage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const skateparks = useSelector(state => state.skateparks);

  let skateparkArr;
  if (skateparks) {
    skateparkArr = Object.values(skateparks).slice(0, 10);
  }

  useEffect(() => {
    dispatch(getSkateparks())
  }, [dispatch]);

  return(

      <div id='homepage-container'>
        <div className='homepage-img'>{sessionUser ? <p className='home-page-title'>Ready to skate, {sessionUser.firstName}?</p> : <p className='home-page-title'>Ready to skate?</p>}</div>
        <div className='homepage-search-div'>
          <SearchBar skateparks={skateparks}/>
        </div>
        <div className='homepage-banner'>
          <h2 className='homepage-banner-h2'>Featured skateparks</h2>
          <HomePageImgCarousel skateparks={skateparks} skateparkArr={skateparkArr}/>
        </div>
        <div className='homepage-banner-2'></div>
        <HomepageTagCarousel/>
      </div>
  );
}

export default Homepage;
