import React from 'react';
import "./style.scss";
const SelectImage = ({ value, onChange = () => { }, images=[],defaultValue,multiple=false,inline=false}) => {
  const def = value || defaultValue
  return (
    <div className={`bpl-imageSize-wrapper ${inline ? "inlineImage" : ""}`}>
      {
        images?.map((item, i) => <div key={i} onClick={() => {
          if (multiple) {
            if (def?.includes(item.value)) {
              const newVal = def?.filter(v => v !== item.value);
              onChange(newVal);
            } else {
              const newVal = [...def];
              newVal.push(item.value);
              onChange(newVal)
            }
          } else { 
            onChange(item.value)
          }
        }} className={`bpl-single-imageSize ${multiple ? def?.includes(item.value) ? "active" : "" : def === item.value ? "active" : ""}`} style={{ background: item.background }}>
            <img src={item.label} alt="" />
        </div>)
      }
    </div>
  );
};

export default SelectImage;

