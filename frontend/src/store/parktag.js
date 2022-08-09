import { csrfFetch } from './csrf';

const LOAD = 'parktags/LOAD';
const REMOVE = 'parktags/REMOVE';

const load = parktags => ({
  type: LOAD,
  parktags
})

const remove = parktags => ({
  type: REMOVE,
  parktags
})

export const getParktags = () => async dispatch => {
  try {
    const response = await fetch(`/api/parktags`);
    const parktags = await response.json();
    dispatch(load(parktags));
  }
  catch (error) {
    throw error
  }
}

export const getTags = async () => {
  try {
    const response = await fetch(`/api/parktags/tags`);
    const tags = await response.json();
    return tags;
  }
  catch (error) {
    throw error
  }
}

export const removeParktags = parktags => async dispatch => {
  try {
    dispatch(remove(parktags));
    return parktags;
  }
  catch (error) {
    throw error;
  }
}

const initialState = {};

const parktagReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD:
      action.parktags.forEach(parktag => {
        newState[parktag.id] = parktag;
      });
      return newState;
    case REMOVE:
      action.parktags.forEach(id => {
        delete newState[id]
      })
      return newState
    default:
      return state;
  }
}

export default parktagReducer;
