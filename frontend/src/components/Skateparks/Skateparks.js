import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skatepark from './Skatepark';
import { getSkateparks } from '../../store/skatepark';

function AllSkateparks() {
  const dispatch = useDispatch();
  const skateparks = useSelector(state => state.skateparks);

  let skateparksArr = Object.values(skateparks)
  useEffect(() => {
    dispatch(getSkateparks());
  }, [dispatch]);

  return (
    skateparksArr && skateparksArr.map(skatepark => {
      return <Skatepark key={skatepark.id} skatepark={skatepark}/>
    })
  );
}

export default AllSkateparks;
