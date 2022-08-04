import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import skateparkReducer from './skatepark';
import reviewReducer from './review';
import favoriteReducer from './favorite';
import tagReducer from './tag';

const rootReducer = combineReducers({
  session: sessionReducer,
  skateparks: skateparkReducer,
  reviews: reviewReducer,
  tags: tagReducer,
  favorites: favoriteReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
