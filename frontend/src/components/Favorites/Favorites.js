import { useEffect, useState } from "react";
import { getFavorites, addFavorite } from "../../store/favorite";
import { useDispatch, useSelector } from 'react-redux';

function Favorites({ skatepark }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [favorited, setFavorited] = useState(false);

  const favoritesHandler = async () => {
    setFavorited(favorited ? false : true)
    try {
      if (favorited && skatepark) {
        const data = {
          userId: sessionUser.id,
          skateparkId: skatepark.id
        }

        const newFavorite = await dispatch(addFavorite(data));

        if (newFavorite) {
          window.alert('worky')
        }
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
      <div onClick={favoritesHandler}>
        {favorited ? <img src="https://img.icons8.com/material/48/000000/hearts--v1.png"/> : <img src="https://img.icons8.com/material-outlined/48/000000/hearts.png"/>}
      </div>
    </div>
  );
}

export default Favorites
