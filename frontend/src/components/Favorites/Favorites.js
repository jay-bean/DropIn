import { useEffect, useState } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../../store/favorite";
import { useDispatch, useSelector } from 'react-redux';
import './favorite.css';

function Favorites({ skateparkId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const favorites = useSelector(state => state.favorites);

  let existingFavorite;
  if (favorites && sessionUser) {
    existingFavorite = Object.values(favorites).find(fav => fav.skateparkId === skateparkId && fav.userId === sessionUser.id);
  }

  const [favorited, setFavorited] = useState(false);

  const favoritesHandler = async () => {
    try {
      setFavorited(!favorited);
      if (!existingFavorite && skateparkId) {
        const data = {
          userId: sessionUser.id,
          skateparkId
        }
        await dispatch(addFavorite(data));
      }
      else {
        await dispatch(removeFavorite(existingFavorite.id));
      }
    }
    catch (error) {
      const err = await error.json();
      throw err;
    }
  }

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch])

  return (
    <div>
      <div onClick={() => {
        favoritesHandler();
      }}>
        {existingFavorite ? <img className="heart" src="https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/heart.png"/> : <img className="heart" src="https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/heart+(1).png"/>}
      </div>
    </div>
  );
}

export default Favorites
