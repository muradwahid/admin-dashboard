import React from 'react';

export const BBMediaUpload = ({ onSelect, render, value, multiple = true, gallery = true }) => {
  const [image, setImage] = React.useState({})
  const mediaUploader = wp.media.frames.file_frame=wp.media({
    title: 'Choose File',
    button: {
      text: 'Choose File',
    },
    multiple,
    gallery,
    
  });
  React.useEffect(() => {
    mediaUploader.on("select", () => {
      const media = mediaUploader.state().get('selection').first();
      setImage(media.toJSON());
      // onSelect(media.toJSON());
    })
  }, [image, value])
  React.useEffect(() => {
    onSelect(image)
  }, [image])
  return render({ open: () => mediaUploader.open({ selection: wp.media.attachment(value) }) })
};