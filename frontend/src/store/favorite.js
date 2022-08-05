import { csrfFetch } from './csrf';

const LOAD = 'favorites/LOAD';
const ADD = 'favorites/ADD';
const REMOVE = 'favorites/REMOVE';

const load = favorites => ({
  type: LOAD,
  favorites
})

const add = favorite => ({
  type: ADD,
  favorite
})

const remove = favoriteId => ({
  type: REMOVE,
  favoriteId
})

export const getFavorites = () => async dispatch => {
  try {
    const response = await fetch(`/api/favorites`);
    const favorites = await response.json();
    dispatch(load(favorites));
  }
  catch (error) {
    throw error
  }
}

export const addFavorite = data => async dispatch => {
  try {
    const response = await csrfFetch(`/api/favorites`, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    const favorite = await response.json();
    dispatch(add(favorite));
    return favorite;
  }
  catch (error) {
    throw error
  }
}

export const removeFavorite = id => async dispatch => {
  try {
    const response = await csrfFetch(`/api/favorites/${id}`, {
      method: 'DELETE',
    });

    const favoriteId = await response.json();
    dispatch(remove(favoriteId));
    return favoriteId;
  }
  catch (error) {
    throw error
  }
}

const initialState = {};

const favoriteReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD:
      action.favorites.forEach(favorite => {
        newState[favorite.id] = favorite;
      });
      return newState;
    case ADD:
      newState[action.favorite.id] = action.favorite
      return newState;
    case REMOVE:
      delete newState[action.favoriteId]
      return newState
    default:
      return state;
  }
}

export default favoriteReducer;
