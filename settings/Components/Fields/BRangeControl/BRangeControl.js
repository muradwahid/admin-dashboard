import { RangeControl } from '@wordpress/components';
const { useInstanceId } = wp.compose;
import "./style.scss";
const BRangeControl = ({ value, onChange, min, max, step, unit, defaultValue, minLength, maxLength }) => {
  const def = value || defaultValue;
  const instanceId = useInstanceId(BRangeControl);
  return (
    <div key={instanceId} className='bPl-rangeControl-wrapper'>
      <div className="bPl-rangeControl">
        <RangeControl value={(!def || def === "" || def === null || def === undefined) ? "" : Number(def)} onChange={val => onChange(val)} min={min} max={max} step={step} minLength={minLength} maxLength={maxLength}  />
      </div>
      {unit && <div className="bPl-rangeControl-unit">{unit}</div>}
    </div>
  );
};

export default BRangeControl;