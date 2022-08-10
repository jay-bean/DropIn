import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSkateparks } from '../../store/skatepark';
import { Link } from 'react-router-dom';

function SearchBarList({ inputSearch }) {
  const dispatch = useDispatch();
  const skateparks = useSelector(state => state.skateparks);

  let skateparksArr;
  if (skateparks) {
    skateparksArr = Object.values(skateparks);
  }

  let filteredSearch;
  if (skateparksArr) {
    filteredSearch = skateparksArr.filter(skatepark => {
      if (inputSearch === '') return;
      else return skatepark.name.toLowerCase().includes(inputSearch);
    })
  }

  useEffect(() => {
    dispatch(getSkateparks());
  }, [dispatch])

  return (
      <ul className='search-ul'>
          {filteredSearch && filteredSearch.length ? filteredSearch.map((skatepark) => (
              <li className='search-li'><Link className='search-link' key={skatepark.id} to={`/skateparks/${skatepark.id}`}>{skatepark.name}</Link></li>
          )) : null}
      </ul>
  )
}

export default SearchBarList;
