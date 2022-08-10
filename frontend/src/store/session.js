import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const editUser = (formData, id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/users/${id}`, {
      method: 'PUT',
      body: formData
    }, false);
    const user = await response.json();
    dispatch(setUser(user.result));
    return user;
  }
  catch (error) {
    throw error
  }
}
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = data => async (dispatch) => {
  console.log(data, 'inside thunk')
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: data,
  }, false);
  const newUser = await response.json();
  console.log(newUser, 'new user inside thunk')
  dispatch(setUser(newUser.user));

  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
