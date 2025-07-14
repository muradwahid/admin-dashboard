import { SelectControl } from '@wordpress/components';
import { bgBlendMode, bgOrigin, gradientDirection, imgAttachment, imgPositionOptions, imgRepeatOptions, imgSizeOptions } from '../../../utils/options';
import ColorPicker from '../ColorPicker/ColorPicker';
import InlineMediaUpload from '../InlineMediaUpload/InlineMediaUpload';
import "./style.scss";
const BBackground = ({
  value, onChange, defaultValue,
  background_color = true,
  background_image = true,
  background_position = true,
  background_repeat = true,
  background_attachment = true,
  background_size = true,
  background_origin = false,
  background_clip = false,
  background_blend_mode = false,
  background_gradient = false
}) => {
  const def = value || defaultValue || { background_color: "", background_gradient_color: "", background_image: "", background_position: "default", background_repeat: "default", "background-attachment": "default", background_size: "default", background_origin: "default", background_clip: "default", background_blend_mode: "default" }

  const isSolid = !background_gradient && background_color;
  return (
    <div className='bPl-background-wrapper'>
      {isSolid && <ColorPicker value={def["background_color"]} onChange={(value) => onChange({ ...def, background_color: value })} />
      }
      {
        background_gradient && <div className="bPl-background-gradient">
          <div>
            <span>From</span>
            <ColorPicker value={def["background_color"]} onChange={(value) => onChange({ ...def, background_color: value })} />
          </div>
          <div>
            <span>To</span>
            <ColorPicker value={def["background_gradient_color"]} onChange={(value) => onChange({ ...def, background_gradient_color: value })} />
          </div>
          <div>
            <span>Direction</span>
            <SelectControl options={gradientDirection} value={def["direction"]} onChange={(value) => onChange({ ...def, direction: value })} />
          </div>
        </div>
      }

      {
        background_image && <InlineMediaUpload value={def["background_image"]} onChange={(value) => onChange({ ...def, background_image: value })} />
      }
      <div className='bPl-background-options'>
        {
          background_position && <div style={{ width: "100%" }}>
            <SelectControl options={imgPositionOptions} value={def["background_position"]} onChange={(value) => onChange({ ...def, background_position: value })} />

          </div>
        }
        {
          background_repeat && <div style={{ width: "100%" }}>
            <SelectControl options={imgRepeatOptions} value={def["background_repeat"]} onChange={(value) => onChange({ ...def, background_repeat: value })} />
          </div>
        }
        {
          background_attachment && <div style={{ width: "100%" }}>
            <SelectControl options={imgAttachment} value={def["background_attachment"]} onChange={(value) => onChange({ ...def, background_attachment: value })} />
          </div>
        }
        {
          background_size && <div style={{ width: "100%" }}>
            <SelectControl options={imgSizeOptions} value={def["background_size"]} onChange={(value) => onChange({ ...def, background_size: value })} />
          </div>
        }
        {
          background_origin && <div style={{ width: "100%" }}>
            <SelectControl options={bgOrigin} value={def["background_origin"]} onChange={(value) => onChange({ ...def, background_origin: value })} />
          </div>
        }
        {
          background_clip && <div style={{ width: "100%" }}>
            <SelectControl options={bgOrigin} value={def["background_clip"]} onChange={(value) => onChange({ ...def, background_clip: value })} />
          </div>
        }
      </div>
      {
        background_blend_mode && <SelectControl options={bgBlendMode} value={def["background_blend_mode"]} onChange={(value) => onChange({ ...def, background_blend_mode: value })} />
      }
    </div>
  );
};

export default BBackground;



