import { useEffect, useState } from 'react';
import { AiFillQuestionCircle } from '../../../utils/icons';
import FieldSwitch from './FieldSwitch';

const Body = (props) => {
  const { options, data, sections, activeSection, activeChild, updateData, setData, isLoading, refetch,dbData} = props;
  const [item, setItem] = useState(sections.find(s => s.name === activeSection));
  useEffect(() => {
    const section = sections.find(s => s.name === activeSection);

    if (activeChild && activeChild !== "null") {
      const child = section.children.find(c => c.name === activeChild);
      setItem(child)
    } else {
      setItem(section)
    }
  }, [activeSection, activeChild])

  const { fields = [], description = '' } = item;

  return <>
    {description && <p className='description' dangerouslySetInnerHTML={{ __html: description }} />}

    <div className='fields'>
      {fields.map((field, i) => <Field key={i} {...{ saveType: options.saveType, data, setData,dbData, activeSection, activeChild, field, updateData, fields, isLoading, refetch }} />)}
    </div>
  </>;
};
export default Body;

const Field = ({ saveType = 'nested', data, setData, activeSection, activeChild, field, updateData, isLoading, refetch,dbData }) => {
  const { id, title, subtitle, before, after, field: fieldProps, help } = field;

  const [value, setValue] = useState();
  const [dbValue, setDbValue] = useState();
  useEffect(() => {
    if (saveType === 'nested') {
      if (activeChild) {
        setValue(data?.[activeSection]?.[activeChild]?.[id] || '');
      } else {
        setValue(data?.[activeSection]?.[id] || '');
      }
    } else {
      setValue(data?.[id] || '');
    }
    //dbData
    if (saveType === 'nested') {
      if (activeChild) {
        setDbValue(dbData?.[activeSection]?.[activeChild]?.[id] || '');
      } else {
        setDbValue(dbData?.[activeSection]?.[id] || '');
      }
    } else {
      setDbValue(dbData?.[id] || '');
    }
  }, [activeSection, activeChild, isLoading, value, refetch]);
  return <div className={`field ${["notice", "heading", "subheading", "content", "submessage"].includes(fieldProps) ? "" : "fieldPadding"}`}>
    {
      title && <div className={`fieldLabel ${["notice", "heading", "subheading", "content", "submessage"].includes(fieldProps) ? "" : "pr15"}`}>
        <label className='label'>{title}</label>
        {subtitle && <p className='subTitle' dangerouslySetInnerHTML={{ __html: subtitle }} />}
      </div>
    }

    {
      // isLoading ? <div className={`fieldComponent ${!title ? "fullWidth" : ""}`} style={{ display: "flex", justifyContent: "center" }}>
      //   <LoaderSvgIcon style={{ width: "50px", height: "50px" }} />
      // </div> :
      <div className={`fieldComponent ${!title ? "fullWidth" : ""}`} >
        {before && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: before }} />}
        <FieldSwitch {...field} extraFields={field} value={value} data={data} setData={setData} onChange={val => {
          updateData(id, val,)
        }} isLoading={isLoading} refetch={refetch} dbData={dbValue} />
        {after && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: after }} />}
      </div>
    }
    {
      help && <div className='bPl-field-help-main-wrapper'>
        <span className='bPl-field-help-text'>{help}</span>
        <AiFillQuestionCircle className="bPl-field-help-icon" />
      </div>
    }


  </div>
}