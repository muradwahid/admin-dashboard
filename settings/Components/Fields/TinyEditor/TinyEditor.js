/* eslint-disable no-unused-vars */
import { Editor } from "@tinymce/tinymce-react";
// import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { MediaUpload } from "@wordpress/media-utils";
import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import "./tinyEditor.scss";

// const { Button } = wp.components;

/**
 * TinyEditor component.
 *
 * @component
 * @param {Object} props
 * @param {String} [props.value]
 * @param {Function} [props.onChange=() => {}]
 * @param {Number} [props.height=350] - Optional
 * @returns {JSX.Element}
 */

export const TinyEditor = (props) => {
  const { value, onChange = () => { }, default: defaults, height = 350, media_button = true } = props;
  const editorRef = useRef(null);
  const tinyRef = useRef(null);
  const [media, setMedia] = useState("");
  const [content, setContent] = useState("");
  const initialValue = value || defaults;
  const log = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };
  useEffect(() => {
    if (media_button) {
      const id = tinyRef?.current.id
      setTimeout(() => {
        const editorWrapper = document.querySelector(`iframe#${id}_ifr`)?.contentWindow?.document
        const tinymce = editorWrapper?.querySelector(".mce-content-body");
        if (tinymce && media?.url) {
          const createImgEl = document.createElement("img");
          createImgEl.src = media.url;
          createImgEl.style.maxWidth = "100%";
          createImgEl.style.maxHeight = "100%";
          tinymce?.appendChild(createImgEl);
        }
      }, 1000);
    }
  }, [media.url]);

  useEffect(() => {
    onChange(content);
  }, [tinyRef.current]);

  useEffect(() => {
    setContent(value);
  }, []);
  return (
    <div>
      {
        media_button && <MediaUpload
          gallery={true}
          onSelect={(value) => setMedia(value)}
          allowedTypes={["image"]}
          render={({ open }) => (
            <Button variant="secondary" style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "5px" }} onClick={open}>
              <span className="dashicons dashicons-admin-media"></span>
              Add Media
            </Button>
          )}
          multiple={false}
        />
      }
      <Editor

        ref={tinyRef}
        apiKey="lfuv1x8qkvjpz1rl2vyrxz5h57bn79bxrtiiw3hxpsmifqg8"
        onChange={(evt, editor) => {
          setContent(editor.getContent());
        }}
        onKeyUp={(evt, editor) => {
          log()
        }}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        // init={{
        //   height,
        //   selector: "textarea",
        //   menubar: false,
        //   plugins: ["lists link image charmap", "fullscreen", "media paste"],
        //   toolbar:
        //     "undo redo formatselect bold italic link alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat specilchar fullscreen",
        //   content_style:
        //     "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        // }}
        init={{
          height,
          menubar: false,
          plugins: [
            "ai preview powerpaste casechange footnotes tinycomments searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed advtemplate codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker mergetags a11ychecker editimage help formatpainter permanentpen pageembed charmap quickbars linkchecker emoticons advtable export mentions typography markdown importword",
          ],
          toolbar:
            "undo redo | importword | aidialog aishortcuts | blocks fontsizeinput | bold italic | align numlist bullist | link image | table media pageembed | lineheight  outdent indent | strikethrough forecolor backcolor formatpainter removeformat | charmap emoticons checklist | code fullscreen preview | save export | pagebreak anchor codesample footnotes mergetags | addtemplate inserttemplate | addcomment showcomments | ltr rtl casechange | spellcheckdialog a11ycheck",
          importword_service_url: "add.url.here",
          templates: [],
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
};
