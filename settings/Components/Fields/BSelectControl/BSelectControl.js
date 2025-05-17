import React, { useEffect, useRef, useState } from 'react';
import "./style.scss";
const BSelectControl = ({
  multiple = false,
  defaultValue,
  value,
  onChange = () => { },
  options = [],
}) => {
  const [inputVal, setInputVal] = useState("");
  const [toggle, setToggle] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const toggleRef = useRef();
  const searchRef = useRef();
  const itemsRef = useRef();
  const defaultWithValue = value ? value : defaultValue;

  const activeItem =
    options && options.find((option) => option.value === defaultWithValue);


  useEffect(() => {
    const handle = (e) => {
      if (!toggleRef?.current?.contains(e.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, [toggle]);

  useEffect(() => {
    const handle = (e) => {
      if (!searchRef?.current?.contains(e.target)) {
        setSearchActive(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, [searchActive])

  useEffect(() => {

    if (itemsRef.current?.clientHeight === 200) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [itemsRef.current, showSearch, toggle]);
  const searchTerm = options.filter((option) =>
    option.label.toLowerCase().includes(inputVal.toLowerCase())
  );
  return (
    <div className="bPl-token-field-main-wrapper">
      <div className="bPl-single-token-field-wrapper" ref={toggleRef}>
        <div
          onClick={() => setToggle(!toggle)}
          className={`bPl-single-token-field ${toggle ? "activeField" : ""}`}
        >
          {activeItem ? (
            <span
              className="bPl-token-field-value"
              style={{ color: "#3e3e3e" }}
            >
              {activeItem.label}
            </span>
          ) : (
            <span className="bPl-token-field-value">Select an option</span>
          )}
          <div className="bPl-select-field-icons-wrapper">
            <span onClick={() => onChange("")} className="bPl-xMark-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                height="14px"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </span>
            <span
              onClick={() => setToggle(!toggle)}
              style={{ transform: toggle ? "rotate(180deg)" : "rotate(0deg)" }}
              className="bPl-arrow-icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                height="14px"
              >
                <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
            </span>
          </div>
        </div>

        {options.length > 0 && toggle && (
          <div className="bPl-token-field-dropdown-wrapper">
            {showSearch && (
              <div
                ref={searchRef}
                className={`bPl-select-field-searchTerm-wrapper ${searchActive ? "active" : ""
                  }`}
                onClick={() => setSearchActive(true)}
              >
                <input
                  type="text"
                  className="bPl-select-field-searchTerm"
                  onChange={(e) => setInputVal(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </div>
            )}
            <ul ref={itemsRef} className="bPl-token-field-dropdown-list">
              {searchTerm.map((option, index) => (
                <li
                  className={`${option.value === defaultWithValue ? "activeItemInList" : ""
                    }`}
                  onClick={() => {
                    if (multiple) {
                      if (defaultWithValue) {
                        onChange([...defaultWithValue, option.value]);
                      } else {
                        onChange([option.value]);
                      }
                      if (defaultWithValue?.includes(option.value)) {
                        setToggle(true);
                      } else {
                        setToggle(false);
                      }
                    } else {
                      onChange(option.value);
                      setToggle(false);
                    }
                  }}
                  key={index}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BSelectControl;