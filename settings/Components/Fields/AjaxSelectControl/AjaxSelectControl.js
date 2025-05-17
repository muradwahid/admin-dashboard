import { Spinner } from '@wordpress/components';

import useDynamicData from '../../../hooks/useDynamicData';
import "./style.scss";
const AjaxSelectControl = ({ field = "posts", value, onChange }) => {
  const { data: content = null, isLoading } = useDynamicData(field);
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className="bPl-selectControl-wrapper">
      {
        content?.length > 0 ?
          <select onChange={(e) => onChange(e.target.value)} className="bPl-selectControl" value={value}>
            <option value="default">Select a {field}</option>
            {content?.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
          </select>
          :
          <p>No data available.</p>
      }
    </div>
  );
};

export default AjaxSelectControl;