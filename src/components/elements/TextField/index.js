import React from 'react';

const TextField = ({ name, label, value, type, onChange }) => (
  <div className="text-field">
    <label htmlFor={name}>{label}</label>
    <input name={name} type={type} value={value} onChange={onChange} />
  </div>
);

export default TextField;
