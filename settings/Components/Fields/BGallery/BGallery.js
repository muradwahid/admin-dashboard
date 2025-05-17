import { MediaUpload } from "@wordpress/media-utils";
import React from 'react';
import Button from '../Button/Button';
import "./style.scss";
const BGallery = ({ value = [], onChange, add_title = "Add Gallery", edit_title = "Edit Gallery", clear_title = "Clear", ...props }) => {

  return (
    <div className='bPl-gallery-main-wrapper'>
      {
        value && value.map(img => <div key={img?.id} className="bPl-gallery-preview">
          <img src={img?.url} alt="" />
        </div>)
      }
      <div className="bPl-gallery-controls">
        <MediaUpload
          // allowedTypes={[type]}
          gallery={true}
          multiple={true}
          addToGallery={true}
          onSelect={(val) => onChange(val)}
          value={value}
          {...props}
          render={({ open }) => (
            <Button variant='primary' onClick={open}>{add_title}</Button>
          )}
        />
        {value && <>
          <MediaUpload
            // allowedTypes={[type]}
            gallery={true}
            multiple={true}
            filesList={[]}
            addToGallery={false}
            onSelect={(val) => onChange(val)}
            {...props}
            value={Array.isArray(value) ? value?.map(item => item.id) : value}
            render={({ open }) => (
              <Button variant='secondary' onClick={open}>{edit_title}</Button>
            )}
          />

          <Button onClick={() => onChange(null)} variant='warning'>{clear_title}</Button>
        </>}
      </div>
    </div>
  );
};

export default BGallery;