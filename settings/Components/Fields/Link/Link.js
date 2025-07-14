import React, { useEffect, useRef, useState } from "react";
import useDynamicData from "../../../hooks/useDynamicData";
import Button from "../Button/Button";
import "./style.scss";
import { Spinner } from "@wordpress/components";
const Link = ({ value, onChange, defaultValue, nonce }) => {
  const { data: content = null, isLoading } = useDynamicData('pages', nonce);
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [result, setResult] = useState(false);
  const [inputVal, setInputVal] = useState('')
  const [data, setData] = useState({});
  const resultRef = useRef(null);
  const modalRef = useRef(null);
  // const initial = data || value || defaultValue;
  const def = value || defaultValue || {}
  useEffect(() => {
    const handle = (e) => {
      if (!resultRef?.current?.contains(e.target)) {
        setResult(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  });
  useEffect(() => {
    const handle = (e) => {
      if (!modalRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  })

  const searchTerm = content?.filter((option) => {
    if (inputVal?.length > 2) {
      return option.label.toLowerCase().includes(inputVal.toLowerCase())
    } else { 
      return option;
    }
  });
  return (
    <div className="bPl-link-main-wrapper">
      {
        (Object.keys(def)?.length > 0 && def.url !=="" ) ? <div>
          <div type="text" readOnly className="bPl-link-readOnly-input" >{JSON.stringify(def)}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><Button onClick={()=>setOpen(true)} variant="secondary">Edit Link</Button>
            <Button variant="warning" onClick={() => onChange({})}>Remove Link</Button></div>
        </div>:
      <Button variant="primary" onClick={() => setOpen(!open)}>
        Add Link
      </Button>
      }

      {/* modal */}
      {open && (
        <div className="bPl-link-modal-main-wrapper">
          <div ref={modalRef} className="bPl-link-modal-wrapper">
            <div className="bPl-link-modal-header">
              <h3 className="bPl-link-modal-title">Insert/edit link</h3>
              <button
                onClick={() => setOpen(false)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  height={15}
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </button>
            </div>

            {/* body */}
            <div className="bPl-link-modal-body">
              <div className="bPl-link-options">
                <p>Enter the destination URL</p>
                <div className="bPl-link-option">
                  <label>URL</label>
                  <input value={def?.["url"]} onChange={e => setData({...def,url:e.target.value})} type="text" name="linkType" />
                </div>
                <div className="bPl-link-option">
                  <label>Link Text</label>
                  <input value={def?.["text"]} onChange={e => setData({ ...def, text: e.target.value })} type="text" name="linkType" />
                </div>
                <div
                  style={{
                    width: "63.5%",
                    display: "flex",
                    gap: "5px",
                    float: "right",
                    justifyContent: "flex-start",
                    marginTop: "5px",
                  }}
                >
                  <input
                    style={{ margin: "0px" }}
                    type="checkbox"
                    name="linkType"
                    id="linkType"
                    value={def?.['target'] === "_blank" ? true : false}
                    checked={def?.['target'] === "_blank" ? true : false}
                    onChange={() => {
                      setData({ ...def,target:value?.['target'] === "_blank" ? "" : "_blank"})
                      
                    }}
                  />
                  <label
                    htmlFor="linkType"
                    style={{ color: "#646970", fontSize: "14px" }}
                  >
                    Open link in a new tab
                  </label>
                </div>
              </div>
              <div style={{ marginTop: "40px" }} className="bPl-link-options">
                <p>Or link to existing content</p>
                <div className="bPl-link-option">
                  <label htmlFor="bPl-searchId">Search</label>
                  <input
                    onFocusCapture={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    id="bPl-searchId"
                    style={{ width: "200px" }}
                    type="search"
                    onChange={(e) => setInputVal(e.target.value)}
                  />
                </div>
              </div>
              <div
                ref={resultRef}
                onClick={() => setResult(true)}
                className={`bPl-link-query-result ${result ? "active" : ""}`}
              >
                {
                  inputVal?.length < 3 && <>
                    {focus ? (
                      <div className="bPl-link-query-notice">
                        Search or use up and down arrow keys to select an item.
                      </div>
                    ) : (
                      <div className="bPl-link-query-notice">
                        No search term specified. Showing recent items.
                      </div>
                    )}
                  </>
                }
                {
                  inputVal?.length > 2 && searchTerm?.length <= 0 && <div className="bPl-link-query-notice-not-found">
                    No results found.
                  </div>
                }
                <ul>
                  {isLoading ? <Spinner /> : searchTerm?.map((val, i) => <li onClick={() => setData({ ...def,text:val.label,url:val.url})} key={i}>{val?.label}</li>)}
                </ul>
              </div>
            </div>
            {/* body */}

            <div className="bPl-link-modal-footer">
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => {
                onChange(data);
                setOpen(false);
              }}>Add Link</Button>
            </div>

          </div>
        </div>
      )}
      {/* modal */}
    </div>
  );
};

export default Link;
