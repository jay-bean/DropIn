import { useHistory, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSkateparks, removeSkatepark } from '../../store/skatepark';
import AllReviews from '../Reviews/Reviews';
import { getReviews } from '../../store/review';
import Favorites from '../Favorites/Favorites';
import { getParktags } from '../../store/parktag';
import EditSkateparkForm from './EditSkateparkForm';

function SingleSkatepark() {
  const dispatch = useDispatch();
  const history = useHistory();
  const skateparkParam = useParams();
  const skatepark = useSelector(state => state.skateparks[skateparkParam.id]);
  const sessionUser = useSelector(state => state.session.user);
  const reviews = useSelector(state => state.reviews);
  const parktags = useSelector(state => state.parktags);
  const [showEditForm, setShowEditForm] = useState(false);

  let skateparkTags;
  if (parktags && skatepark) {
    skateparkTags = Object.values(parktags).filter(parktag => parktag.skateparkId === skatepark.id)
  }

  const deleteHandler = async () => {
    const deletedSkatepark = await dispatch(removeSkatepark(skatepark));
    if (deletedSkatepark) history.push("/skateparks");
  }

  const editFormHandler = async () => {
    setShowEditForm(true);
  }

  useEffect(() => {
    dispatch(getSkateparks());
    dispatch(getReviews());
    dispatch(getParktags());
  }, [dispatch, showEditForm]);

  return (
    !showEditForm ?
      <div>
        {skatepark && skatepark.images.length > 0 && skatepark.images.map(image => <img key={image.id} src={image.url} style={{width: '300px'}}/>)}
        {skatepark && (
          <div>
            <div>{skatepark.name}</div>
            <div>{skatepark.description}</div>
            <div>{skatepark.address}</div>
            <div>{skatepark.city}, {skatepark.state} {skatepark.zipcode}</div>
          </div>
        )}
        {skatepark && skateparkTags.length > 0 && skateparkTags.map(parktag => {
          return (
            <div key={parktag.id}>{parktag.Tag.type}</div>
          );
        })}
        {skatepark && <Favorites skateparkId={skatepark.id}/>}
        {skatepark && sessionUser && skatepark.userId === sessionUser.id && (
          <div>
            <button onClick={editFormHandler}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        )}
        {reviews && <AllReviews reviews={reviews} skatepark={skatepark}/>}
      </div> :
      <EditSkateparkForm setShowEditForm={setShowEditForm}/>
  );
}

export default SingleSkatepark;
