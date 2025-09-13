// import { useEffect, useState } from 'react';
// import { AiFillQuestionCircle } from '../../../utils/icons';
// import FieldSwitch from './FieldSwitch';
// import { checkDependency } from '../../../utils/functions';

// const Body = (props) => {
//   const { options, data, sections, activeSection, activeChild, updateData, setData, isLoading, refetch, dbData, isPremium } = props;
//   const [item, setItem] = useState(sections.find(s => s.name === activeSection));

//   useEffect(() => {
//     const section = sections.find(s => s.name === activeSection);

//     if (activeChild && activeChild !== "null") {
//       const child = section.children.find(c => c.name === activeChild);
//       setItem(child)
//     } else {
//       setItem(section)
//     }
//   }, [activeSection, activeChild])

//   const { fields = [], description = '' } = item;

//   return <>
//     {description && <p className='description' dangerouslySetInnerHTML={{ __html: description }} />}

//     <div className='fields'>
//       {fields.map((field, i) => checkDependency(field?.dependency, data, fields) ? <Field key={i} {...{ saveType: options.saveType, data, setData, dbData, activeSection, activeChild, field, updateData, fields, isLoading, refetch, isPremium }} /> : null)}
//     </div>
//   </>;
// };
// export default Body;

// const Field = ({ saveType = 'nested', data, setData, activeSection, activeChild, field, updateData, isLoading, refetch, dbData, isPremium }) => {
//   const { id, title, default: defaultValue = {}, subtitle, before, after, field: fieldProps, help, desc = "", isPremium: isPro } = field;
//   const [value, setValue] = useState();
//   const [dbValue, setDbValue] = useState();
//   useEffect(() => {
//     if (saveType === 'nested') {
//       if (activeChild) {
//         setValue(data?.[activeSection]?.[activeChild]?.[id] || '');
//       } else {
//         setValue(data?.[activeSection]?.[id] || '');
//       }
//     } else {
//       setValue(data?.[id] || defaultValue);
//       // setValue(data?.[id] || false);
//     }
//     //dbData
//     if (saveType === 'nested') {
//       if (activeChild) {
//         setDbValue(dbData?.[activeSection]?.[activeChild]?.[id] || '');
//       } else {
//         setDbValue(dbData?.[activeSection]?.[id] || '');
//       }
//     } else {
//       setDbValue(dbData?.[id] || defaultValue);
//     }
//   }, [activeSection, activeChild, isLoading, value, refetch]);

//   // useEffect(() => {
//   //   console.log(id, value, defaultValue);
//   // }, [value])
//   // console.log(isPro, " : ", isPremium);

//   return <div className={`field ${["notice", "heading", "subheading", "content", "submessage"].includes(fieldProps) ? "" : "fieldPadding"}`}>
//     {
//       title && <div className={`fieldLabel ${["notice", "heading", "subheading", "content", "submessage"].includes(fieldProps) ? "" : "pr15"}`}>
//         <label className='label'>{title} {isPro !== isPremium ? <span className='bPl-Settings-pro-badge'>Pro</span> : null}</label>
//         {subtitle && <p className='subTitle' dangerouslySetInnerHTML={{ __html: subtitle }} />}
//       </div>
//     }

//     {
//       <div className={`fieldComponent ${!title ? "fullWidth" : ""}`} >
//         {before && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: before }} />}
//         <FieldSwitch {...field} extraFields={field} value={value} data={data} setData={setData} onChange={val => {
//           updateData(id, val)
//         }} isLoading={isLoading} refetch={refetch} dbData={dbValue} />
//         {desc && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: desc }} />}
//         {after && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: after }} />}
//       </div>
//     }
//     {
//       help && <div className='bPl-field-help-main-wrapper'>
//         <span className='bPl-field-help-text'>{help}</span>
//         <AiFillQuestionCircle className="bPl-field-help-icon" />
//       </div>
//     }

//   </div>
// }



import { useMemo, useCallback, useEffect, useState } from 'react';
import { AiFillQuestionCircle } from '../../../utils/icons';
import FieldSwitch from './FieldSwitch';
import { checkDependency } from '../../../utils/functions';
import ProModal from '../ProModal/ProModal';

const Body = (props) => {
  const { options, data, sections, activeSection, activeChild, updateData, setData, isLoading, refetch, dbData, isPremium } = props;

  const item = useMemo(() => {
    const section = sections.find(s => s.name === activeSection);
    if (activeChild && activeChild !== "null") {
      return section?.children?.find(c => c.name === activeChild);
    }
    return section;
  }, [sections, activeSection, activeChild]);

  const { fields = [], description = '' } = item || {};

  return <>
    {description && <p className='description' dangerouslySetInnerHTML={{ __html: description }} />}
    {!isPremium && <ProModal />}
    <div className='fields'>
      {fields.map((field, i) => checkDependency(field?.dependency, data, fields) ?
        <Field key={`${activeSection}-${activeChild}-${field.id || i}`} {...{ saveType: options.saveType, data, setData, dbData, activeSection, activeChild, field, updateData, fields, isLoading, refetch, isPremium }} /> : null)}
    </div>
  </>;
};

const Field = ({ saveType = 'nested', data, setData, activeSection, activeChild, field, updateData, isLoading, refetch, dbData, isPremium }) => {
  const { id, title, default: defaultValue = {}, subtitle, before, after, field: fieldProps, help, desc = "", isPremium: isPro, hints = '' } = field;

  const [value, setValue] = useState();
  const [dbValue, setDbValue] = useState();
  useEffect(() => {
    if (saveType === 'nested') {
      if (activeChild) {
        setValue(data?.[activeSection]?.[activeChild]?.[id] || "");
      } else {
        setValue(data?.[activeSection]?.[id] || "");
      }
    } else {
      setValue(data?.[id]);
    }
    //dbData
    if (saveType === 'nested') {
      if (activeChild) {
        setDbValue(dbData?.[activeSection]?.[activeChild]?.[id] || "");
      } else {
        setDbValue(dbData?.[activeSection]?.[id] || "");
      }
    } else {
      setDbValue(dbData?.[id] || "");
    }
  }, [dbData, data, activeSection, activeChild, isLoading, value, refetch]);

  // const value = useMemo(() => {
  //   if (saveType === 'nested') {
  //     if (activeChild) {
  //       return data?.[activeSection]?.[activeChild]?.[id] || '';
  //     }
  //     return data?.[activeSection]?.[id] || '';
  //   }
  //   return data?.[id] || defaultValue;
  // }, [data, activeSection, activeChild, id, saveType, defaultValue]);

  // const dbValue = useMemo(() => {
  //   if (saveType === 'nested') {
  //     if (activeChild) {
  //       return dbData?.[activeSection]?.[activeChild]?.[id] || '';
  //     }
  //     return dbData?.[activeSection]?.[id] || '';
  //   }
  //   return dbData?.[id] || defaultValue;
  // }, [dbData, activeSection, activeChild, id, saveType, defaultValue]);

  const handleChange = useCallback(val => {
    updateData(id, val);
  }, [id, updateData]);

  const fieldClasses = useMemo(() => {
    const baseClass = ["notice", "heading", "subheading", "content", "submessage"].includes(fieldProps) ? "" : "fieldPadding";
    return `field ${baseClass}`;
  }, [fieldProps]);

  const labelClasses = useMemo(() => {
    const baseClass = ["notice", "heading", "subheading", "content", "submessage"].includes(fieldProps) ? "" : "pr15";
    return `fieldLabel ${baseClass}`;
  }, [fieldProps]);

  // <label for="bPl-settings-pro-modal-toggle" class="bPl-settings-pro-open-modal-btn">Open Modal</label>

  return <>
    {(isPro && !isPremium) && <label {...((isPro && !isPremium) ? { htmlFor: "bPl-settings-pro-modal-toggle" } : {})}>
      <div className={`${fieldClasses} ${(isPro && !isPremium) ? 'pointerEventNone' : ''}`}>
        {title && (
          <div className={labelClasses}>
            <label className='label'>
              {title} {isPro && !isPremium && <span className='bPl-Settings-pro-badge'>Pro</span>}
            </label>
            {subtitle && <p className='subTitle' dangerouslySetInnerHTML={{ __html: subtitle }} />}
          </div>
        )}

        <div className={`fieldComponent ${!title ? "fullWidth" : ""}`}>
          {before && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: before }} />}
          <FieldSwitch
            {...field}
            extraFields={field}
            value={value}
            data={data}
            setData={setData}
            onChange={handleChange}
            isLoading={isLoading}
            refetch={refetch}
            dbData={dbValue}
          />
          {desc && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: desc }} />}
          {after && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: after }} />}
        </div>

        {help && (
          <div className='bPl-field-help-main-wrapper'>
            <span className='bPl-field-help-text'>{help}</span>
            <AiFillQuestionCircle className="bPl-field-help-icon" />
          </div>
        )}
      </div>
    </label>}

    {!(isPro && !isPremium) && <div className={`${fieldClasses}`}>
      {title && (
        <div className={labelClasses}>
          <label className='label'>
            {title}
          </label>
          {subtitle && <p className='subTitle' dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      )}

      <div className={`fieldComponent ${!title ? "fullWidth" : ""}`}>
        {before && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: before }} />}
        <FieldSwitch
          {...field}
          extraFields={field}
          value={value}
          data={data}
          setData={setData}
          onChange={handleChange}
          isLoading={isLoading}
          refetch={refetch}
          dbData={dbValue}
        />
        {desc && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: desc }} />}
        {after && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: after }} />}
      </div>

      {help && (
        <div className='bPl-field-help-main-wrapper'>
          <span className='bPl-field-help-text'>{help}</span>
          <AiFillQuestionCircle className="bPl-field-help-icon" />
        </div>
      )}
    </div>}

    <p className='bPl-settings-hints' dangerouslySetInnerHTML={{ __html: hints }}></p>
  </>
};

export default Body;