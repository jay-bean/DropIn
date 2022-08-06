import { Link } from 'react-router-dom';
import Favorites from '../Favorites/Favorites';
import './skatepark-card.css';

function Skatepark({ skatepark }) {
  return (
    skatepark &&
      <div className='explore-page-card-container'>
        <div className='explore-page-card'>
          {skatepark.images && skatepark.images.length > 0 && (<Link to={`/skateparks/${skatepark.id}`}><img src={skatepark.images[0].url} style={{width: '200px'}}/></Link>)}
          <Link to={`/skateparks/${skatepark.id}`}><div>{skatepark.name}</div></Link>
          <div>{skatepark.address}</div>
          <div>{skatepark.city}, {skatepark.state} {skatepark.zipcode}</div>
          <Favorites skateparkId={skatepark.id}/>
        </div>
      </div>
  );
}

export default Skatepark;
