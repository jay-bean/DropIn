import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSkateparks } from '../../store/skatepark';
import Favorites from '../Favorites/Favorites';
import AverageRating from './AverageRating';
import './skatepark-card.css';

function Skatepark({ skatepark, skateparkId }) {
  const dispatch = useDispatch();

  const reviewSkatepark = useSelector(state => state.skateparks[skateparkId]);


  useEffect(() => {
    dispatch(getSkateparks());
  }, [dispatch]);

  return (
    skatepark ?
      <div  className='explore-page-card-container'>
        <div className='explore-page-card'>
          <Link to={`/skateparks/${skatepark.id}`} className='image-container'>
            {skatepark.images && skatepark.images.length > 0 && (<div className='explore-card-img-container' to={`/skateparks/${skatepark.id}`}><img className='explore-card-img' src={skatepark.images[0].url} style={{width: '200px'}}/></div>)}
          </Link>
          <div className='explore-card-word-section'>
            <Link to={`/skateparks/${skatepark.id}`} className='explore-card-park-name'>{skatepark.name}</Link>
            <AverageRating skatepark={skatepark}/>
            <div className='explore-card-addy-fave-container'>
              <Link to={`/skateparks/${skatepark.id}`} className='explore-card-address-div'>
                <div className='explore-card-address'>{skatepark.address}</div>
                <div className='explore-card-address'>{skatepark.city}, {skatepark.state} {skatepark.zipcode}</div>
              </Link>
              <Favorites skateparkId={skatepark.id}/>
            </div>
          </div>
        </div>
      </div> :
      reviewSkatepark &&
      <div  className='explore-page-card-container'>
        <div className='explore-page-card'>
          <Link to={`/skateparks/${reviewSkatepark.id}`} className='image-container'>
            {reviewSkatepark.images && reviewSkatepark.images.length > 0 && (<div className='explore-card-img-container' to={`/skateparks/${reviewSkatepark.id}`}><img className='explore-card-img' src={reviewSkatepark.images[0].url} style={{width: '200px'}}/></div>)}
          </Link>
          <div className='explore-card-word-section'>
            <Link to={`/skateparks/${reviewSkatepark.id}`} className='explore-card-park-name'>{reviewSkatepark.name}</Link>
            <div className='explore-card-addy-fave-container'>
              <Link to={`/skateparks/${reviewSkatepark.id}`} className='explore-card-address-div'>
                <div className='explore-card-address'>{reviewSkatepark.address}</div>
                <div className='explore-card-address'>{reviewSkatepark.city}, {reviewSkatepark.state} {reviewSkatepark.zipcode}</div>
              </Link>
              <Favorites skateparkId={reviewSkatepark.id}/>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Skatepark;
