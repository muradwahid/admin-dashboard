import { SelectControl } from "@wordpress/components"
import AjaxSelectControl from "../../Fields/AjaxSelectControl/AjaxSelectControl"
import BAccordion from "../../Fields/BAccordion/BAccordion"
import BBackground from "../../Fields/BBackground/BBackground"
import BBackup from "../../Fields/BBackup/BBackup"
import BButtonSet from "../../Fields/BButtonSet/BButtonSet"
import BCheckboxControl from "../../Fields/BCheckboxControl/BCheckboxControl"
import BColorGroup from "../../Fields/BColorGroup/BColorGroup"
import BColorPalette from "../../Fields/BColorPalette/BColorPalette"
import BContent from "../../Fields/BContent/BContent"
import BDate from "../../Fields/BDate/BDate"
import BFieldset from "../../Fields/BFieldset/BFieldset"
import BGallery from "../../Fields/BGallery/BGallery"
import BHeading from "../../Fields/BHeading/BHeading"
import BLinkColor from "../../Fields/BLinkColor/BLinkColor"
import BPanelRepeater from "../../Fields/BPanelRepeater/BPanelRepeater"
import BRadioControl from "../../Fields/BRadioControl/BRadioControl"
import BRangeControl from "../../Fields/BRangeControl/BRangeControl"
import BSanitize from "../../Fields/BSanitize/BSanitize"
import BSearchPage from "../../Fields/BSearchPage/BSearchPage"
import BSelectTokenField from "../../Fields/BSelectTokenField/BSelectTokenField"
import BSubHeading from "../../Fields/BSubHeading/BSubHeading"
import BSubMessage from "../../Fields/BSubmessage/BSubMessage"
import BTabbed from "../../Fields/BTabbed/BTabbed"
import BTextControl from "../../Fields/BTextControl/BTextControl"
import BTextareaControl from "../../Fields/BTextareaControl/BTextareaControl"
import BValidateInput from "../../Fields/BValidateInput/BValidateInput"
import BWPEditor from "../../Fields/BWPEditor/BWPEditor"
import Border from "../../Fields/Border/Border"
import CodeEditor from "../../Fields/CodeEditor/CodeEditor"
import ColorPicker from "../../Fields/ColorPicker/ColorPicker"
import Dimension from "../../Fields/Dimension/Dimension"
import InlineMediaUpload from "../../Fields/InlineMediaUpload/InlineMediaUpload"
import Link from "../../Fields/Link/Link"
import Map from "../../Fields/Map/Map"
import Notice from "../../Fields/Notice/Notice"
import Number from "../../Fields/Number/Number"
import SelectImage from "../../Fields/SelectImage/SelectImage"
import Sortable from "../../Fields/Sortable/Sortable"
import Spacing from "../../Fields/Spacing/Spacing"
import Spinner from "../../Fields/Spinner/Spinner"
import ToggleControl from "../../Fields/ToggleControl/ToggleControl"
import Typography from "../../Fields/Typography/Typography"

const FieldSwitch = (props) => {
  const { extraFields, dbData,label, help, field, labelPosition, value, onChange, placeholder, options = [], default: defaultValue, attributes, content, variant, type, fields, data, setData, isLoading, name } = props;
  const fieldProps = { value, help, label, defaultValue, fields, ...attributes, isLoading, dbData }

  switch (field) {
    case 'accordion':
      return <BAccordion  {...fieldProps} onChange={val => onChange(val)} />
    case 'backup': return <BBackup {...fieldProps} onChange={val => onChange(val)} data={data} setData={setData} />
    case 'border': return <Border {...fieldProps} {...attributes} {...extraFields} onChange={val => onChange(val)} />
    case 'button_set': return <BButtonSet {...fieldProps} {...attributes} {...extraFields} onChange={val => onChange(val)} />
    case 'code_editor': return <CodeEditor {...fieldProps} {...attributes} {...extraFields} onChange={val => onChange(val)} />
    case 'content': return <BContent {...extraFields} />
    case 'dimensions': return <Dimension {...fieldProps} {...attributes} {...extraFields} onChange={val => onChange(val)} />
    case 'datetime':
    case 'date': return <BDate  {...fieldProps} {...attributes} {...extraFields} onChange={val => onChange(val)} />
    case 'gallery': return <BGallery  {...fieldProps} {...attributes} {...extraFields} onChange={val => onChange(val)} />
    case 'heading': return <BHeading {...extraFields} />
    case 'textarea':
      return <BTextareaControl  {...fieldProps} {...attributes} onChange={val => onChange(val)} />
    case 'tabbed': return <BTabbed  {...fieldProps} {...attributes} onChange={val => onChange(val)} />
    case 'fieldset': return <BFieldset {...fieldProps} {...attributes} onChange={val => onChange(val)} />
    case 'link': return <Link {...fieldProps} {...attributes} {...extraFields} onChange={val => onChange(val)} />
    case 'map': return <Map {...fieldProps} {...extraFields} onChange={val => onChange(val)} />
    case "switcher": return <ToggleControl checked={value} labelPosition={labelPosition} {...fieldProps} {...extraFields} onChange={val => onChange(val)} />
    case "image_select": return <SelectImage images={options} {...fieldProps} {...attributes} {...extraFields} onChange={val => onChange(val)} />
    case 'select':
      return <div style={{ width: "fit-content" }}><SelectControl {...fieldProps} options={options} onChange={val => onChange(val)} /></div>
    case 'pages':
    case 'posts':
    case 'categories':
    case 'roles':
    case 'users':
    case 'postTypes':
    case 'menus':
    case 'taxonomies':
      return <AjaxSelectControl field={field} value={value} onChange={val => onChange(val)} />
    case "color": return <ColorPicker  {...fieldProps} onChange={val => onChange(val)} />
    case "media": return <InlineMediaUpload {...fieldProps} {...extraFields} onChange={val => onChange(val)} />
    case "background": return <BBackground {...fieldProps} {...extraFields} onChange={val => onChange(val)} />
    case "radio": return <BRadioControl {...fieldProps} {...extraFields} options={options} selected={value} onChange={val => onChange(val)} />
    case 'checkbox':
      return <BCheckboxControl {...extraFields} defaultValue={defaultValue} {...attributes} options={options} value={value} onChange={val => onChange(val)} />
    case 'chosen':
      return <BSelectTokenField options={options} {...fieldProps} onChange={val => onChange(val)} />
    case "notice": return <Notice content={content} variant={variant} />
    case 'number': return <Number {...fieldProps} {...extraFields} onChange={val => onChange(val)} />

    case "repeater": {
      return <BPanelRepeater {...fieldProps} {...extraFields} fields={props.fields} onChange={val => onChange(val)} />
    }
    case 'sanitize': return <BSanitize {...fieldProps} {...extraFields} onChange={val => onChange(val)} />
    case "searchPage": return <BSearchPage value={value} onChange={val => onChange(val)} type={type} />
    case 'subheading': return <BSubHeading {...extraFields} />
    case 'spacing': return <Spacing {...fieldProps} {...extraFields} onChange={val => onChange(val)} />
    case 'spinner': return <Spinner {...fieldProps} {...extraFields} onChange={val => onChange(val)} />
    // case 'slider': return <Slider {...fieldProps} {...extraFields} onChange={val => onChange(val)} />
    case 'sortable': return <Sortable  {...fieldProps} {...extraFields} fields={props.fields} onChange={val => onChange(val)} />
    case 'slider': return <BRangeControl {...fieldProps} {...extraFields} onChange={val => onChange(val)} />
    case 'submessage': return <BSubMessage {...extraFields} />
    case "link_color": return <BLinkColor {...fieldProps} {...attributes} {...extraFields} onChange={val => onChange(val)} />
    case "color_group": return <BColorGroup options={options} {...fieldProps} {...attributes} {...extraFields} onChange={val => onChange(val)} />
    case "palette": return <BColorPalette options={options} {...fieldProps} onChange={val => onChange(val)} />
    case "typography": return <Typography options={options} {...fieldProps} {...extraFields} onChange={val => onChange(val)} />
    case 'validate': return <BValidateInput {...fieldProps} {...extraFields} onChange={val => onChange(val)} />
    case "wp_editor": return <BWPEditor {...fieldProps} {...attributes} {...extraFields} onChange={val => onChange(val)} />
    default:
      return <BTextControl  {...fieldProps} {...attributes} placeholder={placeholder} onChange={val => onChange(val)} name={name} />
  }
}
export default FieldSwitch