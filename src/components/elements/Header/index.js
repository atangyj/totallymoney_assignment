import React from 'react';
import './Header.scss';

const Header = ({ children }) => {
  return (
    <p className="header" data-testid="page-header">
      {children}
    </p>
  );
};

export default Header;
