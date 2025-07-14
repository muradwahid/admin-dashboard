
import { produce } from "immer";
import { memo, useEffect, useRef, useState } from "react";
import FieldSwitch from "../../Main/Body/FieldSwitch";
import Button from "../Button/Button";
import Repeater from "./Repeater";
import "./repeaterStyle.scss";

const BPanelRepeater = (props) => {
  const {
    value = [],
    fields,
    onChange,
    isLoading,
    type,
    min,
    max,
    default: defaultFields = [],
    button_title
  } = props;

  const listRef = useRef(null);
  const [minError, setMinError] = useState(false);
  const [maxError, setMaxError] = useState(false);
  const [data, setData] = useState(value);
  const v = data[0]?.id ? defaultFields : data;
  // Data transformation helpers
  // const transformField = (field) => ({
  //   [field.id]: '',
  //   title: field.title,
  //   field: field.field,
  //   id: field.id,
  //   default: field?.default
  // });

  // const transformItem = (item) => {
  //   const newItem = {
  //     [item.id]: '',
  //     title: item.title,
  //     id: item.id,
  //     default: item?.default
  //   };

  //   if (item?.fields) {
  //     newItem.fields = item.fields.map(transformField);
  //   }
  //   return newItem;
  // };
  // console.log(fields);
  // const transformArray = (arr = []) => arr.map(transformItem);

  // Event handlers
  const handleDragOver = (e) => e.preventDefault();

  const handleDelete = (idx) => {
    if (!confirm('Are you sure to delete this item?')) return;

    setMaxError(false);
    if (data.length === min) {
      setMinError(true);
      return;
    }
    const newData = data.filter((_, index) => index !== idx);
    onChange(newData);
    setData(newData);
  };

  const handleCopy = (idx) => {
    const newData = [...data];
    const copiedItem = { ...newData[idx] };
    newData.splice(idx, 0, copiedItem);
    setData(newData);
  };


  const addNewRepeater = () => {
    setMinError(false);
    if (max === data.length && max !== undefined && max !== null) {
      setMaxError(true);
      return;
    }
    const newItem = fields.reduce((acc, field) => {
      acc[field.id] = "";
      return acc;
    }, {});
    setData([...data, newItem])
  };

  const updateData = (index, val, property = null, childProperty = null, prop = null) => {
    const newData = produce(data, draft => {
      if (!draft[index]) draft[index] = {};
      if (!draft[index][property]) draft[index][property] = {};

      if (null !== property && null !== childProperty && null !== prop) {
        draft[index][property][childProperty][prop] = val;
      } else if (null !== property && null !== childProperty) {
        draft[index][property][childProperty] = val;
      } else if (null !== property) {
        draft[index][property] = val;
      } else {
        draft[index] = val;
      }
    });
    setData(newData);
  };

  // Effects
  useEffect(() => {
    onChange(data);
  }, [data]);

  // useEffect(() => {
  //   if (!value?.length && !value.includes("removed") && !isLoading) {
  //     setData(transformArray(fields));
  //   } else {
  //     setData(value);
  //   }
  // }, [isLoading]);

  useEffect(() => {
    let dragIdx, dropIdx;
    if (!listRef?.current?.children) return;

    Array.from(listRef.current.children).forEach((child, index) => {
      child.ondragstart = (e) => {
        e.dataTransfer.setData("text/plain", index);
        dragIdx = index;
      };

      child.ondrop = () => {
        dropIdx = index;
        if (dragIdx !== dropIdx) {
          const newItems = [...data];
          const [removed] = newItems.splice(dragIdx, 1);
          newItems.splice(dropIdx, 0, removed);
          setData(newItems);
        }
      };
    });
  });

  if (isLoading) return null;

  // Render
  return (
    <div>
      <div ref={listRef} onDragOver={handleDragOver} className="bPl-panel-repeater-main-wrapper">
        {v && v?.map((field, i) => (
          <Repeater
            key={i}
            title={field?.title}
            index={i}
            type={type}
            handleDelete={() => handleDelete(i)}
            handleCopy={() => handleCopy(i)}
          >
            {fields?.map((val, idx) => (
              <div key={idx} className="bPl-repeater-single-field-wrapper">
                <div className="bPl-repeater-label">{val?.title}</div>
                <div className="bPl-repeater-singleField">
                  <FieldSwitch
                    fields={field?.fields}
                    field={val?.field}
                    default={val?.default}
                    value={field?.[val?.id]}
                    onChange={e => updateData(i, e, 'fields', idx, val?.id)}
                  />
                </div>
              </div>
            ))}
          </Repeater>
        ))}
      </div>

      {maxError && <div className="bPl-repeater-alert">You cannot add more.</div>}
      {minError && <div className="bPl-repeater-alert">You cannot remove more.</div>}

      {type === "group" ? (
        <Button variant="primary" onClick={addNewRepeater}>
          {button_title || "Add New"}
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={addNewRepeater}
          style={{ display: "flex", alignItems: "center" }}
        >
          {button_title || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              style={{ margin: "0px" }}
              height={15}
              viewBox="0 0 512 512"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
            </svg>
          )}
        </Button>
      )}
    </div>
  );
};

export default memo(BPanelRepeater);