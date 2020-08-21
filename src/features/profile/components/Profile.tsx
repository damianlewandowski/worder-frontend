import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { getPath } from 'router-paths';
import { RootState } from 'MyTypes';
import { getProfileAsync } from '../actions';


const mapStateToProps = (state: RootState) => {
  return {
    profile: state.profile.profile,
    token: state.auth.tokens.jwt_token,
    isLogged: state.auth.tokens.jwt_token.length > 0,
  };
};

const mapDispatchToProps = {
  getProfile: getProfileAsync.request,
  redirectToLogin: () => push(getPath('login'))
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Profile: React.FC<Props> = ({ profile, getProfile, isLogged, redirectToLogin, token }) => {
  useEffect(() => {
    if (isLogged) {
      getProfile();
    } else {
      redirectToLogin()
    }
  }, [isLogged, getProfile, redirectToLogin])

  return (
    <div>
      Welcome, <strong>{profile.profile.email}</strong>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
