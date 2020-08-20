import { routerActions } from 'connected-react-router';
import * as articlesActions from 'features/articles/actions';
import * as authActions from 'features/auth/actions';
import * as profileActions from 'features/profile/actions';

export default {
  router: routerActions,
  articles: articlesActions,
  auth: authActions,
  profile: profileActions
};
