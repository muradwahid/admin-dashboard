import React, { useState } from "react";
import Button from "../Button/Button";

const BBackup = ({
  value,
  outline = "#4527a4",
  defaultValue,
  placeholder,
  readOnly = false,
  style,
  rows = 7,
  minLength,
  cols,
  maxLength,
  data,
  setData
}) => {
  const def = value || defaultValue;
  const [inputVal, setInputVal] = useState(def);
  //get current date
  function getFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const fileName = `backup-${getFormattedDate()}.json`;
  const convertDataToJson = JSON.stringify(data, null, 2);
  const blob = new Blob([convertDataToJson], { type: "application/json" });
  const href = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = href;
  link.download = fileName;
  document.body.appendChild(link);
  const downloadJsonFile = () => {
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }


  return (
    <div>
      <style>{`
        .bPl-backupControl {
          width: 100%;
          padding: 15px 0;
        }
        .bPl-backupControl>.bPl-backupControl-input {
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
        .bPl-backupControl>.bPl-backupControl-input:focus {
          outline: 1px solid ${outline};
          transition:all 0.2s ease-in-out;
          border: 1px solid ${outline};
        }
        .bPl-backupControl>.bPl-backupControl-input:read-only {
          background:#ccc;
        }
      `}</style>
      <div className={`bPl-backupControl`}>
        <textarea
          className={`bPl-backupControl-input`}
          style={{ ...style }}
          rows={rows}
          minLength={minLength}
          cols={cols}
          maxLength={maxLength}
          value={inputVal}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
        ></textarea>
        <Button onClick={() => setData(JSON.parse(inputVal))} style={{ marginTop: "10px" }}>Import</Button>
      </div>
      <hr style={{ border: "none", borderBottom: "1px solid #e5e5e5" }} />
      <div className={`bPl-backupControl`}>
        <textarea
          className={`bPl-backupControl-input`}
          style={{ ...style, background: "#eee" }}
          rows={rows}
          minLength={minLength}
          cols={cols}
          maxLength={maxLength}
          value={JSON.stringify(data)}
          placeholder={placeholder}
          readOnly={true}
        ></textarea>
        <Button onClick={() => downloadJsonFile()} style={{ marginTop: "10px" }}>Export & Download</Button>
      </div>
      <hr style={{ border: "none", borderBottom: "1px solid #e5e5e5" }} />
      <div className={`bPl-backupControl`}>
        <Button onClick={() => setData({})} variant="warning">Reset</Button>
      </div>
    </div>
  );
};

export default BBackup;
