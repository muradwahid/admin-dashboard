import React from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import "./style.scss";
const BColorGroup = ({ value, onChange, options, defaultValue }) => {
  const def = value || defaultValue
  return (
    <div className="color-group-container">
      {Object.keys(options)?.map((option, index) => {
        return (
          <div key={index} className="colorGroupWrapper-main">
            <div className="colorGroupLabel">{options?.[option]}</div>
            <ColorPicker value={def?.[option]} onChange={val => onChange({ ...def, [option]: val })} defaultValue={defaultValue ? defaultValue?.[option] : ""} />
          </div>
        );
      })}
    </div>
  );
};

export default BColorGroup;