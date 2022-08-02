import { useParams, Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getSkateparks, removeSkatepark } from '../../store/skatepark';
import EditSkateparkForm from './EditSkateparkForm';

function Skatepark({ skatepark }) {
  return (
    <>
      {/* {skatepark.images.length > 0 && skatepark.images.map(image => {
        return (
          <img src={image.url}/>
        );
      })} */}
      {skatepark.images.length > 0 && (<img src={skatepark.images[0].url}/>)}
      <div>{skatepark.name}</div>
      <div>{skatepark.description}</div>
      <div>{skatepark.address}</div>
      <div>{skatepark.city}, {skatepark.state} {skatepark.zipcode}</div>

    </>
  );
}

export default Skatepark;
