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
    skateparkArr = [];
    console.log(skateparks[1], 'woo')
    skateparkArr.push(skateparks[1])
    skateparkArr.push(skateparks[2])
    skateparkArr.push(skateparks[3])
    skateparkArr.push(skateparks[4])
    console.log(skateparkArr)
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
                <div>{skatepark.name}</div>
                <div>{skatepark.city}, {skatepark.state}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
