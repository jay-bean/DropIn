import { Link } from 'react-router-dom';

function Skatepark({ skatepark }) {
  return (
    skatepark &&
      <div>
        {skatepark.images.length > 0 && (<Link to={`/skateparks/${skatepark.id}`}><img src={skatepark.images[0].url} style={{width: '300px'}}/></Link>)}
        <div>{skatepark.name}</div>
        <div>{skatepark.description}</div>
        <div>{skatepark.address}</div>
        <div>{skatepark.city}, {skatepark.state} {skatepark.zipcode}</div>
      </div>
  );
}

export default Skatepark;
