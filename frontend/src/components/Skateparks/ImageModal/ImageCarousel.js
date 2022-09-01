import { useState } from 'react';
import './image-modal.css'

function ImageCarousel({ skatepark, imgShow, setImgShow }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const updateIndex = (index) => {
    // if (index < 0) index = skatepark.images.length - 1;
    // else if (index >= skatepark.images.length) index = 0;
    setActiveIndex(index);
  }

  return (
   skatepark ?
      <div id='modal-img-container'>
        <div id="modal-img-background" />
        <img
          style={{visibility: activeIndex === 0 ? 'hidden' : 'visible'}}
          onClick={() => {updateIndex(activeIndex-1)}}
          className='modal-img-btn-left' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/488796E1-0435-45B7-9BE2-6788680809AF_4_5005_c.jpeg'/>
        <div className='modal-img-div'>
          <div className='modal-img-movement' style={{ transform: `translateX(-${activeIndex * 20}%)`}}>
            {skatepark.images.map((image, index) => {
              return <img className='modal-img' key={index} src={image.url}/>
            })}
          </div>
        </div>
        <img
          style={{visibility: activeIndex === skatepark.images.length - 1 ? 'hidden' : 'visible'}}
          onClick={() => {updateIndex(activeIndex+1)}}
          className='modal-img-btn-right' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/23251A57-5A07-4B1A-9B49-C089989DF7B6_4_5005_c.jpeg'/>
        <img onClick={() => setImgShow(false)} className='modal-img-cancel' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/80ACADA3-C9B6-4C9A-8D4F-8FDB69473395_4_5005_c.jpeg'/>
      </div>
    : null
  );
}

export default ImageCarousel;
