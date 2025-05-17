import React from "react";
import "./style.scss";
const BColorPalette = ({ onChange, value, options, defaultValue }) => {
  const def = value || defaultValue;
  return (
    <div className="bPl-colorPalette-main-wrapper">
      <div className="colorPalette-wrapper">
        {options?.map(({ colors, value: val }, index) => (
          <div
            key={index}
            onClick={() => onChange(val)}
            className={`bPl-single-color-palette ${val === def ? "active" : ""
              }`}
          >
            {val === def && <div className="bPl-checkMark-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
            </div>}
            {colors?.map((color, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: color,
                  width: "22px",
                  height: "60px",
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BColorPalette;
