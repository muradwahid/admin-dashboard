import "./style.scss";
const SelectImage = ({ value, onChange = () => { }, images=[],defaultValue,multiple=false,inline=false}) => {
  const def = value || defaultValue;

  return (
    <div className={`bpl-imageSize-wrapper ${inline ? "inlineImage" : ""}`}>
      {
        Object.keys(images)?.map((key, i) => <div key={i} onClick={() => {
          if (multiple) {
            if (def?.includes(key)) {
              const newVal = def?.filter(v => v !== key);
              onChange(newVal);
            } else {
              const newVal = [...def];
              newVal.push(key);
              onChange(newVal)
            }
          } else { 
            onChange(key)
          }
        }} className={`bpl-single-imageSize ${multiple ? def?.includes(key) ? "active" : "" : def === key ? "active" : ""}`}>
            <img src={images[key]} alt="" />
        </div>)
      }
    </div>
  );
};

export default SelectImage;

