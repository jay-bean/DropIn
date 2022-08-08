import { Link } from 'react-router-dom';
import Favorites from '../Favorites/Favorites';
import './skatepark-card.css';

function Skatepark({ skatepark }) {
  return (
    skatepark &&
      <div  className='explore-page-card-container'>
        <div className='explore-page-card'>
          <Link to={`/skateparks/${skatepark.id}`} className='image-container'>
            {skatepark.images && skatepark.images.length > 0 && (<div className='explore-card-img-container' to={`/skateparks/${skatepark.id}`}><img className='explore-card-img' src={skatepark.images[0].url} style={{width: '200px'}}/></div>)}
          </Link>
          <div className='explore-card-word-section'>
            <Link to={`/skateparks/${skatepark.id}`} className='explore-card-park-name'>{skatepark.name}</Link>
            <div className='explore-card-addy-fave-container'>
              <Link to={`/skateparks/${skatepark.id}`} className='explore-card-address-div'>
                <div className='explore-card-address'>{skatepark.address}</div>
                <div className='explore-card-address'>{skatepark.city}, {skatepark.state} {skatepark.zipcode}</div>
              </Link>
              <Favorites skateparkId={skatepark.id}/>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Skatepark;
