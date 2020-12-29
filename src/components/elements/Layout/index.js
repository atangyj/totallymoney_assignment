import React from 'react';

import './Layout.scss';

const Layout = ({ children, className, ...rest }) => (
  <div className={`layout ${className}`}>{children}</div>
);
export default Layout;
