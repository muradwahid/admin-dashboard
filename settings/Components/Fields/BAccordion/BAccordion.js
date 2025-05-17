import React, { Fragment, useEffect, useState } from "react";
import FieldSwitch from "../../Main/Body/FieldSwitch";
import "./style.scss";
const BAccordion = ({ fields, value, onChange }) => {
  const [data, setData] = useState(value || {});

  useEffect(() => {
    const titleWrapper = document.querySelectorAll(".bPl-accordion-title-wrapper");
    const bodyWrapper = document.querySelectorAll(".bPl-accordion-body-wrapper");
    Array.from(titleWrapper)?.forEach((el, idx) => {
      el.onclick = () => {
        const toggleEl = bodyWrapper[idx]
        const svg = el.querySelector("h4>svg");
        if (toggleEl.classList.contains("hidden")) {
          toggleEl.classList.remove("hidden");
          svg.style.transform = "rotate(90deg)";
        } else {
          toggleEl.classList.add("hidden");
          svg.style.transform = "rotate(0deg)";
        }
      }
    })

  })

  useEffect(() => {
    onChange(data)
  }, [data])


  return <Fragment>
    {
      fields.map((field, index) => {
        const { id, icon = null } = field;
        return <div key={index} className="bPl-accordion-main-wrapper">
          <div
            className="bPl-accordion-title-wrapper"
          >
            <h4 className="bPl-accordion-title">
              {
                icon ? <span dangerouslySetInnerHTML={{ __html: icon }} /> :
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    height="14px"
                  >
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>
              }
              <span>{field?.title}</span>
            </h4>
          </div>
          <div className="bPl-accordion-body-wrapper hidden">
            {
              field?.fields?.map((f, i) => {
                return <div key={i} className="bPl-accordion-single-field">
                  <div className="bPl-accordion-field-title">{f?.title}</div>
                  <div className="bPl-accordion-field">
                    <FieldSwitch attributes={f?.attributes} {...f} extraField={f} value={value?.[id]?.[f?.id]} onChange={val => setData({ ...value, [id]: { ...value?.[id], [f.id]: val } })} />
                  </div>
                </div>
              })
            }
          </div>

        </div>
      })
    }
  </Fragment>
};

export default BAccordion;
