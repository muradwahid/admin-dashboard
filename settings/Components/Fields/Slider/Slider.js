import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit,
  defaultValue = 0,
}) {
  const sliderWrapperRef = useRef(null);
  const controlRef = useRef(null);
  const [sliderValue, setSliderValue] = useState(0);
  const def = Number(value || defaultValue);

  useEffect(() => {
    const initialValue = ((def || min) - min) / (max - min);
    setSliderValue(initialValue);
    const control = controlRef.current;
    if (control) {
      const sliderWrapper = sliderWrapperRef.current;
      control.style.left = `${initialValue * sliderWrapper.offsetWidth}px`;
    }
  }, [def, min, max]);

  const formatValue = (value) => {
    // Convert to number and check if it is an integer
    const numValue = Number(value);
    return Number.isInteger(numValue)
      ? numValue.toString()
      : numValue.toFixed(1);
  };

  useEffect(() => {
    const sliderWrapper = sliderWrapperRef.current;
    const control = controlRef.current;

    let isDragging = false;
    let startX = 0;

    const startDrag = (event) => {
      isDragging = true;
      startX = event.clientX - control.offsetLeft;
    };

    const drag = (event) => {
      if (!isDragging) return;

      const deltaX = event.clientX - startX;
      const newX = Math.max(
        0,
        Math.min(sliderWrapper.offsetWidth - control.offsetWidth, deltaX)
      );

      const newSliderValue =
        Math.round(((newX / sliderWrapper.offsetWidth) * (max - min)) / step) *
        step;

      setSliderValue(newSliderValue / (max - min));
      const calculatedValue = newSliderValue + min;
      onChange(formatValue(calculatedValue));
    };

    const startClick = (event) => {
      const offsetX = event.clientX - sliderWrapper.offsetLeft;
      const newSliderValue =
        Math.round(
          ((offsetX / sliderWrapper.offsetWidth) * (max - min)) / step
        ) * step;

      setSliderValue(newSliderValue / (max - min));
      const calculatedValue = newSliderValue + min;
      onChange(formatValue(calculatedValue));
    };

    const endDrag = () => {
      isDragging = false;
    };

    sliderWrapper.addEventListener("mousedown", startDrag);
    sliderWrapper.addEventListener("click", startClick);
    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", endDrag);

    return () => {
      sliderWrapper.removeEventListener("mousedown", startDrag);
      sliderWrapper.removeEventListener("click", startClick);
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("mouseup", endDrag);
    };
  }, [max, min]);

  const calculatedValue = formatValue(sliderValue * (max - min) + min);

  return (
    <div className="bPl-range-control-main-wrapper">
      <div className="bPl-range-control-wrapper" ref={sliderWrapperRef}>
        <div
          className="bPl-range-control-slider"
          style={{ width: `${sliderValue * 100}%` }}
        ></div>
        <div
          className="bPl-range-control"
          ref={controlRef}
          style={{ left: `${sliderValue * 100}%` }}
        ></div>
      </div>
      <div className="bPl-rangeControl-input-field">
        <input
          type="number"
          value={calculatedValue}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            if (newValue >= min && newValue <= max) {
              onChange(newValue);
              const newSliderValue = (newValue - min) / (max - min);
              setSliderValue(newSliderValue);
            }
          }}
          className="bPl-rangeControl-input"
          min={min}
          max={max}
          step={step}
        />
        {unit && <div className="bPl-rangeControl-unit">{unit}</div>}
      </div>
    </div>
  );
}

export default Slider;
