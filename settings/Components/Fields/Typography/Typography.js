import { __experimentalUnitControl as UnitControl } from "@wordpress/components";
import React, { useEffect, useState } from "react";
import BSelectControl from "../BSelectControl/BSelectControl";
import ColorPicker from "../ColorPicker/ColorPicker";
import fontLists from "./fontLists";
import {
  fontVariantsOption,
  textDecorations,
  textTransforms,
  toggleOffIcon,
  toggleOnIcon,
  typoFontVariant,
  typoTextAlignOpts,
} from "./options";
import "./style.scss";
const Typography = ({ value, onChange, defaultValue,
  font_family = true,
  font_weight = true,
  text_align = true,
  font_variant = false,
  text_transform = true,
  font_size = true,
  line_height = true,
  letter_spacing = true,
  color = true,
  word_spacing = false,
  text_decoration = false,
}) => {
  const [toggle, setToggle] = useState(false);
  const def = value || defaultValue;

  const fonts = fontLists.map(({ family }) => ({
    label: family,
    value: family,
  }));

  let fontWeight = [];
  const variants = fontLists?.filter(
    ({ family }) => family === def?.["font-family"]
  )[0]?.variants;

  variants?.forEach((val) => {
    const fontVariant = fontVariantsOption.find(
      ({ value: variantValue }) => variantValue === val.toString()
    );
    if (fontVariant) {
      fontWeight.push({ label: fontVariant.label, value: fontVariant.value });
    } else {
      fontWeight = [];
    }
  });

  const linkQuery = !def?.["font-weight"] || 400 === def?.["font-weight"] ? '' : '400i' === def?.["font-weight"] ? ':ital@1' : def?.["font-weight"]?.includes('00i') ? `: ital, wght@1, ${def?.["font-weight"]?.replace('00i', '00')} ` : `: wght@${def?.["font-weight"]} `;

  const link = `https://fonts.googleapis.com/css2?family=${value?.["font-family"]?.split(' ').join('+')}${linkQuery.replace(/ /g, '')}&display=swap`;

  const font = value?.["font-family"] ? `@import url(${link});` : "";
  const id = Math.floor(Math.random() * 99999);

  const isUnitShow = font_size || line_height || letter_spacing || word_spacing;

  const [hasChanged, setHasChanged] = useState(false);
  // Ref to store the previous background state  



  useEffect(() => {
    if (value) {
      setHasChanged(true);
    }
  }, [value]);


  return (
    <div className="bPl-typography-main-wrapper">
      <style>{`
      ${font}
        .typo-preview-${id}{
          ${def?.["font-family"] ? `font-family: ${def?.["font-family"]};` : ""}
          ${def?.["font-weight"] ? `font-weight: ${def?.["font-weight"]?.includes("00i") ? def?.["font-weight"].slice(0, 3) : def?.["font-weight"]};` : ""}
          ${def?.["font-weight"]?.includes("00i") ? "font-style:italic;" : ""}
          ${def?.["text-align"] ? `text-align: ${def?.["text-align"]};` : ""}
          ${def?.["font-variant"] ? `font-variant: ${def?.["font-variant"]};` : ""}
          ${def?.["text-transform"] ? `text-transform: ${def?.["text-transform"]};` : ""}
          ${def?.["font-size"] ? `font-size: ${def?.["font-size"]} !important;` : ""}
          ${def?.["line-height"] ? `line-height: ${def?.["line-height"]} !important;` : ""}
          ${def?.["letter-spacing"] ? `letter-spacing: ${def?.["letter-spacing"]};` : ""}
          ${def?.["text-decoration"] ? `text-decoration: ${def?.["text-decoration"]};` : ""}
          ${def?.["color"] ? `color: ${def?.["color"]};` : ""}
          ${def?.["word-spacing"] ? `word-spacing: ${def?.["word-spacing"]};` : ""}

        }
      `.replace(/\s+/g, ' ').trim()}</style>
      <div className="bPl-typography-selectField-wrapper">
        {font_family && <div className="bPl-typography-selectField">
          <label className="bPl-typography-label">Font Family</label>
          <BSelectControl
            options={fonts}
            value={def?.["font-family"]}
            onChange={(val) => onChange({ ...def, ["font-family"]: val })}
          />
        </div>}
        {
          fontWeight.length > 0 && font_weight && <div className="bPl-typography-selectField">
            <label className="bPl-typography-label">Font Style</label>
            <BSelectControl
              options={fontWeight}
              value={def?.["font-weight"]}
              onChange={(val) => onChange({ ...def, ["font-weight"]: val })}
            />
          </div>
        }

        {text_align && <div className="bPl-typography-selectField">
          <label className="bPl-typography-label">Text Align</label>
          <BSelectControl
            options={typoTextAlignOpts}
            value={def?.["text-align"]}
            onChange={(val) => onChange({ ...def, ["text-align"]: val })}
          />
        </div>}
        {font_variant && <div className="bPl-typography-selectField">
          <label className="bPl-typography-label">Text Variant</label>
          <BSelectControl
            options={typoFontVariant}
            value={def?.["font-variant"]}
            onChange={(val) => onChange({ ...def, ["font-variant"]: val })}
          />
        </div>}

        {text_transform && <div className="bPl-typography-selectField">
          <label className="bPl-typography-label">Text Transform</label>
          <BSelectControl
            options={textTransforms}
            value={def?.["text-transform"]}
            onChange={(val) => onChange({ ...def, ["text-transform"]: val })}
          />
        </div>}
        {text_decoration && <div className="bPl-typography-selectField">
          <label className="bPl-typography-label">Text Decoration</label>
          <BSelectControl
            options={textDecorations}
            value={def?.["text-decoration"]}
            onChange={(val) => onChange({ ...def, ["text-decoration"]: val })}
          />
        </div>}
      </div>
      {isUnitShow && <div className="bPl-typography-inputField-wrapper">
        {font_size && <div className="bPl-typography-inputField">
          <div className="bPl-typography-label">Font Size</div>
          <UnitControl
            units={[{ label: "PX", value: "px" }]}
            value={def?.["font-size"]}
            onChange={(val) => onChange({ ...def, ["font-size"]: val })}
          />
        </div>}
        {line_height && <div className="bPl-typography-inputField">
          <div className="bPl-typography-label">Line Height</div>
          <UnitControl
            units={[{ label: "PX", value: "px" }]}
            value={def?.["line-height"]}
            onChange={(val) => onChange({ ...def, ["line-height"]: val })}
          />
        </div>}
        {letter_spacing && <div className="bPl-typography-inputField">
          <div className="bPl-typography-label">Letter Spacing</div>
          <UnitControl
            units={[{ label: "PX", value: "px" }]}
            value={def?.["letter-spacing"]}
            onChange={(val) => onChange({ ...def, ["letter-spacing"]: val })}
          />
        </div>}
        {word_spacing && <div className="bPl-typography-inputField">
          <div className="bPl-typography-label">Word Spacing</div>
          <UnitControl
            units={[{ label: "PX", value: "px" }]}
            value={def?.["word-spacing"]}
            onChange={(val) => onChange({ ...def, ["word-spacing"]: val })}
          />
        </div>}
      </div>}
      {color && <div className="bPl-typography-colorField-wrapper">
        <div className="bPl-typography-label">Font Size</div>
        <ColorPicker value={def?.["color"]} onChange={val => onChange({ ...def, ["color"]: val })} />
      </div>}
      {hasChanged && <div onClick={() => setToggle(!toggle)} className={`bPl-typography-preview typo-preview-${id} ${toggle ? "black-background" : ""}`}>
        <div className="bPl-typography-icons">
          {
            toggle ? toggleOnIcon : toggleOffIcon
          }
        </div>
        The quick brown fox jumped over the lazy dog.
      </div>}
    </div>
  );
};

export default Typography;
