import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skatepark from './Skatepark';
import { getSkateparks } from '../../store/skatepark';
import { getTags } from '../../store/parktag';
import { getParktags } from '../../store/parktag';
import './explore-page.css';

function AllSkateparks() {
  const dispatch = useDispatch();
  const parktags = useSelector(state => state.parktags);
  const skateparks = useSelector(state => state.skateparks);

  const [tags, setTags] = useState([]);
  const [selectedTagButton, setSelectedTagButton] = useState(['all']);
  const [currentViewableParks, setCurrentViewableParks] = useState([])

  let allParks;
  if (skateparks) {
    allParks = Object.values(skateparks);
  }

  const handleTagClick = (index) => {
    setSelectedTagButton([index]);
    if (parktags) {
      const parkTagsArr = Object.values(parktags);
      if (index === 'all') setCurrentViewableParks(allParks);
      const filteredParks = parkTagsArr.filter(parktag => parktag.tagId === index + 1);
      setCurrentViewableParks(filteredParks);
    }
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
          <button className={selectedTagButton.includes('all') ? 'tag-btn activebtn' : 'tag-btn'} onClick={() => handleTagClick('all')}>All</button>
          {tags && tags.length > 0 && tags.map((tag, index) => {
            return <button key={index} className={selectedTagButton.includes(index) ? 'tag-btn activebtn' : 'tag-btn'} onClick={() => handleTagClick(index)}>{tag.type}</button>
          })}
        </div>
      </div>
      <div className='map-list-container'>
        <div className='skatepark-card-holder'>
          <div className='skatepark-card-div'>
            {(currentViewableParks.length === 0) ?
              allParks && allParks.length && allParks.map(skatepark => {
                return (
                  <div key={skatepark.id}>{skatepark.name}
                    <Skatepark skatepark={skatepark}/>
                  </div>
                );
              }) :
              currentViewableParks && currentViewableParks.length && currentViewableParks.map(parktag => {
                return (
                  <div key={parktag.id}>{parktag.Skatepark.name}
                    <Skatepark skatepark={parktag.Skatepark}/>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllSkateparks;
