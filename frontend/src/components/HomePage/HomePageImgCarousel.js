import { useState } from 'react';
import { Link } from 'react-router-dom';

import AverageRating from '../Skateparks/AverageRating/AverageRating';
import Favorites from '../Favorites/Favorites';

function HomePageImgCarousel({ skateparkArr }) {
  const sevenParks = skateparkArr.slice(0, 7);
  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (index) => {
    if (index < 0) index = 0;
    else if (index >= sevenParks.length) index = 0;
    setActiveIndex(index);
  }

  return (
    <div className='skate-card-container-top'>
      <div className='homepage-arrow-divs'>
        <img
          style={{visibility: activeIndex === 0 ? 'hidden' : 'visible'}}
          onClick={() => {updateIndex(0)}}
          className='modal-homepage-img-btn-left' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/488796E1-0435-45B7-9BE2-6788680809AF_4_5005_c.jpeg'/>
      </div>
      <div className='modal-homepage-img-div'>
        <div className='modal-homepage-img-movement' style={{ transform: `translateX(-${activeIndex * 1280}px)`}}>
          {sevenParks && sevenParks.length > 0 ? sevenParks.map(skatepark => {
            return (
              <div className='skatepark-card' key={skatepark.id}>
                {skatepark.images && skatepark.images.length > 0 && <Link className='homepage-img-container' to={`/skateparks/${skatepark.id}`}><div className='homepage-img-hover'><img className='homepage-banner-imgs' src={skatepark.images[0].url}/></div></Link>}
                <div className='homepage-park-flex'>
                  <div className='homepage-rating-container'>
                    <div className='homepage-skatepark-name'>{skatepark.name}</div>
                    <AverageRating skatepark={skatepark}/>
                    <div className='homepage-skatepark-location top-location'>{skatepark.address}</div>
                    <div className='homepage-skatepark-location'>{skatepark.city}, {skatepark.state}</div>
                  </div>
                  <div className='favorites-homepage-container'>
                    <Favorites skateparkId={skatepark.id}/>
                  </div>
                </div>
              </div>
            );
          }) : null}
          <div className='skatepark-card'>
            <div className='homepage-img-container'>
              <Link className='homepage-img-hover view-more' to='/skateparks'>Show more</Link><img src='' />
            </div>
          </div>
        </div>
      </div>
      <div className='homepage-arrow-divs'>
        <img
          style={{visibility: activeIndex === 1 ? 'hidden' : 'visible'}}
          onClick={() => {updateIndex(1)}}
          className='modal-homepage-img-btn-right' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/23251A57-5A07-4B1A-9B49-C089989DF7B6_4_5005_c.jpeg'/>
      </div>
    </div>
  );
}

export default HomePageImgCarousel;
