import './Homepage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSkateparks } from '../../store/skatepark';
import { Link } from "react-router-dom";

function Homepage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const skateparks = useSelector(state => state.skateparks);

  let skateparkArr;
  if (skateparks) {
    skateparkArr = Object.values(skateparks).slice(0, 4);
  }

  useEffect(() => {
    dispatch(getSkateparks())
  }, [dispatch]);

  return(
    <div id='homepage-container'>
      <div className='homepage-img'>{sessionUser ? <p className='home-page-title'>Ready to skate, {sessionUser.firstName}?</p> : <p className='home-page-title'>Ready to skate?</p>}</div>
      <div className='homepage-banner'>
        <h2 className='homepage-banner-h2'>Skatepark favorites</h2>
        <div className='skate-card-container'>
          {skateparks && skateparkArr && skateparkArr.length > 0 && skateparkArr.map(skatepark => {
            return (
              <div className='skatepark-card' key={skatepark.id}>
                {skatepark.images && skatepark.images.length > 0 && <Link className='homepage-img-container' to={`/skateparks/${skatepark.id}`}><img className='homepage-banner-imgs' src={skatepark.images[0].url}/></Link>}
                <div>Star rating here</div>
                <div>{skatepark.name}</div>
                <div>{skatepark.city}, {skatepark.state}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='homepage-banner-2'>

      </div>
      <div className='homepage-tags-section'>
        <div className='home-page-tags-h2-p-div'>
          <h2 className='homepage-tags-section-h2'>There's a park for everyone.</h2>
          <p className='homepage-tags-p'>Choose an option to be taken to all the parks with that feature.</p>
        </div>
        <div className='homepage-tags-container'>
          <Link to={`/skateparks/Half pipe`} className='homepage-tag-grid'>
            <div className='homepage-tags-titles'>Half Pipe</div>
            <div className='homepage-tag-img-divs'><img src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/d03d91464d0268a58b8c79303d0fbcd4_-queensland-gold-coast-city-upper-coomera-upper-coomera-skateparkhtml.jpg' alt='half pipe' className='homepage-tag-pipe'/></div>
          </Link>
          <Link to={`/skateparks/Bowl`} className='homepage-tag-grid'>
            <div className='homepage-tags-titles'>Bowl</div>
            <div className='homepage-tag-img-divs'><img src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/West-Kelowna-4.jpg' alt='skate bowl' className='homepage-tag-bowl'/></div>
          </Link>
          <Link to={`/skateparks/Street`} className='homepage-tag-grid'>
            <div className='homepage-tags-titles'>Street</div>
            <div className='homepage-tag-img-divs'><img src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/Ulysses-Skate-Park_SpeakEasy-Colorado-Skate-Park-Directory-1.jpg' alt='street skatepark' className='homepage-tag-street'/></div>
          </Link>
          <Link to={`/skateparks/Pump Track`} className='homepage-tag-grid'>
            <div className='homepage-tags-titles'>Pump Track</div>
            <div className='homepage-tag-img-divs'><img src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/velosolutions-pump-track-broomfield-image2.jpg' alt='pump track' className='homepage-tag-pump'/></div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
