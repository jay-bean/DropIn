import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skatepark from './Skatepark';
import { getSkateparks } from '../../store/skatepark';
import './explore-page.css';

function AllSkateparks() {
  const dispatch = useDispatch();
  const skateparks = useSelector(state => state.skateparks);

  let skateparksArr = Object.values(skateparks);

  useEffect(() => {
    dispatch(getSkateparks());
  }, [dispatch]);

  return (
    <div id='skateparks-container'>
      <div id='tags-div'>
        <p id='tags-p'>Search goes here</p>
        <div className='tag-btn-div'>
          <div className='tag-btn'>Half pipe</div>
          <div className='tag-btn'>Bowl</div>
          <div className='tag-btn'>Pool</div>
          <div className='tag-btn'>Snake run</div>
          <div className='tag-btn'>Street</div>
          <div className='tag-btn'>Rails</div>
          <div className='tag-btn'>Ledges</div>
          <div className='tag-btn'>Pump track</div>
        </div>
      </div>
      <div className='map-list-container'>
        <div className='skatepark-card-div'>
          {skateparksArr && skateparksArr.map(skatepark => {
            return <Skatepark key={skatepark.id} skatepark={skatepark}/>
          })}
        </div>
      </div>
    </div>
  );
}

export default AllSkateparks;
