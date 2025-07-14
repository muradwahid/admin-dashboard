import React, { useEffect, useState } from 'react';
import FieldSwitch from '../../Main/Body/FieldSwitch';
import "./style.scss";
const BTabbed = ({ tabs, value, onChange, default:defaultValues }) => {
  const [activeTab, setActiveTab] = useState(0);
  const def = value ? value : defaultValues;
  const [data, setData] = useState(def || {});
  useEffect(() => {
    onChange(data);
  }, [data])
  return (
    <div className="bPl-tabbed-main-wrapper">
      <div className="bPl-tabBtn-wrapper">
        {
          tabs?.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(index)}
              className={`bPl-single-tabBtn ${activeTab === index ? 'activeTab' : ''}`}
            >
              {item?.icon && <span style={{ display: "flex" }} dangerouslySetInnerHTML={{ __html: item?.icon }} />}
              <span>{item?.title}</span>
            </div>
          ))
        }
      </div>
      <div className="bPl-tabbed-body-wrapper">
        {
          tabs?.[activeTab]?.fields?.map((tab, idx) => {
            return <div key={idx+activeTab} className="bPl-tabbed-single-field">
              <div className="bPl-tabbed-field-title">{tab?.title}</div>
              <div className="bPl-tabbed-field">
                <FieldSwitch field={tab?.field} title={tab?.title} value={data?.[tab?.id]} onChange={val => setData({ ...value, [tab?.id]: val })} />
              </div>
            </div>
          })
        }
      </div>
    </div>
  );
};

export default BTabbed;