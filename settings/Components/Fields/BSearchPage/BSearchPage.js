import React, { useEffect, useRef, useState } from 'react';
import useDynamicData from '../../../hooks/useDynamicData';
import "./style.scss";
const BSearchPage = ({
  value = [],
  onChange = () => { },
  type = "page"

}) => {
  const { data: dbData, isLoading } = useDynamicData(type);
  const [inputVal, setInputVal] = useState("")
  const [toggle, setToggle] = useState(false);
  const toggleRef = useRef();
  const inputRef = useRef();
  const options = dbData?.map((item) => {
    return {
      label: item.label,
      value: item.value
    }
  })

  const activeMultipleItem =
    options &&
    options.filter((option) => value?.includes(option.value));

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


  const searchTerm = options && inputVal.length > 2 && options.filter((option) => option.label.toLowerCase().includes(inputVal.toLowerCase()))
  const id = Math.floor(Math.random() * 999999)
  return (
    <div className="bPl-page-field-main-wrapper">
      <div
        className="bPl-single-page-field-wrapper"
        style={{ width: "100%" }}
        ref={toggleRef}
      >

        <div className="bPl-page-multiple-filed-wrapper">
          <label htmlFor={`searchText${id}`}>
            <div
              onClick={() => setToggle(true)}
              className={`bPl-page-multiple-filed-wrapper-item ${toggle ? "focusItem" : ""
                }`}
              style={{ cursor: "text" }}
            >
              {!toggle && !value?.length > 0 && (
                <div className="bPl-empty-page-field">
                  <span>Select {type}s</span>
                </div>
              )}
              {activeMultipleItem?.map((item, i) => (
                <div key={i} className={`bPl-multiple-page-field`}>
                  <span className="bPl-multiple-page-field-value">
                    {item.label}
                  </span>

                  <span
                    onClick={() =>
                      onChange(
                        value?.filter((val) => val !== item.value)
                      )
                    }
                    className="bPl-xMark-icon"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      height="14px"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </span>
                </div>
              ))}
              <input
                type="text"
                name=""
                ref={inputRef}
                id={`searchText${id}`}
                // value={searchTerm?"":inputVal}
                className="bPl-multiple-search"
                onChange={(e) => {
                  setInputVal(e.target.value)

                }}
              />
            </div>
          </label>
        </div>

        {options?.length > 0 && toggle && (
          <div className="bPl-page-field-dropdown-wrapper">
            {
              inputVal.length < 3 && <div className="bPl-page-field-dropdown-loading">
                Please enter {3 - Number(inputVal.length)} or more characters</div>
            }
            {
              isLoading && <div className="bPl-page-field-dropdown-loading">Searching...</div>
            }
            {
              searchTerm?.length === 0 && inputVal.length > 2 && <div className="bPl-page-field-dropdown-loading">No results found</div>
            }
            {
              searchTerm && <ul className="bPl-page-field-dropdown-list">
                {searchTerm.map((option, index) => (
                  <li
                    className={`${activeMultipleItem.find(
                      (item) => item.value === option.value
                    )
                      ? "multipleActiveItem"
                      : ""

                      }`}
                    onClick={() => {
                      onChange([...value, option.value]);
                      if (value?.includes(option.value)) {
                        setToggle(true);
                      } else {
                        setToggle(false);
                      }
                      if (activeMultipleItem) {
                        inputRef.current.value = ""
                      }
                    }}
                    key={index}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default BSearchPage;