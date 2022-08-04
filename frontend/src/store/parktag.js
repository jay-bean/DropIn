import { csrfFetch } from './csrf';

const LOAD = 'parktags/LOAD';

const load = parktags => ({
  type: LOAD,
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

const initialState = {};

const parktagReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD:
      action.parktags.forEach(parktag => {
        newState[parktag.id] = parktag;
      });
      return newState;
    default:
      return state;
  }
}

export default parktagReducer;
