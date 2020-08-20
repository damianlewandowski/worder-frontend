import React from 'react';
import { createStyles, Link, makeStyles, Theme } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: 'inherit'
    }
  })
);

type Props = {
  to: string;
}

const NavLink: React.FC<Props> = ({ to, children }) => {
  const classes = useStyles();

  console.log(children);
  return (
    <Link className={classes.link} component={RouterLink} to={to}>
      {children}
    </Link>
  );
};

export default NavLink;
