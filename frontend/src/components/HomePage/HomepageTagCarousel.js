import { useState } from "react";
import { Link } from "react-router-dom";

function HomepageTagCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (index) => {
    if (index < 0) index = 0;
    else if (index >= 1) index = 1;
    setActiveIndex(index);
  }

  return (
    <div className='homepage-tags-section'>
      <div className='home-page-tags-h2-p-div'>
        <h2 className='homepage-tags-section-h2'>There's a park for everyone.</h2>
        <p className='homepage-tags-p'>Choose an option to be taken to all the parks with that feature.</p>
      </div>
      <div className='homepage-tags-container'>
            <div className='homepage-arrow-divs'>
              <img
                style={{visibility: activeIndex === 0 ? 'hidden' : 'visible'}}
                onClick={() => {updateIndex(0)}}
                className='modal-homepage-img-btn-left' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/488796E1-0435-45B7-9BE2-6788680809AF_4_5005_c.jpeg'/>
            </div>
        <div className='homepage-tag-div'>
          <div className='homepage-tag-movement' style={{ transform: `translateX(-${activeIndex * 1280}px)`}}>
            <Link to={`/skateparks/Half pipe`} className='homepage-tag-grid'>
              <div className='homepage-tags-titles'>Half Pipe</div>
              <div className='homepage-tag-img-divs'><img src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/d03d91464d0268a58b8c79303d0fbcd4_-queensland-gold-coast-city-upper-coomera-upper-coomera-skateparkhtml.jpg' alt='half pipe' className='homepage-tag-pipe'/></div>
            </Link>
            <Link to={`/skateparks/Bowl`} className='homepage-tag-grid'>
              <div className='homepage-tags-titles'>Bowl</div>
              <div className='homepage-tag-img-divs'><img src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/West-Kelowna-4.jpg' alt='skate bowl' className='homepage-tag-bowl'/></div>
            </Link>
            <Link to={`/skateparks/Pool`} className='homepage-tag-grid'>
              <div className='homepage-tags-titles'>Pool</div>
              <div className='homepage-tag-img-divs'><img src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/Ulysses-Skate-Park_SpeakEasy-Colorado-Skate-Park-Directory-1.jpg' alt='street skatepark' className='homepage-tag-street'/></div>
            </Link>
            <Link to={`/skateparks/Snake Run`} className='homepage-tag-grid'>
              <div className='homepage-tags-titles'>Snake Run</div>
              <div className='homepage-tag-img-divs'><img src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/04698E53-99A2-47D8-B0BA-3535DF6699BC.jpeg' alt='pump track' className='homepage-tag-pump'/></div>
            </Link>
            <Link to={`/skateparks/Street`} className='homepage-tag-grid'>
              <div className='homepage-tags-titles'>Street</div>
              <div className='homepage-tag-img-divs'><img src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/8BA0D085-E615-4DEB-9A43-F6D26E22F1A8.png' alt='pump track' className='homepage-tag-pump'/></div>
            </Link>
            <Link to={`/skateparks/Rails`} className='homepage-tag-grid'>
              <div className='homepage-tags-titles'>Rails</div>
              <div className='homepage-tag-img-divs'><img src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/Ulysses-Skate-Park_SpeakEasy-Colorado-Skate-Park-Directory-1.jpg' alt='pump track' className='homepage-tag-pump'/></div>
            </Link>
            <Link to={`/skateparks/Ledges`} className='homepage-tag-grid'>
              <div className='homepage-tags-titles'>Ledges</div>
              <div className='homepage-tag-img-divs'><img src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/BC6FF45E-B805-466D-9161-C5F7FE504033.jpeg' alt='pump track' className='homepage-tag-pump'/></div>
            </Link>
            <Link to={`/skateparks/Pump Track`} className='homepage-tag-grid'>
              <div className='homepage-tags-titles'>Pump Track</div>
              <div className='homepage-tag-img-divs'><img src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/velosolutions-pump-track-broomfield-image2.jpg' alt='pump track' className='homepage-tag-pump'/></div>
            </Link>
          </div>
        </div>
            <div className='homepage-arrow-divs'>
              <img
                style={{visibility: activeIndex === 1 ? 'hidden' : 'visible'}}
                onClick={() => {updateIndex(1)}}
                className='modal-homepage-img-btn-right' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/23251A57-5A07-4B1A-9B49-C089989DF7B6_4_5005_c.jpeg'/>
            </div>
      </div>
    </div>
  );
}

export default HomepageTagCarousel;
