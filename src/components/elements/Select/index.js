import React from 'react';

const Select = ({
  className,
  options,
  name,
  label,
  value,
  onChange,
  ...rest
}) => {
  return (
    <div className={`select ${className || ''}`}>
      <label className="select__label" htmlFor={name}>
        {label}
      </label>
      <select
        className="select__select"
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      >
        <option className="select__option" value="">
          Please select
        </option>
        {options.map((option, i) => (
          <option className="select__option" value={option.value} key={i}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
