import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Skatepark from './Skatepark';
import { getSkateparks } from '../../store/skatepark';
import { getTags } from '../../store/parktag';
import { getParktags } from '../../store/parktag';
import Map from '../Map/Map';
import './explore-page.css';

function AllSkateparks({ tagId }) {
  const dispatch = useDispatch();
  const parktags = useSelector(state => state.parktags);
  const skateparks = useSelector(state => state.skateparks);

  const [tags, setTags] = useState([]);
  const [selectedTagButton, setSelectedTagButton] = useState(['all']);
  const [activeMarker, setActiveMarker] = useState(null);

  let allParks;
  if (skateparks) {
    allParks = Object.values(skateparks);
  }

  const handleTagClick = (index) => {
    setSelectedTagButton([index]);
    setActiveMarker(null);
  }

  let filteredParks;
  if (parktags) {
    filteredParks = Object.values(parktags).filter(parktag => parktag.tagId === tagId);
  }

  useEffect(() => {
    dispatch(getSkateparks());
    dispatch(getParktags());
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
          <Link to={`/skateparks`}className={selectedTagButton.includes('all') ? 'tag-btn activebtn' : 'tag-btn'} onClick={() => handleTagClick('all')}>All</Link>
          {tags && tags.length > 0 && tags.map((tag, index) => {
            return <Link to={`/skateparks/${tag.type}`} key={index} className={selectedTagButton.includes(index) ? 'tag-btn activebtn' : 'tag-btn'} onClick={() => handleTagClick(index)}>{tag.type}</Link>
          })}
        </div>
      </div>
      <div className='map-list-container'>
        <div className='skatepark-card-holder'>
          <div className='skatepark-card-div'>
            {!tagId && allParks && allParks.length ? allParks.map(skatepark => {
                return (
                  <div key={skatepark.id}>
                    <Skatepark skatepark={skatepark}/>
                  </div>
                );
              })
            : null}
            {tagId && filteredParks && filteredParks.length ? filteredParks.map(parktag => {
              return (
                <div key={parktag.id}>
                  <Skatepark skatepark={parktag.Skatepark}/>
                </div>
              );
              })
            : null}
          </div>
        </div>
      {<div><Map setActiveMarker={setActiveMarker} activeMarker={activeMarker} allParks={allParks} filteredParks={filteredParks} tagId={tagId}/></div>}
      </div>
    </div>
  );
}

export default AllSkateparks;
