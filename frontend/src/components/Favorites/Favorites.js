import { useEffect, useState } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../../store/favorite";
import { useDispatch, useSelector } from 'react-redux';

function Favorites({ skateparkId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const favorites = useSelector(state => state.favorites);

  let existingFavorite;
  if (favorites && sessionUser) {
    existingFavorite = Object.values(favorites).find(fav => fav.skateparkId === skateparkId && fav.userId === sessionUser.id);
    console.log(existingFavorite, 'existy')
  }

  const [favorited, setFavorited] = useState(false);

  const toggleFavorite = () => {
  }

  const favoritesHandler = async () => {
    try {
      setFavorited(!favorited);
      if (!existingFavorite && skateparkId) {
        console.log(favorited, 'fave');
        console.log(skateparkId)
        const data = {
          userId: sessionUser.id,
          skateparkId
        }
        console.log(data, 'dattaaaa')

        const newFavorite = await dispatch(addFavorite(data));

        if (newFavorite) {
          window.alert('worky')
        }
      }
      else {
        const removedFavorite = await dispatch(removeFavorite(existingFavorite.id));
        if (removedFavorite) window.alert('delete workyyy')
      }
    }
    catch (error) {
      console.log(error, 'error')
      const err = await error.json();
      console.log(err, 'err')
      throw err;
    }
  }

  useEffect(() => {
    dispatch(getFavorites())
  }, [dispatch])

  return (
    <div>
      <div onClick={() => {
        toggleFavorite();
        favoritesHandler();
      }}>
        {existingFavorite ? <img src="https://img.icons8.com/material/48/000000/hearts--v1.png"/> : <img src="https://img.icons8.com/material-outlined/48/000000/hearts.png"/>}
      </div>
    </div>
  );
}

export default Favorites
