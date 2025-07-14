import { produce } from "immer";
import { useEffect, useRef, useState } from "react";
import FieldSwitch from "../../Main/Body/FieldSwitch";
import "./style.scss";

const Sortable = ({ fields, value = {}, onChange,defaultValue }) => {
  const [isDrag, setIsDrag] = useState(false);
  const listRef = useRef(null);

  const def = value || defaultValue;

  const handleDragOver = (e) => e.preventDefault();

  useEffect(() => {
    let dragIdx, dropIdx;
    const children = listRef?.current?.children;

    if (!children) return;

    Array.from(children).forEach((child, index) => {
      child.setAttribute("draggable", isDrag);

      child.ondragstart = (e) => {
        child.style.cursor = "all-scroll";
        e.dataTransfer.setData("text/plain", index);
        dragIdx = index;
      };

      child.ondrop = () => {
        dropIdx = index;
        if (dragIdx !== dropIdx) {
          // Convert fields to array of IDs in current order
          const fieldIds = fields.map(f => f.id);
          // Reorder the IDs
          const [removed] = fieldIds.splice(dragIdx, 1);
          fieldIds.splice(dropIdx, 0, removed);

          // Create new value object with reordered fields
          const newValue = {};
          fieldIds.forEach(id => {
            if (def[id]) {
              newValue[id] = def[id];
            }
          });

          onChange(newValue);
        }
      };
    });
  }, [isDrag, def, onChange, fields]);

  const updateData = (val, fieldId) => {
    const newData = produce(def, draft => {
      draft[fieldId] = val;
    });
    onChange(newData);
  };

  return (
    <div
      className="bPl-sortable-main-wrapper"
      ref={listRef}
      onDragOver={handleDragOver}
    >
      {fields?.map((field, i) => (
        <div className="bPl-single-sortable-wrapper" key={i}>
          <div className="bPl-single-sortable-content-wrapper">
            <div className="bPl-single-sortable-content">
              <div
                onMouseEnter={() => setIsDrag(true)}
                onMouseLeave={() => setIsDrag(false)}
                className="bPl-single-sortable-label"
              >
                {field.title}
              </div>
              <div className="bPl-single-sortable-field">
                <FieldSwitch
                  value={def?.[field.id]}
                  field={field.field}
                  default={field.default}
                  onChange={v => updateData(v, field.id)}
                />
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
              <path d="M17.707 8.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.293 1.293h-4.586v-4.586l1.293 1.293c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-3.707-3.707-3.707 3.707c-.391.391-.391 1.023 0 1.414s1.023.391 1.414 0l1.293-1.293v4.586h-4.586l1.293-1.293c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-3.707 3.707 3.707 3.707c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-1.293-1.293h4.586v4.586l-1.293-1.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l3.707 3.707 3.707-3.707c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-1.293 1.293v-4.586h4.586l-1.293 1.293c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l3.707-3.707-3.707-3.707z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sortable;