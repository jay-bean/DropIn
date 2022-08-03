import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skatepark from './Skatepark';
import { getSkateparks } from '../../store/skatepark';
import { getTags } from '../../store/tag';

function AllSkateparks() {
  const dispatch = useDispatch();
  const skateparks = useSelector(state => state.skateparks);
  const tags = useSelector(state => state.tags);

  let tagsArr = Object.values(tags);
  let skateparksArr = Object.values(skateparks);

  useEffect(() => {
    dispatch(getSkateparks());
    dispatch(getTags());
  }, [dispatch]);

  return (
    <div id='skateparks-container'>
      <div id='tags-div'>
        {tagsArr && tagsArr.map(tag => {
          return (
              <div key={tag.id}>{tag.type}</div>
          );
        })}
      </div>
      {skateparksArr && skateparksArr.map(skatepark => {
        return <Skatepark key={skatepark.id} skatepark={skatepark}/>
      })}
    </div>
  );
}

export default AllSkateparks;
