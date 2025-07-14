import React from "react";
import "./style.scss";
const BButtonSet = ({ value, multiple = false, defaultValue, onChange, options = {} }) => {
  const def = value || defaultValue || [];
  // const isString = typeof options === "object" ? true : false;

  return (
    <div className="bPl-buttonSet-wrapper">
      {Object.keys(options).map((option, index) => (
        <button
          key={index}
          className={`bPl-buttonSet ${multiple
            ? def?.includes(option)
              ? "active"
              : ""
            : option === def
              ? "active"
              : ""
            }`}
          onClick={() => {
            if (multiple) {
              if (def?.includes(option)) {
                onChange(def?.filter((item) => item !== option));
              } else {
                const newVal = [...def];
                newVal.push(option);
                onChange(newVal);
              }
            } else {
              onChange(option);
            }
          }}
        >
          {options[option]}
        </button>
      ))}
    </div>
  );
};

export default BButtonSet;
