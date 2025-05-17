import React, { useEffect, useState } from 'react';
const BWPEditor = ({ value = '', onChange, defaultValue = '', media_button = true, quicktags = true, height = '180px', isLoading }) => {
  const def = value || defaultValue;

  const [randomId, setRandomId] = useState(null);

  useEffect(() => {
    setRandomId(String(Math.floor(Math.random() * 99999)));
  }, []);
  useEffect(() => {
    const editorSettings = {
      tinymce: {
        selector: `bpl-wp-${randomId}editor`,
        height,
        wpautop: false,
        plugins: 'charmap colorpicker compat3x directionality fullscreen hr image lists media paste tabfocus textcolor wordpress wpautoresize wpdialogs wpeditimage wpemoji wpgallery wplink wptextpattern wpview',
        toolbar1: 'formatselect bold italic underline bullist numlist blockquote alignleft aligncenter alignright link unlink wp_more fullscreen wp_adv',
        toolbar2: 'strikethrough hr alignjustify forecolor pastetext removeformat charmap outdent indent undo redo wp_help'
      },

      quicktags,
      mediaButtons: media_button,
      paste_block_drop: true,
      paste_data_images: true,
      paste_as_text: true,
      content_style:
        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
    }
    if (randomId) {
      wp.editor.initialize(`bpl-wp-${randomId}editor`, editorSettings); 
    }
  }, [randomId])

  const editor = window.tinymce.editors[`bpl-wp-${randomId}editor`];
  if (editor) {
    editor.on('keyup', () => {
      const content = editor?.getContent();
      onChange(content)

    });
  }
  React.useEffect(() => {
    if (editor) {
      editor.setContent(def);
    }
  }, [isLoading])
  return (
    <div>
      <style>{`
        #bpl-wp-${randomId}editor{
          border:none !important;
        }
        #bpl-wp-${randomId}editor:focus{
          border:none !important;
          outline: none !important;
          box-shadow:none !important;
        }
      `}</style>
      <textarea style={{ width: "100%" }} id={`bpl-wp-${randomId}editor`} className='bpl-wp-editor' ></textarea>
    </div>
  )
}
export default BWPEditor