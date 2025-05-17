import React from "react";

const BTextareaControl = ({
  value,
  onChange,
  outline = "#4527a4",
  defaultValue,
  placeholder,
  readOnly = false,
  style,
  rows,
  minLength,
  cols,
  maxLength,
}) => {
  const def = value || defaultValue;
  return (
    <div>
      <style>{`
        .bPl-textAreaControl {
          width: 100%;
        }
        .bPl-textAreaControl>.bPl-textAreaControl-input {
          width:inherit;
          padding: 0 8px;
          line-height: 2;
          min-height: 30px;
          box-shadow: 0 0 0 transparent;
          border-radius: 4px;
          border: 1px solid #8c8f94;
          background-color: #fff;
          color: #2c3338;
          transition:all 0.2s ease-in-out;
        }
        .bPl-textAreaControl>.bPl-textAreaControl-input:focus {
          outline: 1px solid ${outline};
          transition:all 0.2s ease-in-out;
          border: 1px solid ${outline};
        }
        .bPl-textAreaControl>.bPl-textAreaControl-input:read-only {
          background:#ccc;
        }
      `}</style>
      <div className={`bPl-textAreaControl`}>
        <textarea
          className={`bPl-textAreaControl-input`}
          style={{ ...style }}
          rows={rows || 4}
          minLength={minLength}
          cols={cols}
          maxLength={maxLength}
          value={def}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};


export default BTextareaControl;
