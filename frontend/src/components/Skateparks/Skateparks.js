import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skatepark from './Skatepark';
import { getSkateparks } from '../../store/skatepark';
import { getTags } from '../../store/parktag';
import './explore-page.css';

function AllSkateparks() {
  const dispatch = useDispatch();
  const skateparks = useSelector(state => state.skateparks);
  let skateparksArr = Object.values(skateparks);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getSkateparks());
    (async () => {
      const allTags = await getTags();
      setTags(allTags)
    })();
  }, [dispatch]);

  return (
    <div id='skateparks-container'>
      <div id='tags-div'>
        <p id='tags-p'>Search goes here</p>
        <div className='tag-btn-div'>
          {tags && tags.length > 0 && tags.map(tag => {
            return <div className='tag-btn'>{tag.type}</div>
          })}
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
