import React from "react";
import "./style.scss";
const Dimension = ({
  value = {},
  width_icon,
  height_icon,
  height = true,
  width = true,
  unit = true,
  units = ["px", "rem", "%"],
  defaultValue={unit:units.length===1?units[0]:"px"},
  onChange
}) => {
  const def = Object.keys(value).length > 0 ? value : defaultValue;
  const leftRightArrow = (
    <svg
      height={14}
      fill="#777"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M504.3 273.6c4.9-4.5 7.7-10.9 7.7-17.6s-2.8-13-7.7-17.6l-112-104c-7-6.5-17.2-8.2-25.9-4.4s-14.4 12.5-14.4 22l0 56-192 0 0-56c0-9.5-5.7-18.2-14.4-22s-18.9-2.1-25.9 4.4l-112 104C2.8 243 0 249.3 0 256s2.8 13 7.7 17.6l112 104c7 6.5 17.2 8.2 25.9 4.4s14.4-12.5 14.4-22l0-56 192 0 0 56c0 9.5 5.7 18.2 14.4 22s18.9 2.1 25.9-4.4l112-104z" />
    </svg>
  );
  const upDownArrow = (
    <svg
      height={14}
      fill="#777"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 512"
    >
      <path d="M145.6 7.7C141 2.8 134.7 0 128 0s-13 2.8-17.6 7.7l-104 112c-6.5 7-8.2 17.2-4.4 25.9S14.5 160 24 160l56 0 0 192-56 0c-9.5 0-18.2 5.7-22 14.4s-2.1 18.9 4.4 25.9l104 112c4.5 4.9 10.9 7.7 17.6 7.7s13-2.8 17.6-7.7l104-112c6.5-7 8.2-17.2 4.4-25.9s-12.5-14.4-22-14.4l-56 0 0-192 56 0c9.5 0 18.2-5.7 22-14.4s2.1-18.9-4.4-25.9l-104-112z" />
    </svg>
  );
  return (
    <div className="bPl-dimension-main-wrapper">
      {/* width section */}
      {width && (
        <div className="bPl-dimension-field-main-wrapper">
          <div className="bPl-dimension-wrapper">
            <div className="bPl-dimension-title">
              {width_icon ? width_icon : leftRightArrow}
            </div>
            <div className="bPl-dimension-inputField-wrapper">
              <input
                type="number"
                placeholder="width"
                value={def?.["width"]}
                className="bPl-dimension-input"
                onChange={(e) => onChange({ ...def, width: e.target.value })}
              />
            </div>
            {units.length === 1 && (
              <div className="bPl-dimension-unit">{units[0]}</div>
            )}
          </div>
        </div>
      )}

      {/* height section */}
      {height && (
        <div className="bPl-dimension-field-main-wrapper">
          <div className="bPl-dimension-wrapper">
            <div className="bPl-dimension-title">
              {height_icon ? height_icon : upDownArrow}
            </div>
            <div className="bPl-dimension-inputField-wrapper">
              <input
                type="number"
                placeholder="height"
                value={def?.["height"]}
                className="bPl-dimension-input"
                onChange={(e) => onChange({ ...def, height: e.target.value })}
              />
            </div>
            {units.length === 1 && (
              <div className="bPl-dimension-unit">{units[0]}</div>
            )}
          </div>
        </div>
      )}

      {/* units */}
      {unit && units.length > 1 && (
        <div className="bPl-unit-control-wrapper">
          <select
            name=""
            id=""
            onChange={(e) => onChange({ ...def, unit: e.target.value })}
            value={def["unit"]}
          >
            {units.map((val, index) => (
              <option key={index} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Dimension;
