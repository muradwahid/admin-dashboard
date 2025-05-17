import React from 'react';
import "./style.scss";
import FieldSwitch from '../../Main/Body/FieldSwitch';
const BFieldset = ({ fields,value,onChange }) => {
  const title = fields?.find(v => Object.prototype.hasOwnProperty.call(v, "content"));
  const fieldsCom = fields?.filter(v => !Object.prototype.hasOwnProperty.call(v, "content"));
  return (
    <div className="bPl-fieldset-main-wrapper">
      <div className="bPl-fieldset-body-wrapper">
        {title && <h4 className="bPl-fieldset-title">{title.content}</h4>}
        {
          fieldsCom?.map((field, index) => <div key={index} className="bPl-fieldset-single-field">
            <div className="bPl-fieldset-field-title">{field.title}</div>
            <div className="bPl-fieldset-field">
              <FieldSwitch {...field} value={value?.[field?.id]} onChange={val => onChange({...value,[field?.id]:val})} />
            </div>
          </div>)
        }

      </div>
    </div>
  );
};

export default BFieldset;