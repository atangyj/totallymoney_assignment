import React from 'react';

const TextField = ({ name, label, value, type, onChange, ...rest }) => (
  <div className="text-field">
    <label htmlFor={name}>{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      {...rest}
    />
  </div>
);

export default TextField;
