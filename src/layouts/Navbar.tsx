import React from 'react';
import {
  createStyles,
  makeStyles,
  AppBar,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import NavLink from 'components/NavLink';
import { connect } from 'react-redux';
import { RootState } from 'MyTypes';
import {logout} from "../features/auth/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const mapStateToProps = (state: RootState) => {
  return {
    isLogged: !!state.auth.tokens.jwt_token,
  };
};

const mapDispatchToProps = {
  logout: logout
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const renderAuthLinks = (isLoggedIn: boolean, onLogout: typeof logout) =>
  isLoggedIn ? (
    <Button color="inherit" onClick={onLogout}>
      Logout
    </Button>
  ) : (
    <>
      <Button color="inherit">
        <NavLink to={'login'}>Login</NavLink>
      </Button>
      <Button color="inherit">
        <NavLink to={'register'}>Register</NavLink>
      </Button>
    </>
  );

const Navbar: React.FC<Props> = ({ isLogged, logout }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Worder
          </Typography>

          {renderAuthLinks(isLogged, logout)}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
