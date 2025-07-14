import { MediaUpload } from "@wordpress/media-utils";
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import Button from '../Button/Button';
import "./style.scss";
const BGallery = ({ value, onChange, addTitle = "Add Gallery", editTitle = "Edit Gallery", clearTitle = "Clear", ...props }) => {
  const v = value ? value.split(',') : [];
  const media = useSelect(select =>
    v.map(id => select(coreStore).getMedia(id)),
    [value]
  );

  return (
    <div className='bPl-gallery-main-wrapper'>
      {
        value? media.map((val)=><div key={val?.source_url+val} className="bPl-gallery-preview">
          <img src={val?.source_url} alt="" />
        </div>):null 
      }
      <div className="bPl-gallery-controls">
        <MediaUpload
          // allowedTypes={[type]}
          gallery={true}
          multiple={true}
          addToGallery={true}
          onSelect={(val) => onChange(val.map(item => item.id).join(','))}
          value={value}
          {...props}
          render={({ open }) => (
            <Button variant='primary' onClick={open}>{addTitle}</Button>
          )}
        />
        {value && <>
          <MediaUpload
            // allowedTypes={[type]}
            gallery={true}
            multiple={true}
            filesList={[]}
            addToGallery={false}
            onSelect={(val) => onChange(val.map(item => item.id).join(','))}
            {...props}
            value={value}
            render={({ open }) => (
              <Button variant='secondary' onClick={open}>{editTitle}</Button>
            )}
          />

          <Button onClick={() => onChange(null)} variant='warning'>{clearTitle}</Button>
        </>}
      </div>
    </div>
  );
};

export default BGallery;