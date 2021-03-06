import { RootAction, RootState, Services } from 'MyTypes';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { composeEnhancers } from './utils';
import rootReducer from './root-reducer';
import rootEpic from './root-epic';
import services from '../services';
import * as localStorage from 'services/local-storage-service';

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: services,
});

// configure middlewares
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});
const middlewares = [routerMiddleware(history), epicMiddleware];
// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const localStorageState = localStorage.get('reduxState');

// rehydrate state on app start
const initialState = {
  ...localStorageState
};

// create store
const store = createStore(rootReducer(history), initialState, enhancer);

epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;
