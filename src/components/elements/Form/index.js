import React from 'react';

import './Form.scss';

const Form = ({ className, children, onSubmit, ...rest }) => (
  <form className={`${className} form`} onSubmit={onSubmit} {...rest}>
    {children}
  </form>
);

export default Form;
