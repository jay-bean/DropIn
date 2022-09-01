import { Link } from 'react-router-dom';
import Favorites from '../../Favorites/Favorites';
import AverageRating from '../../Skateparks/AverageRating/AverageRating';
import './skatepark-snippet.css';

function SkateparkSnippet({ skatepark }) {
  return (
    skatepark &&
      <div  className='snippet-container'>
        <div className='snippet-card'>
          <Link to={`/skateparks/${skatepark.id}`} className='snippet-image-container'>
            {skatepark.images && skatepark.images.length > 0 && (<div className='snippet-card-img-container' to={`/skateparks/${skatepark.id}`}><img className='snippet-card-img' src={skatepark.images[0].url} style={{width: '200px'}}/></div>)}
          </Link>
          <div className='snippet-card-word-section'>
            <Link to={`/skateparks/${skatepark.id}`} className='snippet-card-park-name'>{skatepark.name}</Link>
            <AverageRating skatepark={skatepark}/>
            <div className='snippet-card-addy-fave-container'>
              <Link to={`/skateparks/${skatepark.id}`} className='snippet-card-address-div'>
                <div className='snippet-card-address'>{skatepark.address}</div>
                <div className='snippet-card-address'>{skatepark.city}, {skatepark.state} {skatepark.zipcode}</div>
              </Link>
              <Favorites skateparkId={skatepark.id}/>
            </div>
          </div>
        </div>
      </div>
  );
}

export default SkateparkSnippet;
