import { csrfFetch } from './csrf';

const LOAD = 'users/LOAD';

const load = users => ({
  type: LOAD,
  users
})

export const getUsers = () => async dispatch => {
  try {
    const response = await fetch(`/api/users`);
    console.log(response, 'in thunk')
    const users = await response.json();
    dispatch(load(users));
  }
  catch (error) {
    throw error;
  }
};

const initialState = {};

const userReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD:
      console.log(action.users, 'inside reducer')
      action.users.forEach(user => {
        newState[user.id] = user;
      });
      return newState;
    default:
      return state;
  }
}

export default userReducer;
