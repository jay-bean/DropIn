import { useHistory, useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSkateparks, removeSkatepark } from '../../store/skatepark';
import AllReviews from '../Reviews/Reviews';

function SingleSkatepark() {
  const dispatch = useDispatch();
  const history = useHistory();
  const skateparkParam = useParams();
  const skatepark = useSelector(state => state.skateparks[skateparkParam.id]);
  const sessionUser = useSelector(state => state.session.user);

  const deleteHandler = async () => {
    const deletedSkatepark = await dispatch(removeSkatepark(skatepark));
    if (deletedSkatepark) history.push("/skateparks");
  }

  useEffect(() => {
    dispatch(getSkateparks());
  }, [dispatch]);

  return (
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
      {skatepark && sessionUser && skatepark.userId === sessionUser.id && (
        <div>
          <Link to={`/skateparks/${skatepark.id}/edit`}><button>Edit</button></Link>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      )}
      <AllReviews/>
    </div>
  );
}

export default SingleSkatepark;
