import React from "react";
import "./style.scss";
const Number = ({ value, unit, onChange, defaultValue }) => {
  const def = value || { number: defaultValue };
  return (
    <div className="bPl-number-main-wrapper">
      <div className="bPl-number-field-wrapper">
        <input type="number" name="" id="" value={def?.["number"]} className="bPl-number-field" onChange={e => {
          if (unit) {
            onChange({ ...def, number: e.target.value,unit })
          } else { 
            onChange({ ...def, number: e.target.value })
          }
        }} />
        {unit && <div className="bPl-unit">{unit}</div>}
      </div>
    </div>
  );
};

export default Number;
