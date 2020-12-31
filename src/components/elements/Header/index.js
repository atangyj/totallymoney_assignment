import React from 'react';
import './Header.scss';

const Header = ({ children }) => {
  return <p className="header">{children}</p>;
};

export default Header;
