/* eslint-disable no-unused-vars */
import React from 'react';
import "./style.scss";
const BSanitize = ({ value, onChange, sanitize, dbData }) => {
  const [text, setText] = React.useState(dbData || "");
  // console.log(sanitize);
  const [curr, to, rep] = sanitize.split("_")
  function findAndReplace(originalString, target, replacement) {
    const regex = new RegExp(target, 'g');
    return originalString?.replace(regex, replacement);
  }

  function convertString(val) {
    return val?.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').trim();
  }

  const handleBlur = () => {
    const formatted = text.toLowerCase().replace(/\s+/g, '-');
    setText(formatted);
  };


  const val = sanitize === "title" ? convertString(dbData) : dbData ? findAndReplace(dbData, curr, rep) : text

  React.useEffect(() => {
    setText(val)
  }, [val])

  React.useEffect(() => onChange(text), [text]);
  return (
    <div className="bPl-sanitize-filed-wrapper">
      <div className="bPl-sanitize-inputField">
        <input
          type="text"
          value={text}
          className="bPl-sanitize-field"
          onBlur={handleBlur}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
      </div>
    </div>
  );
};

export default BSanitize;