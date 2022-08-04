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
    console.log(skateparkArr, 'skatepark array')
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
                {skatepark.images && skatepark.images.length > 0 && <Link className='homepage-img-container' to={`/skateparks/${skatepark.id}`}><img className='homepage-banner-imgs' src={skatepark.images[1].url}/></Link>}
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
        <h2 className='homepage-tags-section-h2'>There's a park for everyone.</h2>
        <div className='homepage-tags-container'>
          <div className='homepage-tags'>Half pipe</div>
          <div className='homepage-tags'>Bowl<img className='homepage-tags-img'/></div>
          <div className='homepage-tags'>Street<img className='homepage-tags-img'/></div>
          <div className='homepage-tags'>Pump Track<img className='homepage-tags-img'/></div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
