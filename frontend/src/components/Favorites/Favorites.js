import { useEffect } from "react";

function Favorites() {

  // const [favorite, setFavorite] = useState(false);

  // const favoritesHandler = async () => {
  //   setFavorite()
  // }

  // useEffect(() => {
  //   dispatch(getFavorites())
  // }, [dispatch])

  return (
    <div>
      {/* <button onClick={favoritesHandler}> */}
        <img src="https://img.icons8.com/material/48/000000/hearts--v1.png"/>
        <img src="https://img.icons8.com/material-outlined/48/000000/hearts.png"/>
      {/* </button> */}
    </div>
  );
}

export default Favorites
