import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Skatepark from '../SingleSkatePark/Skatepark';
import { getSkateparks } from '../../../store/skatepark';
import { getTags } from '../../../store/parktag';
import { getParktags } from '../../../store/parktag';
import Map from '../../Map/MapPages/Map';
import './explore-page.css';
import SearchBar from '../../SearchBar/SearchBar';

function AllSkateparks({ tagId }) {
  const dispatch = useDispatch();
  const parktags = useSelector(state => state.parktags);
  const skateparks = useSelector(state => state.skateparks);

  const [tags, setTags] = useState([]);
  const [selectedTagButton, setSelectedTagButton] = useState(['all']);
  const [activeMarker, setActiveMarker] = useState(null);
  const [sortBtn, setSortBtn] = useState(false)

  let allParks;
  if (skateparks) {
    allParks = Object.values(skateparks);
  }

  const handleTagClick = (id) => {
    setSelectedTagButton([]);
    setSelectedTagButton([id]);
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

  useEffect(() => {
    tagId ? setSelectedTagButton([tagId]) : setSelectedTagButton(['all']);
  }, [tagId])

  return (
    <div id='skateparks-container'>
      <div id='tags-div'>
        <div className='search-container'><SearchBar skateparks={skateparks}/></div>
        <div className='sort-container'>
          <div className='sort-div'>
            <button onClick={() => sortBtn ? setSortBtn(false) : setSortBtn(true)} className='sort-btn'>Sort <img className={ sortBtn ? 'sort-arrow sort-arrow-active' : 'sort-arrow'} src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/C9D833C8-7EC7-4D53-9CF0-DDEB416E4A81_4_5005_c.jpeg'/></button>
            <div style={{visibility: sortBtn ? 'visible' : 'hidden'}} className='tag-btn-div'>
              <Link to={`/skateparks`} className={selectedTagButton.includes('all') ? 'tag-btn activebtn' : 'tag-btn'} onClick={() => {handleTagClick('all'); setSortBtn(false)}}>All</Link>
              {tags && tags.length > 0 && tags.map((tag, index) => {
                return <Link to={`/skateparks/${tag.type}`} key={index} className={selectedTagButton.includes(tag.id) ? 'tag-btn activebtn' : 'tag-btn'} onClick={() => {handleTagClick(tag.id); setSortBtn(false)}}>{tag.type}</Link>
              })}
            </div>
          </div>
        </div>
        {/* <div className='tag-btn-div-2'>
            <Link to={`/skateparks`} className={selectedTagButton.includes('all') ? 'tag-btn activebtn' : 'tag-btn'} onClick={() => {handleTagClick('all')}}>All</Link>
              {tags && tags.length > 0 && tags.map((tag, index) => {
                return <Link to={`/skateparks/${tag.type}`} key={index} className='tag-btn' onClick={() => {handleTagClick(tag.id)}}>{tag.type}</Link>
              })}
        </div> */}
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
      {<div className='map-container'><Map setActiveMarker={setActiveMarker} activeMarker={activeMarker} allParks={allParks} filteredParks={filteredParks} tagId={tagId}/></div>}
      </div>
    </div>
  );
}

export default AllSkateparks;
