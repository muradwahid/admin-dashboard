import React from 'react';
import "./style.scss";
import { Spinner } from '@wordpress/components';
import useDynamicData from '../../../hooks/useDynamicData';
const { useInstanceId } = wp.compose;
const BRadioControl = ({ options, value, categories=false, onChange,direction="column",defaultValue}) => {
  const instanceId = useInstanceId(BRadioControl);
  const id = `radio-control-${instanceId}`;

  const { data: content = null, isLoading } = useDynamicData("categories");
  const category = categories ? content : options;
  if (categories && isLoading) {
    return <Spinner />
  }
  return (
    <div className={`bPl-radio-main-wrapper ${direction}`}>
      {category?.map(({ label, value: val }, i) => {
        const isDefault = defaultValue?.length > 0 ? defaultValue?.includes(val) : defaultValue?.includes(val);
        return <div key={val} className="bPl-radioWrapper">
          <input
            id={`${id}-${i}`}
            type="radio"
            name={id}
            {...(defaultValue?.length > 0 ? { defaultValue: isDefault } : {})}
            checked={value ? value?.includes(val) : isDefault}
            onChange={() => onChange(value?.includes(val) ? value.filter(v => v !== val) : [...value, val])}
          />
          <span>{label}</span>
        </div>
      })}
    </div>
  );
};

export default BRadioControl;