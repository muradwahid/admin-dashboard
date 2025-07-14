import React from "react";
import "./style.scss";
const Number = ({ value, unit, onChange, defaultValue }) => {
  const def = value || defaultValue
  return (
    <div className="bPl-number-main-wrapper">
      <div className="bPl-number-field-wrapper">
        <input type="number" name="" id="" value={def} className="bPl-number-field" onChange={e => {
          onChange(e.target.value)
        }} />
        {unit && <div className="bPl-unit">{unit}</div>}
      </div>
    </div>
  );
};

export default Number;
