import React from "react";
import "./style.scss";
const BButtonSet = ({ value, multiple = false, defaultValue, onChange, options = [] }) => {
  const def = value || defaultValue || [];
  return (
    <div className="bPl-buttonSet-wrapper">
      {options.map((option, index) => (
        <button
          key={index}
          className={`bPl-buttonSet ${multiple
            ? def?.includes(option.value)
              ? "active"
              : ""
            : option.value === def
              ? "active"
              : ""
            }`}
          onClick={() => {
            if (multiple) {
              if (def?.includes(option.value)) {
                onChange(def?.filter((item) => item !== option.value));
              } else {
                const newVal = [...def];
                newVal.push(option.value);
                onChange(newVal);
              }
            } else {
              onChange(option.value);
            }
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default BButtonSet;
