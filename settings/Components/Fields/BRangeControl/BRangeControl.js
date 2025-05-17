import { RangeControl } from '@wordpress/components';
import React from 'react';
import "./style.scss";
const BRangeControl = ({ value, onChange, min, max, step, unit, defaultValue, minLength, maxLength }) => {
  const def = value || defaultValue;
  return (
    <div className='bPl-rangeControl-wrapper'>
      <div className="bPl-rangeControl">
        <RangeControl value={def} onChange={val => onChange(val)} min={min} max={max} step={step} minLength={minLength} maxLength={maxLength}  />
      </div>
      {unit && <div className="bPl-rangeControl-unit">{unit}</div>}
    </div>
  );
};

export default BRangeControl;