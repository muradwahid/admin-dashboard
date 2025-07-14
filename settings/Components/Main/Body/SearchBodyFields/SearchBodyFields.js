import React, { memo, useEffect, useState } from 'react';
import FieldSwitch from '../FieldSwitch';

const SearchBodyFields = ({ search, options, updateData, sections, data, setData, isLoading, activeSection, activeChild }) => {
  const [filteredSections, setFilteredSections] = useState([]);


  useEffect(() => {
    const filtered = []

    sections.map(s => {
      const fields = s.fields?.filter(f => f.title?.toLowerCase().includes(search.toLowerCase()));

      if (fields?.length) {
        filtered.push({
          name: s.name,
          fields,
        })
      }

      const children = [];

      if (s.children && Array.isArray(s.children)) {
        s.children.map(ch => {
          const fields = ch.fields?.filter(f => f.title?.toLowerCase().includes(search.toLowerCase()));

          if (fields?.length) {
            children.push({
              name: ch.name,
              fields,
            })
          }
        })
      }

      if (children.length) {
        filtered.push({
          name: s.name,
          children,
        })
      }

      setFilteredSections(filtered);

    })

  }, [search])


  return (
    <div className='fields'>
      {filteredSections.map((section) => {
        const { name, fields = [], children = [] } = section;

        if (fields.length > 0) {
          return fields.map((f) => {
            return <Field parentName={name} key={f?.id} {...{ saveType: options.saveType, data, setData, activeSection, activeChild, updateData, fields, isLoading }} field={f} />;
          });
        } else if (children.length > 0) {
          return children.map((child) => {
            const { name: childName, fields = [] } = child;
            return fields?.map((c, i) => {
              return <Field parentName={name} childName={childName} key={c.id || i} {...{ saveType: options.saveType, data, setData, activeSection, activeChild, updateData, isLoading }} field={c} />
            });
          });
        }
      })}


    </div>
  );
};

export default memo(SearchBodyFields);


const Field = ({ data, setData, field, updateData, isLoading, parentName, childName }) => {
  const { id, title, subtitle, before, after } = field;
  let value;
  if (childName) {
    value = data?.[parentName]?.[childName]?.[id] || "";
  } else {
    value = data?.[parentName]?.[id] || "";
  }

  return <div className="field fieldPadding">
    {
      title && <div className={`fieldLabel`}>
        <label className='label'>{title}</label>
        {subtitle && <p className='subTitle' dangerouslySetInnerHTML={{ __html: subtitle }} />}
      </div>
    }
    {
      <div className={`fieldComponent ${title ? "" : "fullWidth"}`} >
        {before && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: before }} />}
        <FieldSwitch {...field} extraFields={field} value={value} data={data} setData={setData} onChange={val => {
          updateData(id, val, parentName, childName)
        }} isLoading={isLoading} />
        {after && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: after }} />}
      </div>
    }
  </div>
}