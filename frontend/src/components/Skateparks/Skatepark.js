import { Link } from 'react-router-dom';
import './skatepark-card.css';

function Skatepark({ skatepark }) {
  return (
    skatepark &&
      <div className='explore-page-cards'>
        {skatepark.images.length > 0 && (<Link to={`/skateparks/${skatepark.id}`}><img src={skatepark.images[0].url} style={{width: '200px'}}/></Link>)}
        <Link to={`/skateparks/${skatepark.id}`}><div>{skatepark.name}</div></Link>
        <div>{skatepark.address}</div>
        <div>{skatepark.city}, {skatepark.state} {skatepark.zipcode}</div>
        <img src="https://img.icons8.com/material/48/000000/hearts--v1.png"/>
        <img src="https://img.icons8.com/material-outlined/48/000000/hearts.png"/>
      </div>
  );
}

export default Skatepark;
