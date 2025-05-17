import React from 'react';
import useDynamicData from '../../../hooks/useDynamicData';
import "./style.scss";
import { Spinner } from '@wordpress/components';
const BCheckboxControl = ({ options, value, categories = false, onChange, direction = "column", defaultValue = [] }) => {
  const { data: content = null, isLoading } = useDynamicData("categories");
  const category = categories ? content : options;

  if (categories && isLoading) {
    return <Spinner/>
  }
  return (
    <div className="bPl-checkbox-main-wrapper" style={{ display: 'flex', flexDirection: direction, gap: '10px' }}>
      {category?.map(({ label, value: val }) => {
        const isDefault = defaultValue?.length > 0 ? defaultValue?.includes(val) : defaultValue?.includes(val);
        return <div key={val} className="bPl-checkboxWrapper">
          <input
            type="checkbox"
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

export default BCheckboxControl;