import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
const Header = () => {
  return (
    <div>
      <header className="header">
        <div>
          <Link className="link" to="/">
            AppName
          </Link>
        </div>
        <div>
          <Link className="link" to="/">
            AllStreams
          </Link>
        </div>
        <GoogleAuth />
      </header>
      <hr />
    </div>
  );
};

export default Header;
