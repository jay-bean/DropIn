import { csrfFetch } from './csrf';
import { getParktags, removeParktags } from './parktag';

const LOAD = 'skateparks/LOAD';
const ADD = 'skateparks/ADD';
const UPDATE = 'skateparks/UPDATE';
const REMOVE = 'skateparks/REMOVE';

const load = skateparks => ({
  type: LOAD,
  skateparks
})

const add = skatepark => ({
  type: ADD,
  skatepark
});

const update = skatepark => ({
  type: UPDATE,
  skatepark
});

const remove = skatepark => ({
  type: REMOVE,
  skatepark
})

export const getSkateparks = () => async dispatch => {
  try {
    const response = await fetch(`/api/skateparks`);
    const skateparks = await response.json();
    dispatch(load(skateparks));
  }
  catch (error) {
    throw error;
  }
};

export const addSkatepark = data => async dispatch => {
  try {
    const response = await csrfFetch(`/api/skateparks`, {
      method: 'POST',
      body: data
    }, false);

    const skatepark = await response.json();
    dispatch(add(skatepark));
    return skatepark;
  }
  catch (error) {
    throw error;
  }
};

export const editSkatepark = (data, id) => async dispatch => {
  try {
    const response = await csrfFetch(`/api/skateparks/${id}`, {
      method: 'PUT',
      body: data
    }, false);

    const skatepark = await response.json();
    dispatch(update(skatepark));
    dispatch(removeParktags(skatepark.destroyedTags));
    dispatch(getParktags());
    return skatepark;
  }
  catch (error) {
    throw error
  }
};

export const removeSkatepark = data => async dispatch => {
  try {
    const response = await csrfFetch(`/api/skateparks/${data.id}`, {
      method: 'DELETE',
    });

    const skatepark = await response.json();
    dispatch(remove(skatepark));
    return skatepark;
  }
  catch (error) {
    throw error
  }
}

const initialState = {};

const skateparkReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD:
      action.skateparks.forEach(skatepark => {
        newState[skatepark.id] = skatepark;
      });
      return newState;
    case ADD:
      newState[action.skatepark.id] = action.skatepark
      return newState;
    case UPDATE:
      newState[action.skatepark.id] = action.skatepark
      return newState;
    case REMOVE:
      delete newState[action.skatepark.id]
      return newState
    default:
      return state;
  }
}

export default skateparkReducer;
