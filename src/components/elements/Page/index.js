import React from 'react';
import { Link } from 'react-router-dom';
import './Page.scss';

const Page = ({ children }) => (
  <div className="page">
    <Link to="/">
      <nav>TotallyTommy</nav>
    </Link>
    {children}
  </div>
);

export default Page;
