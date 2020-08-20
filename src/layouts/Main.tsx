import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import './Main.css';
import logo from '../assets/logo.svg';

type Props = {
  renderActionsMenu?: () => JSX.Element;
};

const Main: FC<Props> = ({ children, renderActionsMenu }) => (
  <div className="App">
    <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link className="App-link" to="/">
            Demo App
          </Link>
        {renderActionsMenu && renderActionsMenu()}
    </header>
    <main className="App-main">{children}</main>
  </div>
);

export default Main;
