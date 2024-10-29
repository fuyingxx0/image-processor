import React, { useState } from 'react';
import './Select.css';

const Select = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="select-container">
      <div 
        className={`select-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{options.find(opt => opt.value === value)?.label}</span>
        <span className={`select-arrow ${isOpen ? 'open' : ''}`}>
          &#x276F;
        </span>
      </div>
      
      <div className={`select-options ${isOpen ? 'open' : ''}`}>
        {options.map((option) => (
          <div
            key={option.value}
            className={`select-option ${value === option.value ? 'selected' : ''}`}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select; 