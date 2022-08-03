import { csrfFetch } from './csrf';

const LOAD = 'tags/LOAD';

const load = tags => ({
  type: LOAD,
  tags
})

export const getTags = () => async dispatch => {
  try {
    const response = await fetch(`/api/tags`);
    const tags = await response.json();
    dispatch(load(tags));
  }
  catch (error) {
    throw error
  }
}

const initialState = {};

const tagReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD:
      action.tags.forEach(tag => {
        newState[tag.id] = tag;
      });
      return newState;
    default:
      return state;
  }
}

export default tagReducer;
