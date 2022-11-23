import { React } from 'react'
import { Link } from 'react-router-dom';

function SearchBarList({ inputSearch, skateparks }) {

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

  return (
      <ul className='search-ul'>
          {filteredSearch && filteredSearch.length ? filteredSearch.map((skatepark) => (
              <li className='search-li' key={skatepark.id}><Link className='search-link' to={`/skateparks/${skatepark.id}`}>{skatepark.name}</Link></li>
          )) : null}
      </ul>
  )
}

export default SearchBarList;
