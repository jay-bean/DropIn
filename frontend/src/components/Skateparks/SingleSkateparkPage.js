import { useHistory, useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSkateparks, removeSkatepark } from '../../store/skatepark';
import AllReviews from '../Reviews/Reviews';
import { getReviews } from '../../store/review';
import Favorites from '../Favorites/Favorites';
import { getParktags } from '../../store/parktag';
import EditSkateparkForm from './EditSkateparkForm';
import './single-skatepark.css';
import SingleParkMap from '../Map/SingleParkMap';
import Weather from './Weather';

function SingleSkatepark() {
  const dispatch = useDispatch();
  const history = useHistory();
  const skateparkParam = useParams();
  const skatepark = useSelector(state => state.skateparks[skateparkParam.id]);
  const sessionUser = useSelector(state => state.session.user);
  const reviews = useSelector(state => state.reviews);
  const parktags = useSelector(state => state.parktags);
  const [showEditForm, setShowEditForm] = useState(false);
  const [didUpdate, setDidUpdate] = useState(false);
  const scrollToRef = useRef();

  let skateparkTags;
  if (parktags && skatepark) {
    skateparkTags = Object.values(parktags).filter(parktag => parktag.skateparkId === skatepark.id)
  }

  const deleteHandler = async () => {
    if (window.confirm('Are you sure you want to delete this skatepark?')) {
      const deletedSkatepark = await dispatch(removeSkatepark(skatepark));
      if (deletedSkatepark) history.push("/skateparks");
    }
  }

  const editFormHandler = async () => {
    setShowEditForm(true);
  }

  useEffect(() => {
    dispatch(getSkateparks());
    dispatch(getReviews());
    dispatch(getParktags());
  }, [dispatch]);

  return (

    !showEditForm ?
      <div className='single-park-page'>
        <div className='first-buffer-park'>
        {skatepark &&
          <div className='first-buffer-flex-park'>
            <Link className='skateparks-link' to='/skateparks'>Skateparks</Link><p className='carrot'>{'>'}</p><p>{skatepark.name}</p>
          </div>
        }
        </div>
        <div className='single-park-container'>
          <div className='single-park-details-container'>
            <div>
              {skatepark && skatepark.images.length > 0 && <div className='park-main-img-div'><img className='park-main-img' src={skatepark.images[0].url}/></div>}
            </div>
            <div className='green-buffer'>
              <div className='green-divs'
                onClick={() =>
                  window.scrollTo({
                    left: 0,
                    top: 950,
                    behavior: "smooth",
                  })
                }>
                <img className='green-img' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/6F53C9DC-B567-48C2-B832-39B82195CE2E_4_5005_c.jpeg'/>
                <p className='green-p'>Weather</p>
              </div>
              <div className='green-divs'
                onClick={() =>
                  window.scrollTo({
                    left: 0,
                    top: 1175,
                    behavior: "smooth",
                  })
                }>
                <img className='green-img' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/87C4C128-74CB-4A81-9F42-EEC138EAFE99_4_5005_c.jpeg'/>
                <p className='green-p'>Map</p>
              </div>
              <div className='green-divs'
                onClick={() =>
                  window.scrollTo({
                    left: 0,
                    top: 1660,
                    behavior: "smooth",
                  })
                }>
                <img className='green-img' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/656AE96B-EEC6-4594-835B-2F2270178164_4_5005_c.jpeg'/>
                <p className='green-p'>Reviews</p>
              </div>
            </div>
            {/* <div className='single-park-imgs-div'>
              {skatepark && skatepark.images.length > 0 && skatepark.images.map(image => <img className='single-park-imgs' key={image.id} src={image.url}/>)}
            </div> */}
            <div className='single-park-details-div'>
                {skatepark && (
                  <div className='single-park-flex'>
                    <div className='single-park-name-flex'>
                      <div className='single-park-name'>{skatepark.name}</div>
                      {skatepark && <Favorites skateparkId={skatepark.id}/>}
                    </div>
                    <div className='single-park-description'>{skatepark.description}</div>
                    <div className='single-park-address'>{skatepark.address}</div>
                    <div className='single-park-address'>{skatepark.city}, {skatepark.state} {skatepark.zipcode}</div>
                    <div className='single-park-tags-div'>
                      {skatepark && skateparkTags.length > 0 && skateparkTags.map(parktag => {
                        return (
                          <div className='single-park-tag' key={parktag.id}>{parktag.Tag.type}</div>
                          );
                        })}
                    </div>
                  </div>
                )}
                {skatepark && sessionUser && skatepark.userId === sessionUser.id && (
                  <div className='single-park-btns'>
                    <button className='single-park-edit-btn' onClick={editFormHandler}>Edit</button>
                    <button className='single-park-delete-btn' onClick={deleteHandler}>Delete</button>
                  </div>
                )}
                    {skatepark && <Weather skatepark={skatepark}/>}
                <div className='single-park-map-div'>
                  <div className='single-park-map-div2'>
                    {skatepark && <SingleParkMap skatepark={skatepark}/>}
                  </div>
                </div>
              <p ref={scrollToRef}></p>
              {reviews && <AllReviews reviews={reviews} skatepark={skatepark}/>}
            </div>
          </div>
        </div>
      </div>

:
      <EditSkateparkForm setDidUpdate={setDidUpdate} setShowEditForm={setShowEditForm}/>
  );
}

export default SingleSkatepark;
