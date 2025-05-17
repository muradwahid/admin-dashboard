import React from "react";
import "./style.scss";
import ColorPicker from "../ColorPicker/ColorPicker";
const BLinkColor = ({
  value,
  onChange,
  normal = true,
  hover = false,
  active = false,
  visited = true,
  focus = false,
  defaultValue = {},
}) => {
  const def =value || defaultValue

  const activeColor = [
    { label: "normal", active: normal },
    { label: "hover", active: hover },
    { label: "active", active },
    { label: "visited", active: visited },
    { label: "focus", active: focus },
  ];
  const acColor = [];
  activeColor.map((val) => {
    if (val?.active) {
      acColor.push({ label: val?.label, active: val?.active });
    }
  });
  const options =
    Object.keys(defaultValue).length > 0
      ? Object.keys(defaultValue).map((val) => ({
        label: val,
        active: true,
      }))
      : acColor;

  return (
    <div className="link-color-container">
      {options?.map((option, index) => {
        return (
          <div key={index} className="linkColorWrapper-main">
            <div className="linkColorLabel">{option?.label}</div>
            <ColorPicker value={def?.[option?.label]} onChange={val => onChange({ ...def, [option?.label]: val })} defaultValue={defaultValue ? defaultValue?.[option?.label]:""} />
          </div>
        );
      }
      )}
    </div>
  );
};

export default BLinkColor;
