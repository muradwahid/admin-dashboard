import React, { useEffect, useRef, useState } from "react";


const Repeater = ({
  children,
  title,
  onChange = () => { },
  toggle = false,
  copy = true,
  delete: del = true,
  index = null,
  handleDelete,
  handleCopy,
  type = "",
}) => {
  const [open, setOpen] = useState(toggle);
  const [width, setWidth] = useState(35);
  const iconGroupRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    onChange(open);
  }, [open, toggle]);
  useEffect(() => {
    const iconGroup = iconGroupRef.current;
    setWidth(iconGroup?.clientWidth);
  }, [width]);

  const headerTitle = (
    <div
      // draggable={true}
      onClick={() => setOpen(!open)}
      className="panel-repeater-header-title"
    >
      <span>
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor"
            fill="currentColor" height="1em"
            width="1em" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
        ) : (

          <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor"
            fill="currentColor" height="1em"
            width="1em" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
        )}
      </span>
      {title ? <p style={{ margin: "0px" }}>{title}</p> : <p className="repeater-title-placeholder" ></p>}
    </div>
  );
  const iconGroup = (
    <div ref={iconGroupRef} className="panel-repeater-icon-group">
      {type !== "group" && (
        <div
          onMouseEnter={() => setIsDragging(true)}
          onMouseLeave={() => setIsDragging(false)}
          className="panel-repeater-icon"
        >
          <svg
            style={{ cursor: "all-scroll" }}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1.2"
            baseProfile="tiny"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.707 8.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.293 1.293h-4.586v-4.586l1.293 1.293c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-3.707-3.707-3.707 3.707c-.391.391-.391 1.023 0 1.414s1.023.391 1.414 0l1.293-1.293v4.586h-4.586l1.293-1.293c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-3.707 3.707 3.707 3.707c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-1.293-1.293h4.586v4.586l-1.293-1.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l3.707 3.707 3.707-3.707c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-1.293 1.293v-4.586h4.586l-1.293 1.293c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l3.707-3.707-3.707-3.707z"></path>
          </svg>
        </div>
      )}
      {type === "group" && (
        <div
          className="panel-repeater-icon"
        >
          <svg
            style={{ cursor: "all-scroll" }}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1.2"
            baseProfile="tiny"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.707 8.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.293 1.293h-4.586v-4.586l1.293 1.293c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-3.707-3.707-3.707 3.707c-.391.391-.391 1.023 0 1.414s1.023.391 1.414 0l1.293-1.293v4.586h-4.586l1.293-1.293c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-3.707 3.707 3.707 3.707c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-1.293-1.293h4.586v4.586l-1.293-1.293c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l3.707 3.707 3.707-3.707c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0l-1.293 1.293v-4.586h4.586l-1.293 1.293c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l3.707-3.707-3.707-3.707z"></path>
          </svg>
        </div>
      )}
      {copy && (
        <div
          onClick={handleCopy ? () => handleCopy(index) : null}
          className="panel-repeater-icon"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M296 48H176.5C154.4 48 136 65.4 136 87.5V96h-7.5C106.4 96 88 113.4 88 135.5v288c0 22.1 18.4 40.5 40.5 40.5h208c22.1 0 39.5-18.4 39.5-40.5V416h8.5c22.1 0 39.5-18.4 39.5-40.5V176L296 48zm0 44.6l83.4 83.4H296V92.6zm48 330.9c0 4.7-3.4 8.5-7.5 8.5h-208c-4.4 0-8.5-4.1-8.5-8.5v-288c0-4.1 3.8-7.5 8.5-7.5h7.5v255.5c0 22.1 10.4 32.5 32.5 32.5H344v7.5zm48-48c0 4.7-3.4 8.5-7.5 8.5h-208c-4.4 0-8.5-4.1-8.5-8.5v-288c0-4.1 3.8-7.5 8.5-7.5H264v128h128v167.5z"></path>
          </svg>
        </div>
      )}
      {del && (
        <div
          onClick={handleDelete ? () => handleDelete(index) : null}
          className="panel-repeater-icon"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 384 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
          </svg>
        </div>
      )}
    </div>
  );

  return (
    <div {...(type !== "group" && isDragging ? { draggable: true } : {})}>
      <style>
        {`
        .panel-repeater-wrapper
          .panel-repeater-header-wrapper
          .panel-repeater-header-title {
          width: calc(100% - ${width}px);
          }
          .panelChildrenWrapper{
            width: calc(100% - ${width}px);
        }

        `}
      </style>
      <div className="panel-repeater-wrapper">
        {type === "group" ? (
          <>
            <div draggable={true} className="panel-repeater-header-wrapper">
              {headerTitle}
              {iconGroup}
            </div>
            {open && (
              <div
                style={{
                  border: "1px solid #ccc",
                  borderTop: "none",
                }}
              >
                {children}
              </div>
            )}
          </>
        ) : (
          <div className="panel-without-group-wrapper">
            <div
              style={{ width: `calc(100% - ${width}px)` }}
              className="panelChildrenWrapper"
            >
              {children}
            </div>
            {iconGroup}
          </div>
        )}
      </div>
    </div>
  );
};

export default Repeater;
