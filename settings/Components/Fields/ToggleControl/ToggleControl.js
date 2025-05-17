const ToggleControl = ({
  radius = "3px",
  activeBg = "#7ad03a",
  inActiveBg = "#ED6F6F",
  checked = null,
  text_off = "On",
  text_on = "Off",
  onChange = () => { },
  label,
  labelPosition = "right",
  text_width = "55",
  defaultValue,
}) => {
  const uniqId = Math.floor(Math.random() * 99999999);
  const def =
    checked === null || checked === undefined || checked === ""
      ? defaultValue
      : checked;
  return (
    <div style={{ display: "flex" }}>
      <style>{`
      .toggleControl-wrapper-${uniqId}{
        display: flex;
        align-items:center;
        gap: 0.75rem;
        flex-direction:${labelPosition === "right" ? "row-reverse" : "row"}
      }
      .toggleControl-wrapper-${uniqId} .toggleLabel{
        color:#3c3c3c;
      }
      .toggleControl-wrapper-${uniqId} .switch {
        position: relative;
        display: inline-block;
        width: ${text_width}px;
        height: 24px;
      }
    .toggleControl-wrapper-${uniqId} .switch .toggle-input { 
      opacity: 0;
      width: 0;
      height: 0;
    }
    .toggleControl-wrapper-${uniqId} .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${inActiveBg};
      -webkit-transition: .3s;
      transition: .3s;
      border-radius:${radius}
    }
    .toggleControl-wrapper-${uniqId} .slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 20px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .3s;
      transition: .3s;
      border-radius: inherit;
    }
.toggleControl-wrapper-${uniqId} .toggle-input:checked + .slider {
  background-color: ${activeBg};
}

.toggleControl-wrapper-${uniqId} .toggle-input:focus + .slider {
  box-shadow: 0 0 1px ${activeBg};
}

.toggleControl-wrapper-${uniqId} .toggle-input:checked + .slider:before {
left: calc(100% - 24px);
}
.toggleControl-wrapper-${uniqId} .switch .toggleOn{
  position: absolute;
  left:4px;
  font-size:11px;
  font-weight:600;
  color:#fff;
  top: 50%;
  transform:translateY(-50%);
  text-transform:uppercase;
}
.toggleControl-wrapper-${uniqId} .switch .toggleOff{
  position: absolute;
  right:4px;
  font-size:11px;
  font-weight:600;
  color:#fff;
  top: 50%;
  transform:translateY(-50%);
  text-transform:uppercase;
}

      `}</style>
      <div className={`toggleControl-wrapper-${uniqId}`}>
        <label className="toggleLabel" htmlFor="">
          {label}
        </label>
        <label className="switch">
          <input
            className="toggle-input"
            type="checkbox"
            checked={def}
            onChange={() => {
              onChange(!def);
            }}
            value={def}
          />
          <span className="slider"></span>
          {def && <span className="toggleOn">{text_on}</span>}
          {!def && <span className="toggleOff"> {text_off}</span>}
        </label>
      </div>
    </div>
  );
};

export default ToggleControl;