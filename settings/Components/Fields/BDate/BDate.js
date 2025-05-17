/* eslint-disable no-unused-vars */
import { format } from "date-fns";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./style.scss";
const BDate = ({
  value,
  onChange,
  text_from = "from",
  text_to = "to",
  from_to = false,
  settings = {}
}) => {
  const { enableTime = false, calender = true, time_24hr = false, readOnly = false, showWeek = false, weekHeader = "Week", changeYear = false, changeMonth = false, dateFormat = 'dd/MM/yyy', startWeek = 7, mode = "single" } = settings;
  const [time, setTime] = useState({ time: "PM" });
  const [label, setLabel] = useState(false)
  const [toggle, setToggle] = useState({
    from: false,
    to: false,
    time: false,
  });
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const labelRef = useRef(null);
  const timeRef = useRef(null);
  const layout =
    changeYear && changeMonth
      ? "dropdown"
      : changeYear
        ? "dropdown-years"
        : changeMonth
          ? "dropdown-months"
          : "label";

  useEffect(() => {
    const handle = (e) => {
      if (!labelRef?.current?.contains(e.target)) {
        setLabel(false)
        setToggle({ ...toggle, time: true });
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, []);
  useEffect(() => {
    const handle = (e) => {
      if (!timeRef?.current?.contains(e.target)) {
        setToggle({ ...toggle, time: false });
      }
    };

    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, []);
  const formattedDate = (d) => {
    return format(d, dateFormat);
  };



  const getDateTime = new Date();
  const hour = time_24hr ? getDateTime.getHours() : String(Math.abs(getDateTime.getHours() - 12)).padStart(2, '0');
  const minute = getDateTime.getMinutes();
  const amPm = getDateTime.getHours() >= 12 ? "PM" : "AM";
  const am = value?.time?.am || amPm;

  useEffect(() => {
    const captions = document.querySelectorAll('.rdp-month_caption');
    captions?.forEach((caption) => {
      caption.onclick = () => {
        setToggle({
          ...toggle,
          label: true,
          from: true,
          to: true,
          time: true,
        })
      }
    })
  }, [value]);
  return (
    <div className="bPl-dayPicker-main-wrapper">
      {calender && (
        <Fragment>
          {!from_to ? (
            <div>
              {enableTime ? <input
                onClick={() => {
                  setLabel(true)
                }
                }
                type="text"
                className="bPl-dayPicker-input"
                value={value?.date ? value?.date + " " + value?.time?.hour + ":" + value?.time?.minute : ""}
                onChange={(e) => {
                  const [d, t] = e.target.value?.split(" ") || [];

                  const [h = "00", m = "00"] = t?.split(":") || [];

                  const newValue = {
                    ...value,
                    date: d,
                    time: {
                      ...value?.time,
                      hour: h,
                      minute: m
                    }
                  };
                  onChange(newValue);
                }}
                readOnly={readOnly}
              />
                :
                mode === 'range' ? <input
                  onClick={() => {
                    setLabel(true)
                  }
                  }
                  type="text"
                  className="bPl-dayPicker-input"
                  value={value?.fromTo ? `${formattedDate(value?.fromTo?.from)} to ${formattedDate(value?.fromTo?.to)}` : ""}
                  onChange={(e) => onChange({ date: e.target.value })}
                  readOnly={readOnly}
                /> : <input
                  onClick={() => {
                    setLabel(true)
                  }
                  }
                  type="text"
                  className="bPl-dayPicker-input"
                  value={value?.date ? formattedDate(value?.date) : ""}
                  onChange={(e) => onChange({ date: e.target.value })}
                  readOnly={readOnly}
                />
              }
              <div
                ref={labelRef}
                className={`bPl-dayPicker-wrapper ${label ? "active" : ""
                  }`}
              >
                {mode === "range" ? <DayPicker
                  weekStartsOn={startWeek}
                  captionLayout={layout}
                  startMonth={new Date(1915, 6)}
                  endMonth={new Date(2099, 9)}
                  mode='range'
                  month={month}
                  onMonthChange={setMonth}
                  year={year}
                  onYearChange={setYear}
                  showWeekNumber={showWeek}
                  components={{
                    ...(weekHeader
                      ? {
                        WeekNumberHeader: () => {
                          return (
                            <th className="rdp-weekday">{weekHeader}</th>
                          );
                        },
                      }
                      : {}),
                  }}
                  selected={value?.fromTo ? value.fromTo : ''}
                  onSelect={(val) => {
                    onChange({ fromTo: val })
                  }}
                /> : <DayPicker
                  weekStartsOn={startWeek}
                  captionLayout={layout}
                  startMonth={new Date(1915, 6)}
                  endMonth={new Date(2099, 9)}
                  mode={mode === "range" ? 'single' : mode}
                  month={month}
                  onMonthChange={setMonth}
                  year={year}
                  onYearChange={setYear}
                  showWeekNumber={showWeek}
                  components={{
                    ...(weekHeader
                      ? {
                        WeekNumberHeader: () => {
                          return (
                            <th className="rdp-weekday">{weekHeader}</th>
                          );
                        },
                      }
                      : {}),
                  }}
                  onDayClick={(val) => {
                    setLabel(false)
                    if (enableTime) {
                      onChange({ ...value, date: formattedDate(val), time: { ...time, minute, hour } })
                    } else {
                      onChange({ date: val })
                    }
                  }}
                  selected={value?.date}
                  onSelect={(val) => {
                    if (enableTime) {
                      onChange({ ...value, date: formattedDate(val), time: { ...time, minute, hour } })
                    } else {
                      onChange({ date: val })
                    }
                  }}
                />

                }
                {enableTime && (
                  <div className="bPl-calenderTime-wrapper">
                    <div className="bPl-numberInput-wrapper">
                      <input
                        className="bPl-dateTimeInput"
                        type="number"
                        name=""
                        id=""
                        max={24}
                        min={1}
                        value={value?.time?.hour || hour}
                        onChange={(e) => {
                          let newHour = parseInt(e.target.value, 10);

                          if (time_24hr) {
                            if (newHour > 23) {
                              newHour = 0;
                            } else if (newHour < 0) {
                              newHour = 23;
                            }
                          } else {
                            if (newHour > 12) {
                              newHour = 1;
                            } else if (newHour < 1) {
                              newHour = 12;
                            }
                          }

                          onChange({
                            ...value,
                            time: {
                              ...value?.time,
                              hour: newHour.toString().padStart(2, "0"),
                              am: !time_24hr && newHour >= 12 ? "PM" : "AM",
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="bPl-time-separator">:</div>
                    <div className="bPl-numberInput-wrapper">
                      <input
                        className="bPl-dateTimeInput"
                        style={{ fontWeight: "400" }}
                        type="number"
                        min={1}
                        name=""
                        id=""
                        value={value?.time?.minute || minute}
                        onChange={(e) => {
                          let minute = parseInt(e.target.value, 10);

                          if (minute > 59) {
                            minute = 0;
                          } else if (minute < 0) {
                            minute = 59;
                          }
                          onChange({
                            ...value,
                            time: {
                              ...value?.time,
                              minute: minute.toString().padStart(2, "0"),
                            },
                          });
                        }}
                      />
                    </div>
                    {!time_24hr && <div className="bPl-am-pm-picker">
                      {am === "AM" ? (
                        <span
                          onClick={() =>
                            onChange({
                              ...value,
                              time: { ...value?.time, am: "PM" },
                            })
                          }
                        >
                          AM
                        </span>
                      ) : (
                        <span
                          onClick={() =>
                            onChange({
                              ...value,
                              time: { ...value?.time, am: "AM" },
                            })
                          }
                        >
                          PM
                        </span>
                      )}
                    </div>}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                onClick={() => setToggle({ ...toggle, from: true, to: false })}
                htmlFor=""
                style={{
                  textTransform: "capitalize",
                  fontSize: "14px",
                  position: "relative",
                }}
              >
                {text_from}
                <div
                  style={{
                    position: "absolute",
                    border: "1px solid #777",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                  className={`bPl-dayPicker ${toggle.from ? "active" : ""}`}
                >
                  <DayPicker
                    weekStartsOn={startWeek}
                    captionLayout={layout}
                    startMonth={new Date(1915, 6)}
                    endMonth={new Date(2099, 9)}
                    mode={mode}
                    month={month}
                    onMonthChange={setMonth}
                    year={year}
                    onYearChange={setYear}
                    showWeekNumber={showWeek}
                    components={{
                      ...(weekHeader
                        ? {
                          WeekNumberHeader: () => {
                            return (
                              <th className="rdp-weekday">{weekHeader}</th>
                            );
                          },
                        }
                        : {}),
                    }}
                    onDayClick={(val) => {
                      onChange({ ...value, from: val })
                    }}
                    onSelect={(val) => {
                      onChange({ ...value, from: val })
                    }}
                    selected={value?.from}
                  />
                </div>
                <input
                  style={{ marginLeft: "5px" }}
                  onClick={() =>
                    setToggle({ ...toggle, from: true, to: false })
                  }
                  type="text"
                  className="bPl-dayPicker-input"
                  value={value?.from ? formattedDate(value?.from) : ""}
                  onChange={(e) => onChange({ ...value, from: e.target.value })}
                />
              </label>
              <label
                onClick={() => setToggle({ ...toggle, from: false, to: true })}
                htmlFor=""
                style={{
                  textTransform: "capitalize",
                  marginLeft: "10px",
                  fontSize: "14px",
                  position: "relative",
                }}
              >
                {text_to}

                <div
                  style={{
                    position: "absolute",
                    border: "1px solid #777",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                  className={`bPl-dayPicker ${toggle.to ? "active" : ""}`}
                >
                  <DayPicker
                    weekStartsOn={startWeek}
                    captionLayout={layout}
                    startMonth={new Date(1915, 6)}
                    endMonth={new Date(2099, 9)}
                    mode={mode}
                    month={month}
                    onMonthChange={setMonth}
                    year={year}
                    onYearChange={setYear}
                    showWeekNumber={showWeek}
                    components={{
                      ...(weekHeader
                        ? {
                          WeekNumberHeader: () => {
                            return (
                              <th className="rdp-weekday">{weekHeader}</th>
                            );
                          },
                        }
                        : {}),
                    }}
                    onDayClick={(val) => {
                      onChange({ ...value, to: val })
                      setToggle({ ...toggle, from: false, to: false })
                    }}

                    onSelect={(val) => {
                      onChange({ ...value, to: val })
                    }}
                    selected={value?.to}
                  />
                </div>
                <input
                  style={{ marginLeft: "5px" }}
                  onClick={() =>
                    setToggle({ ...toggle, to: true, from: false })
                  }
                  type="text"
                  className="bPl-dayPicker-input"
                  value={value?.to ? formattedDate(value?.to) : ""}
                  onChange={(e) => onChange({ ...value, to: e.target.value })}
                />
              </label>
            </div>
          )}
        </Fragment>
      )}

      {/* time */}
      {!calender && enableTime && (
        <div style={{ border: "none" }} className="bPl-calenderTime-wrapper">
          <input
            onClick={() => setToggle({ ...toggle, time: true })}
            type="text"
            className="bPl-timePicker-input"
            value={
              (value?.time?.hour || hour) +
              ":" +
              (value?.time?.minute || minute)
            }
            onChange={(e) => {
              const [hour, minute] = e.target.value.split(":");
              onChange({
                ...value,
                time: {
                  ...value.time,
                  hour,
                  minute,
                },
              });
            }}
          />
          <div
            ref={timeRef}
            onClick={() => setToggle({ ...toggle, time: true })}
            className={`bPl-timeWrapper ${toggle?.time ? "active" : ""}`}
          >
            <svg
              style={{
                position: "absolute",
                top: "-8px",
                left: "25px",
                fill: "#fff",
              }}
              height={15}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
            </svg>
            <div className="bPl-numberInput-wrapper">
              <input
                className="bPl-dateTimeInput"
                type="number"
                name=""
                id=""
                max={24}
                min={1}
                value={value?.time?.hour || hour}
                onChange={(e) => {
                  let newHour = parseInt(e.target.value, 10);

                  if (time_24hr) {
                    if (newHour > 23) {
                      newHour = 0;
                    } else if (newHour < 0) {
                      newHour = 23;
                    }
                  } else {
                    if (newHour > 12) {
                      newHour = 1; 
                    } else if (newHour < 1) {
                      newHour = 12;
                    }
                  }

                  onChange({
                    ...value,
                    time: {
                      ...value?.time,
                      hour: newHour.toString().padStart(2, "0"),
                      am: !time_24hr && newHour >= 12 ? "PM" : "AM",
                    },
                  });
                }}
              />
            </div>
            <div className="bPl-time-separator">:</div>
            <div className="bPl-numberInput-wrapper">
              <input
                className="bPl-dateTimeInput"
                style={{ fontWeight: "400" }}
                type="number"
                min={1}
                name=""
                id=""
                value={value?.time?.minute || minute}
                onChange={(e) => {
                  let minute = parseInt(e.target.value, 10);

                  if (minute > 59) {
                    minute = 0;
                  } else if (minute < 0) {
                    minute = 59;
                  }
                  onChange({
                    ...value,
                    time: {
                      ...value?.time,
                      minute: minute.toString().padStart(2, "0"),
                    },
                  });
                }}
              />
            </div>
            <div className="bPl-am-pm-picker">
              {am === "AM" ? (
                <span
                  onClick={() =>
                    onChange({
                      ...value,
                      time: { ...value?.time, am: "PM" },
                    })
                  }
                >
                  AM
                </span>
              ) : (
                <span
                  onClick={() =>
                    onChange({
                      ...value,
                      time: { ...value?.time, am: "AM" },
                    })
                  }
                >
                  PM
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BDate;
