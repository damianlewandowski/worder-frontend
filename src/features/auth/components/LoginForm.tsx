import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import areEqual from 'fast-deep-equal';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import {
  Button,
  createStyles,
  LinearProgress,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { FormikActions, FormikValues } from 'formik/dist/types';
import * as yup from 'yup';
import { push } from 'connected-react-router';
import { getPath } from 'router-paths';
import { loginAsync } from '../actions';
import {RootState} from 'MyTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      marginTop: '150px',
    },
  })
);

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .max(64)
    .required(),
});

const mapStateToProps = (state: RootState) => ({
  isLogged: !!state.auth.tokens.jwt_token,
});

const mapDispatchToProps = {
  login: loginAsync.request,
  redirectToHome: () => push(getPath('home'))
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const LoginForm = React.memo<Props>(({ login, redirectToHome, isLogged }) => {

  useEffect(() => {
    if (isLogged) {
      redirectToHome()
    }
  }, [isLogged]);


  const classes = useStyles();

  const onSubmit = async (
    { email, password }: FormikValues,
    { setSubmitting }: FormikActions<FormikValues>
  ) => {
    await login({ email, password });
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={classes.root}>
            <h2>Login</h2>

            <Field
              component={TextField}
              name="email"
              type="email"
              label="Email"
            />
            <br />

            <Field
              component={TextField}
              type="password"
              label="Password"
              name="password"
            />
            <br />
          </div>

          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}, areEqual);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
