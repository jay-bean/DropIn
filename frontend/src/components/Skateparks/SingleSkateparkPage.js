import { useHistory, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
        <div className='single-park-container'>
          {reviews && <AllReviews reviews={reviews} skatepark={skatepark}/>}
          <div className='single-park-details-container'>
            <div className='single-park-imgs-div'>
              {skatepark && skatepark.images.length > 0 && skatepark.images.map(image => <img className='single-park-imgs' key={image.id} src={image.url}/>)}
            </div>
            <div className='single-park-details-div'>
              <div className='single-park-details-left-column'>
                {skatepark && (
                  <div >
                    <div className='single-park-name-flex'>
                      <div className='single-park-name'>{skatepark.name}</div>
                      {skatepark && <Favorites skateparkId={skatepark.id}/>}
                    </div>
                    <div className='single-park-tags-div'>
                      {skatepark && skateparkTags.length > 0 && skateparkTags.map(parktag => {
                        return (
                          <div className='single-park-tag' key={parktag.id}>{parktag.Tag.type}</div>
                        );
                      })}
                    </div>
                    <div className='single-park-description'>{skatepark.description}</div>
                    <div className='single-park-address'>{skatepark.address}</div>
                    <div className='single-park-address'>{skatepark.city}, {skatepark.state} {skatepark.zipcode}</div>
                  </div>
                )}
                {skatepark && sessionUser && skatepark.userId === sessionUser.id && (
                  <div className='single-park-btns'>
                    <button className='single-park-edit-btn' onClick={editFormHandler}>Edit</button>
                    <button className='single-park-delete-btn' onClick={deleteHandler}>Delete</button>
                  </div>
                )}
              </div>
                <div className='single-park-map-div'>
                  <div className='single-park-map-div2'>
                    {skatepark && <Weather skatepark={skatepark}/>}
                    {skatepark && <SingleParkMap skatepark={skatepark}/>}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      :
      <EditSkateparkForm setDidUpdate={setDidUpdate} setShowEditForm={setShowEditForm}/>
  );
}

export default SingleSkatepark;
