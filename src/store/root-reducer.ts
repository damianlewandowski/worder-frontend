import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import articles from 'features/articles/reducer';
import auth from 'features/auth/reducer';
import profile from 'features/profile/reducer';

const rootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    articles,
    auth,
    profile
  });

export default rootReducer;
