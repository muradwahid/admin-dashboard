import { produce } from "immer";
import { memo, useEffect, useRef, useState } from "react";
import FieldSwitch from "../../Main/Body/FieldSwitch";
import Button from "../Button/Button";
import Repeater from "./Repeater";
import "./repeaterStyle.scss";

const BPanelRepeater = (props) => {
  const { value = [], fields, onChange, isLoading, type, min, max, defaultFields = [], button_title } = props;

  const listRef = useRef(null);
  const [minError, setMinError] = useState(false);
  const [maxError, setMaxError] = useState(false);
  const [data, setData] = useState(value)
  useEffect(() => {
    onChange(data)
  }, [data])
  function transformArray(arr = []) {
    return arr.map(item => {
      const newItem = {
        [item.id]: '',
        title: item.title,
        id: item.id,
        default: item?.default
      };
      if (item?.fields) {
        newItem.fields = item?.fields?.map(field => ({
          [field.id]: '',
          title: field.title,
          field: field.field,
          id: field.id,
          default: field?.default
        }));
      }
      return newItem;
    });
  }



  const transformedArray = transformArray(fields);

  useEffect(() => {
    if (!value?.length && !value.includes("removed") && !isLoading) {
      setData(transformedArray);
    } else {
      setData(value)
    }
  }, [isLoading])
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  // sort function
  useEffect(() => {
    let dragIdx, dropIdx;
    if (listRef?.current?.children) {
      Array.from(listRef?.current?.children).forEach((child, index) => {
        //drag start
        child.ondragstart = (e) => {
          e.dataTransfer.setData("text/plain", index);
          dragIdx = index;
        };

        // drop event
        child.ondrop = () => {
          dropIdx = index;
          if (dragIdx !== dropIdx) {
            // const newItems = [...value];
            const newItems = [...data];
            const [removed] = newItems.splice(dragIdx, 1);
            newItems.splice(dropIdx, 0, removed);
            // onChange(newItems);
            setData(newItems);
          }
        };
      });
    }
  });

  if (isLoading) return;


  const updateData = (index, val, property = null, childProperty = null, prop = null) => {
    const newData = produce(data, draft => {
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
    // onChange(newData);
    setData(newData);
  }

  const handleDelete = (idx) => {
    if (confirm('Are you sure to delete this item?')) {
      setMaxError(false);
      if (data.length === min) {
        setMinError(true);
      } else {
        if (data.length === 1) {
          onChange(['removed'])
        } else {
          const newData = [...data];
          newData.splice(idx, 1);
          onChange(newData)
        }
      }
      // if (value.length === min) {
      //   setMinError(true);
      // } else {
      //   if (value.length === 1) {
      //     onChange(['removed'])
      //   } else {
      //     const newData = [...value];
      //     newData.splice(idx, 1);
      //     onChange(newData)
      //   }
      // }
    }
  }

  const handleCopy = (idx) => {
    // const newData = [...value];
    const newData = [...data];
    const copiedItem = { ...newData[idx] };
    newData.splice(idx, 0, copiedItem);
    // onChange(newData)
    setData(newData)
  }

  const addNewRepeater = () => {
    setMinError(false);
    if (max === data.length && max !== undefined && max !== null) {
      setMaxError(true);
      return;
    } else {
      if (fields?.length > 0 && !data?.includes('removed') && !defaultFields.length) {
        const storeItem = fields[0];
        const uId = Math.floor(Math.random() * 999);
        const newItem = {
          [`${storeItem?.id}_${uId}`]: "",
          title: "",
          id: `${storeItem?.id}_${uId}`,
          fields: storeItem?.fields?.map((item, i) => {
            return {
              id: `${item?.id}_${uId}_${i}`,
              [`${item?.id}_${uId}_${i}`]: "",
              title: item.title,
              field: item.field,
            }
          })
        }
        setData([...data, newItem])

      } else {
        const uId = Math.floor(Math.random() * 999);
        if (defaultFields?.length > 0) {
          const newItem = {
            [`repeater_${uId}`]: "",
            title: "",
            id: `repeater_${uId}`,
            fields: defaultFields?.map((f) => {
              return {
                id: f?.id,
                [f?.id]: "",
                title: f?.title,
                field: f.field,
              }
            })
          }
          if (!data.length || data?.includes('removed')) {
            setData([newItem])
          } else {
            setData([...data, newItem])
          }
        } else {
          const newItem = {
            [`repeater_${uId}`]: "",
            title: "",
            id: `repeater_${uId}`,
            fields: [
              {
                id: `text_field_${uId}`,
                [`text_field_${uId}`]: "",
                title: "Text",
                field: 'text',
              }
            ]
          }
          if (data?.includes('removed')) {
            setData([newItem])
          } else {
            setData([...data, newItem])
          }
        }
      }
    }

    // if (max === value.length && max !== undefined && max !== null) {
    //   setMaxError(true);
    //   return;
    // } else {
    //   if (fields?.length > 0 && !value?.includes('removed') && !defaultFields.length) {
    //     const storeItem = fields[0];
    //     const uId = Math.floor(Math.random() * 999);
    //     const newItem = {
    //       [`${storeItem?.id}_${uId}`]: "",
    //       title: "",
    //       id: `${storeItem?.id}_${uId}`,
    //       fields: storeItem?.fields?.map((item, i) => {
    //         return {
    //           id: `${item?.id}_${uId}_${i}`,
    //           [`${item?.id}_${uId}_${i}`]: "",
    //           title: item.title,
    //           field: item.field,
    //         }
    //       })
    //     }
    //     onChange([...value, newItem])

    //   } else {
    //     const uId = Math.floor(Math.random() * 999);
    //     if (defaultFields?.length > 0) {
    //       const newItem = {
    //         [`repeater_${uId}`]: "",
    //         title: "",
    //         id: `repeater_${uId}`,
    //         fields: defaultFields?.map((f, idx) => {
    //           return {
    //             id: f?.id,
    //             [f?.id]: "",
    //             title: f?.title,
    //             field: f.field,
    //           }
    //         })
    //       }
    //       if (!value.length || value?.includes('removed')) {
    //         onChange([newItem])
    //       } else {
    //         onChange([...value, newItem])
    //       }
    //     } else {
    //       const newItem = {
    //         [`repeater_${uId}`]: "",
    //         title: "",
    //         id: `repeater_${uId}`,
    //         fields: [
    //           {
    //             id: `text_field_${uId}`,
    //             [`text_field_${uId}`]: "",
    //             title: "Text",
    //             field: 'text',
    //           }
    //         ]
    //       }
    //       if (value?.includes('removed')) {
    //         onChange([newItem])
    //       } else {
    //         onChange([...value, newItem])
    //       }
    //     }
    //   }
    // }
  }





  return (
    <div>
      <div ref={listRef} onDragOver={handleDragOver} className="bPl-panel-repeater-main-wrapper">
        {
          data && !data?.includes('removed') && data?.map((field, i) => {
            return <Repeater title={field?.title} key={i} index={i} type={type} handleDelete={(val) => handleDelete(val)} handleCopy={val => handleCopy(val)} >
              {
                field?.fields?.map((val, idx) => {
                  return <div key={idx} className="bPl-repeater-single-field-wrapper">
                    <div className="bPl-repeater-label">{val?.title}</div>
                    <div className="bPl-repeater-singleField">
                      <FieldSwitch fields={field?.fields} field={val?.field} default={val?.default} value={val?.[val?.id]} onChange={e => updateData(i, e, 'fields', idx, val?.id)} />
                    </div>
                  </div>
                })
              }
            </Repeater>
          })
        }
        {/* {
          value && !value?.includes('removed') && value?.map((field, i) => {
            return <Repeater title={field?.title} key={i} index={i} type={type} handleDelete={(val) => handleDelete(val)} handleCopy={val => handleCopy(val)} >
              {
                field?.fields?.map((val, idx) => {
                  return <div key={idx} className="bPl-repeater-single-field-wrapper">
                    <div className="bPl-repeater-label">{val?.title}</div>
                    <div className="bPl-repeater-singleField">
                      <FieldSwitch fields={field?.fields} field={val?.field} default={val?.default} value={val?.[val?.id]} onChange={e => updateData(i, e, 'fields', idx, val?.id)} />
                    </div>
                  </div>
                })
              }
            </Repeater>
          })
        } */}

      </div>
      {
        maxError && <div className="bPl-repeater-alert"> You cannot add more.</div>
      }
      {minError && <div className="bPl-repeater-alert"> You cannot remove more.</div>}
      {
        type === "group" ?
          <Button variant="primary" onClick={addNewRepeater}>{button_title ? button_title : "Add New"}</Button> :
          <Button variant="primary" onClick={addNewRepeater} style={{ display: "flex", alignItems: "center" }}>{button_title ? button_title : <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" style={{ margin: "0px" }} height={15} viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>}</Button>
      }
    </div>
  );
};

export default memo(BPanelRepeater);
