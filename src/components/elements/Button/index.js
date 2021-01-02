import React from 'react';
import './Button.scss';

const Button = ({ children, onClick, ...rest }) => (
  <button className="btn" type="button" onClick={onClick} {...rest}>
    {children}
  </button>
);

export default Button;
