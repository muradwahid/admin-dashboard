import React, { useEffect, useState } from "react";
import "./style.scss";
const BValidateInput = ({ value, onChange, validate, defaultValue }) => {
  const def = value || defaultValue;
  const [input, setInput] = useState(def || "")
  const [isValid, setIsValid] = useState(false);
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const number = /^-?\d+(\.\d+)?$/;
  const url = /^(ftp|http|https):\/\/[^ "]+$/;
  useEffect(() => {
    if (validate === "email") {
      email.test(def) ? setIsValid(false) : setIsValid(true);
    } else if (validate === "numeric") {
      number.test(def) ? setIsValid(false) : setIsValid(true);
    } else if (validate === "required") {
      def.trim() !== "" ? setIsValid(false) : setIsValid(true);
    } else if (validate === "url") {
      url.test(def) ? setIsValid(false) : setIsValid(true);
    }
  });
  useEffect(() => {
    onChange(input);
  }, [input]);
  return (
    <div className="bPl-validate-filed-wrapper">
      <div className="bPl-validate-inputField">
        <input
          type="text"
          value={input}
          className="bPl-validate-field"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {def && validate === "email" && isValid && (
        <span className="bPl-validate-error">
          Please enter a valid email address.
        </span>
      )}
      {def && validate === "numeric" && isValid && (
        <span className="bPl-validate-error">Please enter a valid number.</span>
      )}
      {def && validate === "required" && isValid && (
        <span className="bPl-validate-error">This field is required.</span>
      )}
      {def && validate === "url" && isValid && (
        <span className="bPl-validate-error">Please enter a valid URL.</span>
      )}
    </div>
  );
};

export default BValidateInput;
