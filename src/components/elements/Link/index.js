import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import './Link.scss';

const Link = ({ to, children, bold, className, ...rest }) => {
  return (
    <ReactRouterLink
      to={to}
      className={`Link ${className || ''} ${bold ? '--bold' : ''}`}
    >
      <span>{children}</span>
    </ReactRouterLink>
  );
};

export default Link;
