import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import FieldSwitch from "../../Main/Body/FieldSwitch";
import { produce } from "immer";

const Sortable = ({ fields, value=[], onChange }) => {
  const [isDrag, setIsDrag] = useState(false);

  const listRef = useRef(null);
  const fieldRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  function transformArray(arr) {
    return arr.map(item => {
      const newItem = {
        [item.id]: '',
        title: item.title,
        id: item.id,
        field: item.field,
        default:item.default
      };
      return newItem;
    });
  }

  useEffect(() => {
    if (!value?.length) {
      onChange(transformArray(fields))
    }
  })


  useEffect(() => {
    let dragIdx, dropIdx;
    if (listRef?.current?.children) {
      Array.from(listRef.current?.children).forEach((child, index) => {
        child.setAttribute("draggable", isDrag);
        //drag start
        child.ondragstart = (e) => {
          child.style.cursor = "all-scroll";
          e.dataTransfer.setData("text/plain", index);
          dragIdx = index;
        };

        // drop event
        child.ondrop = () => {
          dropIdx = index;
          if (dragIdx !== dropIdx) {
            const newItems = [...value];
            const [removed] = newItems.splice(dragIdx, 1);
            newItems.splice(dropIdx, 0, removed);
            onChange(newItems);
          }
        };
      });
    }
  });

  const updateData = (index, val, property = null, childProperty = null, prop = null) => {
    const newData = produce(value, draft => {
      if (!draft[index]) {
        draft[index] = {};
      }
      if (!draft[index][property]) {
        draft[index][property] = {};
      }

      if (null !== property && null !== childProperty, null !== prop) {
        draft[index][property][childProperty][prop] = val;
      }
      else if (null !== property && null !== childProperty) {
        draft[index][property][childProperty] = val;
      } else if (null !== property) {
        draft[index][property] = val;
      } else {
        draft[index] = val;
      }
    });
    onChange(newData);
  }


  return (
    <div
      className="bPl-sortable-main-wrapper"
      ref={listRef}
      onDragOver={handleDragOver}
    >
      {value && value?.map((val, i) => (
        <div className="bPl-single-sortable-wrapper" key={i}>
          <div className="bPl-single-sortable-content-wrapper">
            <div className="bPl-single-sortable-content">
              <div
                onMouseEnter={() => setIsDrag(true)}
                onMouseLeave={() => setIsDrag(false)}
                className="bPl-single-sortable-label"
              >
                {val.title}
              </div>
              <div ref={fieldRef} className="bPl-single-sortable-field">
                <FieldSwitch value={val[val?.id]} field={val?.field} default={val?.default} onChange={v => updateData(i,v,val.id)} />
              </div>
            </div>
          </div>
          <div
            onMouseEnter={() => setIsDrag(true)}
            onMouseLeave={() => setIsDrag(false)}
            className="bPl-single-sortable-helper"
          >
            <svg
              style={{ cursor: "all-scroll" }}
              stroke="currentColor"
              fill="currentColor"
              height={16}
              strokeWidth="0"
              version="1.2"
              baseProfile="tiny"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.707 8.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.293 1.293h-4.586v-4.586l1.293 1.293c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-3.707-3.707-3.707 3.707c-.391.391-.391 1.023 0 1.414s1.023.391 1.414 0l1.293-1.293v4.586h-4.586l1.293-1.293c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-3.707 3.707 3.707 3.707c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-1.293-1.293h4.586v4.586l-1.293-1.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l3.707 3.707 3.707-3.707c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-1.293 1.293v-4.586h4.586l-1.293 1.293c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l3.707-3.707-3.707-3.707z"></path>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sortable;
