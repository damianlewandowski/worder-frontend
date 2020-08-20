import React from 'react';
import { Field, Form, Formik } from 'formik';
import {
  Button,
  createStyles,
  LinearProgress,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import * as yup from 'yup';

import * as auth from 'services/auth-api-client';
import { push } from "connected-react-router";
import { getPath } from '../../../router-paths';
import { connect } from 'react-redux';

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

const mapDispatchToProps = {
  redirectToHome: () => push(getPath('home'))
};

type Props = typeof mapDispatchToProps;

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
  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Password does not match'),
});

const RegisterForm: React.FC<Props> = ({ redirectToHome }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async ({ email, password }, { setSubmitting, resetForm }) => {
        await auth.register({ email, password });
        setSubmitting(false);
        resetForm();
        redirectToHome();
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <div className={classes.root}>
            <h2>Register</h2>

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

            <Field
              component={TextField}
              type="password"
              label="Password Confirmation"
              name="confirmPassword"
            />
          </div>

          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default connect(null, mapDispatchToProps)(RegisterForm);
