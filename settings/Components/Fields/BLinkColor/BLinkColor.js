import ColorPicker from "../ColorPicker/ColorPicker";
import "./style.scss";
const BLinkColor = ({
  value,
  onChange,
  color = true,
  hover = true,
  active = false,
  visited = false,
  focus = false,
  defaultValue = {},
}) => {
  const def = value || defaultValue
  // console.log(value);
  const activeColor = [
    { label: "Normal", active: color, key: 'color' },
    { label: "Hover", active: hover, key: 'hover' },
    { label: "Active", active, key: 'active' },
    { label: "Visited", active: visited, key: 'visited' },
    { label: "Focus", active: focus, key: 'focus' },
  ];
  const acColor = [];
  activeColor.map((val) => {
    if (val?.active) {
      acColor.push({ label: val?.label, active: val?.active, key: val?.key });
    }
  });
  return (
    <div className="link-color-container">
      {acColor?.map((option, index) => {
        return <div key={index} className="linkColorWrapper-main">
          <div className="linkColorLabel">{option?.label}</div>
          <ColorPicker value={def?.[option?.key]} onChange={val => onChange({ ...def, [option?.key]: val })} defaultValue={defaultValue ? defaultValue?.[option?.key] : ""} />
        </div>
      }
      )}
    </div>
  );
};

export default BLinkColor;
